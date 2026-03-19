import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';

const AIInsightCard = ({ title, description, action, priority = 'medium', delay = 0 }) => {
  const priorityMap = {
    high: { label: 'High Priority', color: '#E24B4A', bg: 'rgba(226,75,74,0.15)', border: 'rgba(226,75,74,0.3)' },
    medium: { label: 'Recommended', color: '#5DCAA5', bg: 'rgba(29,158,117,0.12)', border: 'rgba(29,158,117,0.35)' },
    low: { label: 'Insight', color: '#9F96FF', bg: 'rgba(108,99,255,0.1)', border: 'rgba(108,99,255,0.3)' },
  };
  const p = priorityMap[priority] || priorityMap.medium;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      className="p-4 rounded-[14px] cursor-pointer group"
      style={{ background: p.bg, border: `0.5px solid ${p.border}` }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${p.color}22`, border: `0.5px solid ${p.color}55` }}
        >
          <Sparkles size={14} style={{ color: p.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: p.color }}>
              {p.label}
            </span>
          </div>
          <p className="text-[13px] font-medium text-white/90 mb-1">{title}</p>
          <p className="text-[12px] text-white/55 leading-relaxed">{description}</p>
          {action && (
            <button className="flex items-center gap-1 mt-2 text-[11px] font-medium group-hover:gap-2 transition-all" style={{ color: p.color }}>
              {action} <ChevronRight size={11} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AIInsightCard;
