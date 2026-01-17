---
title: Git 工作流与最佳实践
date: 2026-01-18
author: 博主
category: 技术
tags: [Git, 版本控制, 工作流, DevOps]
excerpt: 掌握 Git 的核心概念和常用工作流，提升团队协作效率和代码质量。
---

# Git 工作流与最佳实践

Git 是现代软件开发不可或缺的版本控制工具。

## 基础命令

### 常用操作

```bash
# 初始化仓库
git init

# 克隆远程仓库
git clone https://github.com/user/repo.git

# 查看状态
git status

# 添加文件到暂存区
git add .
git add file.js

# 提交更改
git commit -m "feat: add new feature"

# 推送到远程
git push origin main

# 拉取远程更改
git pull origin main
```

## 分支管理

### 分支操作

```bash
# 创建分支
git branch feature/new-feature

# 切换分支
git checkout feature/new-feature

# 创建并切换（推荐）
git checkout -b feature/new-feature

# 查看所有分支
git branch -a

# 删除本地分支
git branch -d feature/old-feature

# 删除远程分支
git push origin --delete feature/old-feature
```

### 分支策略对比

| 策略 | 适用场景 | 复杂度 | 发布频率 |
|------|----------|--------|----------|
| Git Flow | 大型项目 | 高 | 定期发布 |
| GitHub Flow | 持续部署 | 低 | 频繁发布 |
| GitLab Flow | 多环境 | 中 | 灵活 |
| Trunk Based | 快速迭代 | 低 | 持续集成 |

## Git Flow 工作流

### 分支类型

```bash
# 主分支
main (master)    # 生产环境代码
develop          # 开发分支

# 辅助分支
feature/*        # 功能分支
release/*        # 发布分支
hotfix/*         # 热修复分支
```

### 功能开发流程

```bash
# 1. 从 develop 创建功能分支
git checkout develop
git checkout -b feature/user-auth

# 2. 开发功能
git add .
git commit -m "feat: implement user authentication"

# 3. 推送到远程
git push origin feature/user-auth

# 4. 创建 Pull Request
# 在 GitHub/GitLab 上操作

# 5. 代码审查通过后合并到 develop
git checkout develop
git merge --no-ff feature/user-auth

# 6. 删除功能分支
git branch -d feature/user-auth
git push origin --delete feature/user-auth
```

## 提交规范

### Conventional Commits

| 类型 | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | feat: add user login |
| fix | 修复 bug | fix: resolve memory leak |
| docs | 文档更新 | docs: update README |
| style | 代码格式 | style: format code |
| refactor | 重构 | refactor: simplify logic |
| test | 测试 | test: add unit tests |
| chore | 构建/工具 | chore: update deps |

### 提交消息模板

```bash
# 配置提交模板
git config --global commit.template ~/.gitmessage

# ~/.gitmessage
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>

# 示例
feat(auth): implement JWT authentication

- Add JWT token generation
- Add token verification middleware
- Add refresh token logic

Closes #123
```

## 高级操作

### 交互式 Rebase

```bash
# 整理最近 3 次提交
git rebase -i HEAD~3

# 编辑器中的操作
pick abc123 feat: add feature A
squash def456 fix: typo in feature A
reword ghi789 feat: add feature B

# pick: 保留提交
# squash: 合并到上一个提交
# reword: 修改提交消息
# drop: 删除提交
```

### Cherry-pick

```bash
# 将特定提交应用到当前分支
git cherry-pick abc123

# 应用多个提交
git cherry-pick abc123 def456

# 只应用更改，不提交
git cherry-pick -n abc123
```

### Stash 暂存

```bash
# 暂存当前更改
git stash

# 暂存并添加消息
git stash save "WIP: working on feature"

# 查看暂存列表
git stash list

# 应用最近的暂存
git stash apply

# 应用并删除暂存
git stash pop

# 删除暂存
git stash drop stash@{0}
```

## 冲突解决

### 合并冲突

```bash
# 合并时发生冲突
git merge feature/new-feature

# 查看冲突文件
git status

# 手动解决冲突后
git add .
git commit -m "merge: resolve conflicts"
```

### 冲突标记

```javascript
<<<<<<< HEAD
const version = '1.0.0'
=======
const version = '2.0.0'
>>>>>>> feature/new-feature

// 解决后
const version = '2.0.0'
```

## 撤销操作

### 常见撤销场景

```bash
# 撤销工作区更改
git checkout -- file.js

# 撤销暂存区更改
git reset HEAD file.js

# 撤销最近一次提交（保留更改）
git reset --soft HEAD~1

# 撤销最近一次提交（丢弃更改）
git reset --hard HEAD~1

# 撤销远程提交（创建新提交）
git revert abc123
```

## 最佳实践

### 提交频率

```bash
# ✅ 好的做法：小而频繁的提交
git commit -m "feat: add user model"
git commit -m "feat: add user controller"
git commit -m "test: add user tests"

# ❌ 不好的做法：大而稀疏的提交
git commit -m "add user feature with tests and docs"
```

### 分支命名

```bash
# ✅ 清晰的命名
feature/user-authentication
bugfix/login-error
hotfix/security-patch

# ❌ 模糊的命名
feature/new-stuff
fix/bug
update
```

## Git Hooks

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

# 运行代码检查
npm run lint

# 运行测试
npm test

# 如果失败，阻止提交
if [ $? -ne 0 ]; then
  echo "Tests failed. Commit aborted."
  exit 1
fi
```

### Commit-msg Hook

```bash
#!/bin/sh
# .git/hooks/commit-msg

commit_msg=$(cat "$1")

# 检查提交消息格式
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
  echo "Invalid commit message format"
  echo "Use: <type>(<scope>): <subject>"
  exit 1
fi
```

> **提示**: 良好的 Git 工作流能显著提升团队协作效率，建议团队制定统一的规范并严格执行。
