---
type: guide
title: OpenClaw CLI 使用指南
tags: [openclaw, cli, tutorial]
---

# OpenClaw CLI 使用指南

本文档介绍 OpenClaw CLI 的常用命令及使用方法。

---

## 概述

OpenClaw CLI 是与 OpenClaw 交互的命令行工具，通过终端执行各种操作，如启动服务、管理任务、配置模型等。

---

## 前置条件

- 已安装 OpenClaw
- 已启动 Gateway 服务

---

## 常用命令

### 1. 查看版本

```bash
openclaw --version
```

### 2. Gateway 服务管理

```bash
# 启动 Gateway 服务
openclaw gateway start

# 停止 Gateway 服务
openclaw gateway stop

# 重启 Gateway 服务
openclaw gateway restart

# 查看服务状态
openclaw gateway status
```

### 3. 模型管理

```bash
# 查看当前模型状态
openclaw models status

# 列出所有可用模型
openclaw models list

# 切换默认模型
openclaw models set anthropic/claude-opus-4-6
```

### 4. 定时任务

```bash
# 列出所有定时任务
openclaw cron list

# 运行定时任务（调试）
openclaw cron run <task-id>

# 查看 cron 状态
openclaw cron status
```

### 5. 配置向导

```bash
# 交互式配置（推荐）
openclaw onboard

# 非交互式配置
openclaw onboard --non-interactive --auth-choice anthropic-api-key --anthropic-api-key "your-key"
```

### 6. 技能管理

```bash
# 查看帮助
openclaw --help

# 查看子命令帮助
openclaw gateway --help
openclaw models --help
openclaw cron --help
```

---

## 验证安装

安装完成后，运行以下命令验证：

```bash
# 检查版本
openclaw --version

# 检查服务状态
openclaw gateway status

# 运行诊断
openclaw doctor
```

---

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 命令找不到 | 确保 OpenClaw 已添加到 PATH |
| 服务启动失败 | 检查端口是否被占用 |
| 模型切换不生效 | 重启 Gateway 服务 |

---

## 参考资料

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
