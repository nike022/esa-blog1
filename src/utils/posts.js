import { marked } from 'marked'
import hljs from 'highlight.js'

// 配置 marked
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

// 解析 Markdown 文件的 frontmatter
export function parseFrontmatter(markdown) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = markdown.match(frontmatterRegex)

  if (!match) {
    return { metadata: {}, content: markdown }
  }

  const [, frontmatterStr, content] = match
  const metadata = {}

  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim()

      // 解析数组 [tag1, tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim())
      }

      metadata[key.trim()] = value
    }
  })

  return { metadata, content: content.trim() }
}

// 解码 HTML 实体
function decodeHtmlEntities(text) {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

// 获取所有文章
export async function getAllPosts() {
  const postModules = import.meta.glob('/src/posts/*.md', {
    query: '?raw',
    import: 'default'
  })
  const posts = []

  for (const path in postModules) {
    const markdown = await postModules[path]()
    const { metadata, content } = parseFrontmatter(markdown)
    const id = path.split('/').pop().replace('.md', '')
    const htmlContent = marked(content)
    const plainText = htmlContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const decodedText = decodeHtmlEntities(plainText)
    const excerpt = decodedText.substring(0, 150) + '...'

    posts.push({
      id,
      ...metadata,
      content: htmlContent,
      excerpt
    })
  }

  // 按日期排序
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// 获取单篇文章
export async function getPost(id) {
  const postModules = import.meta.glob('/src/posts/*.md', {
    query: '?raw',
    import: 'default'
  })

  const path = `/src/posts/${id}.md`
  if (postModules[path]) {
    const markdown = await postModules[path]()
    const { metadata, content } = parseFrontmatter(markdown)
    const htmlContent = marked(content)
    return {
      id,
      ...metadata,
      content: htmlContent
    }
  }

  return null
}
