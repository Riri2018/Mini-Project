import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
