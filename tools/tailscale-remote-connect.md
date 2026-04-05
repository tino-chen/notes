---
type: experience
title: Tailscale — 远程连接 Mac Mini
tags: [Tailscale, VPN, Mac Mini, 远程访问]
---

# Tailscale — 远程连接 Mac Mini

## 背景

Mac Mini 放在家里，需要随时随地远程访问。传统方案（公网 IP + 端口转发、frp 内网穿透）配置复杂且有安全风险。Tailscale 基于 WireGuard，零配置组网，开箱即用。

## 核心步骤

### 1. 安装与注册

```bash
brew install --cask tailscale
sudo tailscale up
```

浏览器打开登录链接，用 GitHub/Google 账号认证即可。

### 2. 设备互联

在所有需要访问 Mac Mini 的设备上安装 Tailscale 并登录同一账号，设备自动组网。

| 设备 | 系统 | 用途 |
|------|------|------|
| tinosmini | macOS | 被访问目标 |
| MacBook | macOS | 日常访问 |
| iPhone | iOS | 移动访问 |

### 3. 远程访问

安装完成后，通过 Tailscale 分配的 IP（100.x.x.x）直接 SSH：

```bash
ssh tino@100.x.x.x
```

## 注意事项

- Mac Mini 休眠后 Tailscale 会断连，需在「系统设置 → 节能」中禁用自动休眠，或设置 Power Nap 保持网络连接
- 首次 SSH 连接需要在 Mac Mini 本机开启「远程登录」（系统设置 → 通用 → 共享 → 远程登录）

## 参考资料

- [Tailscale 官网](https://tailscale.com)
- [Tailscale macOS 安装文档](https://tailscale.com/kb/1062/macos)
