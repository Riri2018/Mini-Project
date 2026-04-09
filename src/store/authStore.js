import { create } from 'zustand'
import { registerUser, loginUser } from '@/services/authService'

const useAuthStore = create((set) => ({
  user: null,         // { id, name, email, hasCompletedOnboarding }
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const data = await loginUser(email, password)
      localStorage.setItem('token', data.access_token)
      
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        hasCompletedOnboarding: !data.needs_onboarding,
      }
      
      set({ user, isAuthenticated: true, isLoading: false })
      return { success: true, needsOnboarding: data.needs_onboarding }
    } catch (error) {
      set({ error: error.message || 'Login failed', isLoading: false })
      return { success: false }
    }
  },

  register: async (name, email, password, age, city, employer) => {
    set({ isLoading: true, error: null })
    try {
      const data = await registerUser({ name, email, password, age, city, employer })
      localStorage.setItem('token', data.access_token)
      
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        hasCompletedOnboarding: !data.needs_onboarding,
      }
      
      set({ user, isAuthenticated: true, isLoading: false })
      return { success: true, needsOnboarding: data.needs_onboarding }
    } catch (error) {
      set({ error: error.message || 'Registration failed', isLoading: false })
      return { success: false }
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, isAuthenticated: false })
  },
  
  completeOnboarding: () => {
    set((state) => ({
      user: state.user ? { ...state.user, hasCompletedOnboarding: true } : null
    }))
  }
}))

export default useAuthStore
