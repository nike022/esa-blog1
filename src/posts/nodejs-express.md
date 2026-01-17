---
title: Node.js + Express 构建 RESTful API
date: 2026-01-14
author: 博主
category: 技术
tags: [Node.js, Express, API, 后端]
excerpt: 使用 Node.js 和 Express 框架构建高性能的 RESTful API，包括路由、中间件、错误处理等核心概念。
---

# Node.js + Express 构建 RESTful API

Express 是 Node.js 最流行的 Web 框架，简洁而强大。

## 快速开始

### 安装依赖

```bash
npm init -y
npm install express cors dotenv
npm install -D nodemon
```

### 基础服务器

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

## 路由设计

### RESTful 路由规范

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/users | 获取用户列表 |
| GET | /api/users/:id | 获取单个用户 |
| POST | /api/users | 创建用户 |
| PUT | /api/users/:id | 更新用户 |
| DELETE | /api/users/:id | 删除用户 |

### 路由实现

```javascript
const router = express.Router()

// 获取所有用户
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await User.countDocuments()

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// 创建用户
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

app.use('/api', router)
```

## 中间件

### 日志中间件

```javascript
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`)
  next()
}

app.use(logger)
```

### 认证中间件

```javascript
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// 使用认证中间件
router.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user })
})
```

## 错误处理

### 全局错误处理器

```javascript
// 404 处理
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  })
})
```

## 性能对比

| 框架 | 请求/秒 | 响应时间 |
|------|---------|----------|
| Express | 15,000 | 6.5ms |
| Fastify | 30,000 | 3.2ms |
| Koa | 18,000 | 5.5ms |

> **提示**: Express 虽然不是最快的，但生态系统最完善，中间件最丰富。
