---
title: Markdown 完整语法演示
date: 2026-01-17
author: 博主
category: 技术
tags: [Markdown, 教程, 语法]
excerpt: 这篇文章展示了 Markdown 的所有常用语法，包括表格、代码块、公式等。
---

# Markdown 完整语法演示

这篇文章展示了 Markdown 的各种语法特性。

## 文本格式

**粗体文字** 和 *斜体文字* 以及 ***粗斜体***

~~删除线文字~~

## 列表

### 无序列表
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

### 有序列表
1. 第一项
2. 第二项
3. 第三项

## 表格

| 功能 | 支持 | 说明 |
|------|------|------|
| 文章管理 | ✅ | 支持 Markdown |
| 分类系统 | ✅ | 多级分类 |
| 标签系统 | ✅ | 标签云 |
| 搜索功能 | ✅ | 实时搜索 |
| 评论系统 | ⏳ | 计划中 |

## 代码块

### JavaScript 代码
```javascript
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(10)) // 55
```

### Python 代码
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

## 引用

> 这是一段引用文字。
>
> 引用可以包含多个段落。

## 链接和图片

[访问 GitHub](https://github.com)

## 分隔线

---

## 总结

Markdown 是一种轻量级标记语言，非常适合写作和文档编写。
