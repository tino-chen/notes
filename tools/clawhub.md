# ClawHub 使用指南

**ClawHub** 是一个 Agent Skills 的分享平台，可以搜索、安装、更新和发布技能包。

- 官网：https://clawhub.com
- 安装：`npm i -g clawhub`

---

## 常用命令

### 🔍 搜索技能

```bash
clawhub search "postgres backups"
```

### 📥 安装技能

```bash
# 安装最新版
clawhub install my-skill

# 安装指定版本
clawhub install my-skill --version 1.2.3
```

### 📋 查看已安装

```bash
clawhub list
```

### 🔄 更新技能

```bash
# 更新单个
clawhub update my-skill

# 更新指定版本
clawhub update my-skill --version 1.2.3

# 更新全部
clawhub update --all

# 强制更新
clawhub update my-skill --force
```

### 📤 发布技能

```bash
# 先登录
clawhub login
clawhub whoami

# 发布
clawhub publish ./my-skill \
  --slug my-skill \
  --name "My Skill" \
  --version 1.2.0 \
  --changelog "Fixes + docs"
```

---

## 配置项

| 环境变量 | 说明 |
|---------|------|
| `CLAWHUB_REGISTRY` | 自定义仓库地址（默认 clawhub.com） |
| `CLAWHUB_WORKDIR` | 工作目录（默认当前目录） |
| `--dir` | 指定安装目录（默认 ./skills） |
| `--workdir` | 指定工作目录 |

---

## 技能开发

技能包结构：

```
my-skill/
├── SKILL.md          # 技能说明文档
├── scripts/          # 脚本文件
├── references/       # 参考文档
└── assets/           # 资源文件
```

发布前确保：
1. `SKILL.md` 包含完整的使用说明
2. 版本号符合语义化版本规范
3. 编写清晰的 changelog

---

*记录时间：2026-02-27*
