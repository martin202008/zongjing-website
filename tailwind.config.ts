import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        'primary-light': '#3B82F6',
        secondary: '#60A5FA',
        cta: '#EA580C',
        'cta-light': '#F97316',
        surface: '#FFFFFF',
        background: '#F8FAFC',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        button: '10px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(30, 64, 175, 0.08)',
        'card-hover': '0 16px 48px rgba(30, 64, 175, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config