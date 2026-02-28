# Tino's Notes

Ty Chen 的结构化知识库，用于沉淀与 AI 协作中产生的可复用知识。

---

## 目录结构

```
notes/
├── agent/           # Agent 相关：架构、框架、设计模式等
├── llm/            # LLM 相关：训练、推理、提示工程等
├── tool/           # 工具使用：AI 助手、编程工具等
│   ├── ai-assistant/
│   │   ├── openclaw-setup.md
│   │   ├── openclaw-usage.md
│   │   ├── model-provider.md
│   │   └── clawhub.md
│   └── ai-coding/
│       └── claude-code-setup.md
└── project/        # 项目相关知识
```

## 导航顺序

1. **Agent** — Agent 范式、RAG、Memory、Context 等
2. **LLM** — 预训练、后训练、评测等
3. **Tool** — AI 助手、AI 编程工具等
4. **Project** — 项目笔记

---

## 文档规范

### 命名规范

| 元素 | 风格 | 示例 |
|------|------|------|
| 一级文件夹 | kebab-case | `tool/` |
| 二级文件夹 | kebab-case | `ai-assistant/` |
| 文档名 | kebab-case | `openclaw-setup.md` |
| 导航名称 | Title Case | "AI Assistant" |
| 分组名称 | Title Case | "AI Assistant" |

### 文档类型

| 类型 | 说明 |
|------|------|
| knowledge | 知识：概念解析、原理说明 |
| guide | 教程：步骤指南 |
| experience | 经验：最佳实践、踩坑记录 |

### Frontmatter

```yaml
---
type: guide | knowledge | experience
title: 标题
tags: [tag1, tag2]
---
```

---

*最后更新：2026-02-28*
