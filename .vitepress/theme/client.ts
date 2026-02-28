// VitePress 客户端入口
import { onMounted, onUnmounted, ref } from 'vue'

// Giscus 配置
const giscusConfig = {
  repo: 'tino-chen/notes',
  repoId: 'R_kgDORaEpDg',
  category: 'Comments',
  categoryId: 'DIC_kwDORaEpDs4C3aXM',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN'
}

// 加载 Giscus
function loadGiscus() {
  // 移除旧的 giscus frame
  const oldFrame = document.querySelector('.giscus-frame, iframe[src*="giscus"]')
  if (oldFrame) {
    oldFrame.remove()
  }
  
  // 清空容器
  const container = document.querySelector('.giscus')
  if (container) {
    container.innerHTML = ''
  }
  
  // 重新加载脚本
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  Object.entries(giscusConfig).forEach(([key, value]) => {
    script.setAttribute(`data-${key}`, value)
  })
  script.crossOrigin = 'anonymous'
  script.async = true
  
  if (container) {
    container.appendChild(script)
  }
}

// 刷新不蒜子
function refreshBusuanzi() {
  if (window.busuanzi) {
    window.busuanzi.fetch()
  }
}

// 监听路由变化
let currentPath = ''

function handleRouteChange() {
  const newPath = window.location.pathname
  if (newPath !== currentPath) {
    currentPath = newPath
    
    // 延迟一下让 DOM 更新
    setTimeout(() => {
      loadGiscus()
      refreshBusuanzi()
    }, 100)
  }
}

// 初始化
if (typeof window !== 'undefined') {
  // 监听 popstate
  window.addEventListener('popstate', handleRouteChange)
  
  // 监听 VitePress 路由变化
  document.addEventListener('DOMContentLoaded', () => {
    // 初始加载
    loadGiscus()
    refreshBusuanzi()
    
    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'A' || (node.classList && node.classList.contains('VPLink'))) {
              // 点击了链接
              handleRouteChange()
            }
          })
        }
      })
    })
    
    observer.observe(document.body, { childList: true, subtree: true })
  })
}
