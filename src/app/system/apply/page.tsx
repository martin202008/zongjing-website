'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { applicationApi } from '@/lib/api';

function ApplyForm() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project_id');

  const [form, setForm] = useState({
    brandName: '',
    contactName: '',
    phone: '',
    intentionArea: '',
    intentionCity: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.brandName.trim()) newErrors.brandName = '请输入品牌名称';
    if (!form.contactName.trim()) newErrors.contactName = '请输入联系人姓名';
    if (!form.phone.trim()) {
      newErrors.phone = '请输入联系电话';
    } else if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = '请输入有效的手机号码';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await applicationApi.create({
        projectId: Number(projectId) || 0,
        brandName: form.brandName,
        contactName: form.contactName,
        phone: form.phone,
        intentionArea: form.intentionArea,
        intentionCity: form.intentionCity,
      });
      setSuccess(true);
    } catch {
      setErrors({ submit: '提交失败，请稍后重试' });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4F7F6' }}>
        <div className="bg-white rounded-3xl p-10 text-center max-w-md mx-4 animate-fade-in-up shadow-xl">
          {/* Success Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(61, 122, 101, 0.2)' }}></div>
            <div className="relative w-full h-full rounded-full flex items-center justify-center" style={{ background: 'rgba(61, 122, 101, 0.1)' }}>
              <svg className="w-10 h-10" style={{ color: '#3D7A65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2.5" style={{ color: '#1A2E2C' }}>提交成功</h2>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: '#4A5E5C' }}>
            我们已收到您的入驻申请<br />
            专业团队将在 <strong style={{ color: '#2D5553' }}>24小时内</strong> 与您联系
          </p>

          <div className="space-y-3">
            <Link href="/" className="block w-full btn-primary py-3.5 rounded-xl font-medium text-sm">
              返回首页
            </Link>
            <Link href="/#projects" className="block w-full py-3 rounded-xl font-medium text-sm transition-colors" style={{ background: '#F4F7F6', color: '#4A5E5C' }}>
              查看更多项目
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F4F7F6 0%, #ffffff 100%)' }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: '#D1D9D8' }}>
        <div className="max-w-md mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: '#2D5553' }}>
              <span className="text-white font-semibold text-lg">Z</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold" style={{ color: '#1A2E2C' }}>宗靖招赢</h1>
              <p className="text-xs" style={{ color: '#7A8F8D' }}>商业招商解决方案</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-md mx-auto px-5 py-10">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(45, 85, 83, 0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2D5553' }}></span>
            <span className="text-xs" style={{ color: '#2D5553' }}>入驻申请</span>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1A2E2C' }}>欢迎入驻</h2>
          <p className="text-sm" style={{ color: '#4A5E5C' }}>填写入驻信息，我们期待与您合作</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border animate-fade-in-up" style={{ borderColor: '#E8EDEC' }}>
          {/* Project Badge */}
          {projectId && (
            <div className="mb-6 p-4 rounded-2xl flex items-center gap-3" style={{ background: 'linear-gradient(135deg, rgba(45, 85, 83, 0.06), rgba(45, 85, 83, 0.03))' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(45, 85, 83, 0.1)' }}>
                <span className="text-2xl">🏢</span>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#7A8F8D' }}>申请项目</p>
                <p className="text-sm font-semibold" style={{ color: '#1A2E2C' }}>项目 ID: {projectId}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A2E2C' }}>
                品牌名称 <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: '#7A8F8D' }}>🏪</span>
                <input
                  type="text"
                  value={form.brandName}
                  onChange={e => { setForm({ ...form, brandName: e.target.value }); setErrors({ ...errors, brandName: '' }); }}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all ${errors.brandName ? 'border-red-300' : ''}`}
                  style={{ borderColor: errors.brandName ? '#fca5a5' : '#D1D9D8', background: '#F4F7F6' }}
                  placeholder="请输入您的品牌名称"
                />
              </div>
              {errors.brandName && (
                <p className="text-xs mt-1.5" style={{ color: '#9B3D3D' }}>{errors.brandName}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A2E2C' }}>
                联系人 <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: '#7A8F8D' }}>👤</span>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={e => { setForm({ ...form, contactName: e.target.value }); setErrors({ ...errors, contactName: '' }); }}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all ${errors.contactName ? 'border-red-300' : ''}`}
                  style={{ borderColor: errors.contactName ? '#fca5a5' : '#D1D9D8', background: '#F4F7F6' }}
                  placeholder="请输入联系人姓名"
                />
              </div>
              {errors.contactName && (
                <p className="text-xs mt-1.5" style={{ color: '#9B3D3D' }}>{errors.contactName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A2E2C' }}>
                联系电话 <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: '#7A8F8D' }}>📱</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all ${errors.phone ? 'border-red-300' : ''}`}
                  style={{ borderColor: errors.phone ? '#fca5a5' : '#D1D9D8', background: '#F4F7F6' }}
                  placeholder="请输入11位手机号码"
                />
              </div>
              {errors.phone && (
                <p className="text-xs mt-1.5" style={{ color: '#9B3D3D' }}>{errors.phone}</p>
              )}
            </div>

            {/* Intention Area & City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A2E2C' }}>
                  意向面积
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#7A8F8D' }}>📐</span>
                  <input
                    type="text"
                    value={form.intentionArea}
                    onChange={e => setForm({ ...form, intentionArea: e.target.value })}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border text-sm transition-all"
                    style={{ borderColor: '#D1D9D8', background: '#F4F7F6' }}
                    placeholder="如: 100㎡"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1A2E2C' }}>
                  意向城市
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#7A8F8D' }}>🏙️</span>
                  <input
                    type="text"
                    value={form.intentionCity}
                    onChange={e => setForm({ ...form, intentionCity: e.target.value })}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border text-sm transition-all"
                    style={{ borderColor: '#D1D9D8', background: '#F4F7F6' }}
                    placeholder="如: 上海"
                  />
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 rounded-xl" style={{ background: 'rgba(155, 61, 61, 0.06)' }}>
                <p className="text-sm" style={{ color: '#9B3D3D' }}>{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 mt-6 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#fff', borderTopColor: 'transparent' }}></div>
                  提交中...
                </>
              ) : (
                <>
                  <span>🚀</span> 提交入驻申请
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-center mt-6 leading-relaxed" style={{ color: '#7A8F8D' }}>
            提交即表示同意我们的《入驻协议》和《隐私政策》
          </p>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm inline-flex items-center gap-1.5 transition-colors hover:underline" style={{ color: '#4A5E5C' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6" style={{ borderTop: '1px solid #D1D9D8' }}>
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm" style={{ color: '#7A8F8D' }}>
            © 2024 宗靖招赢平台 · 商业招商解决方案专家
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4F7F6' }}>
        <div className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#2D5553', borderTopColor: 'transparent' }}></div>
      </div>
    }>
      <ApplyForm />
    </Suspense>
  );
}
