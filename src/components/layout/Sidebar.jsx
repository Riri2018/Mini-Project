import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Wallet, PiggyBank, TrendingUp,
  Receipt, CreditCard, Shield, Bot, User,
  ChevronLeft, ChevronRight, LogOut
} from 'lucide-react'
import clsx from 'clsx'
import Avatar from '../ui/Avatar'
import useAuthStore from '@/store/authStore'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/budget', icon: Wallet, label: 'Budget' },
  { to: '/savings', icon: PiggyBank, label: 'Savings' },
  { to: '/investments', icon: TrendingUp, label: 'Investments' },
  { to: '/tax', icon: Receipt, label: 'Tax Planner' },
  { to: '/credit', icon: CreditCard, label: 'Credit Score' },
  { to: '/insurance', icon: Shield, label: 'Insurance' },
  { to: '/ai-advisor', icon: Bot, label: 'AI Advisor' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass-sidebar flex-shrink-0 h-screen sticky top-0 flex flex-col overflow-hidden z-20"
    >
      {/* Logo */}
      <div className={clsx(
        'flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]',
        collapsed && 'justify-center'
      )}>
        <img src="/logo.svg" alt="SmartSalary" className="w-8 h-8 flex-shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-display font-semibold text-white text-[15px] whitespace-nowrap"
            >
              SmartSalary
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-[8px] px-3 py-2.5 transition-all duration-200 group',
                isActive
                  ? 'bg-ss-teal/20 text-ss-teal-light border border-ss-teal/40'
                  : 'text-white/50 hover:bg-white/[0.06] hover:text-white/80'
              )
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[13px] font-medium whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* User + collapse */}
      <div className="border-t border-white/[0.06] p-3 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <Avatar name={user?.name || 'User'} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-white/90 truncate">{user?.name || 'User'}</p>
              <p className="text-[11px] text-white/40 truncate">{user?.email || ''}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-2 rounded-[8px] px-3 py-2 text-white/40 hover:text-ss-danger hover:bg-ss-danger/10 transition-all duration-200 flex-1"
          >
            <LogOut size={16} />
            {!collapsed && <span className="text-[13px]">Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-[8px] text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </motion.aside>
  )
}
