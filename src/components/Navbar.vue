<template>
  <header class="navbar">
    <div class="container">
      <router-link to="/" class="logo" @click="handleLogoClick">
        <span class="logo-icon">📝</span>
        <span class="logo-text">我的博客</span>
      </router-link>

      <nav class="nav-menu">
        <router-link to="/" class="nav-link" @click="handleLogoClick">首页</router-link>
        <router-link to="/archive" class="nav-link">归档</router-link>
        <router-link to="/categories" class="nav-link">分类</router-link>
        <router-link to="/tags" class="nav-link">标签</router-link>
        <router-link to="/about" class="nav-link">关于</router-link>
      </nav>

      <div class="nav-actions">
        <button @click="$emit('toggle-theme')" class="theme-btn" aria-label="切换主题">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineEmits(['toggle-theme'])

const route = useRoute()

const handleLogoClick = () => {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

[data-theme="dark"] .navbar {
  background: rgba(17, 24, 39, 0.95);
}

.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
}

.logo-icon {
  font-size: 24px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 15px;
  transition: color 0.2s;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: width 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary);
}

.nav-link.router-link-active::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.theme-btn:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style>
