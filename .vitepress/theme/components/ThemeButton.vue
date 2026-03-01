<script setup>
import { ref, onMounted } from 'vue'

const themes = [
  { id: 'lobster', name: '龙虾红', color: '#ff5c5c' },
  { id: 'ocean', name: '海洋蓝', color: '#3b82f6' },
  { id: 'mint', name: '薄荷绿', color: '#10b981' },
  { id: 'violet', name: '紫罗兰', color: '#8b5cf6' },
  { id: 'amber', name: '琥珀橙', color: '#f59e0b' },
  { id: 'rose', name: '玫瑰粉', color: '#ec4899' },
  { id: 'graphite', name: '石墨灰', color: '#6b7280' },
]

const currentTheme = ref('lobster')
const isOpen = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('theme') || 'lobster'
  currentTheme.value = saved
  document.documentElement.setAttribute('data-theme', saved)
})

const switchTheme = (themeId) => {
  currentTheme.value = themeId
  document.documentElement.setAttribute('data-theme', themeId)
  localStorage.setItem('theme', themeId)
  isOpen.value = false
}

const getCurrentThemeColor = () => {
  const theme = themes.find(t => t.id === currentTheme.value)
  return theme?.color || '#ff5c5c'
}
</script>

<template>
  <div class="theme-button" @click="isOpen = !isOpen">
    <span class="theme-dot" :style="{ background: getCurrentThemeColor() }"></span>
    
    <div v-if="isOpen" class="theme-dropdown">
      <div class="dropdown-header">切换主题</div>
      <div class="dropdown-list">
        <button
          v-for="theme in themes"
          :key="theme.id"
          class="dropdown-item"
          :class="{ active: currentTheme === theme.id }"
          @click.stop="switchTheme(theme.id)"
        >
          <span class="item-dot" :style="{ background: theme.color }"></span>
          <span class="item-name">{{ theme.name }}</span>
          <span v-if="currentTheme === theme.id" class="item-check">✓</span>
        </button>
      </div>
    </div>
    
    <div v-if="isOpen" class="dropdown-backdrop" @click="isOpen = false"></div>
  </div>
</template>

<style scoped>
.theme-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.theme-button:hover {
  background: var(--vp-c-bg-soft);
}

.theme-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  min-width: 150px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-header {
  padding: 12px 14px 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dropdown-list {
  padding: 4px 8px 8px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  text-align: left;
}

.dropdown-item:hover {
  background: var(--vp-c-bg-soft);
}

.dropdown-item.active {
  background: var(--vp-c-bg-mute);
}

.item-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  flex-shrink: 0;
}

.item-name {
  flex: 1;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.item-check {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 12px;
}

.dropdown-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
</style>
