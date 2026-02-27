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

## 新手推荐的 10 个 Skills

这份名单主打低风险、高实用、立竿见影。技能基本来自靠谱作者，安装量高、star多、恶意报告极少。

> 参考：[最适合新手安装的10个小龙虾 skills](https://mp.weixin.qq.com/s/4lUgy1nW41-6jxoRKdszeQ)

### 推荐列表

| # | Skill | 功能 | 安装量 |
|---|-------|------|--------|
| 1 | **self-improving-agent** | 自我迭代/主动代理，让 Agent 记住错误、自我优化 | 46k+ |
| 2 | **tavily-search** | 联网搜索（Tavily API 优化版），查实时信息 | 37k+ |
| 3 | **gog** | Google Workspace CLI，Gmail/日历/Drive/Docs 全家桶 | 46k+ |
| 4 | **github** | GitHub 集成（用 gh CLI），搜代码/管 issue/PR | 35k+ |
| 5 | **summarize** | 总结 URL、PDF、图片、YouTube、音频 | 36k+ |
| 6 | **find-skills** | 让 Agent 自己去 ClawHub 搜并推荐技能 | 社区推荐 |
| 7 | **ontology** | 结构化记忆/知识图谱，让 Agent 真正"记住你" | 35k+ |
| 8 | **weather** | 查天气，无需 API key，零配置 | 29k+ |
| 9 | **proactive-agent** | 增加主动性，自己规划、迭代任务 | 社区推荐 |
| 10 | **skill-vetter** | 安装前扫描技能代码、防恶意 | 安全必备 |

### 安装命令

```bash
# 推荐安装顺序（安全优先）
clawhub install skill-vetter        # 1. 安全扫描，先装这个
clawhub install find-skills         # 2. 自动发现技能
clawhub install tavily-search       # 3. 联网搜索
clawhub install self-improving-agent # 4. 自我迭代
clawhub install proactive-agent     # 5. 主动性
clawhub install ontology            # 6. 记忆系统

# 其他实用技能
clawhub install gog                 # Google Workspace
clawhub install github              # GitHub 集成
clawhub install summarize           # 内容总结
clawhub install weather             # 天气查询
```

### 安装位置

- **新安装的 skills**：`~/.openclaw/workspace/skills/`
- **系统自带的 skills**：`~/.nvm/.../openclaw/skills/`

### 注意事项

- ClawHub API 有**速率限制**，连续安装时会触发限流
- 解决方法：在命令之间加 `sleep 5-15` 秒延迟
- 示例：`sleep 10 && clawhub install <skill-name>`

---

## 参考链接

- [ClawHub 官网](https://clawhub.com)
- [最适合新手安装的10个小龙虾 skills](https://mp.weixin.qq.com/s/4lUgy1nW41-6jxoRKdszeQ)

---

*记录时间：2026-02-27*
