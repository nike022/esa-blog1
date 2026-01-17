<template>
  <div class="hero-carousel">
    <div class="carousel-container">
      <div class="carousel-slide" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(post, index) in featuredPosts" :key="post.id" class="slide-item">
          <router-link :to="`/post/${post.id}`" class="slide-link">
            <div class="slide-image">
              <img :src="`https://picsum.photos/1200/500?random=${post.id}`" :alt="post.title" />
              <div class="slide-overlay"></div>
            </div>
            <div class="slide-content">
              <div class="slide-category">{{ post.category || '未分类' }}</div>
              <h2 class="slide-title">{{ post.title }}</h2>
              <p class="slide-excerpt">{{ post.excerpt }}</p>
              <div class="slide-meta">
                <span>📅 {{ formatDate(post.date) }}</span>
                <span>✍️ {{ post.author }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <button class="carousel-btn prev" @click="prev" v-if="featuredPosts.length > 1">‹</button>
    <button class="carousel-btn next" @click="next" v-if="featuredPosts.length > 1">›</button>
    <div class="carousel-dots" v-if="featuredPosts.length > 1">
      <span
        v-for="(post, index) in featuredPosts"
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="goTo(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
let autoPlayTimer = null

const featuredPosts = computed(() => props.posts.slice(0, 5))

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % featuredPosts.value.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + featuredPosts.value.length) % featuredPosts.value.length
}

const goTo = (index) => {
  currentIndex.value = index
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    next()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.hero-carousel {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 16px;
  background: var(--bg-secondary);
}

.carousel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slide {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}

.slide-item {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.slide-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.slide-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48px;
  color: white;
  z-index: 1;
}

.slide-category {
  display: inline-block;
  padding: 6px 14px;
  background: var(--primary);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.slide-title {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.2;
}

.slide-excerpt {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 16px;
  line-height: 1.6;
}

.slide-meta {
  display: flex;
  gap: 24px;
  font-size: 15px;
  opacity: 0.8;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn.prev {
  left: 24px;
}

.carousel-btn.next {
  right: 24px;
}

.carousel-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 2;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: white;
  width: 32px;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 400px;
  }

  .slide-content {
    padding: 24px;
  }

  .slide-title {
    font-size: 28px;
  }

  .slide-excerpt {
    font-size: 16px;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}
</style>
