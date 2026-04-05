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

### 情形记忆 (Episodic Memory)

- **每日笔记**：memory/YYYY-MM-DD.md
- **长期记忆**：MEMORY.md —— 项目概览、硬件配置等长期事实
- **目的**：保证连续性，不遗忘每天发生的事情
- **规则**：只记事实（发生了什么），不记反思（学到了什么）

### 反思记忆 (Reflective Memory)

- **目录**：.learnings/
- **LEARNINGS.md** — 被纠正的错误、更好的做法、知识盲区、最佳实践
- **ERRORS.md** — 命令失败、API 报错、异常行为
- **FEATURE_REQUESTS.md** — 用户期望但尚不存在的功能
- **目的**：积累经验，通过晋升机制让自己越来越聪明
- **晋升**：每天夜里 3:00 定时任务审查，符合条件的晋升到核心配置文件

### 晋升机制

1. **记录**：交互中遇到值得反思的情况 → 写入 .learnings/
2. **审查**：每天 3:00 定时任务审查 .learnings/ 中的 pending 条目
3. **晋升**：符合条件的经验提炼为简短规则，写入目标配置文件
4. **标记**：原条目 status 改为 promoted

| 经验类型 | 晋升到 |
|----------|--------|
| 行为模式改进 | SOUL.md |
| 工作流程优化 | AGENTS.md |
| 工具使用坑点 | TOOLS.md |
| 用户偏好 | USER.md |
```

### 第四步：在 HEARTBEAT.md 中触发记录

心跳是反思记忆的主要写入时机。在 HEARTBEAT.md 的检查步骤中加入：

```markdown
1. **检查时间**：如果是深夜（23:00-08:00），只做简单检查后返回
2. **记录每日记忆**：更新 memory/YYYY-MM-DD.md，记录当天做了什么（情形记忆）
3. **记录反思经验**：如果本次交互中遇到了值得反思的情况（被纠正、发现更好的做法、踩了坑），记录到 .learnings/ 对应文件中
```

这样每次心跳轮询时，Agent 会自动把当天的情形和反思分别写入对应文件。

### 第五步：创建定时审查任务

用 OpenClaw cron 创建每天 3:00 的审查任务（isolated session）。完整的 prompt 如下：

**情形记忆晋升部分**：

```
1. 读取审查进度文件 ~/.openclaw/workspace/memory/.review-state.json，
   格式：{"lastReviewed": "YYYY-MM-DD"}。不存在则视为从未审查
2. 读取 ~/.openclaw/workspace/memory/ 下所有日期 > lastReviewed 的每日记忆文件
3. 读取 ~/.openclaw/workspace/MEMORY.md 和 ~/.openclaw/workspace/USER.md
4. 识别每日笔记中值得长期保留的内容，按类型晋升到对应文件：
   - 项目里程碑（完成/上线/归档）→ MEMORY.md
   - 重要的配置变更或架构调整 → MEMORY.md
   - 新的协作产出目录或工作流程 → MEMORY.md
   - 用户偏好、习惯、表达喜好 → USER.md
   - 任何未来会话需要知道的事实 → MEMORY.md
5. 晋升是复制+提炼，不要删除原始每日笔记中的内容（保持时序完整性）
6. 更新 .review-state.json 的 lastReviewed 为今天日期
```

**反思记忆晋升部分**：

```
1. 读取 .learnings/LEARNINGS.md、.learnings/ERRORS.md、.learnings/FEATURE_REQUESTS.md
2. 找出所有 status 为 pending 的条目
3. 评估每条是否值得晋升：
   - 出现过 2 次以上的经验 → 高优先晋升
   - 被用户明确纠正的经验 → 中优先晋升
   - 一次性偶发问题 → 保留观察
4. 将值得晋升的经验提炼为简短规则，写入目标配置文件：
   - 行为模式改进 → SOUL.md
   - 工作流程优化 → AGENTS.md
   - 工具使用坑点 → TOOLS.md
   - 用户偏好 → USER.md
5. 更新原条目的 status 为 promoted，并记录晋升目标
```

**cron 任务配置**：

```yaml
schedule: "0 3 * * *"    # 每天 3:00
timezone: Asia/Shanghai
sessionTarget: isolated   # 独立 session，不污染主会话
timeout: 300s
delivery:
  mode: announce          # 有重要发现时通知用户
  channel: feishu
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

### 5. 晋升删除了原始笔记

最初设计晋升后删除每日笔记中的冗余内容，但这样丢失了时序性——"4月3日做了什么"是情形记忆的核心价值。改为只复制+提炼，原始笔记保持不动。

## 参考资料

- OpenClaw 文档：https://docs.openclaw.ai
- self-improving-agent 技能：https://github.com/openclaw/openclaw/tree/main/skills/self-improving-agent
