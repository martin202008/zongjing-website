'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Building,
  Award,
  Lightbulb,
  Sparkles
} from 'lucide-react'
import { API_BASE } from '@/lib/api'

const heroSlides = [
  {
    image: '/images/slide1.png',
    icon: TrendingUp,
    title: '商业价值',
    titleEn: 'Commercial Value',
    desc: '整合优质商业资源，提升资产价值',
  },
  {
    image: '/images/slide2.png',
    icon: Building,
    title: '城市发展',
    titleEn: 'Urban Development',
    desc: '推动区域商业升级，赋能城市发展',
  },
  {
    image: '/images/slide3.png',
    icon: Award,
    title: '专业团队',
    titleEn: 'Professional Team',
    desc: '资深运营团队，一站式管理服务',
  },
]

const advantages = [
  { icon: Lightbulb, title: '精准匹配', desc: '基于大数据分析的智能推荐系统，为商户匹配合适的商铺资源', bg: '#EEF2FF', color: '#1E40AF' },
  { icon: CheckCircle, title: '高效对接', desc: '实时沟通，快速响应入驻需求，降低沟通成本', bg: '#F0FDF4', color: '#16A34A' },
  { icon: Sparkles, title: '安全可靠', desc: '严格的资质审核与合同保障，交易更放心', bg: '#FFF7ED', color: '#EA580C' },
]

interface ProjectForDisplay {
  id: number
  name: string
  city: string
  totalArea?: number
  description?: string
  coverImage?: string
  minRent?: number
  businessType?: string
}

const projects = [
  {
    id: 1,
    name: '中翔·黄埭广场',
    city: '苏州',
    address: '相城区黄埭镇',
    totalArea: 36000,
    description: '社区邻里中心，家庭生活服务为核心',
    image: '/images/projects/中翔黄埭广场.jpg',
    businessType: '社区商业',
  },
  {
    id: 2,
    name: '中翔·甪直广场',
    city: '苏州',
    address: '吴中区甪直镇',
    totalArea: 64000,
    description: '江南水乡特色商业中心',
    image: '/images/projects/中翔甪直广场.jpg',
    businessType: '综合商业',
  },
  {
    id: 3,
    name: '中翔·生活广场',
    city: '苏州',
    address: '姑苏区人民路',
    totalArea: 45000,
    description: '城市级商业标杆项目',
    image: '/images/projects/中翔生活广场.png',
    businessType: '购物中心',
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = heroSlides[currentSlide]

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Carousel */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Carousel Background */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image src={slide.image} alt={slide.title} fill className="object-cover" priority={i === 0} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20" />
        </div>

        {/* Carousel Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors cursor-pointer">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors cursor-pointer">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? 'bg-white text-primary' : 'bg-white/40 text-white hover:bg-white/60'
              }`}
            >
              <slide.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{slide.title}</span>
            </button>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 relative">
                <Image src="/images/logo.png" alt="宗靖商管" width={80} height={80} className="object-contain" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">宗靖商管</h1>
                <p className="text-white/70 text-sm">ZONGJING COMMERCIAL</p>
              </div>
            </div>

            {/* Current Slide Content */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <current.icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{current.title}</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                专注商业地产数字化运营服务
              </h2>
              <p className="text-xl text-white/85 leading-relaxed max-w-2xl">
                宗靖商管是一家专注于商业地产运营服务的数字化平台运营商，致力于为商业地产运营商和品牌方搭建高效、透明的对接平台。
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <p className="text-4xl font-bold text-white">7+</p>
                <p className="text-white/70 text-sm">运营项目</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white">100+</p>
                <p className="text-white/70 text-sm">合作品牌</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white">50万㎡+</p>
                <p className="text-white/70 text-sm">运营面积</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ background: '#1E40AF' }}>
                了解更多
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/experience" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90 border-2 border-white/30 text-white hover:bg-white/10">
                立即入驻
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/images/about_collaboration_v2_001.jpg" alt="Team" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl" style={{ border: '1px solid #E2E8F0' }}>
                <p className="text-4xl font-bold" style={{ color: '#1E40AF' }}>10+</p>
                <p className="text-sm" style={{ color: '#475569' }}>年行业经验</p>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl" style={{ backgroundColor: '#EEF2FF', zIndex: -1 }} />
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: '#EEF2FF', color: '#1E40AF' }}>
                <Sparkles className="w-4 h-4" />
                关于我们
              </div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#0F172A' }}>
                让招商更简单
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#475569' }}>
                我们致力于通过数字化手段，为商业地产运营商和品牌方搭建高效、透明的对接平台，大幅提升招商效率。以技术创新驱动行业升级，构建覆盖全国的商业地产招赢生态体系。
              </p>

              {/* Feature list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF2FF' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: '#1E40AF' }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#0F172A' }}>专业团队</p>
                    <p className="text-sm" style={{ color: '#64748B' }}>经验丰富</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F0FDF4' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: '#16A34A' }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#0F172A' }}>数字平台</p>
                    <p className="text-sm" style={{ color: '#64748B' }}>技术驱动</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFF7ED' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: '#EA580C' }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#0F172A' }}>全流程</p>
                    <p className="text-sm" style={{ color: '#64748B' }}>一站式</p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="inline-flex items-center gap-2 font-semibold hover:underline" style={{ color: '#1E40AF' }}>
                了解更多关于我们
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-24" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: '#EEF2FF', color: '#1E40AF' }}>
              <Lightbulb className="w-4 h-4" />
              核心优势
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0F172A' }}>
              三大核心能力
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#475569' }}>
              精准匹配、高效对接、安全可靠，助力招商效率提升
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1" style={{ border: '1px solid #E2E8F0' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: item.bg }}>
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: '#475569' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: '#EEF2FF', color: '#1E40AF' }}>
                <Building className="w-4 h-4" />
                运营项目
              </div>
              <h2 className="text-4xl font-bold" style={{ color: '#0F172A' }}>
                7大商业项目
              </h2>
              <p className="text-lg mt-2" style={{ color: '#475569' }}>
                覆盖苏州及周边地区
              </p>
            </div>
            <Link
              href="/project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#1E40AF' }}
            >
              查看更多
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className="group rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 block"
                style={{ border: '1px solid #E2E8F0' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block text-xs px-3 py-1 rounded-full text-white" style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
                      {project.businessType || '招商中'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#0F172A' }}>{project.name}</h3>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#475569' }}>
                    <MapPin className="w-4 h-4" style={{ color: '#EA580C' }} />
                    <span>{project.city}</span>
                    <span>·</span>
                    <span>{project.totalArea}㎡</span>
                  </div>
                </div>
              </Link>
            ))}
            {projects.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">暂无项目数据</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - SINGLE BUTTON linking to /system */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            开启您的招商之旅
          </h2>
          <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
            携手宗靖商管，共创商业地产新篇章
          </p>
          <Link href="/system" className="inline-flex items-center gap-2 text-lg px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ background: '#F97316' }}>
            立即入驻
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}