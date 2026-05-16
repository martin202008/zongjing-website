'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { translations, Language, TranslationKeys } from './i18n'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('zh')

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
