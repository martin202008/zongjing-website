'use client'

import { useLanguage } from '@/lib/LanguageContext'
import Link from 'next/link'
import { ArrowRight, Lock, Building2 } from 'lucide-react'

export default function ExperiencePage() {
  const { lang, t } = useLanguage()
  const isZh = lang === 'zh'

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20" style={{ backgroundColor: '#1E40AF' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isZh ? '立即体验' : 'Get Started'}
          </h1>
          <p className="text-xl text-white/80">
            {isZh ? '加入招赢系统，开启智能招商之旅' : 'Join ZhaoYing System and start your smart investment journey'}
          </p>
        </div>
      </section>

      {/* Experience Options */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Staff Login - Direct Access */}
            <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#EEF2FF' }}>
                <Lock className="w-8 h-8" style={{ color: '#1E40AF' }} />
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#0F172A' }}>
                {isZh ? '招商人员入口' : 'Staff Portal'}
              </h2>
              <p className="mb-6" style={{ color: '#475569' }}>
                {isZh
                  ? '内部招商人员登录招赢系统后台'
                  : 'Internal investment staff access to ZhaoYing System'}
              </p>
              <Link
                href="/system"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                style={{ backgroundColor: '#1E40AF' }}
              >
                {isZh ? '进入系统' : 'Enter System'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Brand Application */}
            <div className="p-8 rounded-2xl" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#F0FDF4' }}>
                <Building2 className="w-8 h-8" style={{ color: '#16A34A' }} />
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#0F172A' }}>
                {isZh ? '品牌入驻申请' : 'Brand Application'}
              </h2>
              <p className="mb-6" style={{ color: '#475569' }}>
                {isZh
                  ? '品牌方提交入驻意向，招商人员跟进服务'
                  : 'Submit your brand application and our team will follow up'}
              </p>
              <Link
                href="/system/apply"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                style={{ backgroundColor: '#EA580C' }}
              >
                {isZh ? '立即申请' : 'Apply Now'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* System Features Summary */}
          <div className="mt-16 p-8 rounded-2xl max-w-4xl mx-auto" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <h3 className="text-xl font-bold text-center mb-8" style={{ color: '#0F172A' }}>
              {isZh ? '招赢系统核心功能' : 'ZhaoYing System Core Features'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#EEF2FF' }}>
                  <Building2 className="w-6 h-6" style={{ color: '#1E40AF' }} />
                </div>
                <h4 className="font-semibold mb-1" style={{ color: '#0F172A' }}>
                  {isZh ? '项目管理' : 'Project Management'}
                </h4>
                <p className="text-sm" style={{ color: '#475569' }}>
                  {isZh ? '多项目统一管理' : 'Unified multi-project management'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#F0FDF4' }}>
                  <Lock className="w-6 h-6" style={{ color: '#16A34A' }} />
                </div>
                <h4 className="font-semibold mb-1" style={{ color: '#0F172A' }}>
                  {isZh ? '商户管理' : 'Merchant Management'}
                </h4>
                <p className="text-sm" style={{ color: '#475569' }}>
                  {isZh ? '商户信息全收录' : 'Complete merchant information'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#FFF7ED' }}>
                  <ArrowRight className="w-6 h-6" style={{ color: '#EA580C' }} />
                </div>
                <h4 className="font-semibold mb-1" style={{ color: '#0F172A' }}>
                  {isZh ? '招商跟进' : 'Investment Tracking'}
                </h4>
                <p className="text-sm" style={{ color: '#475569' }}>
                  {isZh ? '全流程跟踪服务' : 'Full-process tracking service'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}