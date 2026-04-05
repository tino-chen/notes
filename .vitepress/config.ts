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
            { text: '每日 AI 进展简报系统', link: '/workflows/daily-ai-briefing' },
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具推荐',
          items: [
            { text: 'Tailscale — 远程连接 Mac Mini', link: '/tools/tailscale-remote-connect' },
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