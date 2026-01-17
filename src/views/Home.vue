<template>
  <div class="home">
    <h2>文章列表</h2>
    <div class="posts">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h3>
          <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
        </h3>
        <p class="date">{{ post.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  { id: 'hello-world', title: 'Hello World', date: '2026-01-17' },
  { id: 'vue3-intro', title: 'Vue 3 入门', date: '2026-01-16' },
  { id: 'esa-pages', title: 'ESA Pages 部署指南', date: '2026-01-15' }
])
</script>

<style scoped>
.home {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-card {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: box-shadow 0.2s;
}

.post-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.post-card h3 {
  margin: 0 0 0.5rem 0;
}

.post-card a {
  color: #3498db;
  text-decoration: none;
}

.post-card a:hover {
  text-decoration: underline;
}

.date {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
}
</style>
