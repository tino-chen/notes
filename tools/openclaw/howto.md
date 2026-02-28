---
title: OpenClaw 高效使用
description: OpenClaw 个性化配置与使用指南
---

# 如何使用 OpenClaw？

本文档介绍如何配置和使用 OpenClaw，打造属于你的个性化智能通。

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

OpenClaw 帮你建立完整的信息管理闭环，收集灵感与代办，沉淀笔记与任务。

### 灵感收集（inspiration）

**用途**：记录突发灵感想法

**使用方式**：
```
告诉 OpenClaw：灵感：xxx
```

**工作机制**：
1. 用户说 `灵感：xxx` 时，自动记录到 `inspiration/YYYY-MM-DD.md`
2. 同时更新 `inspiration/status.json` 跟踪状态
3. 通过心跳机制定期检查，挑选合适的项目实现

**状态流转**：
```
pending → in_progress → completed
```

**目录结构**：
```
~/Desktop/inspiration/
├── 2026-02-27.md      # 每日灵感记录
├── 2026-02-28.md      # ...
└── status.json          # 灵感状态追踪
```

---

### 待办管理（todo）

**用途**：待办事项管理（GTD 风格）

**使用方式**：
```
告诉 OpenClaw：代办 xxx
```

**工作机制**：
1. 用户说 `代办 xxx` 时，先放入收集箱（inbox.json）
2. 用户通过 `查看代办` 命令处理，设置日期和优先级
3. 设置日期后自动移到对应日期的待办文件
4. 完成后移到历史记录

**状态流转**：
```
收集箱 → 今日待办 → 历史记录
```

**目录结构**：
```
~/Desktop/todo/
├── inbox.json           # 收集箱（新待办）
├── daily/               # 今日待办
│   └── 2026-02-28.json
├── history/             # 已完成历史
│   └── 2026-02-27.json
└── ...
```

---

### 知识沉淀（notes）

**用途**：结构化知识库，沉淀可复用知识

**工作机制**：
1. 问AI助理问题获取知识或协作工作
2. 让AI助理把知识或经验总结成 Markdown 笔记
3. 笔记采用 VitePress 构建，自动部署到 GitHub Pages

**目录结构**：
```
~/Desktop/notes/
├── index.md              # 首页
├── tools/                # 工具使用指南
│   ├── openclaw/
│   │   ├── openclaw-setup-guide.md
│   │   ├── howto.md
│   │   └── clawhub.md
│   └── claude/
├── agent/                # Agent 相关
├── llm/                  # LLM 相关
└── projects/             # 项目笔记
```

---

### 任务项目（tasks）

**用途**：代码项目的开发和任务跟踪

**使用方式**：
- 每个任务一个独立目录 `xxxx-xx-xx-任务名`
- 内层 `任务名` 目录是真正的 git 仓库

**目录结构**：
```
~/Desktop/tasks/
└── 2026-02-27-doctranslator/    # 任务资料目录
    ├── DESIGN.md                  # 技术方案
    ├── docs/                      # 任务文档
    └── doctranslator/             # 代码仓库（git）
        ├── .git/
        ├── src/
        ├── package.json
        └── ...
```

---

## 6. 编程协作模式

当提出代码相关任务时，OpenClaw 采用专业分工模式：

| 角色 | 负责人 | 职责 |
|------|--------|------|
| **业务方** | 人类 | 提出需求和想法 |
| **产品经理 + 架构师** | AI 助理 | 产品设计、技术架构、进度管控、功能验收 |
| **程序员 + 测试工程师** | Claude Code | 代码实现 |

### 工作流程

```
需求阶段 → 设计阶段 → 开发阶段 → 验收阶段 → 交付阶段
```

**1. 需求阶段**
- 人类提出需求
- AI 与人类沟通，明确需求和验收标准

**2. 设计阶段**
- AI 进行产品和技术架构设计
- 输出设计文档（DESIGN.md）

**3. 开发阶段**
- AI 启动 Claude Code 执行代码任务（通过 `🧩 coding-agent` 技能）
- Claude Code 自主解决技术问题

**4. 验收阶段**
- AI 验证功能是否满足验收标准

**5. 交付阶段**
- 完成交付或反馈问题
- 上传到 GitHub

---

*本文档持续更新中...*
