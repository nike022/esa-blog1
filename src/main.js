import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Post from './views/Post.vue'
import Archive from './views/Archive.vue'
import Categories from './views/Categories.vue'
import Tags from './views/Tags.vue'
import About from './views/About.vue'
import 'highlight.js/styles/atom-one-dark.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/post/:id', component: Post },
    { path: '/archive', component: Archive },
    { path: '/categories', component: Categories },
    { path: '/tags', component: Tags },
    { path: '/about', component: About }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
