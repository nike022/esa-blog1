<template>
  <div class="page">
    <div class="container">
      <div class="page-header">
        <h1>分类</h1>
        <p>按分类浏览文章</p>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-else class="categories-grid">
        <div
          v-for="(posts, category) in groupedPosts"
          :key="category"
          class="category-card"
        >
          <h2>{{ category }}</h2>
          <p class="count">{{ posts.length }} 篇文章</p>
          <div class="posts-list">
            <router-link
              v-for="post in posts.slice(0, 3)"
              :key="post.id"
              :to="`/post/${post.id}`"
              class="post-link"
            >
              {{ post.title }}
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
    const category = post.category || '未分类'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(post)
  })
  return groups
})

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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.category-card {
  padding: 32px;
  background: var(--bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--border);
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px var(--shadow);
  border-color: var(--primary);
}

.category-card h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.count {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post-link {
  font-size: 15px;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-link:hover {
  color: var(--primary);
}
</style>
