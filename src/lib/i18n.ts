export const translations = {
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      products: '产品服务',
      projects: '项目展示',
      news: '资讯动态',
      contact: '联系我们',
      experience: '立即体验',
    },
    home: {
      slogan: '精准匹配 · 高效入驻',
      mission: '让商业地产招商更简单',
      vision: '打造中国领先的商业地产招赢平台',
      cta: '立即体验',
      learnMore: '了解更多',
      viewAll: '查看全部项目',
    },
    about: {
      title: '关于我们',
      subtitle: '专注商业地产数字化招商',
    },
    products: {
      title: '产品服务',
      subtitle: '招赢系统 — 智能招商管理平台',
    },
    footer: {
      copyright: '© 2024 宗靖商管. 保留所有权利.',
      address: '地址：苏州市相城区',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      projects: 'Projects',
      news: 'News',
      contact: 'Contact',
      experience: 'Get Started',
    },
    home: {
      slogan: 'Precision Match · Efficient Settlement',
      mission: 'Making commercial real estate investment simpler',
      vision: 'Building China\'s leading commercial real estate platform',
      cta: 'Get Started',
      learnMore: 'Learn More',
      viewAll: 'View All Projects',
    },
    about: {
      title: 'About Us',
      subtitle: 'Dedicated to Digital Investment in Commercial Real Estate',
    },
    products: {
      title: 'Products & Services',
      subtitle: 'ZhaoYing System — Smart Investment Management Platform',
    },
    footer: {
      copyright: '© 2024 Zongjing Commercial Management. All rights reserved.',
      address: 'Address: Xiangcheng District, Suzhou',
    },
  },
}

export type Language = 'zh' | 'en'
export type TranslationKeys = typeof translations.zh
