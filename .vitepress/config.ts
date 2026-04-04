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
      { text: '工具实战', link: '/practice/' },
      { text: '系统构建', link: '/building/' },
      { text: '经验沉淀', link: '/insights/' },
    ],
    
    sidebar: {
      '/practice/': [
        {
          text: '工具实战',
          items: [
            { text: 'Tailscale - 远程连接 Mac Mini', link: '/practice/tailscale-remote-connect' },
            { text: 'Daily AI Briefing 系统集成实践', link: '/practice/2026-04-05-Daily-AI-Briefing-System-Integration' },
          ]
        }
      ],
      '/building/': [
        {
          text: '系统构建',
          items: [
            { text: '每日 AI 进展简报系统', link: '/building/daily-ai-briefing' },
          ]
        }
      ],
      '/insights/': [
        {
          text: '经验沉淀',
          items: [
            { text: 'OpenClaw 记忆与反思系统', link: '/insights/memory-reflection-system' },
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
