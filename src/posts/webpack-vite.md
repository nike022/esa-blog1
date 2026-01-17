---
title: Webpack vs Vite 构建工具对比
date: 2026-01-16
author: 博主
category: 技术
tags: [Webpack, Vite, 构建工具, 前端工程化]
excerpt: 深入对比 Webpack 和 Vite 两大主流构建工具的特点、性能和使用场景。
---

# Webpack vs Vite 构建工具对比

现代前端开发离不开构建工具，Webpack 和 Vite 是当前最流行的选择。

## 核心差异

### 工作原理对比

| 特性 | Webpack | Vite |
|------|---------|------|
| 开发模式 | Bundle-based | ESM-based |
| 冷启动 | 慢（需打包） | 快（按需编译） |
| 热更新 | 较慢 | 极快 |
| 生产构建 | Webpack | Rollup |
| 浏览器支持 | 广泛 | 现代浏览器 |

## Webpack 配置

### 基础配置

```javascript
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        }
      }
    }
  }
}
```

### 开发服务器配置

```javascript
module.exports = {
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
```

## Vite 配置

### 基础配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    }
  }
})
```

### 环境变量

```javascript
// .env.development
VITE_API_URL=http://localhost:8080
VITE_APP_TITLE=My App

// 使用
console.log(import.meta.env.VITE_API_URL)
```

## 性能对比

### 启动时间对比

| 项目规模 | Webpack | Vite |
|----------|---------|------|
| 小型 (< 100 模块) | 2-3s | 0.3s |
| 中型 (100-500 模块) | 5-10s | 0.5s |
| 大型 (> 500 模块) | 15-30s | 0.8s |

### 热更新速度

```javascript
// Webpack HMR
if (module.hot) {
  module.hot.accept('./module.js', () => {
    console.log('Module updated')
  })
}

// Vite HMR
if (import.meta.hot) {
  import.meta.hot.accept('./module.js', (newModule) => {
    console.log('Module updated')
  })
}
```

## 代码分割

### Webpack 动态导入

```javascript
// 路由懒加载
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')

// 预加载
const Dashboard = () => import(
  /* webpackChunkName: "dashboard" */
  /* webpackPrefetch: true */
  './views/Dashboard.vue'
)
```

### Vite 动态导入

```javascript
// 路由懒加载
const Home = () => import('./views/Home.vue')
const About = () => import('./views/About.vue')

// Glob 导入
const modules = import.meta.glob('./modules/*.js')
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
```

## 插件生态

### Webpack 常用插件

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
}
```

### Vite 常用插件

```javascript
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    visualizer()
  ]
})
```

## 选择建议

### 使用 Webpack 的场景

- 需要支持旧版浏览器
- 复杂的构建需求和定制化配置
- 大量依赖 Webpack 特定插件的项目
- 团队对 Webpack 更熟悉

### 使用 Vite 的场景

- 新项目，目标现代浏览器
- 追求极致的开发体验
- Vue 3 / React 项目
- 需要快速原型开发

> **趋势**: Vite 代表了构建工具的未来方向，但 Webpack 在生产环境中仍然非常稳定可靠。
