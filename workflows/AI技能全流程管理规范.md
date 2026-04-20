---
type: experience
title: AI技能全流程管理规范
tags: [skill-management, clawhub, publishing, workflow]
---

# AI技能全流程管理规范

## 这是什么

从实践中总结的 AI 技能完整生命周期管理方法论，涵盖开发、元数据规范、发布、安全审查和三端同步的完整工作流。

## 最终效果

- 建立标准化的技能发布流程，确保质量一致性
- 实现本地、GitHub、ClawHub 三端完全同步
- 通过安全审核和元数据强制要求提升技能质量
- 为其他 AI 协作者提供可复制的技能开发模式

## 核心架构

### 元数据强制要求
```yaml
---
name: skill-name                    # 技能 slug（kebab-case）
description: 中文一句话描述       # 必须说明技能用途
repository: GitHub 仓库链接        # 必填，确保溯源
clawhub: ClawHub 发布页链接        # 必填，确保可下载
guide: 笔记站对应文章              # 可选，有对应笔记时必填
---
```

**红线规则**：`repository` + `clawhub` 字段缺失的技能禁止发布

### 三端同步工作流
```
技能开发完成
    │
    ├─ 1. 元数据完整性检查（repository + clawhub + guide）
    ├─ 2. 内容规范检查（路径一致性、外部依赖标注）
    ├─ 3. 安全审核（脚本输入拦截、依赖说明）
    ├─ 4. GitHub 更新（README.md + ClawHub 链接 + 安装命令）
    ├─ 5. GitHub 提交（git push）
    └─ 6. ClawHub 发布（版本递增 + changelog）
```

## 详细规范

### 一、本地技能（SKILL.md 内容规范）

#### 路径一致性规范
- **内部脚本路径**必须与实际目录名完全一致
- **禁止残留旧名称**：重命名时需要同步更新 SKILL.md 中的所有引用
- **验证方法**：检查 SKILL.md 中所有 `path`、`cwd`、`command` 等路径引用

#### 外部依赖标注规范
```markdown
# 内置工具（直接使用）
- 使用 browser 工具进行网页自动化

# 第三方 MCP 工具（需标注来源）
- 使用 zai-mcp-server__extract_text_from_screenshot 工具（智谱 MCP，需配置）
- 未配置时降级行为：提示用户配置或使用基础截图工具

# 重度依赖（必须说明安装步骤）
- Playwright：需单独安装 `npm install -g playwright`
```

#### 格式模板规范
- 示例链接用反引号包裹：`` `[原文](URL)` ``
- 避免被 VitePress 解析导致死链接

### 二、GitHub 仓库规范

#### README.md 格式标准
```markdown
# 技能列表（固定顺序）

- 📝 Note Taking — 笔记创建与管理的规范指南
  - 支持自动笔记分类和结构化存储
  - 内置重复检测和质量管控机制
  - 提供标准化写作模板和参考链接
  - 自动生成 frontmatter 和元数据
  - 支持多种文件格式的笔记模板

- 📋 Workflow Note — 基于工作流的自动化笔记系统
  - 基于工作流驱动的智能笔记生成
  - 支持多步骤任务追踪和状态管理
  - 提供灵活的任务依赖和条件分支
  - 自动生成工作流执行报告
  - 支持自定义工作流模板

# ClawHub 链接格式
- ClawHub：[Note Taking](https://clawhub.com/skills/note-taking)
```

#### 目录命名规范
- 本地：`~/.openclaw/skills/<slug>/`
- GitHub：与本地目录名保持一致
- 重命名时需同步更新所有相关路径

### 三、ClawHub 发布规范

#### 展示名称对照表
| slug | 展示名称 |
|------|----------|
| `note-taking` | Note Taking |
| `workflow-note` | Workflow Note |
| `daily-ai-briefing` | Daily AI Briefing |
| `debunk` | Debunk |

#### 发布命令标准
```bash
clawhub publish \
  ~/.openclaw/skills/<slug> \
  --slug <slug> \
  --name "<Title Case>" \
  --version <x.y.z> \
  --changelog "具体改动描述"
```

### 四、安全规范（脚本类技能）

#### 输入拦截规则
- **URL 拦截**：必须阻止 localhost、内网 IP、.local 域名、非 http 协议
- **示例代码**：
```bash
# 拦截内网访问的脚本示例
if [[ "$url" =~ ^(localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|\.local) ]]; then
    echo "禁止访问内网地址"
    exit 1
fi
```

#### 依赖披露要求
- 重度依赖（如 Playwright）必须在 README.md 或 SKILL.md 中说明安装步骤
- 提供安装命令：`npm install -g playwright`
- 说明版本要求：`Playwright >= 1.40.0`

## 质量检查清单

每次技能更新后，按顺序完成以下检查：

```markdown
### 三端同步检查清单
1. [ ] SKILL.md frontmatter 元数据完整（repository + clawhub + guide）
2. [ ] SKILL.md 内部路径与目录名一致
3. [ ] 外部依赖标注来源和降级方案
4. [ ] GitHub README.md 同步更新（描述 + ClawHub 链接 + 安装命令）
5. [ ] GitHub git push
6. [ ] ClawHub publish 新版本
```

### 质量红线
- ❌ 元数据缺失（repository 或 clawhub 字段为空）
- ❌ 路径引用错误（与实际目录名不一致）
- ❌ 敏感信息未脱敏（真实姓名、邮箱、凭证等）
- ❌ 安全漏洞（脚本无输入拦截）
- ❌ 三端不同步（GitHub 更新未发布到 ClawHub）

## 实战案例

### 案例1：敏感信息泄露事故
**问题**：`workflow-note` 技能发布时包含真实用户身份信息
**原因**：开发过程中残留内部配置，未执行脱敏扫描
**解决**：撤回发布 → grep 扫描脱敏 → 重新发布版本 1.2.1
**预防**：建立发布前强制扫描流程

### 案例2：展示名称混乱
**问题**：ClawHub 上技能显示英文 slug，中文用户无法理解用途
**原因**：未按规范设置 title 字段的中文名称
**解决**：更新为 `title: "Workflow Note（流程笔记）"`，版本 1.2.2
**预防**：建立发布前名称检查

### 案例3：无效配置字段
**问题**：技能中包含 `isolated: true` 无效字段
**原因**：依赖文档中未明确说明的配置
**解决**：查阅源码确认后移除该字段
**预防**：只使用文档明确说明的配置项

## 工作流程建议

### 日常开发流程
1. 新技能开发时立即填写完整元数据
2. 每次修改后同步更新 GitHub README.md
3. 提交代码时检查路径引用一致性
4. 发布前运行安全检查和脱敏扫描

### 发布流程
1. 完成功能开发和测试
2. 执行三端同步检查清单
3. 提交代码到 GitHub
4. 发布到 ClawHub 并递增版本号
5. 更新相关文档和笔记

### 维护流程
1. 收集用户反馈和问题报告
2. 评估新功能和改进需求
3. 按相同流程更新技能
4. 保持三端数据同步

## 参考资料

- [ClawHub 官方文档](https://clawhub.ai)
- [OpenClaw 技能系统文档](https://docs.openclaw.ai)
- [GitHub 技能仓库](https://github.com/tino-chen/openclaw-skills)
- [技能发布实践案例](https://tino-chen.github.io/notes/workflows/2026-04-10-AI技能发布管理规范与实践.html)