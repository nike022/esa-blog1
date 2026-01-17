---
title: Vue 3 Composition API 深度解析
date: 2026-01-15
author: 博主
category: 技术
tags: [Vue3, Composition API, 响应式]
excerpt: 深入理解 Vue 3 Composition API 的设计理念和使用方法，掌握 ref、reactive、computed 等核心 API。
---

# Vue 3 Composition API 深度解析

Composition API 是 Vue 3 最重要的新特性，提供了更灵活的代码组织方式。

## 响应式基础

### ref vs reactive

```javascript
import { ref, reactive } from 'vue'

// ref - 适合基本类型
const count = ref(0)
console.log(count.value) // 需要 .value 访问

// reactive - 适合对象
const state = reactive({
  count: 0,
  name: 'Vue'
})
console.log(state.count) // 直接访问
```

### 响应式对比

| API | 适用类型 | 访问方式 | 解构 |
|-----|----------|----------|------|
| ref | 基本类型 | .value | ❌ 失去响应式 |
| reactive | 对象 | 直接访问 | ❌ 失去响应式 |
| toRefs | 对象 | .value | ✅ 保持响应式 |

## 计算属性和侦听器

### computed

```javascript
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value}${lastName.value}`
})

// 可写计算属性
const fullNameWritable = computed({
  get() {
    return `${firstName.value}${lastName.value}`
  },
  set(value) {
    [firstName.value, lastName.value] = value.split('')
  }
})
```

### watch vs watchEffect

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const doubled = ref(0)

// watch - 明确指定依赖
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`)
  doubled.value = newVal * 2
})

// watchEffect - 自动追踪依赖
watchEffect(() => {
  console.log(`count is ${count.value}`)
  doubled.value = count.value * 2
})
```

## 生命周期钩子

### Options API vs Composition API

| Options API | Composition API |
|-------------|-----------------|
| beforeCreate | setup() |
| created | setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeUnmount | onBeforeUnmount |
| unmounted | onUnmounted |

### 使用示例

```javascript
import { onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    let timer = null

    onMounted(() => {
      console.log('Component mounted')
      timer = setInterval(() => {
        console.log('Tick')
      }, 1000)
    })

    onUnmounted(() => {
      console.log('Component unmounted')
      if (timer) clearInterval(timer)
    })
  }
}
```

## 组合式函数 (Composables)

### 自定义 Hook

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubled = computed(() => count.value * 2)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count,
    doubled,
    increment,
    decrement,
    reset
  }
}

// 使用
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, doubled, increment } = useCounter(10)

    return { count, doubled, increment }
  }
}
```

### 鼠标位置追踪

```javascript
// useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
```

## Provide / Inject

### 跨层级组件通信

```javascript
// 父组件
import { provide, ref } from 'vue'

export default {
  setup() {
    const theme = ref('dark')
    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }

    provide('theme', theme)
    provide('toggleTheme', toggleTheme)
  }
}

// 子组件（任意层级）
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme')
    const toggleTheme = inject('toggleTheme')

    return { theme, toggleTheme }
  }
}
```

## 性能优化

### shallowRef 和 shallowReactive

```javascript
import { shallowRef, shallowReactive } from 'vue'

// 只有 .value 的改变会触发更新
const state = shallowRef({ count: 0 })
state.value.count++ // 不会触发更新
state.value = { count: 1 } // 会触发更新

// 只有根级别属性的改变会触发更新
const obj = shallowReactive({
  nested: { count: 0 }
})
obj.nested.count++ // 不会触发更新
obj.nested = { count: 1 } // 会触发更新
```

> **最佳实践**: Composition API 让代码更易于组织和复用，但不要过度拆分，保持适当的粒度。
