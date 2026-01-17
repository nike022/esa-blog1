---
title: 使用 ESA Pages 部署静态网站
date: 2026-01-14
author: 博主
category: 技术
tags: [ESA, 部署, 教程]
excerpt: ESA Pages 是阿里云提供的边缘计算服务，可以快速部署静态网站。本文介绍如何使用 ESA Pages。
---

# 使用 ESA Pages 部署静态网站

ESA Pages 是阿里云提供的边缘计算服务。

## 部署步骤

### 1. 创建项目

首先创建一个静态网站项目。

### 2. 配置 esa.jsonc

```json
{
  "name": "my-site",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "assets": {
    "directory": "./dist"
  }
}
```

### 3. 推送到 GitHub

将代码推送到 GitHub 仓库。

### 4. 在 ESA 控制台关联仓库

在 ESA Pages 控制台关联你的 GitHub 仓库，ESA 会自动构建和部署。

## 优势

- 全球 CDN 加速
- 自动构建部署
- 免费 HTTPS
- 高可用性

就是这么简单！
