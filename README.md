# 📝 ESA 静态博客

基于 Vue 3 + Vite 的现代化静态博客，完整使用阿里云 ESA 生态（Pages + Functions + KV）

## ✨ 特性

- 📝 **Markdown 支持** - 使用 Markdown 编写文章，支持 frontmatter 元数据
- 🎨 **现代化设计** - 渐变主题、流畅动画、卡片效果
- 🌓 **深色模式** - 支持亮色/深色主题切换，自动保存偏好
- 🔍 **文章搜索** - 实时搜索文章标题、内容和标签
- 📊 **浏览量统计** - 使用 ESA Edge Functions + KV 实现文章浏览量统计
- 📱 **响应式布局** - 完美适配各种设备
- 🏷️ **标签系统** - 文章分类管理
- ⚡ **快速加载** - 静态生成，全球 CDN 加速

##  技术亮点

### 完整的 ESA 生态使用
- ✅ **ESA Pages** - 静态资源托管
- ✅ **ESA Edge Functions** - 处理浏览量 API
- ✅ **ESA Edge KV** - 存储浏览数据

### 现代化开发体验
- Vue 3 Composition API
- Vite 快速构建
- 简洁的代码结构

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 部署到 ESA Pages

1. 推送代码到 GitHub
2. 在 ESA Pages 控制台关联仓库
3. ESA 会自动读取 `esa.jsonc` 配置并构建部署

## 📁 项目结构

```
esa-blog/
├── src/
│   ├── views/
│   │   ├── Home.vue      # 首页 - 文章列表
│   │   └── Post.vue      # 文章详情页
│   ├── components/       # 组件目录
│   ├── posts/           # 文章目录（Markdown）
│   ├── App.vue          # 主应用
│   ├── main.js          # 入口文件
│   └── style.css        # 样式文件
├── index.html
├── package.json
├── vite.config.js
└── esa.jsonc           # ESA Pages 配置
```

## 📖 添加文章

在 `src/views/Post.vue` 中的 `posts` 对象添加新文章:

```javascript
const posts = {
  'my-post': {
    title: '文章标题',
    date: '2026-01-16',
    author: '作者',
    tags: ['标签1', '标签2'],
    content: `# Markdown 内容...`
  }
}
```

在 `src/views/Home.vue` 中添加文章摘要。

## 📦 技术栈

- Vue 3 - 渐进式 JavaScript 框架
- Vue Router 4 - 路由管理
- Vite - 快速构建工具
- Marked - Markdown 解析
- ESA Pages - 静态托管

## 📄 开源协议

MIT License
