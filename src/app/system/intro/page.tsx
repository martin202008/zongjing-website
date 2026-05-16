'use client';

import Link from 'next/link';
import { Building2, Users, Target, BarChart3, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function SystemIntroPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F4F7F6' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E3D3A 0%, #2D5553 50%, #3D6B67 100%)', minHeight: '480px' }}>
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10" style={{ background: '#fff' }}></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-5" style={{ background: '#fff' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#4ade80' }}></span>
            <span className="text-sm font-medium text-white">智能招商管理平台</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            宗靖招赢系统
          </h1>

          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            专为商业地产招商团队打造的数字化管理平台
          </p>
          <p className="text-base max-w-xl mx-auto text-white/70 mb-10">
            整合项目资源、精准匹配商户、全流程跟踪服务，让招商效率倍增
          </p>

          <div className="flex items-center justify-center gap-3 text-white/80 text-sm">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>多项目管理</span>
            <span className="mx-2">·</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>商户追踪</span>
            <span className="mx-2">·</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>数据可视化</span>
          </div>
        </div>
      </section>

      {/* System Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#1A2E2C' }}>系统核心功能</h2>
            <p className="text-sm" style={{ color: '#7A8F8D' }}>全方位满足招商团队日常工作需求</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Building2,
                title: '项目管理',
                desc: '多项目统一管理，实时更新项目状态、面积、租金、招商进度等信息，支持封面图上传',
                color: '#1E40AF',
              },
              {
                icon: Users,
                title: '商户管理',
                desc: '商户信息全收录，品牌档案、意向等级、跟进记录一目了然，支持客户批量导入',
                color: '#059669',
              },
              {
                icon: Target,
                title: '线索追踪',
                desc: '从意向到签约全流程跟踪，智能提醒跟进时间，不遗漏任何商业机会',
                color: '#DC2626',
              },
              {
                icon: BarChart3,
                title: '数据看板',
                desc: '招商数据实时统计，转化率分析、商户分布、业绩排名，辅助决策制定',
                color: '#7C3AED',
              },
              {
                icon: Zap,
                title: '入驻申请',
                desc: '品牌方在线提交入驻申请，招商人员快速响应，流程透明可追溯',
                color: '#EA580C',
              },
              {
                icon: Shield,
                title: '权限管理',
                desc: '细粒度权限控制，操作日志全程记录，数据安全有保障',
                color: '#0891B2',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl transition-all hover:shadow-md"
                style={{ border: '1px solid #E8EDEC' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#1A2E2C' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A8F8D' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Highlights */}
      <section className="py-16 px-6" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#1A2E2C' }}>系统亮点</h2>
            <p className="text-sm" style={{ color: '#7A8F8D' }}>高效、智能、可信赖</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '智能匹配推荐',
                desc: '基于商户意向和项目特征，智能推荐匹配项目，提升招商成功率',
              },
              {
                title: '实时数据同步',
                desc: '所有数据云端实时同步，团队成员随时随地查看最新信息',
              },
              {
                title: '移动端适配',
                desc: '管理后台支持手机端访问，抽屉式菜单设计，随时随地处理业务',
              },
              {
                title: '操作日志追溯',
                desc: '所有操作全程记录，支持日志查询，数据安全可追溯',
              },
              {
                title: '流程自动化',
                desc: '入驻申请、跟进提醒、阶段流转自动化，减少人工干预',
              },
              {
                title: '可视化报表',
                desc: '招商漏斗、转化率、业绩排名等数据可视化，辅助管理决策',
              },
            ].map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E8EDEC' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#2D5553' }}>
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-1" style={{ color: '#1A2E2C' }}>{highlight.title}</h4>
                  <p className="text-sm" style={{ color: '#7A8F8D' }}>{highlight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(135deg, #2D5553 0%, #1E3D3A 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3 text-white">工作流程</h2>
            <p className="text-sm text-white/70">简化招商流程，提升协作效率</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { step: '01', title: '品牌入驻申请', desc: '品牌方提交入驻意向' },
              { step: '02', title: '招商人员跟进', desc: '系统智能分配任务' },
              { step: '03', title: '项目匹配', desc: '大数据精准推荐' },
              { step: '04', title: '签约入驻', desc: '全流程线上完成' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold text-white" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  {item.step}
                </div>
                <h4 className="font-semibold mb-1 text-white">{item.title}</h4>
                <p className="text-sm text-white/60">{item.desc}</p>
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
              { value: '500+', label: '入驻品牌' },
              { value: '10+', label: '合作项目' },
              { value: '98%', label: '匹配成功率' },
              { value: '24h', label: '快速响应' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#2D5553' }}>{stat.value}</div>
                <div className="text-sm" style={{ color: '#7A8F8D' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Different approach */}
      <section className="py-12 px-6" style={{ background: '#fff' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1A2E2C' }}>开始使用招赢系统</h2>
          <p className="text-sm mb-6" style={{ color: '#7A8F8D' }}>访问系统首页了解更多</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/system" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5" style={{ backgroundColor: '#2D5553' }}>
              进入系统
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white" style={{ borderTop: '1px solid #D1D9D8' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm" style={{ color: '#7A8F8D' }}>
            © 2024 宗靖招赢 · 智能招商管理系统
          </p>
        </div>
      </footer>
    </div>
  );
}