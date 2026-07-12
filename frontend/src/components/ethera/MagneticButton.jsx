import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Magnetic, glass gold-bordered button. Follows the cursor slightly on hover.
export const MagneticButton = ({
  children,
  variant = 'primary',
  className,
  onClick,
  icon: Icon,
  ...props
}) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    'relative inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-500 will-change-transform';
  const variants = {
    primary:
      'text-ink bg-gold hover:bg-[#d8b57e] shadow-[0_0_30px_-8px_rgba(200,164,107,0.6)]',
    ghost:
      'text-cream border border-gold/40 hover:border-gold hover:text-gold bg-white/[0.02] backdrop-blur-sm',
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" strokeWidth={1.5} />}
      <span>{children}</span>
    </motion.button>
  );
};

export default MagneticButton;
