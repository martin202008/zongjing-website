'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { message } from 'antd';
import { authApi, tokenStorage } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!form.username.trim()) newErrors.username = '请输入用户名';
    if (!form.password) newErrors.password = '请输入密码';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await authApi.login(form.username, form.password);
      if (result.code === 0 && result.data?.access_token) {
        tokenStorage.set(result.data.access_token);
        message.success('登录成功');
        router.push('/system/admin');
      } else {
        message.error(result.message || '登录失败，请检查用户名密码');
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || '登录失败，请检查用户名密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2D5553 0%, #1E3D3A 100%)' }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10" style={{ background: '#fff' }}></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-5" style={{ background: '#fff' }}></div>
      </div>

      <div className="relative w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="text-white font-bold text-2xl">Z</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">宗靖招赢平台</h1>
          <p className="text-white/60 text-sm">管理后台登录</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl animate-fade-in-up">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#1A2E2C' }}>欢迎回来</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A2E2C' }}>
                用户名
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: '#7A8F8D' }}>👤</span>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => { setForm({ ...form, username: e.target.value }); setErrors({ ...errors, username: '' }); }}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all ${errors.username ? 'border-red-300' : ''}`}
                  style={{ borderColor: errors.username ? '#fca5a5' : '#D1D9D8', background: '#F4F7F6' }}
                  placeholder="请输入用户名"
                />
              </div>
              {errors.username && (
                <p className="text-xs mt-1.5" style={{ color: '#9B3D3D' }}>{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1A2E2C' }}>
                密码
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: '#7A8F8D' }}>🔒</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all ${errors.password ? 'border-red-300' : ''}`}
                  style={{ borderColor: errors.password ? '#fca5a5' : '#D1D9D8', background: '#F4F7F6' }}
                  placeholder="请输入密码"
                />
              </div>
              {errors.password && (
                <p className="text-xs mt-1.5" style={{ color: '#9B3D3D' }}>{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 mt-6 shadow-md hover:shadow-lg disabled:opacity-60 transition-all"
              style={{ background: '#2D5553', color: 'white' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#fff', borderTopColor: 'transparent' }}></div>
                  登录中...
                </>
              ) : (
                <>
                  <span>🚀</span> 登录
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: '#E8EDEC' }}>
            <Link href="/" className="text-sm inline-flex items-center gap-1.5 transition-colors hover:underline" style={{ color: '#4A5E5C' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </Link>
          </div>
        </div>

        {/* Demo Hint */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            测试账号: zs001-zs010 / Zx2024!
          </p>
        </div>
      </div>
    </div>
  );
}
