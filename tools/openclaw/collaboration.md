---
title: 如何与 OpenClaw 高效协作？
description: Tino 是如何与 Ty 协作的？探索 AI 超级助理的协作模式与最佳实践
---

# 如何与 OpenClaw 高效协作？

> 本文介绍基于 OpenClaw 构建的 AI 超级助理（Tino）的协作模式，适用于团队内部分享。

---

## Tino 是谁？

**Tino** 是一个基于 OpenClaw 构建的 AI 超级助理，专门为 Ty Chen（算法工程师，专注于 LLM 后训练和 Agent 应用开发）提供服务。

- **角色**：AI 超级个人助理
- **能力**：搜索、编程、笔记管理、任务执行、信息整理等
- **特点**：有记忆系统，能记住用户的偏好和上下文

---

## 协作模式

### 角色分工

| 角色 | 负责人 | 职责 |
|------|--------|------|
| **业务方** | 人类（Ty） | 提出需求和想法 |
| **产品经理 + 架构师** | AI 助理（Tino） | 产品设计、技术架构设计、需求进度管控、功能验收 |
| **程序员 + 测试工程师** | Claude Code | 代码实现、单元测试、集成测试 |

### 工作流程

```
1. 需求阶段
   ↓
2. 设计阶段
   ↓
3. 开发阶段
   ↓
4. 进度管控
   ↓
5. 功能验收
   ↓
6. 交付
```

#### 1. 需求阶段
- 人类提出需求和想法
- Tino 与人类沟通，明确需求和验收标准

#### 2. 设计阶段
- Tino 进行产品和技术架构设计
- 输出设计文档

#### 3. 开发阶段
- Tino 通过 **coding-agent skill** 启动 Claude Code 执行代码任务
- Claude Code 自主解决技术问题，不频繁询问

#### 4. 进度管控
- Tino 通过心跳机制定期检查任务进度
- 使用 HEARTBEAT.md 管理待办事项

#### 5. 功能验收
- Tino 验证功能是否满足验收标准

#### 6. 交付
- 完成交付或反馈问题

---

## 核心能力

### 1. 记忆系统

Tino 有长期记忆和短期记忆：

- **MEMORY.md**：长期记忆，记录重要、持久的信息
- **memory/YYYY-MM-DD.md**：每日工作日志
- **inspiration/**：灵感收集
- **todo/**：待办事项管理

### 2. 定时任务

- 每周 LLM/Agent 周报（每周一早上 8:00）
- 自动推送到 iMessage

### 3. 协作产出

| 目录 | 用途 |
|------|------|
| `notes/` | 结构化知识库 |
| `tasks/` | 任务项目记录 |
| `inspiration/` | 灵感收集 |
| `todo/` | 待办事项 |

---

## 使用技巧

### 快捷指令

- `灵感：xxx` - 记录灵感想法
- `代办 xxx` - 添加待办事项
- `/model xxx` - 切换模型

### 消息渠道

- **iMessage**：主要通讯方式
- **Web Chat**：通过 OpenClaw Dashboard
- **Telegram/Discord**：可配置

### 可用 Skills

Tino 安装了 50+ Skills，包括：

- **通讯**：iMessage、Discord、Slack
- **开发**：GitHub、Claude Code、coding-agent
- **笔记**：Apple Notes、Notion、Obsidian
- **AI**：GLM、Claude、GPT
- **工具**：天气、搜索、总结

---

## 技术架构

### OpenClaw

- **官网**：https://github.com/openclaw/openclaw
- **文档**：https://docs.openclaw.ai
- **Skills 市场**：https://clawhub.com

### 核心组件

1. **Gateway**：服务网关
2. **Agent**：AI 代理核心
3. **Skills**：可扩展工具集
4. **Channels**：多渠道接入
5. **Memory**：记忆系统

---

## 总结

与 AI 助理高效协作的关键：

1. **明确分工**：人类负责决策，AI 负责执行和推进
2. **建立流程**：标准化的工作流程提高效率
3. **善用记忆**：让 AI 记住上下文，避免重复沟通
4. **持续迭代**：根据实际使用不断完善协作模式

---

*本文档用于团队内部分享，基于 Tino 与 Ty 的实际协作经验整理。*
