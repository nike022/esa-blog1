---
title: 前端三剑客：HTML、CSS、JavaScript 基础
date: 2026-01-20
author: 博主
category: 技术
tags: [HTML, CSS, JavaScript, 前端]
excerpt: 深入学习前端开发的三大核心技术：HTML 结构、CSS 样式和 JavaScript 交互。
---

# 前端三剑客：HTML、CSS、JavaScript 基础

前端开发的核心是 HTML、CSS 和 JavaScript 三大技术。

## HTML 结构

### 基础标签

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的网页</title>
</head>
<body>
  <header>
    <h1>欢迎来到我的网站</h1>
    <nav>
      <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#contact">联系</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>文章标题</h2>
      <p>这是一段文字内容。</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 我的网站</p>
  </footer>
</body>
</html>
```

### 表单元素

```html
<form action="/submit" method="POST">
  <div class="form-group">
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username" required>
  </div>

  <div class="form-group">
    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="password">密码：</label>
    <input type="password" id="password" name="password" required>
  </div>

  <div class="form-group">
    <label for="bio">个人简介：</label>
    <textarea id="bio" name="bio" rows="4"></textarea>
  </div>

  <button type="submit">提交</button>
</form>
```

## CSS 样式

### 基础样式

```css
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 导航栏 */
nav {
  background-color: #333;
  color: white;
  padding: 1rem 0;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

nav a:hover {
  color: #4CAF50;
}
```

### Flexbox 布局

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.flex-item {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
}
```

### 动画效果

```css
/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* 按钮悬停效果 */
.button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
```

## JavaScript 交互

### DOM 操作

```javascript
// 获取元素
const button = document.getElementById('myButton')
const container = document.querySelector('.container')
const items = document.querySelectorAll('.item')

// 修改内容
button.textContent = '点击我'
container.innerHTML = '<p>新内容</p>'

// 修改样式
button.style.backgroundColor = '#4CAF50'
button.classList.add('active')
button.classList.toggle('hidden')

// 事件监听
button.addEventListener('click', function(event) {
  console.log('按钮被点击了！')
  event.preventDefault()
})

// 创建新元素
const newDiv = document.createElement('div')
newDiv.className = 'box'
newDiv.textContent = '新元素'
container.appendChild(newDiv)
```

### 异步请求

```javascript
// Fetch API
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

// POST 请求
async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  return response.json()
}

// 使用
fetchData()
postData('/api/users', { name: '张三', age: 25 })
```

### 实用工具函数

```javascript
// 防抖函数
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 节流函数
function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 深拷贝
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj

  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Array) return obj.map(item => deepClone(item))

  const clonedObj = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }
  return clonedObj
}

// 使用示例
const searchInput = document.querySelector('#search')
searchInput.addEventListener('input', debounce((e) => {
  console.log('搜索:', e.target.value)
}, 300))
```

## 完整示例：待办事项应用

### HTML

```html
<div class="todo-app">
  <h1>待办事项</h1>
  <div class="input-group">
    <input type="text" id="todoInput" placeholder="添加新任务...">
    <button id="addBtn">添加</button>
  </div>
  <ul id="todoList"></ul>
</div>
```

### CSS

```css
.todo-app {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todoInput {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
}

#todoList {
  list-style: none;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background: #f9f9f9;
  border-radius: 5px;
}

.todo-item.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
```

### JavaScript

```javascript
class TodoApp {
  constructor() {
    this.todos = []
    this.input = document.getElementById('todoInput')
    this.addBtn = document.getElementById('addBtn')
    this.list = document.getElementById('todoList')

    this.init()
  }

  init() {
    this.addBtn.addEventListener('click', () => this.addTodo())
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo()
    })
  }

  addTodo() {
    const text = this.input.value.trim()
    if (!text) return

    const todo = {
      id: Date.now(),
      text: text,
      completed: false
    }

    this.todos.push(todo)
    this.render()
    this.input.value = ''
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      this.render()
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id)
    this.render()
  }

  render() {
    this.list.innerHTML = this.todos.map(todo => `
      <li class="todo-item ${todo.completed ? 'completed' : ''}">
        <span onclick="app.toggleTodo(${todo.id})">${todo.text}</span>
        <button onclick="app.deleteTodo(${todo.id})">删除</button>
      </li>
    `).join('')
  }
}

const app = new TodoApp()
```

> **提示**: 前端开发需要不断实践，多写代码才能熟练掌握这些技术。
