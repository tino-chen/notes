---
type: guide
title: Claude Code 安装配置
tags: [claude, code, installation, setup, glm]
---

# Claude Code 安装配置

Claude Code 是 Anthropic 官方推出的 AI 编程助手。通过接入智谱 GLM Coding Plan，可以更低成本使用。

---

## 概述

Claude Code 可在终端中运行，支持代码生成、补全、调试等功能。配合智谱 GLM 模型，性价比高。

## 前置条件

- Node.js >= 18
- 智谱 API Key
- 代理（访问海外 API）

## 步骤

### Step 1: 安装

```bash
# 一键安装
curl -fsSL https://claude.ai/install.sh | bash

# 添加到 PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 验证
claude --version
```

或使用 Homebrew：

```bash
brew install --cask claude-code
```

### Step 2: 配置智谱 GLM

#### 方式一：自动化脚本（推荐）

```bash
curl -O "https://cdn.bigmodel.cn/install/claude_code_env.sh" && bash ./claude_code_env.sh
```

#### 方式二：手动配置

1. 获取 API Key：访问[智谱开放平台](https://open.bigmodel.cn)

2. 配置 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  }
}
```

3. 跳过引导：创建 `~/.claude.json`：

```json
{
  "hasCompletedOnboarding": true
}
```

### Step 3: 模型配置

GLM 模型对应关系：

| Claude Code 变量 | 默认 GLM 模型 |
|------------------|---------------|
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | GLM-4.7 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | GLM-4.7 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | GLM-4.5-Air |

使用 GLM-5（在 settings.json 中添加）：

```json
{
  "env": {
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5"
  }
}
```

> 注意：GLM-5 高峰期（14:00～18:00）费用较高，建议复杂任务用 GLM-5，普通任务用 GLM-4.7。

### Step 4: 使用

```bash
# 交互模式
cd your-project
claude

# 单次提问
claude -p "你的问题"

# 查看状态
/status
```

## 常用命令

```bash
claude --version      # 查看版本
claude --help         # 查看帮助
claude update         # 手动更新
claude doctor         # 诊断检查
claude -p "question"  # 单次提问
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 配置不生效 | 关闭终端重新打开，检查 JSON 格式 |
| 权限问题 | 使用 nvm 安装 Node.js |
| 网络问题 | 配置代理 `export HTTPS_PROXY=http://127.0.0.1:7890` |

---

## 参考资料

- [Claude Code 官方文档](https://code.claude.com/docs)
- [智谱 GLM Coding Plan](https://docs.bigmodel.cn/cn/coding-plan/tool/claude)
- [智谱 API Keys](https://bigmodel.cn/usercenter/proj-mgmt/apikeys)
