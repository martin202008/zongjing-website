'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

const IMAGE_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

interface Project {
  id: number
  name: string
  city: string
  address: string
  totalArea?: number
  description?: string
  coverImage?: string
  minRent?: number
  businessType?: string
}

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${IMAGE_BASE}/projects`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.data || [])
        setProjects(list)
        setLoading(false)
      })
      .catch(err => {
        console.error('获取项目列表失败', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#F4F7F6' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50" style={{ borderColor: '#D1D9D8' }}>
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: '#2D5553' }}>
                <span className="text-white font-semibold text-lg">Z</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold" style={{ color: '#1A2E2C' }}>宗靖招赢</h1>
                <p className="text-xs" style={{ color: '#7A8F8D' }}>商业招商解决方案</p>
              </div>
            </Link>
            <Link href="/system/admin" className="text-sm px-4 py-2 rounded-lg transition-colors" style={{ background: '#2D5553', color: 'white' }}>
              管理后台
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 md:py-20" style={{ background: 'linear-gradient(145deg, #3D6B67 0%, #2D5553 50%, #1E3D3A 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">招商项目</h1>
          <p className="text-white/70">浏览全部招商项目，找到适合您的商业空间</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          {loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#2D5553', borderTopColor: 'transparent' }}></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-lg mb-2" style={{ color: '#4A5E5C' }}>暂无项目</p>
              <p className="text-sm" style={{ color: '#7A8F8D' }}>请联系工作人员添加项目信息</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/system/sys-projects/${project.id}`}
                  className="group rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 block"
                  style={{ border: '1px solid #E8EDEC', background: 'white', animationDelay: `${index * 0.06}s` }}
                >
                  <div className="relative h-48" style={{ background: 'linear-gradient(145deg, #E8EDEC, #F4F7F6)' }}>
                    {project.coverImage ? (
                      <img
                        src={`${IMAGE_BASE}${project.coverImage}`}
                        alt={project.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-bold" style={{ color: '#2D5553' }}>{project.name?.charAt(0) || '?'}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#1A2E2C' }}>{project.name}</h3>
                    <div className="flex items-center gap-2 text-sm mb-3" style={{ color: '#7A8F8D' }}>
                      <MapPin className="w-4 h-4" style={{ color: '#EA580C' }} />
                      <span>{project.city} · {project.address}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs" style={{ color: '#7A8F8D' }}>
                      <span>{project.totalArea ? `${project.totalArea}㎡` : '-'}</span>
                      <span>{project.businessType || '综合'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white" style={{ borderTop: '1px solid #D1D9D8' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#2D5553' }}>
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="font-semibold" style={{ color: '#1A2E2C' }}>宗靖招赢平台</span>
          </div>
          <p className="text-sm" style={{ color: '#7A8F8D' }}>
            © 2024 宗靖招赢 · 智能招商解决方案专家
          </p>
        </div>
      </footer>
    </div>
  )
}