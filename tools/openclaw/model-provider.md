# 供应商和模型切换指南

本文档介绍如何在 OpenClaw 中切换模型供应商和模型。

---

## 第一步：切换/添加供应商

### 方法 A：使用 onboard 向导（推荐新手）

```bash
openclaw onboard
```

然后按提示选择供应商并输入 API Key。

### 方法 B：非交互式添加供应商

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

### 方法 C：使用 models auth 登录

```bash
# 查看可用供应商插件
openclaw plugins list

# OAuth 登录（如支持）
openclaw models auth login --provider anthropic

# 粘贴 API Token
openclaw models auth paste-token
```

### 方法 D：手动编辑配置文件

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

---

## 第二步：切换模型

### 方法 A：命令行切换

```bash
# 查看当前状态
openclaw models status

# 列出可用模型
openclaw models list

# 切换到 Claude
openclaw models set anthropic/claude-opus-4-6

# 切换到 GPT-4o
openclaw models set openai/gpt-4o

# 切换到 GLM-5
openclaw models set zai/glm-5
```

### 方法 B：配置文件

编辑配置，设置默认模型：

```json5
{
  agents: { 
    defaults: { 
      model: { primary: "anthropic/claude-opus-4-6" } 
    } 
  }
}
```

### 方法 C：对话中切换

在对话中发送：
```
/model anthropic/claude-opus-4-6
```

---

## 常用供应商配置示例

| 供应商 | Provider ID | 模型示例 |
|--------|-------------|----------|
| Anthropic | `anthropic` | `anthropic/claude-opus-4-6` |
| OpenAI | `openai` | `openai/gpt-4o` |
| Z.AI (GLM) | `zai` | `zai/glm-5` |
| OpenRouter | `openrouter` | `openrouter/anthropic/claude-opus-4` |
| Mistral | `mistral` | `mistral/mistral-large` |
| Ollama (本地) | `ollama` | `ollama/llama3` |

---

## 查看当前配置

```bash
# 查看模型状态和认证信息
openclaw models status

# 查看认证配置
cat ~/.openclaw/agents/main/agent/models.json

# 查看 OpenClaw 状态
openclaw status
```

---

## 常用命令速查

| 命令 | 说明 |
|------|------|
| `openclaw models status` | 查看当前模型状态 |
| `openclaw models list` | 列出所有可用模型 |
| `openclaw models set <model>` | 设置默认模型 |
| `openclaw models scan` | 扫描可用模型 |
| `openclaw models auth login --provider <id>` | 登录供应商 |
| `openclaw onboard` | 交互式配置向导 |

---

*参考来源：OpenClaw 官方文档*
*记录时间：2026-02-27*
