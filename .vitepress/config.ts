import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tino's Notes",
  description: 'AI 协作实践笔记 —— 记录使用 AI 应用和工具的真实经验与最佳实践',
  
  head: [
    ['link', { rel: 'icon', href: '/notes/favicon.png', type: 'image/png' }],
    ['link', { rel: 'apple-touch-icon', href: '/notes/favicon.png' }]
  ],
  
  base: '/notes/',
  cleanUrls: false,
  
  themeConfig: {
    siteTitle: "Tino's Notes",
    
    nav: [
      { text: '首页', link: '/' },
      { text: '流程构建', link: '/workflows/' },
      { text: '工具推荐', link: '/tools/' },
    ],
    
    sidebar: {
      '/practice/': [
        {
          text: '实践案例',
          items: [
            { text: '事实核查实战案例', link: '/practice/2026-04-05-事实核查实战案例' },
            { text: '早报系统故障修复实战经验', link: '/practice/2026-04-05-早报系统故障修复实战经验' },
            { text: 'Daily AI简报Agent实现指南', link: '/practice/daily-ai-briefing-agent-implementation' },
          ]
        }
      ],
      '/insights/': [
        {
          text: '深度洞察',
          items: [
            { text: '心跳机制与推理模式优化实践', link: '/insights/2026-04-05-心跳机制与推理模式优化实践' },
            { text: '事实核查技能开发与ClawHub发布实践', link: '/insights/skill-publishing-fact-checking' },
          ]
        }
      ],
      '/building/': [
        {
          text: '建设经验',
          items: [
            { text: '技能管理全流程规范制定经验', link: '/building/2026-04-05-技能管理全流程规范制定经验' },
            { text: 'OpenClaw记忆系统架构重构实践', link: '/building/memory-system-redesign' },
          ]
        }
      ],
      '/workflows/': [
        {
          text: '流程构建',
          items: [
            { text: 'OpenClaw 记忆与反思系统', link: '/workflows/memory-reflection-system' },
            { text: '自动笔记撰写与发布系统', link: '/workflows/auto-note-system' },
            { text: '每日 AI 进展简报系统', link: '/workflows/daily-ai-briefing' },
            { text: 'Debunk 事实核查技能', link: '/workflows/debunk' },
            { text: '每日AI简报系统架构重构实践', link: '/workflows/daily-ai-briefing-architecture' },
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具推荐',
          items: [
            { text: 'Tailscale — 远程连接 Mac Mini', link: '/tools/tailscale-remote-connect' },
            { text: '邮件工具选择与OAuth集成实践', link: '/tools/email-tool-selection' },
          ]
        }
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tino-chen/notes' }
    ],
    
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 Ty Chen'
    },
    
    outline: {
      level: [1, 3],
      label: '目录'
    },
    
    search: {
      provider: 'local'
    }
  },
  
  markdown: {
    container: {
      renderTypes: {
        info: true,
        tip: true,
        warning: true,
        danger: true
      }
    }
  }
})