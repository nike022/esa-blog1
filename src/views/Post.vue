<template>
  <div class="post-container">
    <article class="post">
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ post.date }}</span>
        </div>
      </header>
      <div class="post-content" v-html="post.content"></div>
    </article>
    <router-link to="/" class="back-link">← 返回首页</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPostById } from '../utils/posts'

const route = useRoute()
const post = ref({
  title: '',
  date: '',
  content: ''
})

onMounted(async () => {
  const postId = route.params.id
  post.value = await getPostById(postId)
})
</script>

<style scoped>
.post-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.post {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 3rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border);
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.post-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.post-content {
  line-height: 1.8;
  color: var(--text-primary);
}

.back-link {
  display: inline-block;
  color: var(--primary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.back-link:hover {
  background: var(--bg-secondary);
}
</style>
