import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tino's Notes",
  description: 'Ty Chen 的结构化知识库',
  
  // favicon
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico?v=4', type: 'image/x-icon' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico?v=4', type: 'image/x-icon' }],
    
    // 不蒜子访问量统计
    ['script', { src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js', async: 'async' }],
  ],
  
  // GitHub Pages 部署配置
  base: '/notes/',
  
  // 禁用 cleanUrls 以兼容 GitHub Pages
  cleanUrls: false,
  
  // 导航配置
  themeConfig: {
    siteTitle: "Tino's Notes",
    
    nav: [
      { text: 'Agent', link: '/agent/' },
      { text: 'LLM', link: '/llm/' },
      { text: 'Tool', link: '/tool/' },
      { text: 'Project', link: '/project/' },
    ],
    
    sidebar: {
      '/tool/': [
        {
          text: 'AI Assistant',
          collapsed: false,
          items: [
            { text: 'OpenClaw 安装配置', link: '/tool/ai-assistant/openclaw-setup' },
            { text: 'OpenClaw CLI 使用指南', link: '/tool/ai-assistant/openclaw-cli-usage' },
            { text: 'OpenClaw 高效使用', link: '/tool/ai-assistant/openclaw-usage' },
            { text: '供应商和模型切换指南', link: '/tool/ai-assistant/model-provider' },
            { text: 'ClawHub 使用指南', link: '/tool/ai-assistant/clawhub' },
          ]
        },
        {
          text: 'AI Coding',
          collapsed: false,
          items: [
            { text: 'Claude Code 安装配置', link: '/tool/ai-coding/claude-code-setup' },
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
    
    search: {
      provider: 'local'
    }
  },
  
  // Markdown 配置
  markdown: {
    // 添加自定义容器来显示元数据和评论
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
