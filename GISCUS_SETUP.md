# Giscus 评论系统配置指南

本项目已集成 Giscus 评论系统,需要进行简单配置即可使用。

## 配置步骤

### 1. 创建 GitHub 仓库

如果还没有,请先将博客代码推送到 GitHub 仓库。

### 2. 启用 GitHub Discussions

1. 进入你的 GitHub 仓库
2. 点击 Settings (设置)
3. 找到 Features 部分
4. 勾选 Discussions

### 3. 安装 Giscus App

1. 访问 https://github.com/apps/giscus
2. 点击 Install
3. 选择你的博客仓库
4. 授权访问

### 4. 获取配置信息

1. 访问 https://giscus.app/zh-CN
2. 填写以下信息:
   - **仓库**: 输入你的仓库地址 (格式: `username/repo-name`)
   - **页面 ↔️ discussion 映射关系**: 选择 `pathname`
   - **Discussion 分类**: 选择 `General` 或创建新分类
   - **主题**: 选择 `light` (浅色主题)
   - **语言**: 选择 `zh-CN` (简体中文)

3. 页面会自动生成配置代码,复制以下信息:
   - `data-repo`
   - `data-repo-id`
   - `data-category-id`

### 5. 更新配置

打开 `src/components/Comments.vue` 文件,找到以下行并替换:

```javascript
script.setAttribute('data-repo', 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME')
script.setAttribute('data-repo-id', 'YOUR_REPO_ID')
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID')
```

替换为你从 Giscus 网站获取的实际值。

### 6. 测试

1. 运行 `npm run dev` 启动开发服务器
2. 访问任意文章页面
3. 滚动到页面底部,应该能看到评论区
4. 使用 GitHub 账号登录并测试评论功能

## 注意事项

- Giscus 使用 GitHub Discussions 存储评论,完全免费
- 用户需要 GitHub 账号才能评论
- 评论数据存储在你的 GitHub 仓库中,完全由你控制
- 支持 Markdown 格式评论
- 支持表情回应和回复功能

## 主题自定义

如果需要切换主题,可以修改 `data-theme` 属性:

- `light` - 浅色主题
- `dark` - 深色主题
- `preferred_color_scheme` - 跟随系统主题
- 更多主题: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-theme

## 故障排除

如果评论区无法加载:

1. 确认 GitHub Discussions 已启用
2. 确认 Giscus App 已正确安装
3. 检查配置信息是否正确
4. 查看浏览器控制台是否有错误信息
5. 确认仓库是公开的 (Giscus 不支持私有仓库)
