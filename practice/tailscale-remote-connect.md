---
type: guide
title: Tailscale - 如何远程连接 Mac Mini
tags: [Tailscale, Mac Mini, 远程连接, 内网穿透]
---

# Tailscale - 如何远程连接 Mac Mini ?

## 背景

把 Mac Mini 当做服务器使用时，Mac Mini 没有专属的公网 IP，如何远程连接呢？

## 解决方案

使用 **Tailscale**，核心原理是为使用同一账号登录 Tailscale 的机器构建一个**虚拟局域网**。

## 什么是 Tailscale？

Tailscale 是一款基于 WireGuard 协议的虚拟组网工具，它能够：

- 在不同设备之间建立安全的点对点（P2P）连接
- 无需公网 IP，无需配置路由器
- 像在同一个局域网内一样访问所有设备

### 核心特性

| 特性 | 说明 |
|------|------|
| P2P 直连 | 设备间直接通信，无需中转 |
| 端到端加密 | 基于 WireGuard，默认加密 |
| 跨平台 | 支持 macOS、Windows、Linux、iOS、Android |
| 简单易用 | 安装即用，无需复杂配置 |

### 工作原理

#### 1. WireGuard 协议

Tailscale 基于 **WireGuard** 协议，这是一个现代化的 VPN 协议：
- 比 OpenVPN、IPSec 更轻量、更快
- 使用 Curve25519 进行密钥交换
- ChaCha20-Poly1305 进行数据加密

#### 2. NAT 穿透

Tailscale 能够自动穿透 NAT 和防火墙：

1. **STUN** - 发现设备的公网 IP 和端口
2. **ICE** - 尝试多种连接方式（P2P、中继）
3. **DERP** - 当 P2P 失败时，使用中继服务器

#### 3. DERP 中继

当两台设备无法直接连接时，Tailscale 会使用 **DERP**（Dummy Relative Elective Relay Protocol）服务器进行中继：

- Tailscale 官方提供全球分布的 DERP 节点
- 中国大陆附近有：东京、新加坡、香港节点

## 如何使用？

### 1. 安装

```bash
# macOS
brew install tailscale

# Linux
curl -fsSL https://tailscale.com/install.sh | sh
```

### 2. 登录

```bash
tailscale up
```

会打开浏览器进行身份验证，可使用 Google 或 Microsoft 等账号登录。

### 3. 查看状态

```bash
tailscale status
```

输出示例：
```
100.74.218.63  tinosmini  tino.ai.chen@  macOS
100.65.83.62   tysbook    tino.ai.chen@  macOS
```

### 4. 常用命令

| 命令 | 说明 |
|------|------|
| `tailscale up` | 启动 Tailscale |
| `tailscale down` | 停止 Tailscale |
| `tailscale status` | 查看连接状态 |
| `tailscale logout` | 退出登录 |
| `tailscale ip` | 查看分配的 IP |

### 5. 连接其他设备

在同一账号下，所有设备会自动互联。直接使用 Tailscale 分配的 IP 访问：

```bash
# SSH 到其他设备
ssh user@100.74.218.63

# 访问其他设备的端口
curl http://100.74.218.63:8080
```

### 6. 作为出口节点

可以让其他设备通过你的设备上网：

```bash
# 将当前设备设置为出口节点
tailscale up --exit-node

# 使用指定设备作为出口节点
tailscale up --exit-node=100.74.218.63
```

## 常见问题

### Q: 为什么连接很慢？

可能是 P2P 直连失败，走了中继服务器。可以运行：

```bash
tailscale status
```

查看 `Relay` 列：
- `-` = 直连
- `tok`、`sin` 等 = 中继

### Q: 如何强制使用直连？

```bash
tailscale set --derp-force=false
```

注意：如果无法直连，会断连。

### Q: 版本不匹配怎么办？

```bash
brew upgrade tailscale
```

或重新安装：
```bash
brew reinstall tailscale
```

## 参考资料

- [Tailscale 官网](https://tailscale.com/)
- [WireGuard 官网](https://www.wireguard.com/)
- [Tailscale 文档](https://tailscale.com/kb/)
