import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingDust } from './FloatingDust';
import { SOLEA } from '@/constants/testIds';

// Entrance: near-empty warm screen, floating dust, SOLÉA fades in, a golden
// line draws beneath it, then everything dissolves to reveal Scene 1.
export const Loader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid={SOLEA.loader}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-sand"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 60% 30%, rgba(250,247,242,0.6) 0%, rgba(216,193,160,0) 55%)',
            }}
          />
          <FloatingDust count={18} />

          <motion.h1
            className="font-display text-6xl font-light tracking-[0.3em] text-brown sm:text-8xl"
            initial={{ opacity: 0, letterSpacing: '0.6em', filter: 'blur(8px)' }}
            animate={{ opacity: 1, letterSpacing: '0.3em', filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            SOLÉA
          </motion.h1>

          <motion.div
            className="mt-6 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '16rem' }}
            transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.p
            className="mt-6 text-[10px] uppercase tracking-[0.5em] text-brown/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
          >
            Where Nature Becomes Memory
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
