'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Cpu, TrendingUp, Building, CheckCircle, Sparkles } from 'lucide-react'

const products = [
  {
    id: 'invite',
    name: '宗靖招赢系统',
    subtitle: '智能化招商管理平台',
    description: '专为商业地产招商团队打造的数字化管理平台，整合项目资源、精准匹配商户、全流程跟踪服务，让招商效率倍增。',
    features: [
      '多项目管理，实时更新项目状态',
      '商户信息全收录，品牌档案管理',
      '从意向到签约全流程智能追踪',
      '招商数据实时统计，辅助决策',
    ],
    icon: Building,
    color: '#1E40AF',
    bgColor: '#EEF2FF',
    image: '/images/products/zongjing-invite_001.jpg',
    link: '/system/intro',
  },
  {
    id: 'marketing',
    name: '宗靖智能营销系统',
    subtitle: '数字化营销解决方案',
    description: '基于大数据和AI技术的智能营销平台，助力品牌实现精准获客、高效转化，赋能商业运营全链路数字化升级。',
    features: [
      '多渠道数据整合，洞察市场趋势',
      'AI智能推荐，精准触达目标客群',
      '营销效果实时追踪，ROI可视化',
      '自动化营销触达，提升转化效率',
    ],
    icon: TrendingUp,
    color: '#EA580C',
    bgColor: '#FFF7ED',
    image: '/images/products/zongjing-marketing_001.jpg',
    link: '/digital/marketing',
  },
  {
    id: 'ops',
    name: '宗靖智能运维系统',
    subtitle: '智能化物业管理平台',
    description: '基于IoT和数字孪生技术的智慧物业管理平台，实现设施设备预测性维护、能源优化管理、智慧安防一体化运营。',
    features: [
      'IoT设备实时监控，异常预警',
      '数字孪生可视化，设施管理精细化',
      '能源管理优化，降低运营成本',
      '智慧安防集成，保障资产安全',
    ],
    icon: Cpu,
    color: '#059669',
    bgColor: '#F0FDF4',
    image: '/images/products/zongjing-ops_001.jpg',
    link: '/digital/ops',
  },
]

export default function DigitalProductsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#1E40AF', minHeight: '60vh' }}>
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/digital_hero_1_001.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(30,64,175,0.6), rgba(30,64,175,0.4))' }} />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10" style={{ background: '#fff' }}></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-5" style={{ background: '#fff' }}></div>
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <Sparkles className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/80">数字化转型</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            数智成果
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-6">
            宗靖商管集团通过数字化转型升级，推出三大智能化产品系统，为商业地产运营赋能
          </p>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">3</p>
              <p className="text-sm text-white/60">智能产品</p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10+</p>
              <p className="text-sm text-white/60">年技术积累</p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-white/60">服务品牌</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Decorative element */}
                  <div
                    className="absolute -z-10 w-32 h-32 rounded-2xl"
                    style={{ backgroundColor: product.bgColor, top: '-16px', [index % 2 === 1 ? 'left' : 'right']: '-16px' }}
                  />
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
                    style={{ backgroundColor: product.bgColor, color: product.color }}
                  >
                    <product.icon className="w-4 h-4" />
                    {product.subtitle}
                  </div>
                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#0F172A' }}>
                    {product.name}
                  </h2>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: '#475569' }}>
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: product.color }} />
                        <span className="text-sm" style={{ color: '#475569' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={product.link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: product.color }}
                    >
                      了解更多
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {product.id === 'invite' && (
                      <a
                        href="/system"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 border-2"
                        style={{ borderColor: product.color, color: product.color }}
                      >
                        开始体验
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6" style={{ background: '#F8FAFC' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>
            开启数字化转型之旅
          </h3>
          <p className="text-white/70 mb-6" style={{ color: '#475569' }}>
            携手宗靖商管，共建智慧商业新生态
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/system"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: '#1E40AF' }}
            >
              进入招赢系统
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:0512-66188818"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm border-2 transition-all hover:bg-gray-50"
              style={{ borderColor: '#E2E8F0', color: '#0F172A' }}
            >
              电话咨询：0512-66188818
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}