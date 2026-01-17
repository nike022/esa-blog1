import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Post from './views/Post.vue'
import About from './views/About.vue'
import 'highlight.js/styles/atom-one-dark.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/post/:id', component: Post },
    { path: '/about', component: About },
    { path: '/archive', redirect: '/' },
    { path: '/categories', redirect: '/' },
    { path: '/tags', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
