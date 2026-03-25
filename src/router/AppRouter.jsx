import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

// Auth
import Landing from '@/pages/auth/Landing'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ForgotPassword from '@/pages/auth/ForgotPassword'

// Onboarding
import OnboardingShell from '@/pages/onboarding/OnboardingShell'

// App Pages
import Dashboard from '@/pages/dashboard/Dashboard'
import Budget from '@/pages/budget/Budget'
import Savings from '@/pages/savings/Savings'
import Investments from '@/pages/investments/Investments'
import Tax from '@/pages/tax/Tax'
import Credit from '@/pages/credit/Credit'
import Insurance from '@/pages/insurance/Insurance'
import AIAdvisor from '@/pages/ai-advisor/AIAdvisor'
import Profile from '@/pages/profile/Profile'

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected */}
      <Route element={<PrivateRoute />}>
        <Route path="/onboarding" element={<OnboardingShell />} />
        <Route path="/onboarding/*" element={<OnboardingShell />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/tax" element={<Tax />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/ai-advisor" element={<AIAdvisor />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
