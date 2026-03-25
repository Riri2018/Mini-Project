import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,         // { id, name, email, hasCompletedOnboarding }
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Simulate successful login
      const mockUser = {
        id: '1',
        name: 'Alex Fresher',
        email,
        hasCompletedOnboarding: true,
      }
      
      set({ user: mockUser, isAuthenticated: true, isLoading: false })
      return { success: true, needsOnboarding: !mockUser.hasCompletedOnboarding }
    } catch (error) {
      set({ error: error.message || 'Login failed', isLoading: false })
      return { success: false }
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const mockUser = {
        id: '2',
        name,
        email,
        hasCompletedOnboarding: false,
      }
      set({ user: mockUser, isAuthenticated: true, isLoading: false })
      return { success: true, needsOnboarding: true }
    } catch (error) {
      set({ error: error.message || 'Registration failed', isLoading: false })
      return { success: false }
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
  
  completeOnboarding: () => {
    set((state) => ({
      user: state.user ? { ...state.user, hasCompletedOnboarding: true } : null
    }))
  }
}))

export default useAuthStore
