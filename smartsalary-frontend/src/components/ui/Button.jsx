import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Button = ({ children, variant = 'primary', size = 'md', onClick, className, type = 'button', disabled = false, icon: Icon }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all cursor-pointer rounded-[10px] select-none';

  const variants = {
    primary: 'text-white border border-[rgba(93,202,165,0.5)] shadow-[0_4px_16px_rgba(29,158,117,0.3)] hover:shadow-[0_6px_24px_rgba(29,158,117,0.45)] active:scale-[0.98]',
    secondary: 'bg-white/[0.07] backdrop-blur-sm text-white/80 border border-white/[0.18] hover:bg-white/[0.12] hover:border-white/[0.28] active:scale-[0.98]',
    ghost: 'bg-transparent text-[#5DCAA5] hover:bg-white/[0.06] active:scale-[0.98]',
    danger: 'bg-[rgba(226,75,74,0.85)] text-white border border-[rgba(226,75,74,0.5)] shadow-[0_4px_16px_rgba(226,75,74,0.3)] hover:bg-[rgba(226,75,74,1)] active:scale-[0.98]',
    violet: 'bg-[rgba(108,99,255,0.85)] backdrop-blur-sm text-white border border-[rgba(159,150,255,0.5)] shadow-[0_4px_16px_rgba(108,99,255,0.35)] hover:bg-[rgba(108,99,255,1)] active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  const primaryBg = {
    primary: { background: 'rgba(29, 158, 117, 0.85)', backdropFilter: 'blur(8px)' },
    violet: {},
    secondary: {},
    ghost: {},
    danger: {},
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={clsx(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)}
      style={variant === 'primary' ? { background: 'rgba(29, 158, 117, 0.85)', backdropFilter: 'blur(8px)' } : variant === 'violet' ? {} : {}}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      {children}
    </motion.button>
  );
};

export default Button;
