<template>
  <div v-if="headings.length > 0" class="toc">
    <h3 class="toc-title">目录</h3>
    <nav class="toc-nav">
      <a
        v-for="heading in headings"
        :key="heading.id"
        :href="`#${heading.id}`"
        :class="['toc-link', `toc-level-${heading.level}`, { active: activeId === heading.id }]"
        @click.prevent="scrollToHeading(heading.id)"
      >
        {{ heading.text }}
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const headings = ref([])
const activeId = ref('')

const extractHeadings = () => {
  const content = document.querySelector('.post-content')
  if (!content) return

  const elements = content.querySelectorAll('h2, h3')
  headings.value = Array.from(elements).map((el, index) => {
    const id = `heading-${index}`
    el.id = id
    return {
      id,
      text: el.textContent,
      level: parseInt(el.tagName.charAt(1))
    }
  })
}

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const updateActiveHeading = () => {
  const headingElements = headings.value.map(h => document.getElementById(h.id))
  const scrollPosition = window.scrollY + 100

  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]
    if (element && element.offsetTop <= scrollPosition) {
      activeId.value = headings.value[i].id
      return
    }
  }
}

onMounted(() => {
  setTimeout(extractHeadings, 100)
  window.addEventListener('scroll', updateActiveHeading)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<style scoped>
.toc {
  position: sticky;
  top: 100px;
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border);
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}

.toc-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toc-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.2s;
  padding: 6px 12px;
  border-radius: 6px;
  border-left: 2px solid transparent;
}

.toc-link:hover {
  color: var(--primary);
  background: var(--bg);
}

.toc-link.active {
  color: var(--primary);
  background: var(--bg);
  border-left-color: var(--primary);
  font-weight: 600;
}

.toc-level-3 {
  padding-left: 24px;
  font-size: 13px;
}

.toc::-webkit-scrollbar {
  width: 4px;
}

.toc::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}
</style>
