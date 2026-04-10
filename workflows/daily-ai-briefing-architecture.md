---
title: 每日AI简报系统架构重构实践
date: 2026-04-06
category: workflows
author: Tino Chen
tags: [AI工作流, 架构设计, 质量控制, cron任务]
---

## 概述

从单技能单体架构重构为双技能分离架构的完整实践，解决了GLM-5-turbo模型在复杂多阶段任务中的"偷懒"问题，建立了可靠的质量控制机制。

## 背景

原系统采用单一`daily-ai-briefing`技能，存在三个核心问题：

1. **模型行为问题**：GLM-5-turbo在单会话内处理三阶段任务时，读完文件汇报计划就终止，不执行工具调用
2. **技术限制**：`sessions_spawn`在cron会话中不适用，子会话结果无法返回主会话
3. **复杂度过高**：SKILL.md超300行，模型迷失在元信息中

## 解决方案

### 架构拆分策略

**从三阶段→双技能分离：**
- `daily-ai-briefing`（轻量版，~150行）：单阶段生成+自检→保存，不推送
- `agentic-daily-ai-briefing`（重量版，~180行）：三阶段（生成→审核→修正推送）

**关键设计原则：**
- 轻重版本只在流程上差异，内容标准完全一致
- 共享`sources.md`和数据目录，避免重复配置
- 删除无用的`isolated: true` frontmatter（经源码确认该字段无实际作用）

### Cron任务配置

**生成任务：**
- 时间：每天08:00
- 功能：搜索→提纯→自检→保存文件
- Cron ID：`83022e76`（原单阶段cron更新）

**审查任务：**
- 时间：每天08:10  
- 功能：逐条红线审查→修正→推送飞书
- Cron ID：`89f43a11`
- 配置：`delivery.mode: announce`推送飞书

## 质量控制机制

### 红线分级系统

**🔴 致命问题（必须删除）：**
- 跨天重复内容
- 超过14天的旧闻
- 来源失效链接
- 关键要素缺失（When/Where/Who）

**🟡 可修正问题（打回修正）：**
- 查询词过泛导致质量不佳
- 审核过严导致空简报
- 域名霸榜（单域名超3条）

### 自检流程优化

**搜索策略升级：**
- 按领域细分查询词
- 域名去重（每域名最多3条）
- Review评分机制（1-10分）
- 兜底保留（全部毙掉时按分数保留1-3条）
- 空简报推送通知

**自检输出改进：**
- 强制输出JSON格式自检报告
- 从"默答"改为结构化输出
- 删除硬编码日期（避免过时问题）

## 问题诊断与解决

### 发现的非显而易见问题

**1. GLM-5-turbo的agentic loop过早终止**
- 现象：不是maxTokens限制（配置8192），是模型自己选择停止生成
- 影响：三阶段任务的第三阶段（修正）无法执行
- 解决：拆分为独立技能，每阶段独立会话

**2. 代理连接稳定性问题**
- 现象：IMAP连接频繁`connection reset by peer`
- 根因：Clash代理无法处理IMAP（端口993）协议
- 解决：改用gog（OAuth over HTTPS API）

**3. 技能元数据字段误解**
- 调查：frontmatter中`isolated: true`字段在OpenClaw源码中无实际作用
- 结论：该概念只存在于cron任务的`sessionTarget`属性中

## 实施效果

### 质量提升
- 生成结果被微软新闻霸榜问题 → 域名去重解决
- 审核过严导致空简报 → 评分机制+兜底保留
- 跨天重复和超期内容 → 红线拦截机制

### 系统稳定性
- Claude Code被SIGKILL → 手动验收+重建虚拟环境
- 代理连接不稳定 → 切换到OAuth API
- 模型过早终止 → 架构拆分解决

### 运维效率
- 轻量版和重量版独立部署
- 共享配置减少维护成本
- 清晰的错误分级便于快速响应

## 技术要点

### 代码组织
```
daily-ai-briefing/
├── SKILL.md (~150行，轻量版)
├── agentic-daily-ai-briefing/
│   └── SKILL.md (~180行，重量版)
├── sources.md (共享配置)
└── data/ (共享数据目录)
```

### 关键配置
- **gog OAuth**：通过 `gog auth` 配置（⚠️ 凭据文件切勿提交到公开仓库）
- **Feishu webhook**：用于重要邮件通知和简报推送
- **搜索源**：从3个扩展到8个（techcrunch/venturebeat/theverge/arstechnica/36kr/jiqizhixin/qbitai/infoq）

## 经验总结

### 设计原则
1. **轻量是流程的轻量，不是内容要求的轻量**
2. **技能要保持自身独立，不要相互引用**
3. **配置文件只写配置，流程逻辑放SKILL.md**

### 质量控制
1. **审核机制应区分可优化问题和必须删除的严重问题**
2. **遇到问题第一反应不是重试，而是反思为什么出现，优化后再重试**
3. **自检步骤必须严格执行，不能假设存在**

### 工具选择
1. **优先HTTPS API**（如gog），避免不稳定连接（如himalaya的proxychains4）
2. **安装即验证**：工具/技能安装后必须检查初始化状态
3. **代理优先HTTPS**：外部工具访问优先使用HTTPS代理

## 参考链接

- [OpenClaw Cron Jobs文档](https://github.com/openclaw/openclaw)
- [Google Workspace CLI (gog)](https://github.com/gogcli/gog)
- [Feishu Webhook配置](https://open.feishu.cn/document/uQjL04CN/ukzM04CN0E1NjYzN)
- [ClawHub技能发布规范](https://github.com/clawhub/clawhub)

---

*本文记录了2026年4月初每日AI简报系统的完整重构过程，展示了从问题发现到解决方案的完整实践路径。*