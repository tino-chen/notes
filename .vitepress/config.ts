import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tino's Notes",
  description: 'Ty Chen 的结构化知识库',
  
  head: [
    ['link', { rel: 'icon', href: '/notes/favicon.png', type: 'image/png' }],
    ['link', { rel: 'apple-touch-icon', href: '/notes/favicon.png' }]
  ],
  
  base: '/notes/',
  cleanUrls: false,
  
  themeConfig: {
    siteTitle: "Tino's Notes",
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Agent', link: '/agent/' },
      { text: 'LLM', link: '/llm/' },
      { text: 'Tool', link: '/tool/' },
      { text: 'Project', link: '/project/' },
    ],
    
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
