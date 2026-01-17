<template>
  <div class="comments-section">
    <h2 class="comments-title">💬 评论区</h2>
    <div ref="commentsContainer" class="giscus-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const commentsContainer = ref(null)

onMounted(() => {
  // 创建 Giscus script
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME')
  script.setAttribute('data-repo-id', 'YOUR_REPO_ID')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true

  commentsContainer.value?.appendChild(script)
})
</script>

<style scoped>
.comments-section {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid var(--border);
}

.comments-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.giscus-container {
  min-height: 200px;
}
</style>
