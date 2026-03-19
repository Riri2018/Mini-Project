import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isOnboarded: false,

      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, isOnboarded: false }),
      completeOnboarding: () => set({ isOnboarded: true }),
    }),
    { name: 'smartsalary-auth' }
  )
);

export default useAuthStore;
