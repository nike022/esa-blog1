<template>
  <div class="home">
    <!-- Hero Carousel -->
    <section class="hero-section">
      <div class="container-wide">
        <HeroCarousel v-if="!loading && allPosts.length > 0" :posts="allPosts" />
      </div>
    </section>

    <!-- Main Content with Sidebar -->
    <section class="content-section">
      <div class="container-wide">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <div v-if="loading" class="loading">加载中...</div>
            <div v-else>
              <div class="posts-list">
                <article
                  v-for="post in paginatedPosts"
                  :key="post.id"
                  class="post-item"
                >
                  <router-link :to="`/post/${post.id}`" class="post-cover">
                    <img
                      :src="`https://picsum.photos/400/250?random=${post.id}`"
                      :alt="post.title"
                    />
                    <div class="post-category-badge">{{ post.category || '未分类' }}</div>
                  </router-link>
                  <div class="post-body">
                    <router-link :to="`/post/${post.id}`" class="post-title-link">
                      <h2 class="post-title">{{ post.title }}</h2>
                    </router-link>
                    <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
                    <div class="post-meta">
                      <span class="post-date">📅 {{ formatDate(post.date) }}</span>
                      <span class="post-author">✍️ {{ post.author }}</span>
                    </div>
                    <div class="post-tags">
                      <span v-for="tag in post.tags" :key="tag" class="tag">
                        #{{ tag }}
                      </span>
                    </div>
                  </div>
                </article>
              </div>

              <Pagination
                v-if="totalPages > 1"
                :current-page="currentPage"
                :total-pages="totalPages"
                @change="handlePageChange"
              />
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="sidebar-wrapper">
            <Sidebar :posts="allPosts" @search="handleSearch" @filter="handleFilter" />
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAllPosts } from '../utils/posts'
import HeroCarousel from '../components/HeroCarousel.vue'
import Sidebar from '../components/Sidebar.vue'
import Pagination from '../components/Pagination.vue'

const allPosts = ref([])
const displayedPosts = ref([])
const loading = ref(true)
const currentPage = ref(1)
const postsPerPage = 10

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return displayedPosts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(displayedPosts.value.length / postsPerPage)
})

const handlePageChange = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSearch = (query) => {
  currentPage.value = 1
  if (!query.trim()) {
    displayedPosts.value = allPosts.value
    return
  }

  const lowerQuery = query.toLowerCase()
  displayedPosts.value = allPosts.value.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    (post.content && post.content.toLowerCase().includes(lowerQuery)) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  )
}

const handleFilter = ({ type, value }) => {
  currentPage.value = 1
  if (type === 'category') {
    displayedPosts.value = allPosts.value.filter(post =>
      (post.category || '未分类') === value
    )
  } else if (type === 'tag') {
    displayedPosts.value = allPosts.value.filter(post =>
      post.tags && post.tags.includes(value)
    )
  } else if (type === 'archive') {
    displayedPosts.value = allPosts.value.filter(post => {
      const date = new Date(post.date)
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      return yearMonth === value
    })
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getExcerpt = (content) => {
  if (!content) return ''
  // Remove markdown syntax and get first 100 characters
  const plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText
}

onMounted(async () => {
  allPosts.value = await getAllPosts()
  displayedPosts.value = allPosts.value
  loading.value = false
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: var(--bg);
}

.container-wide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-section {
  padding: 32px 0;
}

.content-section {
  padding: 48px 0 80px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 48px;
}

.main-content {
  min-width: 0;
}

.sidebar-wrapper {
  position: sticky;
  top: 88px;
  align-self: flex-start;
  max-height: calc(100vh - 104px);
  overflow-y: auto;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.post-item {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 24px;
  background: var(--bg-secondary);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s;
}

.post-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--primary);
}

.post-cover {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.post-item:hover .post-cover img {
  transform: scale(1.05);
}

.post-category-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 14px;
  background: var(--primary);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.post-body {
  padding: 24px 24px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post-title-link {
  text-decoration: none;
}

.post-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  margin: 0;
  transition: color 0.2s;
}

.post-title-link:hover .post-title {
  color: var(--primary);
}

.post-excerpt {
  font-size: 15px;
  color: var(--text-primary);
  opacity: 0.75;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.post-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: var(--text-secondary);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.tag {
  font-size: 13px;
  color: white;
  background: var(--primary);
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 500;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .sidebar-wrapper {
    order: -1;
  }
}

@media (max-width: 768px) {
  .post-item {
    grid-template-columns: 1fr;
  }

  .post-cover {
    height: 200px;
  }

  .post-body {
    padding: 20px;
  }
}
</style>
