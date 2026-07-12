import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingDust } from './FloatingDust';
import { INGREDIENTS } from '@/data/solea';
import { SOLEA } from '@/constants/testIds';

export const Scene4Fragrance = () => {
  const [active, setActive] = useState(0);
  const current = INGREDIENTS[active];

  return (
    <section
      id="fragrance"
      data-testid={SOLEA.fragrance}
      className="relative w-full overflow-hidden py-32 sm:py-44"
      style={{
        background:
          'linear-gradient(180deg, #D8C1A0 0%, #CBB088 50%, #D8C1A0 100%)',
      }}
    >
      {/* reactive ambient glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-[80vh] w-[80vh] -translate-y-1/2 translate-x-1/4 rounded-full blur-3xl"
        animate={{ backgroundColor: current.glow }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ opacity: 0.35 }}
      />
      <FloatingDust count={18} />

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-16 px-6 sm:px-12 lg:grid-cols-12">
        {/* Left — ingredient list */}
        <div className="lg:col-span-5">
          <p className="mb-10 text-[11px] uppercase tracking-[0.5em] text-brown/60">
            The Fragrance · An Olfactive Map
          </p>
          <ul className="space-y-1">
            {INGREDIENTS.map((ing, i) => (
              <li key={ing.name}>
                <button
                  data-testid={`${SOLEA.ingredient}-${ing.name.toLowerCase()}`}
                  data-cursor="hover"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-baseline gap-5 py-2 text-left"
                >
                  <span
                    className={`font-display text-4xl font-light leading-tight tracking-tight transition-all duration-500 sm:text-6xl ${
                      active === i ? 'italic text-gold-ink' : 'text-brown/45 group-hover:text-brown/80'
                    }`}
                  >
                    {ing.name}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-[0.25em] transition-opacity duration-500 ${
                      active === i ? 'text-brown/70 opacity-100' : 'opacity-0'
                    }`}
                  >
                    {ing.note}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — reactive visual */}
        <div className="relative lg:col-span-7">
          <div className="relative mx-auto aspect-[4/5] max-w-lg">
            {/* colored glow behind */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              animate={{ backgroundColor: current.glow }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ opacity: 0.45, scale: 0.9 }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-hidden rounded-sm"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/50 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* caption */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-xs text-sm font-light leading-relaxed text-cream"
                >
                  {current.desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scene4Fragrance;
