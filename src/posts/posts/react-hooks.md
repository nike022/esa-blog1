---
title: React Hooks 最佳实践
date: 2026-01-11
author: 博主
category: 技术
tags: [React, Hooks, 前端]
excerpt: React Hooks 改变了我们编写组件的方式，本文总结了 Hooks 的最佳实践。
---

# React Hooks 最佳实践

React Hooks 让函数组件拥有了状态和生命周期。

## 常用 Hooks

### useState

```javascript
const [count, setCount] = useState(0)

// 函数式更新
setCount(prev => prev + 1)
```

### useEffect

```javascript
useEffect(() => {
  // 副作用代码
  document.title = `Count: ${count}`

  // 清理函数
  return () => {
    document.title = 'React App'
  }
}, [count])
```

## Hooks 规则

| 规则 | 说明 |
|------|------|
| 只在顶层调用 | 不要在循环、条件或嵌套函数中调用 |
| 只在 React 函数中调用 | 函数组件或自定义 Hook |

## 自定义 Hook

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

## 性能优化

- 使用 useMemo 缓存计算结果
- 使用 useCallback 缓存函数
- 合理使用依赖数组

> **注意**: 过度优化可能适得其反，先确保代码正确，再考虑性能。
