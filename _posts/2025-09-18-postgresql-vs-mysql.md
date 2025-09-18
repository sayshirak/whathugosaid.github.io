---
layout: post
title: "数据库基础概念笔记"
date: 2025-09-18 14:00:00 +0800
categories: database
tags: [数据库, 基础, SQL]
excerpt: "数据库基础概念的简单总结，使用Jekyll体验技术笔记的写作。"
---

# 数据库基础概念笔记

这是我第二篇使用**Jekyll**编写的博客，主题是数据库基础概念。通过这篇文章，我主要想体验Jekyll主题对不同格式的支持。

## 什么是数据库？

### 简单定义

**数据库**是一个有组织的**数据集合**，用于**存储**、**管理**和**检索**信息。

#### 数据库的核心特点

- **持久性**：数据长期保存，不会丢失
- **共享性**：多个用户可以同时访问
- **独立性**：数据与程序相互独立
- **并发控制**：支持多用户同时操作

## 关系型数据库基础

### 基本术语

#### 表（Table）
类似Excel表格的数据结构：

| 字段名 | 数据类型 | 说明 |
|--------|----------|------|
| **id** | INT | 主键，自增 |
| **name** | VARCHAR(50) | 用户姓名 |
| **email** | VARCHAR(100) | 电子邮箱 |
| **created_at** | DATETIME | 创建时间 |

#### 基本SQL语句

**创建表**：
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**插入数据**：
```sql
INSERT INTO users (name, email) 
VALUES ('张三', 'zhangsan@example.com');
```

**查询数据**：
```sql
SELECT id, name, email 
FROM users 
WHERE created_at > '2025-01-01';
```

## 常见的数据库操作

### CRUD操作

#### Create（创建）
```sql
-- 插入单条记录
INSERT INTO products (name, price) VALUES ('笔记本', 5999);

-- 批量插入
INSERT INTO categories (name) VALUES 
    ('电子产品'), ('服装'), ('书籍');
```

#### Read（读取）
```sql
-- 简单查询
SELECT * FROM orders;

-- 带条件的查询
SELECT customer_name, total 
FROM orders 
WHERE status = '已完成' 
ORDER BY order_date DESC;
```

#### Update（更新）
```sql
-- 更新单条记录
UPDATE products 
SET price = 5499 
WHERE id = 1;

-- 条件更新
UPDATE inventory 
SET stock = stock - 1 
WHERE product_id = 123 AND stock > 0;
```

#### Delete（删除）
```sql
-- 删除特定记录
DELETE FROM temp_data WHERE created_at < NOW() - INTERVAL 7 DAY;

-- 清空表
TRUNCATE TABLE logs;
```

## 数据类型简介

### 数值类型

| 类型 | 范围 | 用途 |
|------|------|------|
| **TINYINT** | 0-255 | 小整数 |
| **INT** | -231到231-1 | 常用整数 |
| **DECIMAL(10,2)** | 精确小数 | 金额计算 |

### 字符串类型

```sql
-- 固定长度字符串
CREATE TABLE employees (
    emp_id CHAR(6),        -- 固定6位员工编号
    name VARCHAR(50),      -- 可变长度姓名
    bio TEXT               -- 长文本简介
);
```

### 日期时间类型

| 类型 | 格式 | 示例 |
|------|------|------|
| **DATE** | YYYY-MM-DD | 2025-09-18 |
| **TIME** | HH:MM:SS | 14:30:25 |
| **DATETIME** | YYYY-MM-DD HH:MM:SS | 2025-09-18 14:30:25 |

## 简单的数据库设计示例

### 用户表设计

```sql
-- 用户基础信息表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- 用户角色表
CREATE TABLE user_roles (
    user_id INT,
    role VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (user_id, role)
);
```

### 插入示例数据

```sql
-- 添加测试用户
INSERT INTO users (username, email, password_hash) VALUES
    ('admin', 'admin@example.com', 'hashed_password_123'),
    ('user1', 'user1@example.com', 'hashed_password_456');

-- 分配角色
INSERT INTO user_roles (user_id, role) VALUES
    (1, 'ADMIN'),
    (1, 'USER'),
    (2, 'USER');
```

## 学习建议

### 初学者路线

1. **掌握基础SQL**：SELECT, INSERT, UPDATE, DELETE
2. **理解关系模型**：主键、外键、索引
3. **学习事务概念**：ACID特性
4. **实践简单项目**：用户管理系统

### 推荐资源

- **在线练习**：[SQLZoo](http://sqlzoo.net/)
- **免费课程**：[W3Schools SQL教程](https://www.w3schools.com/sql/)
- **书籍推荐**：《SQL必知必会》

## 写在最后

通过这篇简单的数据库笔记，我：

- [x] 体验了Jekyll的Markdown解析
- [x] 学会了创建代码块
- [x] 掌握了表格语法
- [ ] 需要练习更多SQL语句

**Jekyll确实是一个很棒的博客工具！** 简单易用，自动生成静态页面，完美适合技术博客。

---

*技术笔记系列第二篇，欢迎体验Jekyll的强大功能！*

*最后更新：{{ page.date | date: "%Y年%m月%d日 %H:%M" }}*