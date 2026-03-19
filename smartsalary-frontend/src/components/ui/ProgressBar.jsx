import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, variant = 'teal', showLabel = false, label, className }) => {
  const fills = {
    teal: 'progress-fill-teal',
    violet: 'progress-fill-violet',
    amber: 'progress-fill-amber',
    danger: 'bg-gradient-to-r from-[#A32D2D] to-[#E24B4A] h-full rounded-[3px]',
    mint: 'bg-gradient-to-r from-[#028090] to-[#02C39A] h-full rounded-[3px]',
  };

  return (
    <div className={className}>
      {(label || showLabel) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-[11px] text-white/50">{label}</span>}
          {showLabel && <span className="text-[11px] text-white/60">{Math.round(value)}%</span>}
        </div>
      )}
      <div className="progress-track">
        <motion.div
          className={fills[variant] || fills.teal}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
