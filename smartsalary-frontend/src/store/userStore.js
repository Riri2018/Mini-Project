import { create } from 'zustand';

const useUserStore = create((set) => ({
  profile: {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    age: 24,
    city: 'Mumbai',
    employer: 'TechCorp Pvt. Ltd.',
    salary: 65000,
    payDate: 1,
    goals: ['emergency_fund', 'travel', 'investment'],
    healthScore: 72,
  },
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) => set((state) => ({ profile: { ...state.profile, ...updates } })),
}));

export default useUserStore;
