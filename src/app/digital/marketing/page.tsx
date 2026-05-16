'use client';

import Link from 'next/link';
import { TrendingUp, Users, Target, BarChart3, Shield, Zap, CheckCircle, ArrowRight, Megaphone, Smartphone, PieChart } from 'lucide-react';

export default function MarketingSystemPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 50%, #9A3412 100%)', minHeight: '480px' }}>
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10" style={{ background: '#fff' }}></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-5" style={{ background: '#fff' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#FBBF24' }}></span>
            <span className="text-sm font-medium text-white">数字化营销解决方案</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            宗靖智能营销系统
          </h1>

          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            基于大数据和AI技术的智能营销平台
          </p>
          <p className="text-base max-w-xl mx-auto text-white/70 mb-10">
            助力品牌实现精准获客、高效转化，赋能商业运营全链路数字化升级
          </p>

          <div className="flex items-center justify-center gap-3 text-white/80 text-sm">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>多渠道整合</span>
            <span className="mx-2">·</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>AI智能推荐</span>
            <span className="mx-2">·</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>效果追踪</span>
          </div>
        </div>
      </section>

      {/* System Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>系统核心功能</h2>
            <p className="text-sm" style={{ color: '#475569' }}>全方位满足品牌营销推广需求</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp,
                title: '数据整合分析',
                desc: '多渠道数据整合，洞察市场趋势，深度分析用户行为，为决策提供数据支撑',
                color: '#EA580C',
              },
              {
                icon: Target,
                title: '智能推荐',
                desc: 'AI智能推荐算法，精准触达目标客群，提升营销转化率',
                color: '#059669',
              },
              {
                icon: PieChart,
                title: '效果追踪',
                desc: '营销效果实时追踪，ROI可视化呈现，投放优化有据可依',
                color: '#7C3AED',
              },
              {
                icon: Megaphone,
                title: '自动化触达',
                desc: '自动化营销触达流程，提升客户沟通效率，减少人工成本',
                color: '#DC2626',
              },
              {
                icon: Smartphone,
                title: '全渠道覆盖',
                desc: '支持微信公众号、小程序、短信等多渠道营销触达',
                color: '#0891B2',
              },
              {
                icon: Users,
                title: '会员管理',
                desc: '完善的会员体系，精细化运营，提升客户粘性和复购率',
                color: '#EA580C',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl transition-all hover:shadow-md"
                style={{ border: '1px solid #E2E8F0' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#0F172A' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Highlights */}
      <section className="py-16 px-6" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>系统亮点</h2>
            <p className="text-sm" style={{ color: '#475569' }}>高效、智能、可信赖</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '大数据驱动',
                desc: '基于海量用户数据，构建精准用户画像，实现个性化营销推送',
              },
              {
                title: 'AI智能算法',
                desc: '机器学习算法持续优化推荐策略，提升营销触达的精准度',
              },
              {
                title: '实时数据分析',
                desc: '实时监控营销效果，快速响应市场变化，及时调整策略',
              },
              {
                title: '全链路覆盖',
                desc: '从获客到转化到复购，全链路数字化营销支持',
              },
              {
                title: '自动化工作流',
                desc: '营销流程自动化，减少人工干预，提升运营效率',
              },
              {
                title: '多平台整合',
                desc: '一站式管理多个营销渠道，数据统一分析，策略协同优化',
              },
            ].map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#EA580C' }}>
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1" style={{ color: '#0F172A' }}>{highlight.title}</h4>
                  <p className="text-sm" style={{ color: '#475569' }}>{highlight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10万+', label: '触达用户' },
              { value: '50+', label: '合作品牌' },
              { value: '30%', label: '转化提升' },
              { value: '24h', label: '快速响应' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#EA580C' }}>{stat.value}</div>
                <div className="text-sm" style={{ color: '#475569' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6" style={{ background: '#fff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>了解更多</h2>
          <p className="text-sm mb-6" style={{ color: '#475569' }}>访问系统首页开始体验</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/experience" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5" style={{ backgroundColor: '#EA580C' }}>
              立即体验
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white" style={{ borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm" style={{ color: '#475569' }}>
            © 2024 宗靖商管 · 智能营销解决方案专家
          </p>
        </div>
      </footer>
    </div>
  );
}