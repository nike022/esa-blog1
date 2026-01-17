import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = 'https://nike022.github.io/esa-blog1'

// 解析frontmatter
function parseFrontmatter(markdown) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = markdown.match(frontmatterRegex)

  if (!match) return null

  const frontmatter = match[1]
  const metadata = {}

  frontmatter.split('\n').forEach(line => {
    const [key, ...values] = line.split(':')
    if (key && values.length) {
      const value = values.join(':').trim()
      metadata[key.trim()] = value
    }
  })

  return metadata
}

// 生成sitemap
function generateSitemap() {
  const postsDir = path.join(__dirname, '../src/posts')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))

  const urls = [
    {
      loc: SITE_URL,
      changefreq: 'daily',
      priority: '1.0',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      loc: `${SITE_URL}/archive`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      loc: `${SITE_URL}/categories`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      loc: `${SITE_URL}/tags`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      loc: `${SITE_URL}/about`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: new Date().toISOString().split('T')[0]
    }
  ]

  // 添加文章页面
  files.forEach(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
    const metadata = parseFrontmatter(content)
    const id = file.replace('.md', '')

    urls.push({
      loc: `${SITE_URL}/post/${id}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: metadata?.date || new Date().toISOString().split('T')[0]
    })
  })

  // 生成XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // 写入文件
  const publicDir = path.join(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml)
  console.log(`✅ Sitemap generated with ${urls.length} URLs`)
  console.log(`📍 Location: public/sitemap.xml`)
}

generateSitemap()
