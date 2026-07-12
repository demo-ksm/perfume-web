import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ETHERA } from '@/constants/testIds';

// Premium loader: dark bg, golden line draws under the animated logo reveal,
// then blurs / fades out into the hero.
export const Loader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2600);
    return () => clearTimeout(t);
  }, [onComplete]);

  const letters = 'ÉTHERA'.split('');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid={ETHERA.loader}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, filter: 'blur(14px)' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(74,13,22,0.55) 0%, rgba(10,10,10,0) 60%)',
            }}
          />
          <div className="relative flex overflow-hidden">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                className="font-display text-5xl font-light tracking-[0.35em] text-cream sm:text-7xl"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  delay: 0.3 + i * 0.09,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="mt-6 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '14rem', opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            className="mt-6 text-[10px] uppercase tracking-[0.5em] text-cream/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Maison de Parfum
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
