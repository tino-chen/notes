---
type: guide
title: OpenClaw 安装配置
tags: [openclaw, installation, setup]
---

# OpenClaw 安装配置

> 本指南记录如何从零开始搭建一个高效的个性化 AI 助理。

---

## 概述

OpenClaw 是一个 AI 超级助理框架，可以帮助你构建个人 AI 助手。

## 前置条件

- Mac mini (Apple M4) 或类似设备
- Node.js >= 22
- Git
- 代理（访问海外 API）

## 步骤

### Step 1: 专用硬件

为 OpenClaw 专门购买一台 Mac mini：

| 配置 | 信息 |
|------|------|
| 型号 | Mac mini (Apple M4) |
| 芯片 | 10 核（4 性能 + 6 能效） |
| 内存 | 16 GB |
| 存储 | 256 GB SSD |
| 系统 | macOS Sequoia |

### Step 2: 环境准备

#### 2.1 配置代理

```bash
# 在 ~/.zshrc 中添加
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
source ~/.zshrc
```

#### 2.2 安装 Node.js

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
nvm use 22
nvm alias default 22
```

#### 2.3 安装 Homebrew 和 Git

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git
```

### Step 3: 安装 OpenClaw

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw --version
```

### Step 4: 初始化

```bash
openclaw gateway start
openclaw gateway status
```

### Step 5: 配置

#### 5.1 配置 LLM 模型

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "models": {
    "providers": {
      "zai": {
        "baseUrl": "https://open.bigmodel.cn/api/coding/paas/v4",
        "api": "openai-completions",
        "models": [
          { "id": "glm-5", "name": "GLM-5", "contextWindow": 204800 }
        ]
      }
    }
  }
}
```

#### 5.2 配置 Brave Search

在 `~/.openclaw/openclaw.json` 中添加：

```json
{
  "tools": {
    "web": {
      "search": {
        "enabled": true,
        "apiKey": "YOUR_API_KEY"
      }
    }
  }
}
```

#### 5.3 关闭沙箱

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "off"
      }
    }
  }
}
```

#### 5.4 配置 iMessage

创建 OpenClaw.app wrapper 并授予 FDA 权限。详见配置向导：

```bash
openclaw onboard
```

## 验证

```bash
openclaw doctor
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| iMessage 权限报错 | 创建 OpenClaw.app wrapper 并授予 FDA 权限 |
| API 调用失败 | 检查代理配置是否生效 |
| 模型切换失败 | 检查 models.json 配置格式 |

---

## 参考资料

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
