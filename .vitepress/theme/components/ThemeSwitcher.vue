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
const showDropdown = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('theme') || 'lobster'
  currentTheme.value = saved
  document.documentElement.setAttribute('data-theme', saved)
})

const switchTheme = (themeId) => {
  currentTheme.value = themeId
  document.documentElement.setAttribute('data-theme', themeId)
  localStorage.setItem('theme', themeId)
  showDropdown.value = false
}

const getCurrentThemeColor = () => {
  const theme = themes.find(t => t.id === currentTheme.value)
  return theme?.color || '#ff5c5c'
}
</script>

<template>
  <div class="theme-switcher">
    <button 
      class="theme-button" 
      @click="showDropdown = !showDropdown"
      :title="'切换主题: ' + themes.find(t => t.id === currentTheme)?.name"
    >
      <span class="theme-icon" :style="{ background: getCurrentThemeColor() }"></span>
      <span class="theme-arrow">▾</span>
    </button>
    
    <div v-if="showDropdown" class="theme-dropdown">
      <div 
        v-for="theme in themes" 
        :key="theme.id"
        class="theme-option"
        :class="{ active: currentTheme === theme.id }"
        @click="switchTheme(theme.id)"
      >
        <span class="theme-color" :style="{ background: theme.color }"></span>
        <span class="theme-name">{{ theme.name }}</span>
        <span v-if="currentTheme === theme.id" class="theme-check">✓</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: relative;
}

.theme-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-button:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
}

.theme-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.theme-arrow {
  font-size: 10px;
  color: var(--vp-c-text-2);
}

.theme-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  min-width: 140px;
  z-index: 1000;
  overflow: hidden;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.theme-option:hover {
  background: var(--vp-c-bg-soft);
}

.theme-option.active {
  background: var(--vp-c-brand-soft);
}

.theme-color {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.theme-name {
  flex: 1;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.theme-check {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>
