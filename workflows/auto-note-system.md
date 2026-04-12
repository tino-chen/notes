---
type: guide
title: 自动笔记撰写与发布系统
tags: [OpenClaw, Cron, VitePress, 自动化, 笔记]
---

# 自动笔记撰写与发布系统

## 这是什么

基于 [OpenClaw](https://docs.openclaw.ai) Agent 平台搭建的全自动笔记系统：AI 在凌晨自动回顾当天的工作内容，识别值得沉淀的经验，撰写草稿、审核质量、构建发布、推送到 GitHub Pages。

核心挑战不是"写笔记"，而是**质量把控**——AI 写的笔记容易变成流水账、用错语言、重复已有内容，必须用严格的流程和多级审核来保证每篇笔记都有阅读价值。

## 最终效果

- 每天凌晨 2:00 自动撰写笔记草稿，2:30 自动审核并发布
- 笔记质量经过内容准确性、信息泄露、可复现性、表达质量四维审核
- 发布后自动构建 VitePress 站点并推送到 GitHub Pages
- 有重要发布时通过飞书通知

## 整体架构

```
02:00  草稿撰写（isolated session）
       └─ 回顾每日记忆 → 识别价值点 → 撰写草稿 → 保存到 _drafts/

02:30  审核发布（isolated session）
       └─ 审核草稿 → 修正问题 → 移入分类目录 → 更新配置 → 构建 → 推送 → 通知
```

### 为什么拆成两步？

1. **角色分离**：撰写和审核需要完全不同的心态——撰写要发散，审核要收敛
2. **质量保障**：审核任务独立运行，不受撰写过程中的上下文干扰
3. **容错**：草稿写得不好不会直接发布，审核可以修正或丢弃

### 技术栈

| 组件 | 技术 | 说明 |
|------|------|------|
| 笔记站框架 | VitePress | 本地构建，部署到 GitHub Pages |
| 代码托管 | GitHub | tino-chen/notes 仓库 |
| 定时任务 | OpenClaw Cron | isolated session，互不干扰 |
| 写作规范 | note-taking + workflow-note 技能 | 全局规范 + 分类模板 |
| 通知 | 飞书（OpenClaw announce） | 有发布时推送通知 |

## 实操步骤

### 第一步：搭建 VitePress 笔记站

```bash
# 创建项目
mkdir notes && cd notes
npm init -y
npm install -D vitepress

# 创建目录结构
mkdir -p workflows tools public _drafts
```

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```

创建 VitePress 配置 `.vitepress/config.ts`：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tino's Notes",
  description: 'AI 协作实践笔记',
  base: '/notes/',
  cleanUrls: false,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '流程构建', link: '/workflows/' },
      { text: '工具推荐', link: '/tools/' },
    ],

    sidebar: {
      '/workflows/': [{
        text: '流程构建',
        items: [
          // 笔记发布后在这里添加条目
          // text 必须与笔记 H1 标题完全一致
        ]
      }],
      '/tools/': [{
        text: '工具推荐',
        items: [
          // 同上
        ]
      }],
    },

    outline: { level: [1, 3], label: '目录' },
    search: { provider: 'local' },
  },
})
```

创建首页 `index.md`：

```markdown
---
layout: home
hero:
  name: "Tino's Notes"
  text: "AI 协作实践笔记"
  tagline: 记录使用 AI 应用和工具的真实经验与最佳实践
  actions:
    - theme: brand
      text: 开始阅读
      link: /workflows/
    - theme: alt
      text: GitHub
      link: https://github.com/tino-chen/notes
features:
  - icon: ⚙️
    title: 流程构建
    details: 用 AI 搭建自动化流程的实战经验与架构设计
    link: /workflows/
  - icon: 🔧
    title: 工具推荐
    details: 好用高效的工具推荐与配置指南
    link: /tools/
---
```

### 第二步：配置 Git 和 GitHub Pages

```bash
cd notes
git init
echo "_drafts/" >> .gitignore
git add -A && git commit -m "init: VitePress 笔记站"
```

在 GitHub 创建仓库后：

```bash
git remote add origin https://github.com/<your-name>/notes.git
git push -u origin main
```

在仓库 Settings → Pages 中选择 GitHub Actions，或手动配置：

```yaml
# .github/workflows/deploy.yml
name: Deploy VitePress
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        - run: npm ci
        - run: npm run docs:build
        - uses: peaceiris/actions-gh-pages@v3
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}
            publish_dir: .vitepress/dist
```

### 第三步：安装写作规范技能

```bash
# 全局规范：目录结构、命名、语言、侧边栏
openclaw skills install note-taking

# 分类模板：流程构建类笔记的结构和质量标准
openclaw skills install workflow-note
```

> 技能安装后即可使用。写作时先读 note-taking 确认全局规范，再读 workflow-note 按模板撰写。

### 第四步：创建草稿撰写定时任务

每天 02:00 运行。核心挑战是让 AI 不写流水账——必须在 prompt 中设定严格的价值门槛和红线。

完整 prompt：

```
执行协作回顾与笔记草稿撰写任务：

1. 读取 ~/.openclaw/workspace/memory/ 下最近的每日记忆文件（今天 + 前几天）
2. 回顾协作记录，识别值得沉淀为笔记的价值点。

## 价值判断门槛（必须全部满足，否则不写）

- **有明确的技术主题**：不是「做了某件事」的过程记录，而是从中提炼出可复用的技术方法论、架构思路或踩坑经验
- **有具体案例支撑**：每个结论都有实际发生的事件、数据或代码作为依据，禁止空泛论述
- **对他人有价值**：其他 AI 协作者或开发者看了能学到东西或避免同样的坑
- **不是工作日志**：如果核心内容只是「某月某日做了什么」，那就不是笔记，是日记，不要写

## 去重检查（写之前必须执行）
- 在笔记站目录下搜索已有笔记（排除 _drafts/ 和 node_modules/），确认没有高度重叠的主题
- 如果已有相同主题笔记 → 不写
- 如果主题相似但内容有重大更新（不是换个说法重复）→ 可以作为现有笔记的更新

## 写作红线
- **只写实际发生过的事**：每个方法、工具、流程必须有对应的实践经历支撑，禁止编造
- **禁止编造代码**：没有实际运行过的脚本、命令、配置，不要写进笔记
- **不要写总结板块**：不要在末尾加「总结」「经验教训」「最佳实践」「未来改进」——这些板块几乎必然是对前文的重复
- **有价值的结论融入正文**：如果某个教训值得保留，直接写在对应案例或章节里
- **敏感信息脱敏**：姓名、邮箱、路径等用 xxx 替代，保留上下文可读性

草稿保存到 <笔记站路径>/_drafts/ 目录（目录不存在则创建），文件名格式：YYYY-MM-DD-标题.md。只写草稿，不要构建、不要提交、不要推送。
```

**cron 配置**：

```yaml
name: 笔记草稿撰写
schedule: "0 2 * * *"
timezone: Asia/Shanghai
sessionTarget: isolated
timeout: 300s
delivery:
  mode: none
```

### 第五步：创建审核发布定时任务

每天 02:30 运行。审核是质量把关的关键环节，经历了多次迭代才稳定下来——从最初的 4 项检查扩展到 9 项，每项都是被实际踩过的坑逼出来的。

完整 prompt：

```
执行笔记草稿审核与发布任务：

1. 检查 <笔记站路径>/_drafts/ 目录下是否有待审核的草稿文件
2. 如果没有草稿，安静结束
3. 如果有草稿，逐一审核每篇草稿，检查以下质量标准：

   **去重检查（第一步执行）**：
   - 读取草稿标题和核心主题
   - 在笔记站目录下搜索已有笔记（排除 _drafts/ 和 node_modules/），确认是否已有相同主题的笔记
   - 如果已有高度重叠的笔记 → 删除草稿，跳过后续步骤
   - 如果主题相似但侧重点不同 → 可以共存，但在笔记中注明与另一篇的关系

   **流水账检测（重要）**：
   - 笔记的核心内容是否只是「某月某日做了什么」的过程记录？
   - 如果去掉时间线后内容没有独立价值（没有可复用的方法论、架构思路、踩坑经验），则视为流水账，删除草稿
   - 判断标准：一个不认识这个项目的人看了能学到什么？如果答案是「没什么」，就删

   **结构合规检查（根据分类读取对应技能模板）**：
   - 根据草稿的目标分类目录，读取对应的写作规范技能：
     - workflows/ → 读取 workflow-note 技能
     - 其他分类 → 读取 note-taking 技能
   - 对照技能模板的「文章结构模板」，逐项检查草稿是否包含所有必须板块
   - 如果缺少必须板块 → 补充（不能只删掉模板要求的板块）

   **内容准确性**：
   - 技术细节是否正确（命令、路径、配置名称等）
   - 引用的链接和仓库是否存在且可访问

   **防虚构检查（重要）**：
   - 文中提到的每个方法、工具、脚本、流程、配置，是否都有对应的实践案例支撑？
   - 没有案例/踩坑记录支撑的描述视为虚构内容，删除
   - 禁止编造代码块、命令、配置——如果作者没有实际运行过，就不该出现在笔记里

   **防冗余检查（重要）**：
   - 笔记末尾的板块（如「总结」「经验教训」「最佳实践」「未来改进」）是否对前文内容进行了实质性重复？
   - 如果只是把前文内容换个说法再说一遍，且没有引入任何新信息，整段删除

   **信息泄露检查**：
   - 是否出现真实姓名、邮箱、内部路径等敏感信息？
   - 命中任何一条 → 脱敏处理（用 xxx 替代，保留上下文可读性）

   **可复现性**：
   - 读者看到后能否复现？步骤是否完整？
   - 是否有缺失的前提条件（依赖、账号、配置等）

   **表达质量**：
   - 逻辑是否清晰，结构是否合理
   - 语言是否简洁，有无废话

4. 发现问题 → 直接修改草稿文件，修正所有问题
5. 审核修改完成、质量达标后：
   a. 将草稿从 _drafts/ 移动到对应分类目录
   b. 更新 .vitepress/config.ts 的 sidebar 配置
   c. 运行 npm run docs:build
   d. 运行 git add -A && git commit -m '笔记: [标题]' && git push
   e. 输出简要通知：发布了什么笔记及链接
```

**cron 配置**：

```yaml
name: 笔记审核与发布
schedule: "30 2 * * *"
timezone: Asia/Shanghai
sessionTarget: isolated
timeout: 300s
delivery:
  mode: announce
  channel: feishu
  to: <你的飞书用户ID>
```

### 第六步：在 AGENTS.md 中固化写作规范

在 AGENTS.md 中加入笔记章节，确保每次会话都能读到：

```markdown
## 笔记

写笔记不是随手写的，有严格的流程：

1. **先读 note-taking SKILL.md** — 语言、格式、结构要求
2. **先查重** — 搜索已有笔记目录，同主题不重复创建
3. **先想主题** — 笔记必须有提炼过的技术主题，不是按时间堆砌做了什么
4. **按模板写** — frontmatter + H1 标题 + 正文 + 参考资料

违反任何一条 = 废稿。
```

## 目录结构

最终的项目结构：

```
notes/
├── .vitepress/config.ts       # VitePress 配置（导航、侧边栏）
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
├── .gitignore                  # 忽略 _drafts/ 和 node_modules/
├── index.md                    # 首页
├── package.json
├── public/                     # 静态资源（图片等）
├── _drafts/                    # 草稿目录（不提交到 Git）
├── workflows/                  # 流程构建类笔记
│   ├── index.md
│   └── xxx-yyy.md
└── tools/                      # 工具推荐类笔记
    ├── index.md
    └── xxx-yyy.md
```

## 踩坑记录

### 1. 草稿被提交到公开仓库

`_drafts/` 目录没有加入 `.gitignore`，导致未审核的草稿直接推送到 GitHub。草稿可能包含不准确的信息或内部细节，不应该对外公开。

**解决**：在 `.gitignore` 中添加 `_drafts/`。

### 2. AI 写出英文流水账

AI 生成的笔记全是英文、按时间线堆砌"Phase 1/2/3"，没有提炼主题。根本原因是没有在 prompt 中强制要求读写作规范技能。

**解决**：在草稿撰写 prompt 中明确要求先读 note-taking 和 workflow-note 技能，并且在 AGENTS.md 中固化写作规范。

### 3. 审核不通过没有后续闭环

最初设计审核不通过就"打回"，但没有指定谁来改、什么时候改，导致废稿堆积。

**解决**：改为审核任务发现问题后直接修改草稿再发布，不再打回。

### 4. 侧边栏 text 与 H1 标题不一致

VitePress 侧边栏的 `text` 字段必须与笔记的 H1 标题完全一致，否则侧边栏显示正常但链接可能失效。

**解决**：在审核发布 prompt 中明确要求"text 必须与笔记 H1 标题完全一致"。

## 参考资料

- VitePress 文档：https://vitepress.dev
- note-taking 技能：https://github.com/tino-chen/openclaw-skills/tree/main/note-taking
- workflow-note 技能：https://github.com/tino-chen/openclaw-skills/tree/main/workflow-note
- OpenClaw 文档：https://docs.openclaw.ai
