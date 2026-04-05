---
type: guide
title: 每日 AI 进展简报系统
tags: [OpenClaw, Cron, 飞书, Agent, 自动化]
---

# 每日 AI 进展简报系统

## 这是什么

一套全自动的 AI 行业简报系统：每天早上自动搜索、过滤、审查、推送一份高质量的 AI 进展简报到飞书。整个过程零人工干预。

核心挑战不是"生成内容"，而是**质量控制**——AI 生成的内容天然倾向于填充、模糊和重复，必须用严格的规则把住质量关。

## 最终效果

- 每天早上 8 点自动生成简报，8:10 审查后推送到飞书
- 简报只收录过去 14 天内的真实事件，附具体日期和可追溯来源
- 同一事件不会在不同天重复出现
- 任何一条目违反红线规则就直接丢弃，宁缺毋滥

### 样例展示

![每日 AI 进展简报样例](/daily-ai-briefing-example.png)

## 整体架构

```
08:00  生成任务（isolated session）
       └─ 读取历史去重 → 检查重点关注源 → 搜索 → 提纯 → 自检 → 保存文件

08:10  审查任务（isolated session）
       └─ 读取简报 → 逐条审查红线 → 修正 → 推送飞书
```

### 为什么拆成两步？

1. **单一职责**：生成和审查是不同目标，混在一起容易顾此失彼
2. **质量保障**：审查任务专注于检查质量，不受生成过程的上下文干扰
3. **容错**：生成失败不影响审查，审查发现问题可以修正后推送

## 实操步骤

### 第一步：安装 daily-ai-briefing 技能

```bash
openclaw skills install daily-ai-briefing
```

技能包含完整的红线规则、搜索策略、信息源白名单和输出模板。安装后位于 `~/.openclaw/skills/daily-ai-briefing/`。

### 第二步：创建简报存储目录

```bash
mkdir -p ~/Desktop/daily_ai_briefing
```

生成的简报保存为 `~/Desktop/daily_ai_briefing/YYYY_MM_DD.md`，用于去重审查和历史回溯。

### 第三步：创建生成定时任务

用 OpenClaw cron 创建每天 08:00 的生成任务：

```yaml
name: daily-ai-briefing-gen
schedule: "0 8 * * *"
timezone: Asia/Shanghai
sessionTarget: isolated
model: zhipu/glm-5-turbo
timeout: 600s
payload:
  kind: agentTurn
  message: "读取 ~/.openclaw/skills/daily-ai-briefing/SKILL.md，严格按其中定义的步骤执行。执行到步骤6时，只需将简报保存至文件（~/Desktop/daily_ai_briefing/YYYY_MM_DD.md），不要输出简报内容作为回复。你的回复只需一句话确认已完成生成和保存。"
delivery:
  mode: none
```

**关键配置说明**：

| 配置 | 值 | 原因 |
|------|------|------|
| sessionTarget | isolated | 不污染主会话上下文 |
| model | GLM-5-Turbo | Agent 执行纪律强，工具调用链稳定 |
| timeout | 600s | 多轮搜索 + 多次 web_fetch 耗时较长 |
| delivery.mode | none | 生成阶段不推送，由审查阶段统一推送 |

### 第四步：创建审查定时任务

每天 08:10 的审查任务，完整 prompt 如下：

```
你是早报审查员。请执行以下步骤：

1. 读取今天的简报文件 ~/Desktop/daily_ai_briefing/YYYY_MM_DD.md（用今天的日期）
2. 读取 ~/.openclaw/skills/daily-ai-briefing/SKILL.md 中的红线规则和自检清单
3. 逐条严格审查简报中的每一个条目，重点检查：
   - ⛔ 红线第5条：When 是否为具体日期或明确相对时间？是否有「近日」「近期」「本周」「两周内」等模糊表述？
   - ⛔ 红线第6条：来源文章的时间表述是否模糊？如果是，是否有确认过具体日期？
   - ⛔ 红线第2条：来源是否在白名单内？链接是否指向具体页面？
   - ⛔ 红线第3条：GitHub项目是否为独立软件项目（非awesome-list/论文合集）？
   - ⛔ 红线第4条：Star数是否为真实数字（非占位符）？
   - ⛔ 红线第7条：是否与过去7天简报重复？
   - 字数是否≤200字？
   - 是否有营销词汇？
4. 如发现问题，直接修正文件内容
5. 修正完成后，读取最终版文件，将完整Markdown内容一字不差地作为你的最终回复输出（这是推送内容，不要添加任何额外说明）
```

**cron 配置**：

```yaml
name: daily-ai-briefing-review
schedule: "10 8 * * *"
timezone: Asia/Shanghai
sessionTarget: isolated
model: zhipu/glm-5-turbo
timeout: 300s
delivery:
  mode: announce
  channel: feishu
  to: <你的飞书用户ID>
```

> `delivery.mode: announce` 表示审查任务的输出会自动推送到飞书。审查任务输出的完整 Markdown 就是最终简报内容。

### 第五步：配置飞书推送

确保 OpenClaw 已配置飞书 channel，且 `to` 字段填写你的飞书 open_id。如果不确定 open_id，可以通过飞书机器人发一条消息获取。

## 红线规则（核心质量保障）

简报系统最重要的设计是 **7 条红线规则**，任何一条违规就直接丢弃该条目：

| # | 规则 | 违规处理 |
|---|------|----------|
| 1 | **14 天时效**：事件超过 14 天 | 丢弃 |
| 2 | **来源白名单**：来源不在白名单内，或链接指向泛页面 | 丢弃 |
| 3 | **GitHub 真实性**：awesome-list、论文合集、资源导航 | 丢弃 |
| 4 | **Star 数真实**：占位符、估算值 | 丢弃 |
| 5 | **四要素完整**：Who/When/What/Impact 缺一不可，When 禁止模糊表述 | 丢弃 |
| 6 | **日期可追溯**：来源模糊时，必须额外搜索确认具体日期 | 无法确认则丢弃 |
| 7 | **跨天去重**：过去 7 天出现过的 | 不再收录 |

> 完整规则见 `~/.openclaw/skills/daily-ai-briefing/SKILL.md`。

## 踩坑记录

### 1. GLM-5.1 执行多步任务不稳定

最初用 GLM-5.1 做生成任务，频繁出现格式不遵循指令、工具调用链断裂（搜到一半就停了）、不执行文件写入。换用 GLM-5-Turbo 后稳定。

### 2. 推送全部失败

前 4 天简报全部 `not-delivered`，原因是 cron job 的 `delivery.mode` 设成了 `"none"`。生成任务确实不需要推送（只存文件），但审查任务必须设为 `"announce"` 才能推送到飞书。

### 3. 红线规则不清晰导致质量失控

初期简报收录了 1 月份的新闻（超过 14 天时效）、Star 数写占位符、收录了 awesome-list、时间表述模糊。根本原因是红线规则不够具体——"信息要准确"这种模糊要求 AI 根本做不到。后来逐条改为可机械判断的规则（如"禁止使用'近日''近期'等模糊时间"），质量才稳定。

### 4. 跨天重复

同一事件（如 Claude Sonnet 4.6 发布）在 4/2 和 4/3 连续出现。解决：生成前强制读取最近 7 天历史简报，列出所有已出现的项目名/事件名，逐条去重。

### 5. 来源多样性不足

有时过度依赖 TechCrunch，导致信息来源单一。解决：搜索策略要求至少搜索 2 个不同来源，并在 SKILL.md 中维护重点关注信息源列表。

## 技能开源

简报系统的完整 Skill 已开源，可直接复现：

- **GitHub**：https://github.com/tino-chen/openclaw-skills
- **ClawHub**：`openclaw skills install daily-ai-briefing`

## 参考资料

- OpenClaw 文档：https://docs.openclaw.ai
- daily-ai-briefing 技能：https://clawhub.ai/skills/daily-ai-briefing
