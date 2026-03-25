import { create } from 'zustand'

const useUserStore = create((set, get) => ({
  profile: {
    name: 'Alex Fresher',
    age: 23,
    city: 'Mumbai',
    employer: 'TechCorp India',
    salary: 45000,
    payDate: 1,
    goals: ['emergency_fund', 'investments'],
    fixedExpenses: {
      rent: 12000,
      food: 5000,
      transport: 2000,
      utilities: 1500,
    },
  },
  financialHealth: {
    score: 72,
    budgetScore: 68,
    savingsScore: 75,
    investmentScore: 60,
    creditScore: 730,
  },
  notifications: [],

  updateProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),

  updateHealth: (data) =>
    set((state) => ({ financialHealth: { ...state.financialHealth, ...data } })),
}))

export default useUserStore
