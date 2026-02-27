# OpenClaw 安装、配置与使用指南

> 本指南记录我如何从零开始搭建一个个性化的 AI 助理（Pi Agent）。

---

## 一、准备

### 1. 专用硬件

为 OpenClaw 专门购买了一台 Mac mini 作为专用运行机器：

| 配置 | 信息 |
|------|------|
| 型号 | Mac mini (Apple M4) |
| 芯片 | 10 核（4 性能 + 6 能效） |
| 内存 | 16 GB |
| 存储 | 256 GB SSD |
| 系统 | macOS Sequoia |

> **为什么专用机器？** 让 OpenClaw 拥有独立、稳定的运行环境，24/7 在线，随时响应。

### 2. 专用账号

为 OpenClaw 申请了独立的账号，便于管理和区分身份：

- **Gmail 邮箱**：用于注册各种服务
- **Apple ID**：用于 iMessage 通信

### 3. 环境准备

在安装 OpenClaw 之前，确保系统具备以下基础环境：

#### 3.1 终端代理环境（中国大陆必需）

由于 OpenClaw 需要访问海外 API（如 Brave Search、LLM 服务），在中国大陆需要配置代理：

```bash
# 在 ~/.zshrc 或 ~/.bashrc 中添加
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
export ALL_PROXY=socks5://127.0.0.1:7890

# 生效
source ~/.zshrc
```

> **提示**：端口号根据你的代理软件配置调整（Clash 默认 7890）

#### 3.2 Node.js >= 22

推荐使用 nvm 管理 Node 版本：

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 重新加载终端后安装 Node 22
nvm install 22
nvm use 22
nvm alias default 22

# 验证
node -v  # 应显示 v22.x.x
```

#### 3.3 Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 3.4 Git

```bash
brew install git

# 配置 Git 身份
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## 二、安装

### 1. 一键安装

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

安装完成后，OpenClaw CLI 会自动添加到 PATH。

### 2. 验证安装

```bash
openclaw --version
openclaw status
```

### 3. 初始化工作空间

```bash
# 启动 Gateway 服务（核心守护进程）
openclaw gateway start

# 查看服务状态
openclaw gateway status
```

### 4. 配置文件位置

| 文件 | 用途 |
|------|------|
| `~/.openclaw/workspace/` | 工作空间根目录 |
| `~/.openclaw/workspace/IDENTITY.md` | Agent 身份定义（名字、性格、头像） |
| `~/.openclaw/workspace/SOUL.md` | Agent 人格模板（通常不改） |
| `~/.openclaw/workspace/USER.md` | 用户信息 |
| `~/.openclaw/workspace/MEMORY.md` | 长期记忆 |
| `~/.openclaw/workspace/AGENTS.md` | 工作空间规则 |
| `~/.openclaw/workspace/HEARTBEAT.md` | 定时检查任务 |
| `~/.openclaw/openclaw.json` | 全局配置（API Keys、代理、模型等） |

---

## 三、配置

### 1. 配置 LLM 模型

OpenClaw 支持多种 LLM 后端。通过 `openclaw configure` 向导配置，或直接编辑 `~/.openclaw/openclaw.json`：

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
  },
  "agents": {
    "defaults": {
      "model": { "primary": "zai/glm-5" }
    }
  }
}
```

### 2. 配置网络搜索（Brave Search API）

#### 步骤 1：获取 API Key

1. 访问 [Brave Search API Dashboard](https://api-dashboard.search.brave.com/)
2. 订阅计划（有免费额度）
3. 创建 API Key

#### 步骤 2：配置 API Key

在 `~/.openclaw/openclaw.json` 中：

```json
{
  "tools": {
    "web": {
      "search": {
        "enabled": true,
        "apiKey": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

#### 步骤 3：配置代理（中国大陆必需）

在 `~/.openclaw/openclaw.json` 中配置环境变量：

```json
{
  "env": {
    "vars": {
      "HTTPS_PROXY": "http://127.0.0.1:7890"
    }
  }
}
```

#### 步骤 4：重启 Gateway

```bash
openclaw gateway restart
```

### 3. 关闭沙箱

由于我是为 OpenClaw 专门购买了一台 Mac mini，因此选择关闭沙箱，让 OpenClaw 自由使用整个电脑：

在 `~/.openclaw/openclaw.json` 中：

```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "off",
        "perSession": false
      }
    }
  }
}
```

> **注意**：关闭沙箱意味着 OpenClaw 可以执行任意命令。请确保你信任这个环境。

### 4. 配置 iMessage 通信

#### 问题背景

iMessage 功能报错 `permissionDenied on chat.db`。原因是 macOS 的 Full Disk Access (FDA) 权限只能授予 `.app` 应用包，无法直接授予原始的二进制文件（如 Node.js）。

#### 解决方案：创建 wrapper .app bundle

**步骤 1：创建 OpenClaw.app 应用包**

```bash
# 创建目录结构
mkdir -p /Applications/OpenClaw.app/Contents/MacOS
mkdir -p /Applications/OpenClaw.app/Contents/Resources

# 创建 Info.plist
cat > /Applications/OpenClaw.app/Contents/Info.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>OpenClaw</string>
    <key>CFBundleIdentifier</key>
    <string>ai.openclaw.gateway</string>
    <key>CFBundleName</key>
    <string>OpenClaw</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>LSUIElement</key>
    <true/>
</dict>
</plist>
EOF

# 创建可执行脚本（根据你的 Node 安装路径调整）
cat > /Applications/OpenClaw.app/Contents/MacOS/OpenClaw << 'EOF'
#!/usr/bin/env arch -arm64 /bin/bash
exec /opt/homebrew/bin/node /opt/homebrew/lib/node_modules/openclaw/openclaw.mjs "$@"
EOF

chmod +x /Applications/OpenClaw.app/Contents/MacOS/OpenClaw

# 签名并清除隔离属性
codesign --force --deep --sign - /Applications/OpenClaw.app
xattr -cr /Applications/OpenClaw.app
```

> **注意**：如果你用 nvm 安装 Node，需要把路径改为 nvm 的 node 路径。

**步骤 2：授予 FDA 权限**

打开 **系统设置 → 隐私与安全性 → 完全磁盘访问**，添加以下两个：

1. `/Applications/OpenClaw.app`
2. `/opt/homebrew/bin/node`（或你的 node 路径）

**步骤 3：更新 launchd 配置**

编辑 `~/Library/LaunchAgents/ai.openclaw.gateway.plist`，将 `ProgramArguments` 指向新的 wrapper：

```xml
<key>ProgramArguments</key>
<array>
    <string>/Applications/OpenClaw.app/Contents/MacOS/OpenClaw</string>
    <string>gateway</string>
    <string>--port</string>
    <string>18789</string>
</array>
```

**步骤 4：重新加载服务**

```bash
launchctl unload ~/Library/LaunchAgents/ai.openclaw.gateway.plist
launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

**步骤 5：验证**

```bash
openclaw doctor
```

应该显示 `iMessage: ok`

> **参考**：[GitHub Issue #5211](https://github.com/openclaw/openclaw/issues/5211)

---

