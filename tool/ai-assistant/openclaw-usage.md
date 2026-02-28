---
type: experience
title: OpenClaw 高效使用
tags: [openclaw, usage, tips]
---

# OpenClaw 高效使用

本文档介绍如何配置和使用 OpenClaw，打造个性化的智能助理。

---

## 背景

我需要让 OpenClaw 成为高效的个人助理，需要了解如何定义身份、选择通讯方式、配置定时任务等。

## 尝试过程

### 尝试1: 只用默认配置

结果：功能 basic，缺乏个性化定制。

### 尝试2: 手动编辑配置文件

结果：配置分散在多个文件，不方便管理。

### 尝试3: 通过对话让 AI 自动更新配置

结果：最佳方式。AI 会自动更新相应的配置文件。

## 最终方案

### 1. 定义身份与关系

通过对话告诉 OpenClaw 你的信息：

```
告诉 OpenClaw：
- 你是谁（名字、职业）
- 你希望它成为什么样的助理
- 它叫什么名字、有什么性格
```

AI 会自动更新：
- `IDENTITY.md` — Agent 身份定义
- `USER.md` — 用户信息
- `MEMORY.md` — 长期记忆

### 2. 选择通讯方式

| 渠道 | 说明 | 适用场景 |
|------|------|----------|
| iMessage | macOS 原生消息 | Apple 用户首选 |
| Web Chat | 浏览器访问 | 临时使用 |
| Telegram | 即时通讯 | 跨平台 |
| Discord | 社群聊天 | 团队协作 |

配置方式：`openclaw onboard`

### 3. 推荐 Skill

| # | Skill | 功能 |
|---|-------|------|
| 1 | skill-vetter | 安装前安全扫描 |
| 2 | find-skills | 自动发现推荐技能 |
| 3 | tavily-search | AI 优化联网搜索 |
| 4 | self-improving-agent | 自我迭代优化 |
| 5 | proactive-agent | 主动规划任务 |
| 6 | ontology | 结构化记忆/知识图谱 |
| 7 | gog | Google Workspace 全家桶 |
| 8 | github | GitHub 集成 |
| 9 | summarize | 内容总结 |
| 10 | weather | 天气查询 |

安装：`clawhub install <skill-name>`

### 4. 配置定时推送

#### 每日早报

```
告诉 OpenClaw：
- "每天早上 8 点推送早报"
- "推送到我的 iMessage"
```

#### 领域周报

```
告诉 OpenClaw：
- "每周一早上 8 点推送 LLM/Agent 领域的新闻和研究进展"
```

查看任务：`openclaw cron list`

### 5. 个人管理系统

#### 灵感收集（inspiration）

```
告诉 OpenClaw：灵感：xxx
```

#### 待办管理（todo）

```
告诉 OpenClaw：代办 xxx
```

#### 知识沉淀（notes）

见笔记系统规范文档。

#### 任务项目（tasks）

每个任务一个独立目录，内层是 git 仓库。

### 6. 编程协作模式

| 角色 | 负责人 | 职责 |
|------|--------|------|
| 业务方 | 人类 | 提出需求 |
| 产品经理 + 架构师 | AI 助理 | 设计、架构、验收 |
| 程序员 + 测试 | Claude Code | 代码实现 |

## 效果

- 个性化配置自动管理
- 多种通讯渠道可选
- 定时任务自动执行
- 完整的信息管理闭环

## 注意事项

- `SOUL.md` 是人格模板，通常保持不变
- 个性化定义在 `IDENTITY.md` 中
- 代理配置要确保生效

---

## 参考资料

- [OpenClaw 官方文档](https://docs.openclaw.ai)
