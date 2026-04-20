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
      '/workflows/': [
        {
          text: '流程构建',
          items: [
            { text: 'OpenClaw 记忆与反思系统', link: '/workflows/memory-reflection-system' },
            { text: '自动笔记撰写与发布系统', link: '/workflows/auto-note-system' },
            { text: '每日 AI 进展简报系统', link: '/workflows/daily-ai-briefing' },
            { text: 'Debunk 事实核查技能', link: '/workflows/debunk' },
            { text: 'AI技能发布管理规范与实践', link: '/workflows/2026-04-10-AI技能发布管理规范与实践' },
            { text: 'AI Agent技能发布与简报质量管控架构', link: '/workflows/2026-04-15-AI-Agent技能发布与简报质量管控架构' },
            { text: '目录命名规范制定与实践', link: '/workflows/目录命名规范制定与实践' },
            { text: 'Gmail OAuth配置迁移与方案对比', link: '/workflows/Gmail-OAuth配置迁移与方案对比' },
            { text: 'AI技能全流程管理规范', link: '/workflows/AI技能全流程管理规范' },
            { text: '邮件通知系统集成架构', link: '/workflows/邮件通知系统集成架构' },
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具推荐',
          items: [
            { text: 'Tailscale — 远程连接 Mac Mini', link: '/tools/tailscale-remote-connect' },
            { text: '邮件工具选择与OAuth集成实践', link: '/tools/email-tool-selection' },
            { text: '邮件工具集成与OAuth配置实践', link: '/tools/email-tool-integration-oauth-configuration' },
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