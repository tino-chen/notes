---
type: guide
title: ClawHub 使用指南
tags: [clawhub, skill, openclaw]
---

# ClawHub 使用指南

ClawHub 是 Agent Skills 的分享平台，可以搜索、安装、更新和发布技能包。

---

## 概述

ClawHub 提供了丰富的 Agent Skills，可以扩展 OpenClaw 的能力。

## 前置条件

```bash
npm i -g clawhub
```

## 步骤

### Step 1: 搜索技能

```bash
clawhub search "postgres backups"
```

### Step 2: 安装技能

```bash
# 安装最新版
clawhub install my-skill

# 安装指定版本
clawhub install my-skill --version 1.2.3
```

### Step 3: 查看和管理

```bash
# 查看已安装
clawhub list

# 更新单个
clawhub update my-skill

# 更新全部
clawhub update --all
```

### Step 4: 发布技能

```bash
# 登录
clawhub login
clawhub whoami

# 发布
clawhub publish ./my-skill \
  --slug my-skill \
  --name "My Skill" \
  --version 1.2.0 \
  --changelog "Fixes + docs"
```

## 新手推荐技能

| # | Skill | 功能 | 安装量 |
|---|-------|------|--------|
| 1 | self-improving-agent | 自我迭代/主动代理 | 46k+ |
| 2 | tavily-search | 联网搜索 | 37k+ |
| 3 | gog | Google Workspace CLI | 46k+ |
| 4 | github | GitHub 集成 | 35k+ |
| 5 | summarize | 内容总结 | 36k+ |
| 6 | find-skills | 自动发现技能 | 社区推荐 |
| 7 | ontology | 结构化记忆/知识图谱 | 35k+ |
| 8 | weather | 查天气 | 29k+ |
| 9 | proactive-agent | 主动规划任务 | 社区推荐 |
| 10 | skill-vetter | 安装前安全扫描 | 安全必备 |

安装命令：

```bash
clawhub install skill-vetter
clawhub install find-skills
clawhub install tavily-search
clawhub install self-improving-agent
clawhub install proactive-agent
clawhub install ontology
```

## 注意事项

- ClawHub API 有速率限制，连续安装时会触发限流
- 解决方法：在命令之间加延迟
- 安装位置：`~/.openclaw/workspace/skills/`

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 安装被限流 | 在命令之间加 `sleep 5-15` |
| 安装失败 | 检查网络和代理配置 |
| 找不到技能 | 使用 `clawhub search` 搜索 |

---

## 参考资料

- [ClawHub 官网](https://clawhub.com)
- [最适合新手安装的10个小龙虾 skills](https://mp.weixin.qq.com/s/4lUgy1nW41-6jxoRKdszeQ)
