'use client';

import Link from 'next/link';
import { Cpu, Wifi, Shield, Zap, CheckCircle, ArrowRight, Settings, LineChart, Bell, Video } from 'lucide-react';

export default function OpsSystemPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065F46 100%)', minHeight: '480px' }}>
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10" style={{ background: '#fff' }}></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-5" style={{ background: '#fff' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#34D399' }}></span>
            <span className="text-sm font-medium text-white">智能化物业管理平台</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            宗靖智能运维系统
          </h1>

          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            基于IoT和数字孪生技术的智慧物业管理平台
          </p>
          <p className="text-base max-w-xl mx-auto text-white/70 mb-10">
            实现设施设备预测性维护、能源优化管理、智慧安防一体化运营
          </p>

          <div className="flex items-center justify-center gap-3 text-white/80 text-sm">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>IoT监控</span>
            <span className="mx-2">·</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>数字孪生</span>
            <span className="mx-2">·</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>智能预警</span>
          </div>
        </div>
      </section>

      {/* System Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>系统核心功能</h2>
            <p className="text-sm" style={{ color: '#475569' }}>全方位满足物业智能化管理需求</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Wifi,
                title: 'IoT设备监控',
                desc: '实时监控设施设备运行状态，异常预警即时推送，保障设备安全运行',
                color: '#059669',
              },
              {
                icon: Cpu,
                title: '数字孪生可视化',
                desc: '3D数字孪生技术，设施管理精细化，远程巡检效率提升',
                color: '#0891B2',
              },
              {
                icon: LineChart,
                title: '能源优化',
                desc: '能耗数据实时采集分析，智能优化策略，降低运营成本',
                color: '#7C3AED',
              },
              {
                icon: Shield,
                title: '智慧安防',
                desc: '视频监控、门禁系统、报警联动一体化，保障资产安全',
                color: '#DC2626',
              },
              {
                icon: Bell,
                title: '智能预警',
                desc: '预测性维护算法，提前发现设备隐患，减少故障停机',
                color: '#EA580C',
              },
              {
                icon: Settings,
                title: '运维工单',
                desc: '故障报修、工单派发、维修跟踪全流程线上化管理',
                color: '#059669',
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
                title: 'IoT全面接入',
                desc: '支持多种协议设备接入，统一管理各类智能硬件设备',
              },
              {
                title: '数字孪生建模',
                desc: '快速构建设施数字孪生模型，实现设施可视化管理',
              },
              {
                title: '预测性维护',
                desc: 'AI算法分析设备运行数据，预判故障风险，主动维护',
              },
              {
                title: '能源精细化管理',
                desc: '分项计量、能耗分析、节能控制，助力降本增效',
              },
              {
                title: '安防一体化',
                desc: '视频监控、门禁、报警系统联动，构建全方位安防体系',
              },
              {
                title: '移动端支持',
                desc: '手机端随时查看设备状态、接收预警、处理工单',
              },
            ].map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#059669' }}>
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
              { value: '1000+', label: '接入设备' },
              { value: '50+', label: '管理项目' },
              { value: '30%', label: '节能效果' },
              { value: '24h', label: '实时监控' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#059669' }}>{stat.value}</div>
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
            <a href="/experience" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5" style={{ backgroundColor: '#059669' }}>
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
            © 2024 宗靖商管 · 智能运维解决方案专家
          </p>
        </div>
      </footer>
    </div>
  );
}