<template>
  <div class="sidebar">
    <!-- Search Box -->
    <div class="sidebar-section search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索文章..."
        @input="handleSearch"
        class="search-input"
      />
    </div>

    <!-- Categories -->
    <div class="sidebar-section">
      <h3 class="section-title">分类</h3>
      <div class="category-list">
        <div
          v-for="category in categories"
          :key="category.name"
          class="category-item"
          @click="$emit('filter', { type: 'category', value: category.name })"
        >
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ category.count }}</span>
        </div>
      </div>
    </div>

    <!-- Tags -->
    <div class="sidebar-section">
      <h3 class="section-title">标签</h3>
      <div class="tag-cloud">
        <span
          v-for="tag in tags"
          :key="tag.name"
          class="tag-item"
          :style="{ fontSize: getTagSize(tag.count) }"
          @click="$emit('filter', { type: 'tag', value: tag.name })"
        >
          #{{ tag.name }}
        </span>
      </div>
    </div>

    <!-- Archives -->
    <div class="sidebar-section">
      <h3 class="section-title">归档</h3>
      <div class="archive-list">
        <router-link
          v-for="archive in archives"
          :key="archive.date"
          :to="'/archive'"
          class="archive-item"
        >
          <span class="archive-date">{{ archive.date }}</span>
          <span class="archive-count">{{ archive.count }}</span>
        </router-link>
      </div>
    </div>

    <!-- Recent Posts -->
    <div class="sidebar-section">
      <h3 class="section-title">最新文章</h3>
      <div class="recent-posts">
        <router-link
          v-for="post in recentPosts"
          :key="post.id"
          :to="`/post/${post.id}`"
          class="recent-post-item"
        >
          <div class="recent-post-title">{{ post.title }}</div>
          <div class="recent-post-date">{{ formatDate(post.date) }}</div>
        </router-link>
      </div>
    </div>

    <!-- Timeline -->
    <div class="sidebar-section">
      <h3 class="section-title">文章时间轴</h3>
      <div class="timeline">
        <div
          v-for="post in timelinePosts"
          :key="post.id"
          class="timeline-item"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <router-link :to="`/post/${post.id}`" class="timeline-title">
              {{ post.title }}
            </router-link>
            <div class="timeline-date">{{ formatFullDate(post.date) }}</div>
            <div class="timeline-category">{{ post.category }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['search', 'filter'])

const searchQuery = ref('')

const categories = computed(() => {
  const categoryMap = {}
  props.posts.forEach(post => {
    const category = post.category || '未分类'
    categoryMap[category] = (categoryMap[category] || 0) + 1
  })
  return Object.entries(categoryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const tags = computed(() => {
  const tagMap = {}
  props.posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tagMap[tag] = (tagMap[tag] || 0) + 1
      })
    }
  })
  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
})

const archives = computed(() => {
  const archiveMap = {}
  props.posts.forEach(post => {
    const date = new Date(post.date)
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    archiveMap[yearMonth] = (archiveMap[yearMonth] || 0) + 1
  })
  return Object.entries(archiveMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => b.date.localeCompare(a.date))
})

const recentPosts = computed(() => props.posts.slice(0, 8))

const timelinePosts = computed(() => props.posts.slice(0, 10))

const getTagSize = (count) => {
  const maxCount = Math.max(...tags.value.map(t => t.count))
  const minSize = 12
  const maxSize = 20
  const size = minSize + (count / maxCount) * (maxSize - minSize)
  return `${size}px`
}

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric'
  })
}

const formatFullDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-section {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--primary);
}

.search-box {
  padding: 16px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text-primary);
  font-size: 14px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.category-list,
.archive-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item,
.archive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-item:hover,
.archive-item:hover {
  background: var(--bg);
  color: var(--primary);
}

.category-name,
.archive-date {
  font-size: 14px;
  color: var(--text-primary);
}

.category-count,
.archive-count {
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--bg);
  padding: 2px 8px;
  border-radius: 12px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  color: var(--text-primary);
  background: var(--bg);
  padding: 4px 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  border: 1px solid var(--border);
}

.tag-item:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.recent-posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-post-item {
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.recent-post-item:hover {
  background: var(--bg);
  border-color: var(--primary);
}

.recent-post-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recent-post-date {
  font-size: 12px;
  color: var(--text-secondary);
}

.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-item {
  position: relative;
  padding-bottom: 20px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -17px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid var(--bg-secondary);
  z-index: 1;
}

.timeline-content {
  padding-left: 8px;
}

.timeline-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
  line-height: 1.4;
  transition: color 0.2s;
}

.timeline-title:hover {
  color: var(--primary);
}

.timeline-date {
  font-size: 11px;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.timeline-category {
  display: inline-block;
  font-size: 11px;
  color: var(--primary);
  background: var(--bg);
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid var(--border);
}
</style>
