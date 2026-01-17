---
title: CSS Grid 布局完全指南
date: 2026-01-12
author: 博主
category: 技术
tags: [CSS, Grid, 布局]
excerpt: CSS Grid 是最强大的 CSS 布局系统，本文详细介绍其用法和最佳实践。
---

# CSS Grid 布局完全指南

CSS Grid 是二维布局系统，可以同时处理行和列。

## 基本概念

Grid 容器和 Grid 项目：

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## 常用属性对比

| 属性 | 作用 | 示例 |
|------|------|------|
| grid-template-columns | 定义列 | `1fr 2fr 1fr` |
| grid-template-rows | 定义行 | `100px auto` |
| gap | 间距 | `20px` |
| grid-area | 区域 | `header` |

## 实战示例

### 响应式布局

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
```

### 复杂布局

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 300px;
}
```

## 优势

- 强大的二维布局能力
- 简化复杂布局代码
- 原生响应式支持
- 浏览器性能优化

> Grid 和 Flexbox 不是竞争关系，而是互补的。Grid 适合整体布局，Flexbox 适合组件内部布局。
