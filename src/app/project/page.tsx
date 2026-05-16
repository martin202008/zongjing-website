'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight, Building2, CheckCircle, Phone, Sparkles } from 'lucide-react'

const projects = [
  {
    id: 7,
    name: '中翔国际旗袍城',
    city: '苏州',
    address: '相城区相城大道',
    totalArea: 28000,
    description: '国内首个以旗袍文化为主题的商业综合体，融合传统非遗文化与现代时尚元素，打造集旗袍定制、文化体验、特色餐饮、旅游休闲为一体的文旅商业新名片。项目以旗袍文化为核心，传承江南丝绸文化精髓。',
    image: '/images/projects/中翔国际旗袍城_1.jpg',
    businessType: '文旅商业',
    features: ['旗袍文化', '非遗传承', '特色体验'],
    opening: '招商进行中',
    highlight: '28,000㎡文化地标',
    tags: ['旗袍文化', '文旅商业', '非遗传承'],
  },
  {
    id: 1,
    name: '中翔·黄埭广场',
    city: '苏州',
    address: '相城区黄埭镇',
    totalArea: 36000,
    description: '定位为社区邻里中心，以"家庭生活服务"为核心，聚焦周边社区居民日常生活需求，打造集购物、餐饮、休闲、社区服务为一体的社区商业配套。',
    image: '/images/projects/中翔黄埭广场.jpg',
    businessType: '社区商业',
    features: ['社区配套', '家庭生活', '餐饮美食'],
    opening: '2025年9月',
    highlight: '36,000㎡商业面积',
    tags: ['社区商业', '家庭消费', '餐饮美食'],
  },
  {
    id: 2,
    name: '中翔·甪直广场',
    city: '苏州',
    address: '吴中区甪直镇',
    totalArea: 64000,
    description: '江南水乡特色商业中心，融合传统与现代商业元素。涵盖购物、餐饮、娱乐、文化体验等多元业态，打造区域商业新地标。',
    image: '/images/projects/中翔甪直广场.jpg',
    businessType: '综合商业',
    features: ['水乡特色', '多元业态', '品牌丰富'],
    opening: '招商进行中',
    highlight: '64,000㎡商业面积',
    tags: ['水乡特色', '综合商业', '文化体验'],
  },
  {
    id: 3,
    name: '中翔·生活广场',
    city: '苏州',
    address: '姑苏区人民路',
    totalArea: 45000,
    description: '位于苏州市中心繁华地段，城市级商业标杆项目。汇聚国际国内知名品牌，地处人民路核心商圈，客流密集，形象高端。',
    image: '/images/projects/中翔生活广场.png',
    businessType: '购物中心',
    features: ['核心商圈', '客流密集', '形象高端'],
    opening: '运营成熟',
    highlight: '城市级商业标杆',
    tags: ['核心商圈', '品牌汇聚', '成熟运营'],
  },
  {
    id: 4,
    name: '中翔·时尚广场',
    city: '苏州',
    address: '吴江区太湖新城',
    totalArea: 78000,
    description: '面向年轻消费群体的时尚主题商业中心，引入潮流品牌与体验式业态。项目定位年轻时尚，注重社交媒体传播效应，打造苏州潮人打卡新地标。',
    image: '/images/projects/中翔时尚广场.jpg',
    businessType: '时尚商业',
    features: ['年轻潮流', '网红打卡', '体验业态'],
    opening: '招商进行中',
    highlight: '78,000㎡商业面积',
    tags: ['年轻时尚', '潮人聚集', '体验消费'],
  },
  {
    id: 5,
    name: '中翔·周庄广场',
    city: '苏州',
    address: '昆山市周庄镇',
    totalArea: 35000,
    description: '依托周庄旅游景区资源，打造景区配套商业与水乡文化体验相结合的商业项目。特色餐饮与文化体验相结合，吸引旅游客群。',
    image: '/images/projects/中翔周庄广场.png',
    businessType: '文旅商业',
    features: ['景区配套', '文化体验', '特色餐饮'],
    opening: '运营成熟',
    highlight: '景区商业配套',
    tags: ['旅游景区', '水乡文化', '特色餐饮'],
  },
  {
    id: 6,
    name: '苏州国际家居建材中心',
    city: '苏州',
    address: '相城区元和街道',
    totalArea: 120000,
    description: '苏州首屈一指的一站式家居建材采购中心，汇聚国内外知名家居品牌，涵盖家具、建材、软装、家电等全品类，打造舒适便捷的家居购物体验。',
    image: '/images/projects/苏州国际家居建材中心_1.jpg',
    businessType: '专业市场',
    features: ['一站式购物', '品牌汇聚', '批发零售'],
    opening: '运营成熟',
    highlight: '12万㎡家居航母',
    tags: ['家居建材', '一站式', '批零结合'],
  },
  {
    id: 7,
    name: '中翔国际旗袍城',
    city: '苏州',
    address: '相城区相城大道',
    totalArea: 28000,
    description: '国内首个以旗袍文化为主题的商业综合体，融合传统非遗文化与现代时尚元素，打造集旗袍定制、文化体验、特色餐饮、旅游休闲为一体的文旅商业新名片。',
    image: '/images/projects/中翔国际旗袍城_1.jpg',
    businessType: '文旅商业',
    features: ['旗袍文化', '非遗传承', '特色体验'],
    opening: '招商进行中',
    highlight: '28,000㎡文化地标',
    tags: ['旗袍文化', '文旅商业', '非遗传承'],
  },
]

export default function ProjectPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ backgroundColor: '#1E40AF' }}
      >
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/project_hero_1_001.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(30,64,175,0.6), rgba(30,64,175,0.4))' }} />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full opacity-10" style={{ background: '#fff' }}></div>
          <div className="absolute -bottom-40 -left-40 w-72 h-72 rounded-full opacity-5" style={{ background: '#fff' }}></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <Building2 className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/80">优质商业项目</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            招商项目展示
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            汇聚苏州优质商业项目，为品牌方与物业方搭建高效的招商对接平台
          </p>
          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">7</p>
              <p className="text-sm text-white/60">在营项目</p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">40万㎡+</p>
              <p className="text-sm text-white/60">运营面积</p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">200+</p>
              <p className="text-sm text-white/60">入驻品牌</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid - Modern Magazine Style */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Featured Project */}
          <div className="mb-12">
            <div className="relative rounded-3xl overflow-hidden group cursor-pointer" style={{ minHeight: '500px' }}>
              <Image
                src={projects[0].image}
                alt={projects[0].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              {/* Featured Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg">
                  <Sparkles className="w-4 h-4" style={{ color: '#F97316' }} />
                  重点推荐
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-2xl">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white mb-4">
                    {projects[0].businessType}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{projects[0].name}</h2>
                  <div className="flex items-center gap-2 text-white/80 mb-4">
                    <MapPin className="w-4 h-4" style={{ color: '#F97316' }} />
                    <span>{projects[0].city} · {projects[0].address}</span>
                  </div>
                  <p className="text-white/80 text-sm mb-6 line-clamp-2">{projects[0].description}</p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {projects[0].features.map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
                        <CheckCircle className="w-3 h-3" />
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/project/${projects[0].id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all hover:opacity-90"
                      style={{ background: '#1E40AF' }}
                    >
                      查看详情
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href="tel:0512-66188818"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      立即咨询
                    </a>
                  </div>
                </div>
              </div>

              {/* Area Badge */}
              <div className="absolute top-6 right-6">
                <span className="text-5xl font-bold text-white/20">{projects[0].totalArea.toLocaleString()}㎡</span>
              </div>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(1).map((project, index) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1px solid #E2E8F0' }}
              >
                {/* Image */}
                <Link href={`/project/${project.id}`} className="block relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Business Type Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow">
                    {project.businessType}
                  </span>

                  {/* Project Name */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <MapPin className="w-3 h-3" style={{ color: '#F97316' }} />
                      <span>{project.city} · {project.address}</span>
                    </div>
                  </div>
                </Link>

                {/* Info */}
                <div className="p-5">
                  {/* Description */}
                  <p className="text-sm line-clamp-2 mb-4" style={{ color: '#475569' }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                        <CheckCircle className="w-3 h-3" />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium" style={{ color: '#1E40AF' }}>
                      {project.highlight}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#EEF2FF', color: '#1E40AF' }}>
                      {project.opening}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/project/${project.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90 border"
                    style={{ borderColor: '#E2E8F0', color: '#1E40AF' }}
                  >
                    查看详情
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>准备好入驻了吗？</h3>
          <p className="mb-6" style={{ color: '#475569' }}>携手宗靖商管，共创商业地产新篇章</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0512-66188818"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#1E40AF' }}
            >
              <Phone className="w-5 h-5" />
              电话咨询：0512-66188818
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}