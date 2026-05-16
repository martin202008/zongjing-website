'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'
import { Target, Users, Award, CheckCircle, TrendingUp, Monitor, Wrench, Calculator, Briefcase } from 'lucide-react'

export default function AboutPage() {
  const { lang, t } = useLanguage()
  const isZh = lang === 'zh'

  return (
    <div className="min-h-screen">
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

      {/* Company Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#0F172A' }}>
                {isZh ? '公司简介' : 'Company Profile'}
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#475569' }}>
                {isZh
                  ? '宗靖商管是一家专注于商业地产运营服务的数字化平台运营商。公司致力于通过技术创新，为商业地产运营商和品牌方搭建高效、透明的对接平台。'
                  : 'Zongjing Commercial Management is a digital platform operator specializing in commercial real estate investment services. We are committed to building an efficient and transparent platform for commercial real estate operators and brands through technological innovation.'}
              </p>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#475569' }}>
                {isZh
                  ? '公司团队拥有丰富的商业地产运营经验和强大的技术研发能力，已成功运营多个大型商业项目。'
                  : 'Our team has extensive experience in commercial real estate operations and strong technological R&D capabilities, having successfully operated multiple large commercial projects.'}
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
              <Image src="/images/about_team_v2_001.jpg" alt="Team" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
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
                {isZh
                  ? '深入了解每一位客户需求，提供精准的项目匹配'
                  : 'Deep understanding of each client\'s needs, providing precise project matching'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl text-center" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F0FDF4' }}>
                <Users className="w-8 h-8" style={{ color: '#16A34A' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{isZh ? '专业团队' : 'Professional Team'}</h3>
              <p style={{ color: '#475569' }}>
                {isZh
                  ? '经验丰富的商业地产专家团队，全程服务'
                  : 'Experienced commercial real estate experts, full-service support'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl text-center" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#FFF7ED' }}>
                <Award className="w-8 h-8" style={{ color: '#EA580C' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{isZh ? '品质保障' : 'Quality Assurance'}</h3>
              <p style={{ color: '#475569' }}>
                {isZh
                  ? '严格的资质审核，确保每一个项目的品质'
                  : 'Strict qualification review, ensuring quality of every project'}
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

      {/* Departments Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#0F172A' }}>
            {isZh ? '组织架构' : 'Organization Structure'}
          </h2>
          <p className="text-center mb-16" style={{ color: '#475569' }}>
            {isZh ? '五大核心部门，协同赋能商业地产数字化运营' : 'Five core departments working together to enable digital commercial real estate operations'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 招商营运部 */}
            <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#EEF2FF' }}>
                <TrendingUp className="w-8 h-8" style={{ color: '#1E40AF' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '招商营运部' : 'Investment & Operations Dept.'}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '商业定位研策' : 'Business Positioning & Research'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '业态规划定位' : 'Format Planning & Positioning'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '动线规划设计' : 'Traffic Flow Design'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '招商策划推广' : 'Investment Planning & Promotion'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '商业运管输出' : 'Commercial Operations Management'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '商户经营辅导' : 'Merchant Business Guidance'}</span>
                </li>
              </ul>
            </div>

            {/* 数字营销部 */}
            <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#F0FDF4' }}>
                <Monitor className="w-8 h-8" style={{ color: '#16A34A' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '数字营销部' : 'Digital Marketing Dept.'}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '会员招募运营' : 'Member Recruitment & Operations'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '社群运营推广' : 'Community Operations & Promotion'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '内容创作运营' : 'Content Creation & Operations'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '品牌营销推广' : 'Brand Marketing & Promotion'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '智能数字系统' : 'Smart Digital Systems'}</span>
                </li>
              </ul>
            </div>

            {/* 工程物管部 */}
            <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#FFF7ED' }}>
                <Wrench className="w-8 h-8" style={{ color: '#EA580C' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '工程物管部' : 'Engineering & Property Dept.'}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '商业物业服务' : 'Commercial Property Services'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '工程维保服务' : 'Engineering Maintenance Services'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '安全管理服务' : 'Safety Management Services'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '绿化环境服务' : 'Landscaping & Environment Services'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '商业后勤服务' : 'Commercial Logistics Services'}</span>
                </li>
              </ul>
            </div>

            {/* 财务部 */}
            <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#FEF2F2' }}>
                <Calculator className="w-8 h-8" style={{ color: '#DC2626' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '财务部' : 'Finance Dept.'}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '商业运营分析' : 'Commercial Operations Analysis'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '资产管理' : 'Asset Management'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '全面预算管理' : 'Comprehensive Budget Management'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '资金管理' : 'Fund Management'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '财务核算' : 'Financial Accounting'}</span>
                </li>
              </ul>
            </div>

            {/* 综合部 */}
            <div className="p-8 rounded-2xl md:col-span-2 lg:col-span-1" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#F5F3FF' }}>
                <Briefcase className="w-8 h-8" style={{ color: '#7C3AED' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>{isZh ? '综合部' : 'Administration Dept.'}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '人力资源管理' : 'Human Resources Management'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '行政后勤管理' : 'Administrative & Logistics Management'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '企业文化管理' : 'Corporate Culture Management'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '法律合规管理' : 'Legal & Compliance Management'}</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: '#475569' }}>
                  <span style={{ color: '#EA580C' }}>•</span>
                  <span>{isZh ? '信息档案管理' : 'Information & Records Management'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}