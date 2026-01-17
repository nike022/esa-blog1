<template>
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1>归档</h1>
        <p>按时间浏览所有文章</p>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-else class="archive-list">
        <div v-for="(posts, year) in groupedPosts" :key="year" class="archive-year">
          <h2 class="year-title">{{ year }}</h2>
          <div class="posts">
            <router-link
              v-for="post in posts"
              :key="post.id"
              :to="`/post/${post.id}`"
              class="archive-item"
            >
              <span class="date">{{ formatDate(post.date) }}</span>
              <span class="title">{{ post.title }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAllPosts } from '../utils/posts'

const posts = ref([])
const loading = ref(true)

const groupedPosts = computed(() => {
  const groups = {}
  posts.value.forEach(post => {
    const year = new Date(post.date).getFullYear()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(post)
  })
  return groups
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
}

onMounted(async () => {
  posts.value = await getAllPosts()
  loading.value = false
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

.archive-year {
  margin-bottom: 60px;
}

.year-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.archive-item {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  background: var(--bg-secondary);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.archive-item:hover {
  transform: translateX(8px);
  border-color: var(--primary);
  background: var(--bg);
}

.archive-item .date {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  min-width: 60px;
}

.archive-item .title {
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 40px;
  }

  .archive-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
