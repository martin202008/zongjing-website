'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { tokenStorage } from '@/lib/api'

interface AuthContextType {
  isLoggedIn: boolean
  username: string | null
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState<string | null>(null)

  const checkAuth = () => {
    const token = tokenStorage.get()
    setIsLoggedIn(!!token)
    // Username would come from token decode in real app, simplified here
    setUsername(token ? '招商人员' : null)
  }

  const logout = () => {
    tokenStorage.remove()
    setIsLoggedIn(false)
    setUsername(null)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}