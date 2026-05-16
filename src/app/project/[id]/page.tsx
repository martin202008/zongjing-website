'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowLeft, CheckCircle, Phone, Clock, AreaChart } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: '中翔·黄埭广场',
    city: '苏州',
    address: '相城区黄埭镇',
    totalArea: 36000,
    description: '定位为社区邻里中心，以"家庭生活服务"为核心，聚焦周边社区居民日常生活需求，打造集购物、餐饮、休闲、社区服务为一体的社区商业配套。',
    image: '/images/projects/中翔黄埭广场.jpg',
    images: ['/images/projects/中翔黄埭广场.jpg'],
    businessType: '社区商业',
    features: ['社区配套', '家庭生活', '餐饮美食'],
    opening: '2025年9月',
    highlight: '36,000㎡商业面积',
    tags: ['社区商业', '家庭消费', '餐饮美食'],
    floors: '地下一层，地上四层',
    parking: '充足停车位',
    position: '黄埭镇核心商圈',
  },
  {
    id: 2,
    name: '中翔·甪直广场',
    city: '苏州',
    address: '吴中区甪直镇',
    totalArea: 64000,
    description: '江南水乡特色商业中心，融合传统与现代商业元素。涵盖购物、餐饮、娱乐、文化体验等多元业态，打造区域商业新地标。',
    image: '/images/projects/中翔甪直广场.jpg',
    images: ['/images/projects/中翔甪直广场.jpg'],
    businessType: '综合商业',
    features: ['水乡特色', '多元业态', '品牌丰富'],
    opening: '招商进行中',
    highlight: '64,000㎡商业面积',
    tags: ['水乡特色', '综合商业', '文化体验'],
    floors: '多元商业组合',
    parking: '大型停车场',
    position: '甪直镇商业中心',
  },
  {
    id: 3,
    name: '中翔·生活广场',
    city: '苏州',
    address: '姑苏区人民路',
    totalArea: 45000,
    description: '位于苏州市中心繁华地段，城市级商业标杆项目。汇聚国际国内知名品牌，地处人民路核心商圈，客流密集，形象高端。',
    image: '/images/projects/中翔生活广场.png',
    images: ['/images/projects/中翔生活广场.png'],
    businessType: '购物中心',
    features: ['核心商圈', '客流密集', '形象高端'],
    opening: '运营成熟',
    highlight: '城市级商业标杆',
    tags: ['核心商圈', '品牌汇聚', '成熟运营'],
    floors: '多楼层商业',
    parking: '充足停车位',
    position: '人民路核心商圈',
  },
  {
    id: 4,
    name: '中翔·时尚广场',
    city: '苏州',
    address: '吴江区太湖新城',
    totalArea: 78000,
    description: '面向年轻消费群体的时尚主题商业中心，引入潮流品牌与体验式业态。项目定位年轻时尚，注重社交媒体传播效应，打造苏州潮人打卡新地标。',
    image: '/images/projects/中翔时尚广场.jpg',
    images: ['/images/projects/中翔时尚广场.jpg'],
    businessType: '时尚商业',
    features: ['年轻潮流', '网红打卡', '体验业态'],
    opening: '招商进行中',
    highlight: '78,000㎡商业面积',
    tags: ['年轻时尚', '潮人聚集', '体验消费'],
    floors: '现代化商业空间',
    parking: '充足停车位',
    position: '太湖新城核心区',
  },
  {
    id: 5,
    name: '中翔·周庄广场',
    city: '苏州',
    address: '昆山市周庄镇',
    totalArea: 35000,
    description: '依托周庄旅游景区资源，打造景区配套商业与水乡文化体验相结合的商业项目。特色餐饮与文化体验相结合，吸引旅游客群。',
    image: '/images/projects/中翔周庄广场.png',
    images: ['/images/projects/中翔周庄广场.png'],
    businessType: '文旅商业',
    features: ['景区配套', '文化体验', '特色餐饮'],
    opening: '运营成熟',
    highlight: '景区商业配套',
    tags: ['旅游景区', '水乡文化', '特色餐饮'],
    floors: '景区商业配套',
    parking: '停车场配套',
    position: '周庄景区入口',
  },
  {
    id: 6,
    name: '苏州国际家居建材中心',
    city: '苏州',
    address: '相城区元和街道',
    totalArea: 120000,
    description: '苏州首屈一指的一站式家居建材采购中心，汇聚国内外知名家居品牌，涵盖家具、建材、软装、家电等全品类，打造舒适便捷的家居购物体验。项目规模宏大，业态齐全，是苏州家居建材行业的标杆项目。',
    image: '/images/projects/苏州国际家居建材中心_1.jpg',
    images: [
      '/images/projects/苏州国际家居建材中心_1.jpg',
      '/images/projects/苏州国际家居建材中心_2.jpg',
      '/images/projects/苏州国际家居建材中心_3.jpg',
    ],
    businessType: '专业市场',
    features: ['一站式购物', '品牌汇聚', '批发零售'],
    opening: '运营成熟',
    highlight: '12万㎡家居航母',
    tags: ['家居建材', '一站式', '批零结合'],
    floors: '多区联动商业',
    parking: '大型停车场',
    position: '相城区家居商圈',
  },
  {
    id: 7,
    name: '中翔国际旗袍城',
    city: '苏州',
    address: '相城区相城大道',
    totalArea: 28000,
    description: '国内首个以旗袍文化为主题的商业综合体，融合传统非遗文化与现代时尚元素，打造集旗袍定制、文化体验、特色餐饮、旅游休闲为一体的文旅商业新名片。项目以旗袍文化为核心，传承江南丝绸文化精髓。',
    image: '/images/projects/中翔国际旗袍城_1.jpg',
    images: [
      '/images/projects/中翔国际旗袍城_1.jpg',
      '/images/projects/中翔国际旗袍城_2.jpg',
      '/images/projects/中翔国际旗袍城_3.jpg',
    ],
    businessType: '文旅商业',
    features: ['旗袍文化', '非遗传承', '特色体验'],
    opening: '招商进行中',
    highlight: '28,000㎡文化地标',
    tags: ['旗袍文化', '文旅商业', '非遗传承'],
    floors: '旗袍文化主题商业空间',
    parking: '配套停车场',
    position: '吴江旗袍小镇',
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl mb-2" style={{ color: '#0F172A' }}>项目不存在</p>
          <Link href="/project" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white mt-4" style={{ background: '#1E40AF' }}>
            返回项目列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
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

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-md border" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center gap-2 mb-2">
              <AreaChart className="w-4 h-4" style={{ color: '#1E40AF' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>商业面积</span>
            </div>
            <p className="text-xl font-bold" style={{ color: '#0F172A' }}>{project.totalArea.toLocaleString()}㎡</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md border" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" style={{ color: '#1E40AF' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>项目位置</span>
            </div>
            <p className="text-sm font-semibold truncate" style={{ color: '#0F172A' }}>{project.position}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md border" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" style={{ color: '#1E40AF' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>开业状态</span>
            </div>
            <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{project.opening}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md border" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4" style={{ color: '#1E40AF' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>业态规划</span>
            </div>
            <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{project.floors}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Description */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border" style={{ borderColor: '#E2E8F0' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>项目简介</h2>
            <div className="w-12 h-0.5 mb-6" style={{ background: '#1E40AF' }}></div>
            <p className="leading-relaxed text-base" style={{ color: '#475569' }}>{project.description}</p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border" style={{ borderColor: '#E2E8F0' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#0F172A' }}>项目特色</h2>
            <div className="w-12 h-0.5 mb-6" style={{ background: '#1E40AF' }}></div>
            <div className="flex flex-wrap gap-3">
              {project.features.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#EEF2FF', color: '#1E40AF' }}>
                  <CheckCircle className="w-4 h-4" />
                  {f}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E2E8F0' }}>
              <h3 className="text-sm font-semibold mb-3" style={{ color: '#0F172A' }}>标签</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="inline-block text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#F8FAFC', color: '#64748B' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-8 md:p-12 text-center mb-12"
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
          </div>
        </div>
      </div>
    </div>
  )
}