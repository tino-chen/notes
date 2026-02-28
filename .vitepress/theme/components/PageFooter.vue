<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()

const showFooter = () => {
  return frontmatter.value.type && frontmatter.value.title
}
</script>

<template>
  <div v-if="showFooter()" class="page-footer">
    <!-- 访问量 -->
    <div class="page-views">
      <span id="busuanzi_container_page_pv">
        👀 总访问 <span id="busuanzi_value_page_pv">...</span> 次
      </span>
      <span class="separator">|</span>
      <span id="busuanzi_container_site_uv">
        👤 访客 <span id="busuanzi_value_site_uv">...</span> 人
      </span>
    </div>
    
    <!-- Giscus 评论容器 -->
    <div class="giscus"></div>
  </div>
</template>

<style scoped>
.page-footer {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid var(--vp-c-divider);
}

.page-views {
  display: flex;
  justify-content: center;
  gap: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  margin-bottom: 40px;
}

.separator {
  color: var(--vp-c-divider);
}

.giscus {
  margin-top: 30px;
}
</style>
