---
title: Mermaid 图表完全指南
date: 2026-01-22
author: 博主
category: 技术
tags: [Mermaid, 图表, 可视化, 文档]
excerpt: 使用 Mermaid 创建各种专业图表，包括流程图、时序图、甘特图、类图、状态图和饼图。
---

# Mermaid 图表完全指南

Mermaid 是一个基于 JavaScript 的图表工具，可以通过文本描述生成各种专业图表。

## 流程图 (Flowchart)

### 基础流程图

```mermaid
graph TD
    A[开始] --> B{是否登录?}
    B -->|是| C[显示主页]
    B -->|否| D[跳转登录页]
    C --> E[加载用户数据]
    D --> F[输入账号密码]
    F --> G{验证成功?}
    G -->|是| C
    G -->|否| H[显示错误信息]
    H --> F
    E --> I[结束]
```

### 横向流程图

```mermaid
graph LR
    A[需求分析] --> B[设计方案]
    B --> C[编码实现]
    C --> D[测试验证]
    D --> E{是否通过?}
    E -->|是| F[上线部署]
    E -->|否| C
```

## 时序图 (Sequence Diagram)

### 用户登录时序图

```mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant B as 后端
    participant D as 数据库

    U->>F: 输入账号密码
    F->>F: 表单验证
    F->>B: 发送登录请求
    B->>D: 查询用户信息
    D-->>B: 返回用户数据
    B->>B: 验证密码
    alt 验证成功
        B->>B: 生成 Token
        B-->>F: 返回 Token
        F->>F: 保存 Token
        F-->>U: 跳转主页
    else 验证失败
        B-->>F: 返回错误信息
        F-->>U: 显示错误提示
    end
```

### API 调用时序图

```mermaid
sequenceDiagram
    participant C as 客户端
    participant G as API 网关
    participant A as 认证服务
    participant S as 业务服务
    participant R as Redis
    participant M as MySQL

    C->>G: 请求 API
    G->>A: 验证 Token
    A->>R: 检查 Token
    R-->>A: Token 有效
    A-->>G: 认证通过
    G->>S: 转发请求
    S->>M: 查询数据
    M-->>S: 返回数据
    S->>R: 缓存结果
    S-->>G: 返回响应
    G-->>C: 返回结果
```

## 甘特图 (Gantt Chart)

### 项目开发计划

```mermaid
gantt
    title 博客系统开发计划
    dateFormat YYYY-MM-DD
    section 需求阶段
    需求调研           :a1, 2026-01-01, 7d
    需求分析           :a2, after a1, 5d
    需求评审           :a3, after a2, 2d
    section 设计阶段
    架构设计           :b1, after a3, 5d
    数据库设计         :b2, after a3, 4d
    UI 设计            :b3, after a3, 6d
    设计评审           :b4, after b3, 1d
    section 开发阶段
    后端开发           :c1, after b4, 15d
    前端开发           :c2, after b4, 15d
    接口联调           :c3, after c2, 3d
    section 测试阶段
    单元测试           :d1, after c3, 5d
    集成测试           :d2, after d1, 4d
    性能测试           :d3, after d2, 3d
    section 上线阶段
    预发布环境部署     :e1, after d3, 2d
    生产环境部署       :e2, after e1, 1d
    上线监控           :e3, after e2, 3d
```

## 类图 (Class Diagram)

### 博客系统类图

```mermaid
classDiagram
    class User {
        +int id
        +string username
        +string email
        +string password
        +Date createdAt
        +login()
        +logout()
        +updateProfile()
    }

    class Post {
        +int id
        +string title
        +string content
        +int authorId
        +Date publishedAt
        +create()
        +update()
        +delete()
        +publish()
    }

    class Comment {
        +int id
        +string content
        +int postId
        +int userId
        +Date createdAt
        +create()
        +delete()
    }

    class Category {
        +int id
        +string name
        +string description
        +getPosts()
    }

    class Tag {
        +int id
        +string name
        +getPosts()
    }

    User "1" --> "*" Post : writes
    User "1" --> "*" Comment : writes
    Post "1" --> "*" Comment : has
    Post "*" --> "*" Category : belongs to
    Post "*" --> "*" Tag : has
```

### 电商系统类图

```mermaid
classDiagram
    class Order {
        +int orderId
        +Date orderDate
        +string status
        +calculateTotal()
        +updateStatus()
    }

    class OrderItem {
        +int itemId
        +int quantity
        +decimal price
        +getSubtotal()
    }

    class Product {
        +int productId
        +string name
        +decimal price
        +int stock
        +updateStock()
    }

    class Customer {
        +int customerId
        +string name
        +string email
        +placeOrder()
    }

    class Payment {
        +int paymentId
        +decimal amount
        +string method
        +process()
    }

    Customer "1" --> "*" Order : places
    Order "1" --> "*" OrderItem : contains
    OrderItem "*" --> "1" Product : references
    Order "1" --> "1" Payment : has
```

## 状态图 (State Diagram)

### 订单状态流转

```mermaid
stateDiagram-v2
    [*] --> 待支付
    待支付 --> 已支付 : 支付成功
    待支付 --> 已取消 : 超时/用户取消
    已支付 --> 待发货 : 商家确认
    待发货 --> 已发货 : 发货
    已发货 --> 待收货 : 物流中
    待收货 --> 已完成 : 确认收货
    已完成 --> 售后中 : 申请退款
    售后中 --> 已退款 : 退款成功
    售后中 --> 已完成 : 拒绝退款
    已取消 --> [*]
    已退款 --> [*]
    已完成 --> [*]
```

### 文章发布状态

```mermaid
stateDiagram-v2
    [*] --> 草稿
    草稿 --> 待审核 : 提交审核
    草稿 --> 已删除 : 删除
    待审核 --> 已发布 : 审核通过
    待审核 --> 草稿 : 审核拒绝
    已发布 --> 已下线 : 下线
    已下线 --> 已发布 : 重新发布
    已发布 --> 已删除 : 删除
    已删除 --> [*]
```

## 饼图 (Pie Chart)

### 编程语言使用占比

```mermaid
pie title 项目代码语言分布
    "JavaScript" : 45
    "TypeScript" : 25
    "Python" : 15
    "Go" : 10
    "其他" : 5
```

### 用户来源分析

```mermaid
pie title 用户访问来源
    "搜索引擎" : 40
    "直接访问" : 30
    "社交媒体" : 20
    "外部链接" : 10
```

## ER 图 (Entity Relationship)

### 数据库关系图

```mermaid
erDiagram
    USER ||--o{ POST : writes
    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : has
    POST }o--o{ CATEGORY : belongs_to
    POST }o--o{ TAG : has

    USER {
        int id PK
        string username
        string email
        string password
        datetime created_at
    }

    POST {
        int id PK
        string title
        text content
        int author_id FK
        datetime published_at
    }

    COMMENT {
        int id PK
        text content
        int post_id FK
        int user_id FK
        datetime created_at
    }

    CATEGORY {
        int id PK
        string name
        string description
    }

    TAG {
        int id PK
        string name
    }
```

## Git 图 (Git Graph)

### 分支管理流程

```mermaid
gitGraph
    commit id: "初始化项目"
    commit id: "添加基础功能"
    branch develop
    checkout develop
    commit id: "开发新特性"
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "实现登录功能"
    commit id: "实现注册功能"
    checkout develop
    merge feature/user-auth
    commit id: "集成测试"
    checkout main
    merge develop tag: "v1.0.0"
    checkout develop
    commit id: "继续开发"
```

## 使用建议

### 选择合适的图表类型

| 图表类型 | 适用场景 | 复杂度 |
|---------|---------|--------|
| 流程图 | 业务流程、算法逻辑 | 低 |
| 时序图 | 系统交互、API 调用 | 中 |
| 甘特图 | 项目计划、任务安排 | 中 |
| 类图 | 系统架构、代码结构 | 高 |
| 状态图 | 状态流转、生命周期 | 中 |
| 饼图 | 数据占比、统计分析 | 低 |
| ER 图 | 数据库设计 | 中 |

### 最佳实践

1. **保持简洁**: 避免在一个图表中包含过多信息
2. **使用标准符号**: 遵循行业标准的图表符号
3. **添加说明**: 为复杂的图表添加必要的注释
4. **合理布局**: 注意节点和连线的排列，保持清晰
5. **颜色使用**: 适当使用颜色区分不同类型的元素

> **提示**: Mermaid 图表可以直接在 Markdown 中编写，无需额外的绘图工具，非常适合技术文档编写。
