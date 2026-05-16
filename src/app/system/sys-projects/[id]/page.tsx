'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProject, useShops, API_BASE, Shop } from '@/lib/api';

const IMAGE_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export default function ProjectDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: project, isLoading: projectLoading } = useProject(id);
  const { data: shops, isLoading: shopsLoading } = useShops(id);

  const [filterFloor, setFilterFloor] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const loading = projectLoading || shopsLoading;

  // 获取所有楼层选项
  const floors = shops ? Array.from(new Set(shops.map(s => s.floor))).sort() : [];

  // 筛选后的铺位
  const filteredShops = shops?.filter(shop => {
    if (filterFloor !== 'all' && shop.floor !== filterFloor) return false;
    if (filterStatus !== 'all' && shop.status !== filterStatus) return false;
    return true;
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4F7F6' }}>
        <div className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#2D5553', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4F7F6' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-base mb-4" style={{ color: '#4A5E5C' }}>项目不存在</p>
          <Link href="/" className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm">返回首页</Link>
        </div>
      </div>
    );
  }

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
            <Link href={`/system/apply?project_id=${id}`} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-medium shadow-md">
              我要入驻
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-64 md:h-72 overflow-hidden" style={project.coverImage ? {} : { background: 'linear-gradient(145deg, #3D6B67 0%, #2D5553 50%, #1E3D3A 100%)' }}>
        {project.coverImage ? (
          <img
            src={`${IMAGE_BASE}${project.coverImage}`}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center" style={project.coverImage ? { background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))' } : {}}>
          <div className="text-center">
            {!project.coverImage && (
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <span className="text-3xl font-bold text-white">{project.name.charAt(0)}</span>
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{project.name}</h1>
            <p className="text-white/80 flex items-center justify-center gap-2">
              <span>📍</span> {project.city} · {project.address}
            </p>
          </div>
        </div>
        {/* 底部渐变遮罩 */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, #F4F7F6, transparent)' }}></div>
      </section>

      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: '总面积', value: project.totalArea ? `${project.totalArea}㎡` : '-', icon: '📐' },
            { label: '城市', value: project.city, icon: '🏙️' },
            { label: '业态', value: project.businessType || '综合', icon: '🏪' },
            { label: '最低租金', value: project.minRent ? `¥${project.minRent}/月` : '面议', icon: '💰' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border animate-fade-in-up hover:shadow-md transition-shadow" style={{ borderColor: '#E8EDEC', animationDelay: `${i * 0.06}s` }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm">{item.icon}</span>
                <span className="text-xs" style={{ color: '#7A8F8D' }}>{item.label}</span>
              </div>
              <p className="text-base font-semibold" style={{ color: '#1A2E2C' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        {project.description && (
          <div className="bg-white rounded-2xl p-5 mb-5 animate-fade-in-up" style={{ animationDelay: '0.28s' }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#1A2E2C' }}>项目简介</h3>
            <div className="w-8 h-0.5 mb-3" style={{ background: '#2D5553' }}></div>
            <p className="text-sm leading-relaxed" style={{ color: '#4A5E5C' }}>{project.description}</p>
          </div>
        )}

        {/* Shops Section */}
        <div className="bg-white rounded-2xl overflow-hidden mb-5 animate-fade-in-up" style={{ animationDelay: '0.36s' }}>
          <div className="px-5 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-3" style={{ borderColor: '#E8EDEC' }}>
            <div>
              <h3 className="text-sm font-semibold" style={{ color: '#1A2E2C' }}>铺位列表</h3>
              <p className="text-xs mt-0.5" style={{ color: '#7A8F8D' }}>
                共 {filteredShops.length} 个铺位
                {filteredShops.length !== (shops?.length || 0) && `（共 ${shops?.length} 个）`}
              </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={filterFloor}
                onChange={e => setFilterFloor(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer"
                style={{ borderColor: '#D1D9D8', background: '#F4F7F6', color: '#4A5E5C' }}
              >
                <option value="all">全部楼层</option>
                {floors.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer"
                style={{ borderColor: '#D1D9D8', background: '#F4F7F6', color: '#4A5E5C' }}
              >
                <option value="all">全部状态</option>
                <option value="available">可入驻</option>
                <option value="occupied">已占用</option>
              </select>
              {(filterFloor !== 'all' || filterStatus !== 'all') && (
                <button
                  onClick={() => { setFilterFloor('all'); setFilterStatus('all'); }}
                  className="text-xs px-2 py-1.5 rounded-lg transition-colors"
                  style={{ color: '#9B3D3D', background: 'rgba(155,61,61,0.08)' }}
                >
                  清除筛选
                </button>
              )}
            </div>
          </div>

          {!shops || shops.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">🏪</div>
              <p className="text-sm" style={{ color: '#7A8F8D' }}>暂无铺位信息</p>
            </div>
          ) : filteredShops.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm mb-2" style={{ color: '#4A5E5C' }}>没有符合条件的铺位</p>
              <button
                onClick={() => { setFilterFloor('all'); setFilterStatus('all'); }}
                className="text-xs underline" style={{ color: '#2D5553' }}
              >
                清除筛选条件
              </button>
            </div>
          ) : (
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredShops.map((shop, index) => (
                <div
                  key={shop.id}
                  className="group relative rounded-xl border p-4 transition-all duration-200 hover:shadow-lg hover:border-[#2D5553]/30 animate-fade-in-up"
                  style={{ borderColor: '#E8EDEC', background: shop.status === 'available' ? '#FAFFFE' : '#FAFAFA', animationDelay: `${index * 0.03}s` }}
                >
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`badge ${shop.status === 'available' ? 'badge-success' : 'badge-muted'}`}>
                      {shop.status === 'available' ? '可入驻' : '已占用'}
                    </span>
                  </div>

                  {/* Shop Image/Icon */}
                  <div className="w-full h-24 rounded-lg mb-3 overflow-hidden" style={{ background: 'linear-gradient(145deg, #E8EDEC, #F4F7F6)' }}>
                    {shop.image ? (
                      <img src={`${IMAGE_BASE}${shop.image}`} alt={shop.shopCode} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-bold" style={{ color: shop.status === 'available' ? '#2D5553' : '#7A8F8D' }}>{shop.shopCode}</span>
                      </div>
                    )}
                  </div>

                  {/* Shop Info */}
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold" style={{ color: '#1A2E2C' }}>{shop.shopCode}</h4>
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#7A8F8D' }}>
                      <span className="flex items-center gap-1">
                        <span>🏢</span> {shop.floor}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📐</span> {shop.area}㎡
                      </span>
                    </div>
                    <div className="pt-2 border-t" style={{ borderColor: '#E8EDEC' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: '#7A8F8D' }}>租金</span>
                        <span className="text-sm font-semibold" style={{ color: shop.rent ? '#2D5553' : '#7A8F8D' }}>
                          {shop.rent ? `¥${shop.rent}/月` : '面议'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  {shop.status === 'available' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#2D5553]/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                      <Link
                        href={`/system/apply?project_id=${id}`}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ color: '#2D5553' }}
                      >
                        <span>👉</span> 申请入驻
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center mb-10 animate-fade-in-up" style={{ background: 'linear-gradient(135deg, #3D6B67 0%, #2D5553 100%)', animationDelay: '0.44s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }}></span>
            <span className="text-xs text-white/80">招商进行中</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">对该项目感兴趣？</h3>
          <p className="text-white/60 text-sm mb-6">立即提交入驻申请，专业团队将在24小时内与您联系</p>
          <Link href={`/system/apply?project_id=${id}`} className="inline-flex items-center gap-2 bg-white px-8 py-3.5 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-shadow" style={{ color: '#2D5553' }}>
            <span>👉</span> 我要入驻
          </Link>
        </div>
      </div>

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
  );
}
