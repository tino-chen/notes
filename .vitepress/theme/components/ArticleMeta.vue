<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()

const typeLabels = {
  guide: '教程',
  knowledge: '知识',
  experience: '经验'
}
</script>

<template>
  <div class="article-meta" v-if="frontmatter.type || frontmatter.tags">
    <span v-if="frontmatter.type" class="type">
      {{ typeLabels[frontmatter.type] || frontmatter.type }}
    </span>
    <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
      #{{ tag }}
    </span>
  </div>
</template>

<style scoped>
.article-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.type {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.tag {
  background: var(--vp-c-gray-soft);
  color: var(--vp-c-text-2);
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 13px;
}
</style>
