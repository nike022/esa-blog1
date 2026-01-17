---
title: 算法与数学公式详解
date: 2026-01-19
author: 博主
category: 技术
tags: [算法, 数学, 数据结构]
excerpt: 深入探讨常见算法的数学原理，包含数学公式和流程图演示。
---

# 算法与数学公式详解

本文通过数学公式和流程图详细讲解常见算法的原理。

## 时间复杂度

### 常见复杂度

| 复杂度 | 名称 | 示例 |
|--------|------|------|
| $O(1)$ | 常数 | 数组访问 |
| $O(\log n)$ | 对数 | 二分查找 |
| $O(n)$ | 线性 | 遍历数组 |
| $O(n \log n)$ | 线性对数 | 快速排序 |
| $O(n^2)$ | 平方 | 冒泡排序 |

### 大O表示法

时间复杂度的数学定义：

$$
T(n) = O(f(n)) \iff \exists c > 0, n_0 > 0, \forall n \geq n_0: T(n) \leq c \cdot f(n)
$$

## 快速排序

### 算法流程

```mermaid
graph TD
    A[开始] --> B{数组长度 <= 1?}
    B -->|是| C[返回数组]
    B -->|否| D[选择基准元素]
    D --> E[分区操作]
    E --> F[递归排序左子数组]
    E --> G[递归排序右子数组]
    F --> H[合并结果]
    G --> H
    H --> I[结束]
```

### 代码实现

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr

  const pivot = arr[Math.floor(arr.length / 2)]
  const left = arr.filter(x => x < pivot)
  const middle = arr.filter(x => x === pivot)
  const right = arr.filter(x => x > pivot)

  return [...quickSort(left), ...middle, ...quickSort(right)]
}
```

### 平均时间复杂度推导

快速排序的平均时间复杂度：

$$
T(n) = T(k) + T(n-k-1) + \Theta(n)
$$

其中 $k$ 是分区后左侧元素个数。平均情况下：

$$
T(n) = 2T(n/2) + \Theta(n) = \Theta(n \log n)
$$

## 动态规划

### 斐波那契数列

递推公式：

$$
F(n) = \begin{cases}
0 & n = 0 \\
1 & n = 1 \\
F(n-1) + F(n-2) & n \geq 2
\end{cases}
$$

通项公式（Binet公式）：

$$
F(n) = \frac{1}{\sqrt{5}} \left[ \left(\frac{1+\sqrt{5}}{2}\right)^n - \left(\frac{1-\sqrt{5}}{2}\right)^n \right]
$$

### 代码实现

```javascript
// 动态规划实现
function fibonacci(n) {
  if (n <= 1) return n

  const dp = [0, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[n]
}

// 空间优化版本
function fibonacciOptimized(n) {
  if (n <= 1) return n

  let prev = 0, curr = 1
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr]
  }
  return curr
}
```

## 二分查找

### 算法流程图

```mermaid
graph TD
    A[开始] --> B[设置 left=0, right=n-1]
    B --> C{left <= right?}
    C -->|否| D[返回 -1]
    C -->|是| E[计算 mid]
    E --> F{找到目标?}
    F -->|是| G[返回 mid]
    F -->|否| H{mid值小于目标?}
    H -->|是| I[left = mid + 1]
    H -->|否| J[right = mid - 1]
    I --> C
    J --> C
```

### 代码实现

```javascript
function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}
```

### 时间复杂度分析

每次迭代将搜索空间减半：

$$
T(n) = T(n/2) + O(1)
$$

根据主定理：

$$
T(n) = O(\log n)
$$

## 最短路径算法

### Dijkstra 算法流程

```mermaid
graph LR
    A[初始化距离数组] --> B[选择未访问的最小距离节点]
    B --> C[标记为已访问]
    C --> D[更新相邻节点距离]
    D --> E{所有节点已访问?}
    E -->|否| B
    E -->|是| F[返回最短路径]
```

### 距离更新公式

对于边 $(u, v)$，更新距离：

$$
dist[v] = \min(dist[v], dist[u] + weight(u, v))
$$

## 概率与期望

### 随机算法期望时间

对于随机快速排序，期望比较次数：

$$
E[X] = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} \frac{2}{j-i+1} = 2n \ln n - O(n)
$$

### 哈希冲突概率

使用 $m$ 个桶存储 $n$ 个元素，冲突概率：

$$
P(\text{collision}) = 1 - \frac{m!}{m^n(m-n)!} \approx 1 - e^{-\frac{n^2}{2m}}
$$

## 总结

算法分析离不开数学工具：

- 递推关系求解时间复杂度
- 概率论分析随机算法
- 图论解决路径问题
- 动态规划优化递归计算

> **提示**: 掌握数学基础能帮助我们更深入理解算法本质。
