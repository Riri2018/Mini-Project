import { useState } from 'react';
import { Bell, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import useUserStore from '../../store/userStore';
import { formatCurrency } from '../../utils/formatCurrency';

const TopNav = ({ title, subtitle }) => {
  const { profile } = useUserStore();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 glass-nav flex items-center gap-4 px-6 py-3"
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[17px] font-semibold text-white/95 truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
          {title}
        </h1>
        {subtitle && <p className="text-[12px] text-white/40 truncate">{subtitle}</p>}
      </div>

      {/* Search */}
      <motion.div
        animate={{ width: searchFocused ? 240 : 160 }}
        transition={{ duration: 0.3 }}
        className="relative hidden md:block"
      >
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-full bg-white/[0.06] border border-white/[0.12] rounded-lg pl-8 pr-3 py-1.5 text-[13px] text-white/80 placeholder-white/30 outline-none focus:border-[rgba(29,158,117,0.5)] transition-all"
        />
      </motion.div>

      {/* Salary chip */}
      <div
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px]"
        style={{ background: 'rgba(29,158,117,0.12)', border: '0.5px solid rgba(29,158,117,0.3)' }}
      >
        <Sparkles size={11} className="text-[#5DCAA5]" />
        <span className="text-white/60">Salary</span>
        <span className="text-[#5DCAA5] font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {formatCurrency(profile.salary, true)}
        </span>
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all">
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E24B4A]" />
      </button>

      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium cursor-pointer"
        style={{
          background: 'rgba(29, 158, 117, 0.25)',
          border: '1px solid rgba(29, 158, 117, 0.4)',
          color: '#5DCAA5',
        }}
      >
        {profile.name.split(' ').map(n => n[0]).join('')}
      </div>
    </header>
  );
};

export default TopNav;
