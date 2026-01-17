<template>
  <nav class="breadcrumb" aria-label="面包屑导航">
    <router-link to="/" class="breadcrumb-item">首页</router-link>
    <span v-for="(item, index) in items" :key="index" class="breadcrumb-wrapper">
      <span class="breadcrumb-separator">/</span>
      <router-link
        v-if="item.to"
        :to="item.to"
        class="breadcrumb-item"
      >
        {{ item.label }}
      </router-link>
      <span v-else class="breadcrumb-item current">{{ item.label }}</span>
    </span>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 0;
  font-size: 14px;
}

.breadcrumb-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-separator {
  color: var(--text-secondary);
  user-select: none;
}

.breadcrumb-item {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-item:hover {
  color: var(--primary);
}

.breadcrumb-item.current {
  color: var(--text-primary);
  font-weight: 500;
}
</style>
