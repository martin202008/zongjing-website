---
name: 宗靖官网与招赢系统合并设计
description: 将官网和招赢系统合并为单一Next.js项目
type: project
originSessionId: f0da4f56-d09d-4caa-91c2-a5daae9dd7c4
---

# 宗靖官网与招赢系统合并设计

## 背景

将宗靖商管官网和招赢系统合并为单一 Next.js 项目，通过子路径路由统一部署。

## 路由结构

```
/                          # 官网首页
/about                      # 关于我们
/projects                   # 项目展示
/projects/[id]              # 项目详情
/experience                 # 体验入口 → /system/login

/system                     # 招赢系统
/system                      # 工作台 (dashboard)
/system/login                # 登录页
/system/apply                # 入驻申请（公开）
/system/admin/*              # 管理后台
```

## 导航设计

### 官网 Navbar
- Logo + 宗靖商管
- 导航：首页、关于、首页、项目展示
- 语言切换 (中/EN)
- 体验按钮 → `/system/login`

### 登录状态
- 未登录：体验按钮显示"立即体验"
- 已登录：显示用户头像，点击进入 `/system` 或退出

## 账号系统

### 预置账号
- 10 个内部招商人员账号
- 工号格式：`zs001` ~ `zs010`
- 初始密码：`Zx2024!`
- 存放于 SQLite users 表

### 账号管理
- 后台登录后可在管理界面管理账号
- 支持修改密码

## 样式隔离

### 官网 (Tailwind CSS v4)
- 路径：`src/app/(marketing)/*`
- 使用 CSS 变量配色系统
- 独立 Navbar/Footer

### 系统 (Ant Design + 基础样式)
- 路径：`src/app/(system)/*`
- 沿用招赢系统现有样式
- 独立侧边栏布局

## 技术实现

### 文件移动
- `zongjing-web/src/app/*` → `宗靖官网/src/app/(system)/*`
- 调整路由路径引用

### 认证
- 沿用 JWT + localStorage
- Auth Guard 保护 `/system/admin/*`

### 数据库
- 沿用招赢系统 SQLite
- 预置 10 个用户账号 seeds

## 部署

- 单端口部署 (默认 3000)
- 域名解析到服务器 IP
- Nginx 可选反向代理

## 迁移步骤

1. 创建 `(system)` route group
2. 迁移招赢系统页面
3. 创建预置账号 seeds
4. 调整官网导航
5. 验证功能