# 宗靖官网 - 项目详情页改版实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 重写项目详情页，采用卡片式布局展示核心卖点（区位优势/客群分析/业态组合）

**Architecture:** 单文件组件实现，保持现有 Tailwind + lucide-react 技术栈，图片使用 mmx 生成

**Tech Stack:** Next.js App Router, Tailwind CSS, lucide-react

---

## 文件变更

- 修改: `src/app/project/[id]/page.tsx` - 重写页面结构
- 新增图片: `public/images/projects/{id}/location.jpg`, `projects/{id}/audience.jpg`, `projects/{id}/business.jpg`

---

## Task 1: 重构 Hero 区域

**Files:**
- Modify: `src/app/project/[id]/page.tsx`

- [ ] **Step 1: 实现 Hero 区域代码**

```tsx
{/* Hero Image */}
<section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
  <Image
    src={project.image}
    alt={project.name}
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

  {/* Back Button */}
  <Link
    href="/project"
    className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm hover:bg-white/30 transition-colors"
  >
    <ArrowLeft className="w-4 h-4" />
    返回项目列表
  </Link>

  {/* Hero Content */}
  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-6xl mx-auto">
    <div className="max-w-3xl">
      <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4">
        {project.businessType}
      </span>
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">{project.name}</h1>
      <div className="flex items-center gap-4 text-white/90 text-sm">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" style={{ color: '#F97316' }} />
          <span>{project.city} · {project.address}</span>
        </div>
        <span>•</span>
        <span>{project.totalArea.toLocaleString()}㎡</span>
        <span>•</span>
        <span>{project.opening}</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/project/[id]/page.tsx && git commit -m "feat: redesign project detail hero section"
```

---

## Task 2: 实现核心卖点卡片区域

**Files:**
- Modify: `src/app/project/[id]/page.tsx`

- [ ] **Step 1: 添加核心卖点卡片代码**

```tsx
{/* Core Highlights */}
<section className="py-16 max-w-6xl mx-auto px-6">
  <h2 className="text-2xl font-bold mb-8" style={{ color: '#0F172A' }}>核心优势</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* 区位优势卡片 */}
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: '#E2E8F0' }}>
      <div className="relative h-40 bg-gradient-to-br" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)' }}>
        <Image
          src={`/images/projects/${project.id}/location.jpg`}
          alt="区位优势"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-12 h-12" style={{ color: '#1E40AF' }} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold mb-2" style={{ color: '#0F172A' }}>区位优势</h3>
        <p className="text-sm" style={{ color: '#475569' }}>{project.position}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F8FAFC', color: '#64748B' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* 客群分析卡片 */}
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: '#E2E8F0' }}>
      <div className="relative h-40 bg-gradient-to-br" style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)' }}>
        <Image
          src={`/images/projects/${project.id}/audience.jpg`}
          alt="客群分析"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Users className="w-12 h-12" style={{ color: '#EA580C' }} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold mb-2" style={{ color: '#0F172A' }}>客群分析</h3>
        <p className="text-sm" style={{ color: '#475569' }}>半径3公里社区居民 · 家庭消费主力</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>家庭客群</span>
          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>年轻消费</span>
        </div>
      </div>
    </div>

    {/* 业态组合卡片 */}
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: '#E2E8F0' }}>
      <div className="relative h-40 bg-gradient-to-br" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)' }}>
        <Image
          src={`/images/projects/${project.id}/business.jpg`}
          alt="业态组合"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Store className="w-12 h-12" style={{ color: '#16A34A' }} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold mb-2" style={{ color: '#0F172A' }}>业态组合</h3>
        <p className="text-sm" style={{ color: '#475569' }}>{project.floors}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.features.slice(0, 2).map((f, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#EEF2FF', color: '#1E40AF' }}>
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2: 添加缺少的图标导入**

在 import 语句中添加 `Users, Store`（如果尚未导入）

- [ ] **Step 3: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/project/[id]/page.tsx && git commit -m "feat: add core highlights cards section"
```

---

## Task 3: 实现项目详情和图集区域

**Files:**
- Modify: `src/app/project/[id]/page.tsx`

- [ ] **Step 1: 添加项目详情和图集代码**

```tsx
{/* Project Details */}
<section className="py-12 max-w-6xl mx-auto px-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

    {/* Description Card */}
    <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: '#E2E8F0' }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>项目简介</h2>
      <div className="w-12 h-0.5 mb-6" style={{ background: '#1E40AF' }}></div>
      <p className="leading-relaxed text-base" style={{ color: '#475569' }}>{project.description}</p>

      {/* Features Tags */}
      <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E2E8F0' }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#0F172A' }}>项目特色</h3>
        <div className="flex flex-wrap gap-2">
          {project.features.map((f, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: '#EEF2FF', color: '#1E40AF' }}>
              <CheckCircle className="w-3 h-3" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Info Card */}
    <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: '#E2E8F0' }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>基本信息</h2>
      <div className="w-12 h-0.5 mb-6" style={{ background: '#1E40AF' }}></div>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <span style={{ color: '#64748B' }}>商业面积</span>
          <span className="font-semibold" style={{ color: '#0F172A' }}>{project.totalArea.toLocaleString()}㎡</span>
        </div>
        <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <span style={{ color: '#64748B' }}>项目位置</span>
          <span className="font-semibold" style={{ color: '#0F172A' }}>{project.position}</span>
        </div>
        <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <span style={{ color: '#64748B' }}>楼层规划</span>
          <span className="font-semibold" style={{ color: '#0F172A' }}>{project.floors}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span style={{ color: '#64748B' }}>开业状态</span>
          <span className="font-semibold" style={{ color: '#0F172A' }}>{project.opening}</span>
        </div>
      </div>
    </div>

  </div>
</section>

{/* Image Gallery */}
<section className="py-12 max-w-6xl mx-auto px-6">
  <h2 className="text-2xl font-bold mb-8" style={{ color: '#0F172A' }}>项目图片</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {project.images.map((img, i) => (
      <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        <Image
          src={img}
          alt={`${project.name} ${i + 1}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/project/[id]/page.tsx && git commit -m "feat: add project details and image gallery"
```

---

## Task 4: 实现 CTA 区域

**Files:**
- Modify: `src/app/project/[id]/page.tsx`

- [ ] **Step 1: 添加 CTA 代码**

```tsx
{/* CTA Section */}
<section className="py-16 max-w-6xl mx-auto px-6">
  <div
    className="rounded-3xl p-8 md:p-12 text-center"
    style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)' }}
  >
    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">对 {project.name} 感兴趣？</h3>
    <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
      欢迎致电咨询，专业团队将为您提供详细的招商信息
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="tel:0512-66188818"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all hover:opacity-90 shadow-lg"
        style={{ background: '#F97316' }}
      >
        <Phone className="w-5 h-5" />
        立即咨询：0512-66188818
      </a>
      <Link
        href="/system"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all"
      >
        进入招赢系统
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/project/[id]/page.tsx && git commit -m "feat: add CTA section"
```

---

## Task 5: 验证

- [ ] **Step 1: 本地构建测试**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && npm run build 2>&1 | tail -30
```

确保无构建错误

- [ ] **Step 2: 最终提交**

```bash
git add -A && git commit -m "feat: complete project detail page redesign - card layout with core highlights"
```

---

## 图片生成任务（mmx）

为每个项目生成3张图片，保存在 `public/images/projects/{id}/`:

| 项目 ID | location.jpg | audience.jpg | business.jpg |
|---------|--------------|--------------|--------------|
| 1 (黄埭广场) | 区位地图风格 | 客群分析图 | 业态规划图 |
| 2 (甪直广场) | 区位地图风格 | 客群分析图 | 业态规划图 |
| 3 (生活广场) | 区位地图风格 | 客群分析图 | 业态规划图 |
| 4 (时尚广场) | 区位地图风格 | 客群分析图 | 业态规划图 |
| 5 (周庄广场) | 区位地图风格 | 客群分析图 | 业态规划图 |
| 6 (家居建材中心) | 区位地图风格 | 客群分析图 | 业态规划图 |
| 7 (旗袍城) | 区位地图风格 | 客群分析图 | 业态规划图 |

**注意**: 图片生成后需要手动复制到服务器 `public/images/projects/` 目录