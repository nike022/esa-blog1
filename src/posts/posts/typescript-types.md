---
title: TypeScript 类型系统深入理解
date: 2026-01-10
author: 博主
category: 技术
tags: [TypeScript, 类型系统, 编程]
excerpt: TypeScript 的类型系统非常强大，本文深入探讨其高级特性和使用技巧。
---

# TypeScript 类型系统深入理解

TypeScript 为 JavaScript 添加了静态类型检查。

## 基础类型

```typescript
let name: string = '张三'
let age: number = 25
let isStudent: boolean = true
let hobbies: string[] = ['读书', '编程']
```

## 接口和类型别名

```typescript
interface User {
  id: number
  name: string
  email?: string
}

type Status = 'pending' | 'success' | 'error'
```

## 泛型

```typescript
function identity<T>(arg: T): T {
  return arg
}

const result = identity<string>('hello')
```

## 类型对比

| 特性 | interface | type |
|------|-----------|------|
| 扩展 | extends | & |
| 声明合并 | ✅ | ❌ |
| 联合类型 | ❌ | ✅ |
| 映射类型 | ❌ | ✅ |

## 高级类型

### 条件类型

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false
```

### 映射类型

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

## 最佳实践

1. 优先使用 interface 定义对象类型
2. 使用 type 定义联合类型和工具类型
3. 合理使用泛型提高代码复用性
4. 避免使用 any，使用 unknown 代替

> TypeScript 的类型系统图灵完备，可以实现非常复杂的类型推导。
