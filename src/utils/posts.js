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

    posts.push({
      id,
      ...metadata,
      content
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
    return {
      id,
      ...metadata,
      content
    }
  }

  return null
}

// 获取相邻文章（上一篇和下一篇）
export async function getAdjacentPosts(currentId) {
  const allPosts = await getAllPosts()
  const currentIndex = allPosts.findIndex(post => post.id === currentId)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  }
}
