import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Magnetic, editorial button. Small uppercase, high letter-spacing.
export const MagneticButton = ({
  children,
  variant = 'solid',
  className,
  onClick,
  icon: Icon,
  ...props
}) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.3, y: (e.clientY - (r.top + r.height / 2)) * 0.3 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    'relative inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-[11px] uppercase tracking-[0.28em] font-medium transition-colors duration-500 will-change-transform';
  const variants = {
    solid: 'bg-brown text-cream hover:bg-[#6f4a2c]',
    outline: 'border border-brown/40 text-brown hover:border-brown hover:bg-brown/[0.04]',
    ghost: 'text-brown/80 hover:text-brown',
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, mass: 0.6 }}
      whileTap={{ scale: 0.96 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      <span>{children}</span>
      {Icon && <Icon className="h-4 w-4" strokeWidth={1.5} />}
    </motion.button>
  );
};

export default MagneticButton;
