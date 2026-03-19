import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';

const StatTile = ({ label, value, prefix = '', suffix = '', change, changeLabel, icon: Icon, color = 'teal', delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  const colorMap = {
    teal: { text: '#5DCAA5', bg: 'rgba(29,158,117,0.15)', border: 'rgba(29,158,117,0.3)' },
    violet: { text: '#9F96FF', bg: 'rgba(108,99,255,0.15)', border: 'rgba(108,99,255,0.3)' },
    amber: { text: '#EF9F27', bg: 'rgba(239,159,39,0.15)', border: 'rgba(239,159,39,0.3)' },
    danger: { text: '#E24B4A', bg: 'rgba(226,75,74,0.15)', border: 'rgba(226,75,74,0.3)' },
    mint: { text: '#02C39A', bg: 'rgba(2,195,154,0.15)', border: 'rgba(2,195,154,0.3)' },
  };

  const c = colorMap[color] || colorMap.teal;

  useEffect(() => {
    const numericVal = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, ''));
    if (!isNaN(numericVal)) {
      const timer = setTimeout(() => {
        let start = 0;
        const step = numericVal / 40;
        const interval = setInterval(() => {
          start += step;
          if (start >= numericVal) {
            setDisplayValue(numericVal);
            clearInterval(interval);
          } else {
            setDisplayValue(Math.floor(start));
          }
        }, 25);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [value, delay]);

  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      className="glass-card p-5 relative overflow-hidden"
    >
      {/* Glow background */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none"
        style={{ background: c.bg, transform: 'translate(30%, -30%)' }}
      />

      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] uppercase tracking-[0.06em] text-white/45 font-medium">{label}</p>
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg, border: `0.5px solid ${c.border}` }}>
            <Icon size={14} style={{ color: c.text }} />
          </div>
        )}
      </div>

      <div className="flex items-end gap-1 mb-2">
        {prefix && <span className="text-[20px] font-medium text-white/60 mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{prefix}</span>}
        <span className="text-[32px] font-medium leading-none" style={{ color: c.text, fontFamily: 'Outfit, sans-serif' }}>
          {typeof value === 'number'
            ? displayValue.toLocaleString('en-IN')
            : value}
        </span>
        {suffix && <span className="text-[14px] text-white/50 mb-1">{suffix}</span>}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1">
          {isNeutral ? (
            <Minus size={12} className="text-white/30" />
          ) : isPositive ? (
            <TrendingUp size={12} style={{ color: '#02C39A' }} />
          ) : (
            <TrendingDown size={12} style={{ color: '#E24B4A' }} />
          )}
          <span className="text-[11px]" style={{ color: isNeutral ? 'rgba(255,255,255,0.35)' : isPositive ? '#02C39A' : '#E24B4A' }}>
            {isPositive ? '+' : ''}{change}% {changeLabel || 'vs last month'}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default StatTile;
