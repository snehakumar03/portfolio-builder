import { create } from 'zustand'
import type { User } from '../types/auth.types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem('auth_token', token)
    set({ user, token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  hydrate: () => {
    const token = localStorage.getItem('auth_token')
    set({ token, isAuthenticated: !!token })
  },
}))
