import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-white" style={{ borderTop: '1px solid #E2E8F0' }}>
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#1E40AF' }}>
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <span className="font-semibold" style={{ color: '#0F172A' }}>宗靖商管</span>
        </div>
        <p className="text-sm" style={{ color: '#64748B' }}>
          © 2024 宗靖商管 · 商业招商解决方案专家
        </p>
      </div>
    </footer>
  )
}
