'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Users, Building2 } from 'lucide-react';
import { API_BASE } from '@/lib/api';

const IMAGE_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export default function SystemHomePage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/projects`)
      .then(r => r.json())
      .then(data => {
        console.log('API Response:', data);
        setProjects(data.data || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#F4F7F6' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D5553 0%, #1E3D3A 100%)', minHeight: '480px' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10" style={{ background: '#fff' }}></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-5" style={{ background: '#fff' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 animate-fade-in" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#4ade80' }}></span>
            <span className="text-sm font-medium text-white">全新智能招商系统上线</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up tracking-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            精准匹配 · 高效入驻
          </h2>

          <p className="text-lg mb-10 max-w-xl mx-auto animate-fade-in-up text-white/80" style={{ animationDelay: '0.1s' }}>
            汇聚优质商业项目，为品牌方与物业方搭建高效的招商对接平台
          </p>

          <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <a href="#projects" className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-xl font-medium text-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5" style={{ color: '#2D5553' }}>
              <span>查看项目</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
              </svg>
            </a>
            <Link href="/system/apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all">
              立即入驻
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { value: projects?.length || '—', label: '优质项目', suffix: '+' },
              { value: '500+', label: '入驻品牌', suffix: '' },
              { value: '98%', label: '匹配成功率', suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 rounded-full" style={{ background: '#2D5553' }}></div>
                <h3 className="text-2xl font-bold" style={{ color: '#1A2E2C' }}>热门招商项目</h3>
              </div>
              <p className="text-sm ml-3" style={{ color: '#7A8F8D' }}>精选优质商业项目，助力品牌快速扩张</p>
            </div>
            {projects && projects.length > 0 && (
              <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-full" style={{ background: 'rgba(45, 85, 83, 0.08)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#3D7A65' }}></span>
                <span style={{ color: '#2D5553' }}>实时更新中 · {projects.length} 个项目</span>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-3 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: '#2D5553', borderTopColor: 'transparent' }}></div>
              <p className="text-sm" style={{ color: '#7A8F8D' }}>加载中...</p>
            </div>
          ) : error ? (
            <div className="text-center py-24 rounded-2xl" style={{ background: 'rgba(155, 61, 61, 0.08)' }}>
              <div className="text-4xl mb-3">⚠️</div>
              <p className="text-sm" style={{ color: '#9B3D3D' }}>加载失败，请检查网络</p>
            </div>
          ) : !projects || projects.length === 0 ? (
            <div className="text-center py-24 rounded-2xl bg-white">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-base font-medium mb-1" style={{ color: '#1A2E2C' }}>暂无项目</p>
              <p className="text-sm" style={{ color: '#7A8F8D' }}>敬请期待更多优质项目上线</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/system/sys-projects/${project.id}`}
                  className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #3D6B67, #2D5553, #1E3D3A)', padding: '2px' }}>
                    <div className="w-full h-full rounded-2xl" style={{ background: '#F4F7F6' }}></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative bg-white rounded-2xl">
                    {/* Project Cover */}
                    <div className="h-48 relative overflow-hidden">
                      {project.coverImage ? (
                        <img
                          src={`${IMAGE_BASE}${project.coverImage}`}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #3D6B67 0%, #2D5553 50%, #1E3D3A 100%)' }}>
                          <span className="text-7xl font-bold text-white/20 group-hover:scale-110 transition-transform duration-500">{project.name.charAt(0)}</span>
                        </div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(45,85,83,0.8) 0%, transparent 50%)' }}></div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">招商中</span>
                      </div>
                      {project.businessType && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">{project.businessType}</span>
                        </div>
                      )}

                      {/* Arrow Icon on Hover */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5" fill="none" stroke="#2D5553" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm" style={{ color: '#7A8F8D' }}>📍</span>
                        <span className="text-sm font-medium" style={{ color: '#4A5E5C' }}>{project.city}</span>
                        <span className="text-sm" style={{ color: '#D1D9D8' }}>·</span>
                        <span className="text-sm truncate flex-1" style={{ color: '#7A8F8D' }}>{project.address}</span>
                      </div>

                      <h4 className="text-lg font-bold mb-2 group-hover:text-[#2D5553] transition-colors" style={{ color: '#1A2E2C' }}>{project.name}</h4>

                      <p className="text-sm line-clamp-2 mb-4 leading-relaxed" style={{ color: '#7A8F8D' }}>
                        {project.description || '暂无项目描述'}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E8EDEC' }}>
                        <div className="flex items-center gap-1">
                          <span className="text-xs" style={{ color: '#7A8F8D' }}>总面积</span>
                          <span className="text-base font-bold ml-1" style={{ color: '#1A2E2C' }}>{project.totalArea ? `${project.totalArea.toLocaleString()}㎡` : '—'}</span>
                        </div>
                        {project.minRent ? (
                          <div className="text-right">
                            <span className="text-xs block" style={{ color: '#7A8F8D' }}>最低租金</span>
                            <span className="text-base font-bold" style={{ color: '#2D5553' }}>¥{project.minRent}/月</span>
                          </div>
                        ) : (
                          <span className="text-sm px-3 py-1 rounded-full" style={{ background: 'rgba(45, 85, 83, 0.08)', color: '#2D5553' }}>租金面议</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: '#2D5553' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">准备好入驻了吗？</h3>
          <p className="text-sm mb-8 text-white/80">立即提交入驻申请，专业团队将在24小时内与您联系</p>
          <Link href="/system/apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm bg-white shadow-lg transition-all hover:-translate-y-0.5" style={{ color: '#2D5553' }}>
            <Building2 className="w-5 h-5" />
            立即入驻
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-white" style={{ borderTop: '1px solid #D1D9D8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#2D5553' }}>
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="font-bold text-lg" style={{ color: '#1A2E2C' }}>宗靖招赢平台</span>
          </div>
          <div className="flex items-center justify-center gap-6 mb-5">
            <Link href="/system/login" className="text-sm" style={{ color: '#2D5553' }}>
              招商人员登录
            </Link>
            <Link href="/system/intro" className="text-sm" style={{ color: '#7A8F8D' }}>
              了解更多
            </Link>
          </div>
          <p className="text-sm text-center" style={{ color: '#7A8F8D' }}>
            © 2024 宗靖招赢 · 智能招商解决方案专家
          </p>
        </div>
      </footer>
    </div>
  );
}