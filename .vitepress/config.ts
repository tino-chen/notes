import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tino's Notes",
  description: 'Ty Chen 的结构化知识库',
  
  // favicon - 添加版本号绕过缓存
  head: [
    ['link', { rel: 'icon', href: '/favicon.png?v=3', type: 'image/png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.png?v=3', type: 'image/png' }]
  ],
  
  // GitHub Pages 部署配置
  base: '/notes/',
  
  // 禁用 cleanUrls 以兼容 GitHub Pages
  cleanUrls: false,
  
  // 导航配置
  themeConfig: {
    siteTitle: "Tino's Notes",
    
    nav: [
      { text: '首页', link: '/' },
      { text: '工具', link: '/tools/' },
      { text: 'Agent', link: '/agent/' },
      { text: 'LLM', link: '/llm/' },
      { text: '项目', link: '/projects/' },
    ],
    
    sidebar: {
      '/tools/': [
        {
          text: 'OpenClaw 生态',
          collapsed: false,
          items: [
            { text: 'OpenClaw 安装配置', link: '/tools/openclaw-setup-guide' },
            { text: '切换供应商和模型', link: '/tools/openclaw/model-provider' },
            { text: 'ClawHub 使用指南', link: '/tools/clawhub' },
          ]
        },
        {
          text: 'Claude',
          collapsed: false,
          items: [
            { text: 'Claude Code 安装配置', link: '/tools/claude-code-setup-guide' },
          ]
        },
        {
          text: '其他工具',
          collapsed: false,
          items: []
        }
      ],
      '/agent/': [
        {
          text: 'Agent 相关',
          items: []
        }
      ],
      '/llm/': [
        {
          text: 'LLM 相关',
          items: []
        }
      ],
      '/projects/': [
        {
          text: '项目笔记',
          items: []
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
    
    search: {
      provider: 'local'
    }
  }
})
