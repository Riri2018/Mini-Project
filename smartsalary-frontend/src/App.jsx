import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import AppShell from './components/layout/AppShell';
import PrivateRoute from './router/PrivateRoute';

// Auth pages
import Landing from './pages/auth/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Onboarding
import OnboardingShell from './pages/onboarding/OnboardingShell';

// App pages
import Dashboard from './pages/dashboard/Dashboard';
import Budget from './pages/budget/Budget';
import Savings from './pages/savings/Savings';
import Investments from './pages/investments/Investments';
import Tax from './pages/tax/Tax';
import Credit from './pages/credit/Credit';
import Insurance from './pages/insurance/Insurance';
import AIAdvisor from './pages/ai-advisor/AIAdvisor';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Onboarding */}
          <Route path="/onboarding" element={
            <PrivateRoute>
              <OnboardingShell />
            </PrivateRoute>
          } />

          {/* App routes (with sidebar layout) */}
          <Route element={
            <PrivateRoute>
              <AppShell />
            </PrivateRoute>
          }>
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

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
