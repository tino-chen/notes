---
title: 如何使用 OpenClaw？
description: OpenClaw 个性化配置与使用指南
---

# 如何使用 OpenClaw？

本文档介绍如何配置和使用 OpenClaw，打造属于你的个性化智能体。

---

## 1. 定义身份与关系

通过对话告诉 OpenClaw 你的信息和期望，它会自动更新相应的配置文件：

```
告诉 OpenClaw：
- 你是谁（名字、职业）
- 你希望它成为什么样的助理
- 它叫什么名字、有什么性格
```

OpenClaw 会自动更新以下文件：
- `IDENTITY.md` — Agent 身份定义（名字、性格、头像等）
- `USER.md` — 用户信息（名字、时区等）
- `MEMORY.md` — 长期记忆（重要信息持久化）

> **注意**：`SOUL.md` 是 Agent 人格模板文件，通常保持不变。实际的个性化身份定义在 `IDENTITY.md` 中。

---

## 2. 选择通讯方式

OpenClaw 支持多种通讯渠道，选择最适合你的方式：

| 渠道 | 说明 | 适用场景 |
|------|------|----------|
| **iMessage** | macOS 原生消息 | Apple 用户首选 |
| **Web Chat** | 浏览器访问 | 临时使用 |
| **Telegram** | 即时通讯 | 跨平台 |
| **Discord** | 社群聊天 | 团队协作 |
| **WhatsApp** | 全球通讯 | 国际联系 |

配置方式：
```bash
# 运行配置向导
openclaw onboard
```

---

## 3. 推荐 Skill

Skill 是 OpenClaw 的扩展能力，以下是新手推荐的 10 个必备技能：

| # | Skill | 功能 | 安装量 |
|---|-------|------|--------|
| 1 | **skill-vetter** | 安装前安全扫描 | 安全必备 |
| 2 | **find-skills** | 自动发现推荐技能 | 社区推荐 |
| 3 | **tavily-search** | AI 优化联网搜索 | 37k+ |
| 4 | **self-improving-agent** | 自我迭代优化 | 46k+ |
| 5 | **proactive-agent** | 主动规划任务 | 社区推荐 |
| 6 | **ontology** | 结构化记忆/知识图谱 | 35k+ |
| 7 | **gog** | Google Workspace 全家桶 | 46k+ |
| 8 | **github** | GitHub 集成 | 35k+ |
| 9 | **summarize** | 内容总结 | 36k+ |
| 10 | **weather** | 天气查询 | 29k+ |

> 更多技能请参考：[ClawHub 使用指南](./clawhub)

安装命令：
```bash
clawhub install skill-vetter
clawhub install find-skills
# ... 其他技能
```

---

## 4. 配置定时推送

通过对话设置定时任务，OpenClaw 会自动创建 cron 任务：

### 每日早报

```
告诉 OpenClaw：
- "每天早上 8 点推送早报"
- "推送到我的 iMessage"
```

早报内容包括：
- 今日天气 + 穿衣建议
- AI 热点新闻
- 今日待办事项
- 每日结语

### 领域周报

```
告诉 OpenClaw：
- "每周一早上 8 点推送 LLM/Agent 领域的新闻和研究进展"
- "推送到我的 iMessage"
```

查看已配置的定时任务：
```bash
openclaw cron list
```

---

## 5. 个人管理系统

OpenClaw 帮你建立完整的信息管理闭环：

### 收集系统

| 功能 | 说明 | 位置 |
|------|------|------|
| **灵感** | 突发灵感想法，命令 `灵感：xxx` | `~/Desktop/inspiration/` |
| **代办** | 待办事项（进入收集箱），命令 `代办 xxx` | `~/Desktop/todo/` |

### 沉淀系统

| 功能 | 说明 | 位置 |
|------|------|------|
| **笔记** | 结构化知识库 | `~/Desktop/notes/` |
| **任务** | 代码项目 | `~/Desktop/tasks/` |

### 目录结构

```
~/Desktop/
├── notes/          # 结构化知识库（VitePress + GitHub Pages）
│   ├── tools/          # 工具使用指南
│   ├── agent/          # Agent 相关笔记
│   ├── llm/            # LLM 相关笔记
│   └── projects/       # 项目记录
├── tasks/          # 代码任务项目
│   └── YYYY-MM-DD-任务名/
|── todo/           # 待办管理
│   ├── inbox.json      # 收集箱
│   ├── daily/          # 每日待办
│   └── history/        # 已完成历史
└── inspiration/    # 灵感收集
    ├── YYYY-MM-DD.md   # 今日灵感
    └── status.json     # 灵感状态
```

---

## 6. 编程协作模式

当提出代码相关任务时，OpenClaw 采用专业分工模式：

| 角色 | 负责人 | 职责 |
|------|--------|------|
| **业务方** | 人类 | 提出需求和想法 |
| **产品经理 + 架构师** | AI 助理 | 产品设计、技术架构、进度管控 |
| **程序员** | Claude Code | 代码实现 |

### 工作流程

```
1. 需求阶段 → 2. 设计阶段 → 3. 开发阶段 → 4. 验收 → 5. 交付
```

### 技术细节

- **启动方式**：`exec pty:true workdir:<项目目录> background:true command:"claude '任务'"`
- **必须使用 pty:true**：Claude Code 是交互式终端应用
- **进度监控**：`process action:log/poll` 查看输出

---

*本文档持续更新中...*
