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

// 点击其他地方关闭下拉框
const closeDropdown = () => {
  showDropdown.value = false
}
</script>

<template>
  <div class="theme-toggle" @click.stop>
    <button 
      class="theme-toggle-btn" 
      @click="showDropdown = !showDropdown"
      :title="'主题: ' + themes.find(t => t.id === currentTheme)?.name"
    >
      <span class="theme-dot" :style="{ background: getCurrentThemeColor() }"></span>
    </button>
    
    <Transition name="fade">
      <div v-if="showDropdown" class="theme-dropdown">
        <div class="dropdown-title">切换主题</div>
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
    </Transition>
    
    <!-- 点击外部关闭 -->
    <div v-if="showDropdown" class="dropdown-overlay" @click="closeDropdown"></div>
  </div>
</template>

<style scoped>
.theme-toggle {
  position: relative;
}

.theme-toggle-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-toggle-btn:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
}

.theme-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
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

.dropdown-title {
  padding: 12px 14px 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
