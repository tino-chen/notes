import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tino's Notes",
  description: 'Ty Chen 的结构化知识库',
  
  // GitHub Pages 部署配置
  base: '/',
  cleanUrls: true,
  
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
          text: '工具笔记',
          items: [
            { text: 'ClawHub', link: '/tools/clawhub' },
            { text: 'Claude Code Setup', link: '/tools/claude-code-setup-guide' },
            { text: 'OpenClaw Setup', link: '/tools/openclaw-setup-guide' },
          ]
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
