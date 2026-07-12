import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Floating pollen / dust — warm golden motes drifting slowly upward.
export const FloatingDust = ({ count = 24, className = '' }) => {
  const bits = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 5 + 1.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 10,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {bits.map((p) => (
        <motion.span
          key={p.id}
          className="pollen"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -100, 0], x: [0, p.drift, 0], opacity: [0, 0.85, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export default FloatingDust;
