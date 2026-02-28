---
type: guide
title: 供应商和模型切换指南
tags: [openclaw, model, provider, llm]
---

# 供应商和模型切换指南

本文档介绍如何在 OpenClaw 中切换模型供应商和模型。

---

## 概述

OpenClaw 支持多种 LLM 供应商，需要了解如何添加供应商和切换模型。

## 前置条件

- 已安装 OpenClaw
- 拥有供应商的 API Key

## 步骤

### Step 1: 切换/添加供应商

#### 方法 A：使用 onboard 向导（推荐）

```bash
openclaw onboard
```

#### 方法 B：非交互式添加

**添加 Anthropic：**
```bash
openclaw onboard --non-interactive \
  --auth-choice anthropic-api-key \
  --anthropic-api-key "sk-ant-your-key"
```

**添加 OpenAI：**
```bash
openclaw onboard --non-interactive \
  --auth-choice openai-api-key \
  --openai-api-key "sk-your-key"
```

**添加 Z.AI（GLM）：**
```bash
openclaw onboard --non-interactive \
  --auth-choice zai-api-key \
  --zai-api-key "your-zai-key"
```

**添加自定义供应商：**
```bash
openclaw onboard --non-interactive \
  --auth-choice custom-api-key \
  --custom-base-url "https://your-llm-endpoint/v1" \
  --custom-model-id "your-model" \
  --custom-api-key "$YOUR_API_KEY" \
  --custom-compatibility openai
```

#### 方法 C：手动编辑配置文件

编辑 `~/.openclaw/agents/main/agent/models.json`：

```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-your-key",
      "models": [
        { "id": "claude-opus-4-6", "name": "Claude Opus 4.6" }
      ]
    },
    "openai": {
      "apiKey": "sk-your-key", 
      "models": [
        { "id": "gpt-4o", "name": "GPT-4o" }
      ]
    },
    "zai": {
      "baseUrl": "https://open.bigmodel.cn/api/coding/paas/v4",
      "apiKey": "your-zai-key",
      "models": [
        { "id": "glm-5", "name": "GLM-5" }
      ]
    }
  }
}
```

### Step 2: 切换模型

#### 方法 A：命令行切换

```bash
# 查看当前状态
openclaw models status

# 列出可用模型
openclaw models list

# 切换到指定模型
openclaw models set anthropic/claude-opus-4-6
openclaw models set openai/gpt-4o
openclaw models set zai/glm-5
```

#### 方法 B：对话中切换

发送：`/model anthropic/claude-opus-4-6`

## 常用供应商

| 供应商 | Provider ID | 模型示例 |
|--------|-------------|----------|
| Anthropic | `anthropic` | `anthropic/claude-opus-4-6` |
| OpenAI | `openai` | `openai/gpt-4o` |
| Z.AI (GLM) | `zai` | `zai/glm-5` |
| OpenRouter | `openrouter` | `openrouter/anthropic/claude-opus-4` |
| Ollama (本地) | `ollama` | `ollama/llama3` |

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `openclaw models status` | 查看当前模型状态 |
| `openclaw models list` | 列出所有可用模型 |
| `openclaw models set <model>` | 设置默认模型 |
| `openclaw models auth login --provider <id>` | 登录供应商 |
| `openclaw onboard` | 交互式配置向导 |

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 模型切换不生效 | 检查 models.json 格式 |
| API 调用失败 | 检查 API Key 和代理配置 |
| 供应商不支持 | 检查是否在支持列表中 |

---

## 参考资料

- [OpenClaw 官方文档](https://docs.openclaw.ai)
