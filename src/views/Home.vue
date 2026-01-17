<template>
  <div class="home">
    <div class="posts-container">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <router-link :to="`/post/${post.id}`" class="post-link">
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="post-meta">
            <span class="post-date">{{ post.date }}</span>
          </div>
          <p class="post-excerpt">{{ post.excerpt }}</p>
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllPosts } from '../utils/posts'

const posts = ref([])

onMounted(async () => {
  posts.value = await getAllPosts()
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.posts-container {
  display: grid;
  gap: 2rem;
}

.post-card {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid var(--border);
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-link {
  text-decoration: none;
  color: inherit;
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.post-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>
