<template>
  <nav class="post-navigation">
    <router-link
      v-if="prevPost"
      :to="`/post/${prevPost.id}`"
      class="nav-item prev"
    >
      <span class="nav-label">← 上一篇</span>
      <span class="nav-title">{{ prevPost.title }}</span>
    </router-link>
    <div v-else class="nav-item prev disabled">
      <span class="nav-label">← 上一篇</span>
      <span class="nav-title">没有了</span>
    </div>

    <router-link
      v-if="nextPost"
      :to="`/post/${nextPost.id}`"
      class="nav-item next"
    >
      <span class="nav-label">下一篇 →</span>
      <span class="nav-title">{{ nextPost.title }}</span>
    </router-link>
    <div v-else class="nav-item next disabled">
      <span class="nav-label">下一篇 →</span>
      <span class="nav-title">没有了</span>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  prevPost: {
    type: Object,
    default: null
  },
  nextPost: {
    type: Object,
    default: null
  }
})
</script>

<style scoped>
.post-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 48px;
  padding-top: 48px;
  border-top: 2px solid var(--border);
}

.nav-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
}

.nav-item:not(.disabled):hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--primary);
}

.nav-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-item.next {
  text-align: right;
}

.nav-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 600;
}

.nav-title {
  font-size: 18px;
  color: var(--text-primary);
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nav-item:not(.disabled):hover .nav-title {
  color: var(--primary);
}

@media (max-width: 768px) {
  .post-navigation {
    grid-template-columns: 1fr;
  }

  .nav-item.next {
    text-align: left;
  }
}
</style>
