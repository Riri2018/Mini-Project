import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Wallet, PiggyBank, TrendingUp, Bot } from 'lucide-react'
import clsx from 'clsx'

const items = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/budget', icon: Wallet, label: 'Budget' },
  { to: '/savings', icon: PiggyBank, label: 'Savings' },
  { to: '/investments', icon: TrendingUp, label: 'Invest' },
  { to: '/ai-advisor', icon: Bot, label: 'AI' },
]

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 md:hidden">
      <div className="glass-nav border-t border-white/[0.08] px-2 py-2 flex justify-around">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all',
                isActive ? 'text-ss-teal-light' : 'text-white/40'
              )
            }
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
