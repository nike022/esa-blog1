<template>
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1>标签</h1>
        <p>按标签浏览文章</p>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-else>
        <div class="tags-cloud">
          <span
            v-for="(count, tag) in tagCounts"
            :key="tag"
            class="tag-item"
            :style="{ fontSize: getTagSize(count) + 'px' }"
            @click="filterByTag(tag)"
          >
            {{ tag }} ({{ count }})
          </span>
        </div>

        <div v-if="selectedTag" class="filtered-posts">
          <h2>标签: {{ selectedTag }}</h2>
          <div class="post-list">
            <router-link
              v-for="post in filteredPosts"
              :key="post.id"
              :to="`/post/${post.id}`"
              class="post-card"
            >
              <h3>{{ post.title }}</h3>
              <p>{{ getExcerpt(post.content) }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAllPosts } from '../utils/posts'

const route = useRoute()
const posts = ref([])
const loading = ref(true)
const selectedTag = ref(null)

const tagCounts = computed(() => {
  const counts = {}
  posts.value.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    }
  })
  return counts
})

const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return posts.value.filter(post =>
    post.tags && post.tags.includes(selectedTag.value)
  )
})

const getTagSize = (count) => {
  return 14 + Math.min(count * 2, 12)
}

const filterByTag = (tag) => {
  selectedTag.value = selectedTag.value === tag ? null : tag
}

const getExcerpt = (content) => {
  if (!content) return ''
  const plainText = content
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim()
  return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText
}

onMounted(async () => {
  posts.value = await getAllPosts()
  loading.value = false

  // Check if there's a tag query parameter
  if (route.query.tag) {
    selectedTag.value = route.query.tag
  }
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 80px 20px 120px;
}

.page-header {
  text-align: center;
  margin-bottom: 80px;
}

.page-header h1 {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 16px;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  font-size: 18px;
  color: var(--text-secondary);
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 60px;
}

.tag-item {
  padding: 8px 16px;
  background: var(--bg-secondary);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-primary);
  font-weight: 500;
  border: 2px solid transparent;
}

.tag-item:hover {
  background: var(--gradient-1);
  color: white;
  transform: translateY(-2px);
}

.filtered-posts h2 {
  font-size: 28px;
  margin-bottom: 32px;
  color: var(--text-primary);
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.post-card {
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid var(--border);
}

.post-card:hover {
  transform: translateY(-2px);
  border-color: var(--primary);
}

.post-card h3 {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.post-card p {
  font-size: 14px;
  color: var(--text-secondary);
}
</style>
