import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, PiggyBank, TrendingUp, Receipt,
  CreditCard, Shield, Bot, User, ChevronLeft, Sparkles,
  Wallet
} from 'lucide-react';
import useUserStore from '../../store/userStore';

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
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { profile } = useUserStore();
  const initials = profile.name.split(' ').map(n => n[0]).join('');

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-screen sticky top-0 flex flex-col overflow-hidden z-40 shrink-0"
      style={{
        background: 'rgba(10, 14, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        borderRight: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #1D9E75, #6C63FF)' }}>
          <Sparkles size={14} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="font-display font-semibold text-white/95 text-[15px] whitespace-nowrap"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              SmartSalary
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Score chip */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-3 mb-3 p-3 rounded-xl overflow-hidden"
            style={{ background: 'rgba(29,158,117,0.12)', border: '0.5px solid rgba(29,158,117,0.3)' }}
          >
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Health Score</p>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold text-[#5DCAA5]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {profile.healthScore}
              </span>
              <span className="text-[11px] text-white/40 mb-0.5">/100</span>
            </div>
            <div className="mt-1.5 h-1 rounded bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profile.healthScore}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded"
                style={{ background: 'linear-gradient(90deg, #028090, #1D9E75)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav items */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 2 }}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                title={collapsed ? label : undefined}
              >
                <Icon size={16} className="shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap text-[13px]"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + collapse toggle */}
      <div className="p-2 border-t border-white/[0.06] flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-medium"
          style={{
            background: 'rgba(29, 158, 117, 0.25)',
            border: '1px solid rgba(29, 158, 117, 0.4)',
            color: '#5DCAA5',
          }}
        >
          {initials}
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 min-w-0"
            >
              <p className="text-[12px] text-white/80 truncate">{profile.name}</p>
              <p className="text-[10px] text-white/35 truncate">{profile.employer}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="p-1 rounded-md text-white/30 hover:text-white/60 transition-colors shrink-0"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronLeft size={14} />
          </motion.div>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
