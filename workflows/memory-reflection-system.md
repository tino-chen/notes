---
type: guide
title: OpenClaw 记忆与反思系统
tags: [OpenClaw, Memory, Agent, 自我改进]
---

# OpenClaw 记忆与反思系统

## 这是什么

AI 助理每次会话醒来都是"全新的"，没有原生记忆。OpenClaw 通过文件系统解决这个问题——Agent 读写文件来延续记忆。

但简单的"什么都往一个文件里塞"很快就会失控。本文介绍一套**分层记忆 + 自动晋升**的方案，让 Agent 既有连续性，又能自我改进。

## 最终效果

- Agent 能记住昨天做了什么、上周的项目进展
- 被纠正过的错误不会再犯（经验晋升为行为规则）
- 记忆不会无限膨胀（每日笔记 + 长期文件分层管理）
- 全自动：每天凌晨自动审查和晋升，无需人工干预

## 整体架构

```
交互发生
  ├─→ memory/YYYY-MM-DD.md              情形记忆（发生了什么）
  └─→ .learnings/LEARNINGS.md           反思记忆（学到了什么）
         │
         ↓  每天 3:00 定时任务自动审查
         │
    SOUL.md    行为风格改进
    AGENTS.md  工作流程优化
    TOOLS.md   工具使用坑点
    USER.md    用户偏好
    MEMORY.md  长期事实
```

核心思想：**情形记忆和反思记忆是两种不同的东西，分开管理，各自有晋升通道。**

## 文件结构

```
workspace/
├── SOUL.md              # Agent 人格与风格（行为规则）
├── AGENTS.md            # 工作流程规范
├── TOOLS.md             # 工具备忘录
├── USER.md              # 用户信息与偏好
├── MEMORY.md            # 长期事实（项目、配置、产出目录）
├── HEARTBEAT.md         # 心跳检查任务清单
├── memory/
│   ├── .review-state.json   # 情形记忆审查进度
│   ├── 2026-04-01.md        # 每日情形记忆
│   ├── 2026-04-02.md
│   └── ...
└── .learnings/
    ├── LEARNINGS.md          # 被纠正的错误、更好的做法
    ├── ERRORS.md             # 命令失败、API 报错
    └── FEATURE_REQUESTS.md   # 用户期望但尚不存在的功能
```

## 实操步骤

### 第一步：安装 self-improving-agent 技能并初始化

```bash
# 安装技能
openclaw skills install self-improving-agent
```

安装后必须手动初始化——技能本身不会自动创建目录和文件：

```bash
# 创建反思记忆目录
mkdir ~/.openclaw/workspace/.learnings

# 创建三个日志文件
touch ~/.openclaw/workspace/.learnings/LEARNINGS.md
touch ~/.openclaw/workspace/.learnings/ERRORS.md
touch ~/.openclaw/workspace/.learnings/FEATURE_REQUESTS.md
```

在 `LEARNINGS.md` 中添加标题头：

```markdown
# LEARNINGS.md - 反思记忆

记录值得反思的经验教训。每日定时任务审查并晋升到核心配置文件。
```

> ⚠️ **常见坑**：技能安装不等于启用。安装后如果不创建目录和文件，反思记忆系统根本不会工作。

### 第二步：了解日志文件格式

创建三个日志文件，格式如下：

**LEARNINGS.md 示例**：

```markdown
# LEARNINGS.md - 反思记忆

## [LRN-20260404-001] correction

**Logged**: 2026-04-04T12:07:00+08:00
**Priority**: high
**Status**: pending        # pending → promoted
**Area**: config

### Summary
说了要做的事但没有对应行动

### Details
在讨论笔记站回顾机制时，说了倾向方案 2 但没有实际创建。

### Suggested Action
说到 = 做到。如果还没做，就不要说。
```

**关键字段**：
- `Status`: pending 等待晋升，promoted 已晋升
- `Priority`: high（用户纠正）> medium（自我发现）> low（偶发问题）
- `Area`: config / style / thinking / note-taking 等分类

### 第三步：在 AGENTS.md 中定义记忆规范

在 AGENTS.md 中加入记忆章节，明确每种记忆的写入规则：

```markdown
## 记忆

### 情形记忆 (memory/YYYY-MM-DD.md)
- 只记事实（发生了什么），不记反思（学到了什么）
- 文件名格式：YYYY-MM-DD.md

### 反思记忆 (.learnings/)
- 被纠正的错误 → LEARNINGS.md
- 命令/API 失败 → ERRORS.md
- 用户想要但没有的功能 → FEATURE_REQUESTS.md
```

### 第四步：创建定时审查任务

用 OpenClaw cron 创建每天 3:00 的审查任务（isolated session）：

```
审查内容分两部分：

1. 情形记忆晋升
   - 读取 memory/.review-state.json 获取上次审查日期
   - 读取该日期之后的新每日笔记
   - 识别值得长期保留的内容：
     - 项目里程碑 → MEMORY.md
     - 配置变更 → MEMORY.md
     - 用户偏好 → USER.md
   - 只复制提炼，不删除原始笔记（保持时序性）
   - 更新 review-state.json

2. 反思记忆晋升
   - 读取 .learnings/ 下所有 pending 条目
   - 评估是否值得晋升（反复出现 > 用户纠正 > 偶发）
   - 晋升到目标文件：行为改进 → SOUL.md，流程优化 → AGENTS.md，工具坑点 → TOOLS.md
   - 标记为 promoted
```

### 第五步：在 HEARTBEAT.md 中触发记录

心跳是反思记忆的主要写入时机。在 HEARTBEAT.md 中加入：

```markdown
- 记录每日情形记忆 → memory/YYYY-MM-DD.md
- 如果本次交互中被纠正或发现了更好的做法 → .learnings/LEARNINGS.md
```

## 各文件的职责边界

| 文件 | 存什么 | 不存什么 |
|------|--------|----------|
| `SOUL.md` | 行为规则（如"先做完再汇报"） | 身份信息、工具细节 |
| `AGENTS.md` | 工作流程（如"写笔记前先读 SKILL.md"） | 具体项目信息 |
| `TOOLS.md` | 环境专属信息（SSH、摄像头、TTS 偏好） | 通用规范 |
| `USER.md` | 用户偏好和习惯 | 项目信息、工具配置 |
| `MEMORY.md` | 长期事实（项目状态、硬件配置、产出目录） | 经验教训、每日流水 |
| `memory/` | 每日事实记录 | 反思和经验 |
| `.learnings/` | 待晋升的经验教训 | 已晋升的（标记 promoted） |

## 踩坑记录

### 1. 反思记忆一直没生效

安装了 `self-improving-agent` 技能，但 `.learnings/` 目录从未创建过。技能安装 ≠ 启用，必须手动初始化。

### 2. MEMORY.md 膨胀

最初什么都往 MEMORY.md 塞——身份信息、经验教训、工作流程全混在一起。拆分到对应文件后从 ~3.5KB 降到 ~2KB。

### 3. 情形记忆和反思记忆混在一起

每日笔记里既记"做了什么"又记"学到了什么"，两边都做不好。拆开后：情形记忆保持时序完整性，反思记忆有结构化的审查和晋升通道。

### 4. 心跳重复读取浪费 token

最初设计每次审查读过去 7 天的每日笔记，导致同一条记忆被反复处理 7 次。改用 `.review-state.json` 记录进度，每次只读新的一天的笔记。

## 参考资料

- OpenClaw 文档：https://docs.openclaw.ai
- self-improving-agent 技能：https://github.com/openclaw/openclaw/tree/main/skills/self-improving-agent
