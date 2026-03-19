import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const GlassCard = ({ children, className, variant = 'default', hover = true, onClick, style, delay = 0 }) => {
  const base = 'glass-card p-5';
  const variants = {
    default: 'glass-card',
    accent: 'glass-card-accent',
    violet: 'glass-card-violet',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
      className={clsx(variants[variant], 'p-5 relative overflow-hidden', className)}
      onClick={onClick}
      style={style}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
