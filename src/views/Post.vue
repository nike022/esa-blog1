<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <p class="date">{{ post.date }}</p>
    <div class="content" v-html="post.content"></div>
    <router-link to="/" class="back-link">← 返回首页</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref({
  title: '',
  date: '',
  content: ''
})

onMounted(() => {
  const postId = route.params.id

  const posts = {
    'hello-world': {
      title: 'Hello World',
      date: '2026-01-17',
      content: '<p>欢迎来到我的博客！这是第一篇文章。</p>'
    },
    'vue3-intro': {
      title: 'Vue 3 入门',
      date: '2026-01-16',
      content: '<p>Vue 3 是一个渐进式 JavaScript 框架。</p>'
    },
    'esa-pages': {
      title: 'ESA Pages 部署指南',
      date: '2026-01-15',
      content: '<p>ESA Pages 是阿里云的边缘计算平台。</p>'
    }
  }

  post.value = posts[postId] || { title: '文章未找到', date: '', content: '<p>抱歉，文章不存在。</p>' }
})
</script>

<style scoped>
.post {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.date {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.content {
  line-height: 1.8;
  margin-bottom: 2rem;
}

.back-link {
  color: #3498db;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
