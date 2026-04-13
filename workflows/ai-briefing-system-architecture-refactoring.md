---
type: experience
title: AI简报系统架构重构实战
date: 2026-04-14
category: workflows
tags: [AI Agent, 系统架构, 质量控制, 自动化]
---

## 这是什么

这是一次基于质量问题的AI简报系统深度重构案例。当原有系统的质量控制机制失效时，通过拆分技能、建立红线分级制度、优化配置等方式，构建了一套更稳定可靠的自动化简报生成体系。

## 最终效果

重构后实现了显著的质量提升：
- **质量检测成功率提升**：从100%失败提升到有效拦截虚假信息、去重验证、时效检查
- **系统稳定性改善**：通过技能拆分解决了GLM-5-turbo在单会话内处理复杂流程时的"偷懒"现象
- **配置管理优化**：将300+行的SKILL.md重构为两个独立技能，职责清晰
- **错误处理机制**：建立了🔴致命问题和🟡可优化问题的分级处理机制

### 根因分析

经过深度分析，问题根源在于审核环节设计缺陷：

1. **仅做文字审阅**：未读取历史简报进行去重验证
2. **未独立验证来源**：未使用 web_fetch 检查链接有效性
3. **未搜索确认**：未用搜索引擎确认事件真实性和时效性
4. **缺乏量化标准**：没有明确的合格/不合格判定标准

## 架构重构方案

### 从三阶段到双技能拆分

**问题诊断**：
- GLM-5-turbo 在单会话内处理三阶段流程时出现"偷懒"现象
- 读完文件汇报计划就结束，不执行后续工具调用
- sessions_spawn 在 cron 会话中不适用，子会话结果无法回传主会话
- SKILL.md 过长（300+行），模型迷失在元信息中

**解决方案**：
拆分为两个独立技能，共享配置但流程分离：

#### 1. daily-ai-briefing（轻量版）
- **流程**：单阶段生成→自检→保存
- **代码量**：~150行 SKILL.md
- **运行时间**：每天08:00单条cron
- **输出**：只生成文件，不推送

#### 2. agentic-daily-ai-briefing（重量版）
- **流程**：三阶段（生成→审核→修正推送）
- **代码量**：~180行 SKILL.md  
- **运行时间**：三条cron（08:00/08:10/08:20）
- **输出**：完整审核后推送飞书

**关键设计原则**：
- 轻量版和重量版**只在流程**，不在内容要求
- 两个技能共享 sources.md 和数据目录
- 删除无用的 `isolated: true` frontmatter字段

### 质量控制机制升级

#### 1. 红线分级制度
从"一刀切删除"改为两级分类：

🔴 **致命问题**（必须删除）：
- 超14天事件（时间红线）
- 来源链接失效（权威性红线）
- 跨天重复（去重红线）

🟡 **可修正问题**（打回修正）：
- 要素缺失（When/Where/Why）
- 事实描述不准确
- 来源可信度不足

#### 2. 去重机制重构
从简单名称匹配升级为**实体+事件类型语义比对**：

```yaml
# 去重逻辑
if (实体相似度 > 0.8 AND 事件类型相同 AND 时间间隔 < 24h):
    mark_as_duplicate
```

#### 3. 自检输出标准化
强制输出JSON格式的自检报告：

```json
{
  "total_items": 5,
  "passed_items": 3,
  "failed_items": [
    {
      "reason": "时间红线",
      "description": "Gemma 4 发布于2月12日，已超过14天",
      "action": "删除"
    }
  ],
  "score": 8.5
}
```

## 配置优化

### sources.md 精简化

将原来的"流程+配置混合"重构为纯配置：

```yaml
# sources.md - 只保留配置
sources:
  academic:
    - keywords: ["AI research", "machine learning"]
      engines: ["arxiv", "nature", "science"]
      max_age: 14
  github:
    - keywords: ["AI Agent", "LLM"]
      repos: ["openai", "anthropic", "langchain"]
      max_age: 7
  industry:
    - keywords: ["AI", "technology"]
      sites: ["techcrunch", "venturebeat", "theverge", "arstechnica", "36kr", "jiqizhixin", "qbitai", "infoq"]
      max_age: 3
```

### 搜索策略升级

从固定搜索改为**检测驱动深度搜索**：

1. **第一层**：固定领域搜索（学术+GitHub+行业）
2. **第二层**：根据检测结果补充特定领域搜索
3. **第三层**：兜底策略，确保每日有内容输出

### 新闻源扩展

行业新闻源从3个扩展到8个，覆盖中英文主流科技媒体：

**英文**：
- TechCrunch
- VentureBeat  
- The Verge
- Ars Technica
- 36Kr (英文版)

**中文**：
- 36Kr
- 机器之心
- 量子位
- InfoQ

## 实施效果

### Stage 1+2 独立验证结果

质量检测效果显著：

- **成功拦截**：MiniMax Speech 2.8 HD 虚假信息
- **去重验证**：跨天重复事件有效识别
- **时效检查**：超14天条目成功过滤

### 具体问题案例

**案例1：虚假信息拦截**
- 事件：MiniMax Speech 2.8 HD 宣传
- 问题：实际产品尚未发布
- 处理：标记为虚假信息，删除

**案例2：时效性验证**  
- 事件：某AI公司融资新闻
- 问题：实际发布时间为15天前
- 处理：触发14天红线，删除

**案例3：重复性检测**
- 事件：Anthropic Mythos模型发布
- 问题：与前日重复报道
- 处理：语义比对确认重复，删除

### 模型行为观察

发现 GLM-5-turbo 的 agentic loop 过早终止问题：

- **不是token限制**：配置了8192 token，远超需求
- **主动停止**：模型选择在合适位置停止生成
- **解决方案**：拆分技能避免单会话过长复杂度

## 技术经验与教训

### 1. 技能设计原则

**轻量是流程的轻量，不是内容要求的轻量**：
- 轻量版流程简单，但内容标准与重量版完全一致
- 不能为了轻量而降低质量要求
- 技能要保持自身独立，不相互依赖

### 2. 质量控制要点

**审核机制应该区分处理**：
- 🔴 致命问题：直接删除，无需修正
- 🟡 可优化问题：打回修正，保留机会

**遇到问题第一反应不是重试，而是反思原因**：
- 质量问题 → 分析根因 → 优化机制 → 重新验证
- 避免盲目重复同样操作

### 3. 工具使用最佳实践

**代理优先HTTPS**：
- 外部工具访问优先使用HTTPS代理
- 避免不稳定连接（如proxychains4）
- gog（Google Workspace CLI）比himalaya更稳定

### 4. 元数据管理

**技能发布必须包含完整元数据**：
- repository：GitHub源码链接
- clawhub：ClawHub发布页链接
- 确保下载者可以溯源

**命名规范统一**：
- 目录命名统一（如debunk而非fact-checker）
- 展示名称格式："Title Case（中文名称）"

## 系统架构图

```
┌─────────────────┐    ┌─────────────────┐
│   生成任务       │    │   审核任务       │
│   (08:00)       │    │   (08:10)       │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   搜索+提纯      │    │   红线审核      │
│   +自检         │    │   +修正         │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
            ┌─────────────────┐
            │   推送飞书       │
            │   (08:10-08:20) │
            └─────────────────┘
```

## 配置文件示例

### cron 配置

```yaml
# 生成任务
{
  "name": "daily-ai-briefing-generation",
  "schedule": {"kind": "every", "everyMs": 86400000, "anchorMs": 28800000},
  "payload": {
    "kind": "agentTurn", 
    "message": "执行每日AI简报生成任务",
    "model": "zhipu/glm-5-turbo"
  },
  "enabled": true
}

# 审核任务  
{
  "name": "daily-ai-briefing-review",
  "schedule": {"kind": "every", "everyMs": 86400000, "anchorMs": 28800000},
  "payload": {
    "kind": "agentTurn",
    "message": "执行每日AI简报审核修正任务", 
    "model": "zhipu/glm-5-turbo"
  },
  "delivery": {
    "mode": "announce",
    "channel": "飞书"
  },
  "enabled": true
}
```

### 技能 frontmatter

```yaml
---
name: "Daily AI Briefing（每日AI简报）"
repository: "https://github.com/your-org/openclaw-workflows"
clawhub: "https://clawhub.com/skills/daily-ai-briefing"
description: "自动化AI技术进展简报生成与推送系统"
version: "2.0.0"
category: "workflows"
tags: ["AI", "automation", "report"]
---
```

## 未来改进方向

1. **多语言支持**：扩展中英文双语简报
2. **个性化过滤**：基于用户兴趣的内容筛选
3. **实时监控**：简报质量实时监控和告警
4. **自动发布**：集成GitHub Actions自动发布到多平台

---

**参考资料**：
- [每日AI简报系统原设计文档](../workflows/daily-ai-briefing.md)
- [OpenClaw cron 任务配置指南](https://openclaw.dev/docs/cron)

**相关笔记**：
- [邮件工具集成与OAuth配置实践](../tools/email-tool-selection.md) - 代理环境下的工具选择最佳实践