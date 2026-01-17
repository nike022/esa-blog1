# 📝 个人博客系统

基于 Vue 3 + Vite 的现代化静态博客系统，部署在 Alibaba Cloud ESA Pages

> **本项目由阿里云ESA提供加速、计算和保护**

![ESA Logo](https://img.alicdn.com/imgextra/i1/O1CN01qKJv7z1YXZxZxZxZx_!!6000000003067-2-tps-200-200.png)

## 🎯 项目介绍

### 实用性
这是一个开箱即用的个人博客系统，专为技术博主和内容创作者设计。用户只需编写Markdown文件即可发布文章，无需关心复杂的后端配置。系统提供完整的文章管理功能（分类、标签、归档、搜索），让内容创作者专注于写作本身。

### 创意性
- **现代化设计语言**：采用渐变色主题、流畅动画和卡片式布局，提供优雅的视觉体验
- **智能侧边栏**：集成搜索、分类、标签云、归档和时间轴，提供多维度的内容导航
- **增强的Markdown渲染**：不仅支持标准语法，还集成了Mermaid图表、KaTeX数学公式、代码高亮等高级功能
- **沉浸式阅读体验**：阅读进度条、目录导航、代码一键复制、返回顶部等细节优化

### 技术深度
- **Vue 3 Composition API**：使用最新的组合式API，代码组织更清晰，逻辑复用更灵活
- **客户端渲染优化**：解决了Markdown渲染的DOM时机问题，确保Mermaid图表和代码高亮正确渲染
- **响应式架构**：完全响应式设计，适配桌面、平板和移动设备
- **SEO优化**：完整的meta标签、自动生成sitemap、robots.txt配置
- **构建优化**：Vite快速构建，自动生成sitemap集成到构建流程

## ✨ 特性

- 📝 **Markdown 支持** - 完整的 Markdown 渲染，支持代码高亮、表格、数学公式
- 🎨 **Mermaid 图表** - 支持流程图、时序图、甘特图等多种图表
- 🧮 **数学公式** - 使用 KaTeX 渲染数学公式
- 🌓 **深色模式** - 支持亮色/深色主题切换，自动保存偏好
- 🔍 **文章搜索** - 实时搜索文章标题和内容
- 📱 **响应式布局** - 完美适配桌面、平板和移动设备
- 🏷️ **分类标签** - 文章分类和标签管理
- 📑 **目录导航** - 自动生成文章目录，支持锚点跳转
- 📊 **时间轴** - 侧边栏时间轴展示文章历史
- ⚡ **快速加载** - 静态生成，全球 CDN 加速
- 🔗 **SEO 优化** - 完整的 meta 标签和 sitemap

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 使用 Composition API
- **Vue Router 4** - 单页应用路由
- **Vite** - 快速构建工具

### Markdown 生态
- **marked.js** - Markdown 解析
- **marked-katex-extension** - 数学公式支持
- **Mermaid** - 图表渲染
- **highlight.js** - 代码语法高亮

### 部署平台
- **Alibaba Cloud ESA Pages** - 静态网站托管

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 生成 sitemap
npm run generate:sitemap
```

### 部署到 ESA Pages

1. 推送代码到 GitHub
2. 在 ESA Pages 控制台关联仓库
3. ESA 会自动读取 `esa.jsonc` 配置并构建部署

## 📁 项目结构

```
esa-blog1/
├── src/
│   ├── views/              # 页面组件
│   │   ├── Home.vue        # 首页 - 文章列表
│   │   ├── Post.vue        # 文章详情页
│   │   ├── Archive.vue     # 归档页面
│   │   ├── Categories.vue  # 分类页面
│   │   ├── Tags.vue        # 标签页面
│   │   └── About.vue       # 关于页面
│   ├── components/         # 组件目录
│   │   ├── Header.vue      # 顶部导航
│   │   ├── Footer.vue      # 底部信息
│   │   ├── Sidebar.vue     # 侧边栏
│   │   ├── Breadcrumb.vue  # 面包屑导航
│   │   ├── TableOfContents.vue  # 目录组件
│   │   ├── PostNavigation.vue   # 文章导航
│   │   └── ScrollToTop.vue      # 返回顶部
│   ├── posts/              # Markdown 文章目录
│   ├── utils/              # 工具函数
│   │   └── posts.js        # 文章处理逻辑
│   ├── App.vue             # 主应用
│   ├── main.js             # 入口文件
│   └── style.css           # 全局样式
├── scripts/
│   └── generate-sitemap.js # Sitemap 生成脚本
├── public/
│   ├── robots.txt          # 搜索引擎爬虫配置
│   └── sitemap.xml         # 网站地图（自动生成）
├── index.html              # HTML 模板
├── package.json
├── vite.config.js          # Vite 配置
└── esa.jsonc               # ESA Pages 配置
```

## 📖 添加文章

在 `src/posts/` 目录下创建新的 Markdown 文件：

```markdown
---
title: 文章标题
date: 2026-01-17
author: 作者名
category: 分类名
tags: [标签1, 标签2]
excerpt: 文章摘要
---

# 文章内容

这里是文章的正文内容...
```

### Frontmatter 字段说明

- `title`: 文章标题（必填）
- `date`: 发布日期（必填）
- `author`: 作者名称
- `category`: 文章分类
- `tags`: 标签数组
- `excerpt`: 文章摘要

## 🎨 功能特性

### Markdown 增强

支持标准 Markdown 语法，以及：

- 代码高亮（支持多种编程语言）
- 表格渲染
- 数学公式（KaTeX）
- Mermaid 图表
- 引用块
- 任务列表

### 文章管理

- 按分类浏览文章
- 按标签筛选文章
- 按时间归档
- 全文搜索
- 相关文章推荐

### 用户体验

- 阅读进度条
- 文章目录导航
- 代码一键复制
- 返回顶部按钮
- 响应式侧边栏

## 🔧 配置说明

### ESA Pages 配置 (esa.jsonc)

```json
{
  "build": {
    "installCommand": "npm install",
    "buildCommand": "npm run build",
    "outputDirectory": "dist"
  }
}
```

### Vite 配置

项目使用 Vite 作为构建工具，配置文件为 `vite.config.js`。

## 📄 开源协议

MIT License

## 🔗 相关链接

- [GitHub 仓库](https://github.com/nike022/esa-blog1)
- [在线演示](https://nike022.github.io/esa-blog1/)
- [Alibaba Cloud ESA Pages](https://www.alibabacloud.com/product/esa)
