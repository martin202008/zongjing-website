'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: '#E2E8F0' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#1E40AF' }}>
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="font-semibold text-lg" style={{ color: '#0F172A' }}>宗靖商管</span>
          </Link>
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
            <Link href="/" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: '#475569' }}>
              首页
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: '#475569' }}>
              关于我们
            </Link>
            <Link href="/project" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: '#475569' }}>
              项目展示
            </Link>
            <Link href="/digital" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: '#1E40AF' }}>
              数智成果
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}