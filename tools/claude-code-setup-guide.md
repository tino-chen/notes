# Claude Code 安装与配置指南

> Claude Code 是 Anthropic 官方推出的 AI 编程助手，可在终端中运行。通过接入智谱 GLM Coding Plan，可以更低成本使用。

---

## 一、安装

### 1. 一键安装（推荐）

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

安装完成后，Claude Code 会安装到 `~/.local/bin/claude`。

### 2. 添加到 PATH

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 3. 验证安装

```bash
claude --version
```

### 4. 其他安装方式

**Homebrew**：
```bash
brew install --cask claude-code
```

> **注意**：Homebrew 安装不会自动更新，需手动运行 `brew upgrade claude-code`。

---

## 二、配置智谱 GLM

### 方式一：自动化脚本（推荐）

```bash
curl -O "https://cdn.bigmodel.cn/install/claude_code_env.sh" && bash ./claude_code_env.sh
```

脚本会引导你输入智谱 API Key，并自动配置。

### 方式二：手动配置

#### 1. 获取 API Key

1. 访问 [智谱开放平台](https://open.bigmodel.cn)
2. 进入 [API Keys](https://bigmodel.cn/usercenter/proj-mgmt/apikeys)
3. 创建新的 API Key

#### 2. 配置 settings.json

创建或编辑 `~/.claude/settings.json`：

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

#### 3. 跳过引导

创建或编辑 `~/.claude.json`：

```json
{
  "hasCompletedOnboarding": true
}
```

---

## 三、模型配置

Claude Code 内部模型环境变量与 GLM 模型对应关系：

| Claude Code 变量 | 默认 GLM 模型 |
|------------------|---------------|
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | GLM-4.7 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | GLM-4.7 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | GLM-4.5-Air |

### 使用 GLM-5

GLM-5 参数量更大，对标 Claude Opus。在 `~/.claude/settings.json` 中添加：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5"
  }
}
```

> **注意**：GLM-5 调用时用量按照"高峰期 3 倍，非高峰期 2 倍"计算。推荐复杂任务用 GLM-5，普通任务用 GLM-4.7。
>
> 高峰期：每日 14:00～18:00 (UTC+8)

---

## 四、使用方式

### 交互模式

```bash
# 进入项目目录
cd your-project

# 启动 Claude Code
claude
```

### 单次提问

```bash
claude -p "你的问题"
```

### 查看状态

在 Claude Code 中输入：
```
/status
```

---

## 五、常用命令

```bash
claude --version      # 查看版本
claude --help         # 查看帮助
claude update         # 手动更新
claude doctor         # 诊断检查
claude -p "question"  # 单次提问
```

---

## 六、配置文件位置

| 文件 | 位置 | 用途 |
|------|------|------|
| settings.json | `~/.claude/settings.json` | 环境变量、模型配置 |
| .claude.json | `~/.claude.json` | 用户状态、引导完成标记 |
| .mcp.json | 项目目录 | MCP 服务器配置 |

---

## 七、常见问题

### 1. 配置不生效

- 关闭所有终端窗口，重新打开
- 检查 JSON 格式是否正确（逗号、引号）
- 删除 `~/.claude/settings.json` 后重新配置

### 2. 权限问题（macOS）

如果遇到权限问题，确保使用 nvm 安装 Node.js，而非直接安装包。

### 3. 网络问题（中国大陆）

确保配置了代理：
```bash
export HTTPS_PROXY=http://127.0.0.1:7890
```

---

## 八、参考链接

| 资源 | 链接 |
|------|------|
| Claude Code 官方文档 | https://code.claude.com/docs |
| 智谱 GLM Coding Plan | https://docs.bigmodel.cn/cn/coding-plan/tool/claude |
| 智谱 API Keys | https://bigmodel.cn/usercenter/proj-mgmt/apikeys |
| npm 包 | https://www.npmjs.com/package/@anthropic-ai/claude-code |

---

*最后更新：2026-02-24*
*作者：Ty Chen*
