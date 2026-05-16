# 宗靖官网 - 关于我们页面改版实现计划

**Goal:** 重写 about/page.tsx，实现品牌升级版关于我们页面

**Architecture:** 单文件组件实现，保持现有 Tailwind + lucide-react 技术栈

**Tech Stack:** Next.js App Router, Tailwind CSS, lucide-react

---

## 文件变更

- 修改: `src/app/about/page.tsx` - 完全重写页面
- 参考: `src/lib/LanguageContext.tsx` - 国际化 context

---

## Task 1: 实现 Hero 区域

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: 添加 Hero 区域代码**

```tsx
{/* Hero */}
<section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 50%, #1E40AF 100%)' }}>
  {/* Geometric decorations */}
  <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.1)', transform: 'translate(30%, -30%)' }} />
  <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: 'rgba(255,255,255,0.15)', transform: 'translate(-40%, 40%)' }} />
  <div className="absolute top-1/2 left-1/4 w-px h-32 opacity-20" style={{ background: 'linear-gradient(to bottom, transparent, #fff, transparent)' }} />
  <div className="absolute top-1/3 right-1/4 w-32 h-px opacity-20" style={{ background: 'linear-gradient(to right, transparent, #fff, transparent)' }} />

  <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left content */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          商业地产全流程<br />数字化运营商
        </h1>
        <p className="text-lg text-white/80 mb-8">
          宗靖商管致力于通过数字化技术创新，为商业地产运营商和品牌方搭建高效、透明的对接平台
        </p>
      </div>
      {/* Right image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
        <Image src="/images/about_team_v2_001.jpg" alt="Team" fill className="object-cover" />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/about/page.tsx && git commit -m "feat: add hero section with geometric decorations"
```

---

## Task 2: 实现公司简介区域

**Files:**
- Modify: `src/app/about/page.tsx:120-160`

- [ ] **Step 1: 添加公司简介代码（接在 Hero 后面）**

```tsx
{/* Company Intro */}
<section className="py-20 bg-white">
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#0F172A' }}>
          {isZh ? '公司简介' : 'Company Profile'}
        </h2>
        <p className="text-lg leading-relaxed mb-4" style={{ color: '#475569' }}>
          {isZh
            ? '宗靖商管是一家专注于商业地产运营服务的数字化平台运营商。公司致力于通过技术创新，为商业地产运营商和品牌方搭建高效、透明的对接平台。'
            : 'Zongjing Commercial Management is a digital platform operator specializing in commercial real estate investment services.'}
        </p>
        <p className="text-lg leading-relaxed mb-4" style={{ color: '#475569' }}>
          {isZh
            ? '公司团队拥有丰富的商业地产运营经验和强大的技术研发能力，已成功运营多个大型商业项目。'
            : 'Our team has extensive experience in commercial real estate operations and strong technological R&D capabilities.'}
        </p>
        <p className="text-lg leading-relaxed mb-6" style={{ color: '#475569' }}>
          {isZh
            ? '公司依托三大数字化产品系统——宗靖招赢系统（智能化招商管理）、宗靖智能营销系统（数字化营销解决方案）、宗靖智能运维系统（智慧物业管理）——为商业地产运营提供全流程数字化支持。'
            : 'With our three digital product systems, we provide full-process digital support for commercial real estate operations.'}
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-cta" />
            <span style={{ color: '#0F172A' }}>{isZh ? '专业团队支持' : 'Professional Team'}</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-cta" />
            <span style={{ color: '#0F172A' }}>{isZh ? '数字化招商平台' : 'Digital Platform'}</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-cta" />
            <span style={{ color: '#0F172A' }}>{isZh ? '全流程服务' : 'Full-Service Support'}</span>
          </div>
        </div>
      </div>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        <Image src="/images/about_collaboration_v2_001.jpg" alt="Collaboration" fill className="object-cover" />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/about/page.tsx && git commit -m "feat: add company intro section with digital products"
```

---

## Task 3: 实现核心优势和数据成果区域

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: 添加核心优势和数据成果代码**

```tsx
{/* Core Advantages */}
<section className="py-20" style={{ backgroundColor: '#F8FAFC' }}>
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-16" style={{ color: '#0F172A' }}>
      {isZh ? '核心优势' : 'Core Advantages'}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-2xl text-center" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#EEF2FF' }}>
          <Target className="w-8 h-8" style={{ color: '#1E40AF' }} />
        </div>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{isZh ? '精准定位' : 'Precision Positioning'}</h3>
        <p style={{ color: '#475569' }}>
          {isZh ? '深入了解每一位客户需求，提供精准的项目匹配' : 'Deep understanding of each client\'s needs'}
        </p>
      </div>
      <div className="bg-white p-8 rounded-2xl text-center" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F0FDF4' }}>
          <Users className="w-8 h-8" style={{ color: '#16A34A' }} />
        </div>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{isZh ? '专业团队' : 'Professional Team'}</h3>
        <p style={{ color: '#475569' }}>
          {isZh ? '经验丰富的商业地产专家团队，全程服务' : 'Experienced commercial real estate experts'}
        </p>
      </div>
      <div className="bg-white p-8 rounded-2xl text-center" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#FFF7ED' }}>
          <Award className="w-8 h-8" style={{ color: '#EA580C' }} />
        </div>
        <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{isZh ? '品质保障' : 'Quality Assurance'}</h3>
        <p style={{ color: '#475569' }}>
          {isZh ? '严格的资质审核，确保每一个项目的品质' : 'Strict qualification review'}
        </p>
      </div>
    </div>
  </div>
</section>

{/* Stats Section */}
<section className="py-16" style={{ backgroundColor: '#1E40AF' }}>
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <p className="text-4xl font-bold text-white mb-2">7+</p>
        <p className="text-white/70">{isZh ? '运营项目' : 'Projects'}</p>
      </div>
      <div>
        <p className="text-4xl font-bold text-white mb-2">100+</p>
        <p className="text-white/70">{isZh ? '合作品牌' : 'Partners'}</p>
      </div>
      <div>
        <p className="text-4xl font-bold text-white mb-2">50万㎡+</p>
        <p className="text-white/70">{isZh ? '运营面积' : 'Area'}</p>
      </div>
      <div>
        <p className="text-4xl font-bold text-white mb-2">10年+</p>
        <p className="text-white/70">{isZh ? '行业经验' : 'Experience'}</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/about/page.tsx && git commit -m "feat: add core advantages and stats sections"
```

---

## Task 4: 实现团队能力区域

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: 添加团队能力（6卡片矩阵）代码**

```tsx
{/* Team Capabilities */}
<section className="py-20 bg-white">
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#0F172A' }}>
      {isZh ? '团队能力' : 'Team Capabilities'}
    </h2>
    <p className="text-center mb-16" style={{ color: '#475569' }}>
      {isZh ? '六大核心能力，协同赋能商业地产数字化运营' : 'Six core capabilities working together to enable digital operations'}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* 招商运营 */}
      <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#EEF2FF' }}>
          <TrendingUp className="w-8 h-8" style={{ color: '#1E40AF' }} />
        </div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '招商运营' : 'Investment & Operations'}</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '商业定位研策' : 'Business Positioning'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '业态规划定位' : 'Format Planning'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '招商策划推广' : 'Investment Planning'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '商业运管输出' : 'Operations Management'}</span>
          </li>
        </ul>
      </div>

      {/* 数字营销 */}
      <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#F0FDF4' }}>
          <Monitor className="w-8 h-8" style={{ color: '#16A34A' }} />
        </div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '数字营销' : 'Digital Marketing'}</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '会员招募运营' : 'Member Operations'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '社群运营推广' : 'Community Marketing'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '内容创作运营' : 'Content Creation'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '品牌营销推广' : 'Brand Marketing'}</span>
          </li>
        </ul>
      </div>

      {/* 工程物管 */}
      <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#FFF7ED' }}>
          <Wrench className="w-8 h-8" style={{ color: '#EA580C' }} />
        </div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '工程物管' : 'Engineering & Property'}</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '商业物业服务' : 'Property Services'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '工程维保服务' : 'Maintenance Services'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '安全管理服务' : 'Safety Management'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '绿化环境服务' : 'Landscaping'}</span>
          </li>
        </ul>
      </div>

      {/* 财务管理 */}
      <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#FEF2F2' }}>
          <Calculator className="w-8 h-8" style={{ color: '#DC2626' }} />
        </div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '财务管理' : 'Finance'}</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '商业运营分析' : 'Operations Analysis'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '资产管理' : 'Asset Management'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '全面预算管理' : 'Budget Management'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '资金管理' : 'Fund Management'}</span>
          </li>
        </ul>
      </div>

      {/* 综合管理 */}
      <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#F5F3FF' }}>
          <Briefcase className="w-8 h-8" style={{ color: '#7C3AED' }} />
        </div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '综合管理' : 'Administration'}</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '人力资源管理' : 'HR Management'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '行政后勤管理' : 'Admin & Logistics'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '企业文化管理' : 'Corporate Culture'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '法律合规管理' : 'Legal Compliance'}</span>
          </li>
        </ul>
      </div>

      {/* 数字化技术 */}
      <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#ECFEFF' }}>
          <Cpu className="w-8 h-8" style={{ color: '#0891B2' }} />
        </div>
        <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '数字化技术' : 'Digital Technology'}</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '系统平台开发' : 'Platform Development'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '数据分析中台' : 'Data Analytics'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? '智能营销算法' : 'AI Marketing'}</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: '#475569' }}>
            <span style={{ color: '#EA580C' }}>•</span>
            <span>{isZh ? 'IoT运维集成' : 'IoT Integration'}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/about/page.tsx && git commit -m "feat: add team capabilities section (6-card matrix)"
```

---

## Task 5: 实现底部CTA区域

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: 添加底部CTA代码**

```tsx
{/* CTA Section */}
<section className="py-20" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)' }}>
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold mb-4" style={{ color: '#0F172A' }}>
      {isZh ? '开启数字化转型之旅' : 'Start Your Digital Transformation'}
    </h2>
    <p className="text-lg mb-8" style={{ color: '#475569' }}>
      {isZh ? '携手宗靖商管，共建智慧商业新生态' : 'Join us to build a smarter commercial ecosystem'}
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href="/system"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-90"
        style={{ background: '#1E40AF' }}
      >
        进入招赢系统
        <ArrowRight className="w-4 h-4" />
      </Link>
      <Link
        href="/digital"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border-2 transition-all hover:bg-white"
        style={{ borderColor: '#1E40AF', color: '#1E40AF' }}
      >
        了解更多数智化成果
        <ArrowRight className="w-4 h-4" />
      </Link>
      <a
        href="tel:0512-66188818"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border-2 transition-all hover:bg-white"
        style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
      >
        电话咨询：0512-66188818
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/about/page.tsx && git commit -m "feat: add CTA section"
```

---

## Task 6: 添加缺少的图标导入

**Files:**
- Modify: `src/app/about/page.tsx:1-10`

- [ ] **Step 1: 更新图标导入，添加 ArrowRight, Cpu**

在 import 语句中添加 ArrowRight 和 Cpu：

```tsx
import { Target, Users, Award, CheckCircle, TrendingUp, Monitor, Wrench, Calculator, Briefcase, ArrowRight, Cpu } from 'lucide-react'
```

- [ ] **Step 2: 提交**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && git add src/app/about/page.tsx && git commit -m "feat: add missing icon imports"
```

---

## Task 7: 验证

- [ ] **Step 1: 本地开发服务器测试**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && npm run dev
```

在浏览器访问 http://localhost:3000/about 检查：
- Hero 区域渐变和几何装饰是否正常显示
- 公司简介是否正确显示三大产品
- 团队能力 6 卡片是否正确排列
- 中英文切换是否正常工作

- [ ] **Step 2: 构建测试**

```bash
cd ~/Desktop/DZX-workspace/宗靖官网 && npm run build
```

确保无构建错误

- [ ] **Step 3: 最终提交**

```bash
git add -A && git commit -m "feat: complete about page redesign - brand upgrade"
```