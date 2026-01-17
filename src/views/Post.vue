<template>
  <div class="post-page">
    <div class="container-wide">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <!-- Breadcrumb -->
        <Breadcrumb :items="breadcrumbItems" />

        <div class="post-layout">
          <!-- Main Content -->
          <article class="post-article">
            <div class="post-header">
            <div class="post-category">{{ post.category || '未分类' }}</div>
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="post-meta">
              <span>📅 {{ formatDate(post.date) }}</span>
              <span>✍️ {{ post.author }}</span>
              <span v-if="views !== null" class="views">
                👁️ {{ views }} 次浏览
              </span>
            </div>
            <div class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
          </div>

          <div class="post-content" v-html="renderedContent"></div>

          <!-- Post Navigation -->
          <PostNavigation :prev-post="prevPost" :next-post="nextPost" />
        </article>

        <!-- TOC Sidebar -->
        <aside class="toc-sidebar">
          <TableOfContents />
        </aside>
      </div>
    </div>

    <!-- Reading Progress Bar -->
    <div class="reading-progress" :style="{ width: readingProgress + '%' }"></div>

    <!-- Scroll to Top Button -->
    <ScrollToTop />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onUpdated, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import mermaid from 'mermaid'
import hljs from 'highlight.js'
import { getPost, getAdjacentPosts } from '../utils/posts'
import TableOfContents from '../components/TableOfContents.vue'
import PostNavigation from '../components/PostNavigation.vue'
import ScrollToTop from '../components/ScrollToTop.vue'
import Breadcrumb from '../components/Breadcrumb.vue'

// Configure marked with KaTeX extension
marked.use(markedKatex({ throwOnError: false }))

// Initialize Mermaid
mermaid.initialize({ startOnLoad: false, theme: 'default' })

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref('')
const views = ref(null)
const readingProgress = ref(0)
const prevPost = ref(null)
const nextPost = ref(null)
const contentProcessed = ref(false)

const renderedContent = computed(() => {
  if (!post.value) return ''
  return marked(post.value.content)
})

const breadcrumbItems = computed(() => {
  if (!post.value) return []
  return [
    { label: post.value.category || '未分类', to: '/categories' },
    { label: post.value.title }
  ]
})

// Process content after DOM updates
onUpdated(async () => {
  if (!loading.value && !error.value && !contentProcessed.value) {
    await nextTick()
    await processContent()
    contentProcessed.value = true
  }
})

const processContent = async () => {
  console.log('🎨 === Content Processing Start ===')
  await renderMermaid()
  addCopyButtons()
  wrapTables()
  highlightCode()
  console.log('✨ === Content Processing Complete ===')
}

const renderMermaid = async () => {
  console.log('🎨 === Mermaid Rendering Start ===')

  // Wait for DOM to be ready
  await nextTick()
  await nextTick()

  // Debug: Check the rendered HTML content
  const postContent = document.querySelector('.post-content')
  if (!postContent) {
    console.error('❌ .post-content element not found! Retrying...')
    await nextTick()
    const retryContent = document.querySelector('.post-content')
    if (!retryContent) {
      console.error('❌ Still not found after retry. Aborting.')
      return
    }
    console.log('✅ Found .post-content after retry')
  }

  if (postContent) {
    console.log('📄 Post content HTML length:', postContent.innerHTML.length)
    console.log('📄 Post content preview:', postContent.innerHTML.substring(0, 500))
  }

  const codeBlocks = document.querySelectorAll('.post-content pre code.language-mermaid')
  console.log(`🔍 Found ${codeBlocks.length} Mermaid code blocks`)

  if (codeBlocks.length === 0) {
    console.warn('⚠️ No Mermaid blocks found. Checking all code blocks:')
    const allCodeBlocks = document.querySelectorAll('.post-content pre code')
    console.log(`  Total code blocks found: ${allCodeBlocks.length}`)
    allCodeBlocks.forEach((block, i) => {
      console.log(`  Code block ${i + 1}: class="${block.className}", text preview: "${block.textContent.substring(0, 50)}"`)
    })

    // Also check for any pre elements
    const allPre = document.querySelectorAll('.post-content pre')
    console.log(`  Total <pre> elements found: ${allPre.length}`)
  }

  for (let i = 0; i < codeBlocks.length; i++) {
    const codeBlock = codeBlocks[i]
    const code = codeBlock.textContent
    const pre = codeBlock.parentElement

    console.log(`📊 Processing Mermaid block ${i + 1}/${codeBlocks.length}`)
    console.log(`  Code length: ${code.length}`)
    console.log(`  Code preview: ${code.substring(0, 100)}...`)
    console.log(`  Parent element: ${pre.tagName}`)

    try {
      console.log(`  🔄 Calling mermaid.render()...`)
      const { svg } = await mermaid.render(`mermaid-${Date.now()}-${i}`, code)
      console.log(`  ✅ Render successful, SVG length: ${svg.length}`)

      const div = document.createElement('div')
      div.className = 'mermaid-diagram'
      div.innerHTML = svg
      console.log(`  🔄 Replacing <pre> with <div class="mermaid-diagram">`)
      pre.replaceWith(div)
      console.log(`  ✅ Replacement complete for block ${i + 1}`)
    } catch (error) {
      console.error(`❌ Mermaid rendering error for block ${i + 1}:`, error)
      console.error(`  Failed code:`, code)
    }
  }
  console.log('✨ === Mermaid Rendering Complete ===')
}

const addCopyButtons = () => {
  const codeBlocks = document.querySelectorAll('pre:not(.has-copy-button):not(:has(code.language-mermaid))')

  codeBlocks.forEach(pre => {
    const button = document.createElement('button')
    button.className = 'copy-button'
    button.textContent = '复制'
    button.onclick = async () => {
      const code = pre.querySelector('code')
      if (code) {
        try {
          await navigator.clipboard.writeText(code.textContent)
          button.textContent = '已复制!'
          button.classList.add('copied')
          setTimeout(() => {
            button.textContent = '复制'
            button.classList.remove('copied')
          }, 2000)
        } catch (err) {
          console.error('复制失败:', err)
          button.textContent = '复制失败'
          setTimeout(() => {
            button.textContent = '复制'
          }, 2000)
        }
      }
    }
    pre.appendChild(button)
    pre.classList.add('has-copy-button')
  })
}

const wrapTables = () => {
  const tables = document.querySelectorAll('.post-content table:not(.wrapped)')

  console.log('=== Table Debug ===')
  console.log('Found tables:', tables.length)

  tables.forEach((table, index) => {
    console.log(`Table ${index}:`, {
      rows: table.rows.length,
      columns: table.rows[0]?.cells.length,
      hasTheadElement: !!table.querySelector('thead'),
      hasTbodyElement: !!table.querySelector('tbody')
    })

    const wrapper = document.createElement('div')
    wrapper.className = 'table-wrapper'
    table.parentNode.insertBefore(wrapper, table)
    wrapper.appendChild(table)
    table.classList.add('wrapped')
  })
}

const highlightCode = () => {
  const codeBlocks = document.querySelectorAll('pre code:not(.hljs)')
  codeBlocks.forEach(block => {
    hljs.highlightElement(block)
  })
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const updateReadingProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  const trackLength = documentHeight - windowHeight
  const progress = (scrollTop / trackLength) * 100
  readingProgress.value = Math.min(100, Math.max(0, progress))
}

onMounted(async () => {
  const postData = await getPost(route.params.id)
  if (postData) {
    post.value = postData
    fetchViews(route.params.id)

    // 获取相邻文章
    const adjacent = await getAdjacentPosts(route.params.id)
    prevPost.value = adjacent.prev
    nextPost.value = adjacent.next
  } else {
    error.value = '文章不存在'
  }
  loading.value = false

  window.addEventListener('scroll', updateReadingProgress)
  updateReadingProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateReadingProgress)
})

async function fetchViews(postId) {
  try {
    // 先增加阅读量
    const incrementResponse = await fetch(`/api/views?postId=${postId}`, {
      method: 'POST'
    })

    if (incrementResponse.ok) {
      const data = await incrementResponse.json()
      views.value = data.views
    }
  } catch (e) {
    console.error('Failed to update views:', e)
    // 如果增加失败,尝试只获取当前阅读量
    try {
      const getResponse = await fetch(`/api/views?postId=${postId}`)
      if (getResponse.ok) {
        const data = await getResponse.json()
        views.value = data.views
      }
    } catch (err) {
      console.error('Failed to fetch views:', err)
    }
  }
}
</script>

<style scoped>
.post-page {
  min-height: 100vh;
  background: var(--bg);
  padding: 32px 0 80px;
}

.container-wide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.post-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 48px;
}

.post-article {
  min-width: 0;
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 48px;
  border: 1px solid var(--border);
}

.post-header {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 2px solid var(--border);
}

.post-category {
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

.post-title {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 20px;
}

.post-meta {
  display: flex;
  gap: 24px;
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 14px;
  color: white;
  background: var(--primary);
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 500;
}

.post-content {
  font-size: 17px;
  line-height: 1.8;
  color: var(--text-primary);
}

.post-content :deep(h2) {
  font-size: 32px;
  font-weight: 700;
  margin: 48px 0 24px;
  color: var(--text-primary);
}

.post-content :deep(h3) {
  font-size: 24px;
  font-weight: 600;
  margin: 32px 0 16px;
  color: var(--text-primary);
}

.post-content :deep(p) {
  margin-bottom: 20px;
}

.post-content :deep(code) {
  background: var(--bg);
  padding: 3px 8px;
  border-radius: 6px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 15px;
  border: 1px solid var(--border);
}

.post-content :deep(pre) {
  position: relative;
  background: #282c34;
  padding: 24px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 24px 0;
  border: 1px solid var(--border);
  color: #ffffff;
}

.post-content :deep(pre.has-copy-button) {
  padding-top: 48px;
}

.post-content :deep(.copy-button) {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}

.post-content :deep(.copy-button:hover) {
  opacity: 0.8;
  transform: translateY(-1px);
}

.post-content :deep(.copy-button.copied) {
  background: #4CAF50;
}

.post-content :deep(pre code) {
  background: none;
  padding: 0;
  border: none;
  color: #ffffff;
}

.post-content :deep(a) {
  color: var(--primary);
  text-decoration: none;
  border-bottom: 1px solid var(--primary);
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 20px 0;
  padding-left: 32px;
}

.post-content :deep(li) {
  margin-bottom: 12px;
}

.post-content :deep(blockquote) {
  border-left: 4px solid var(--primary);
  padding-left: 24px;
  margin: 24px 0;
  color: var(--text-secondary);
  font-style: italic;
  background: var(--bg);
  padding: 20px 24px;
  border-radius: 8px;
}

.post-content :deep(.table-wrapper) {
  overflow-x: auto;
  margin: 24px 0;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.post-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  background: var(--bg-secondary);
}

.post-content :deep(thead) {
  background: var(--primary);
  color: white;
}

.post-content :deep(th) {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

.post-content :deep(th:last-child) {
  border-right: none;
}

.post-content :deep(td) {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border);
  font-size: 15px;
}

.post-content :deep(td:last-child) {
  border-right: none;
}

.post-content :deep(tbody tr:last-child td) {
  border-bottom: none;
}

.post-content :deep(tbody tr:hover) {
  background: var(--bg);
}

.post-content :deep(.mermaid-diagram) {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  margin: 24px 0;
  border: 1px solid var(--border);
  overflow-x: auto;
  text-align: center;
}

.post-content :deep(.mermaid-diagram svg) {
  max-width: 100%;
  height: auto;
  display: inline-block;
}

.toc-sidebar {
  position: relative;
}

.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--gradient-1);
  transition: width 0.1s ease;
  z-index: 1000;
}

.loading,
.error {
  text-align: center;
  padding: 80px 20px;
  font-size: 18px;
}

.error {
  color: var(--accent);
}

@media (max-width: 1200px) {
  .post-layout {
    grid-template-columns: 1fr;
  }

  .toc-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .post-article {
    padding: 32px 24px;
  }

  .post-title {
    font-size: 32px;
  }

  .post-content {
    font-size: 16px;
  }

  .post-content :deep(h2) {
    font-size: 26px;
  }
}
</style>
