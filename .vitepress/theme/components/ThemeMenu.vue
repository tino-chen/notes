<script setup>
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'

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

onMounted(() => {
  const saved = localStorage.getItem('theme') || 'lobster'
  currentTheme.value = saved
  document.documentElement.setAttribute('data-theme', saved)
})

const switchTheme = (themeId) => {
  currentTheme.value = themeId
  document.documentElement.setAttribute('data-theme', themeId)
  localStorage.setItem('theme', themeId)
}
</script>

<template>
  <div class="theme-menu">
    <div class="theme-menu-title">主题颜色</div>
    <div class="theme-grid">
      <button
        v-for="theme in themes"
        :key="theme.id"
        class="theme-item"
        :class="{ active: currentTheme === theme.id }"
        :style="{ '--theme-color': theme.color }"
        :title="theme.name"
        @click="switchTheme(theme.id)"
      >
        <span class="theme-dot" :style="{ background: theme.color }"></span>
        <span class="theme-name">{{ theme.name }}</span>
        <span v-if="currentTheme === theme.id" class="theme-check">✓</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.theme-menu {
  padding: 8px 0;
  min-width: 160px;
}

.theme-menu-title {
  padding: 8px 16px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.theme-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 8px;
}

.theme-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  text-align: left;
  width: 100%;
}

.theme-item:hover {
  background: var(--vp-c-bg-soft);
}

.theme-item.active {
  background: var(--vp-c-bg-mute);
}

.theme-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  flex-shrink: 0;
}

.theme-name {
  flex: 1;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.theme-check {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 12px;
}
</style>
