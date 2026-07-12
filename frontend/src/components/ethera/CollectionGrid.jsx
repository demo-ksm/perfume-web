import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { COLLECTION } from '@/data/ethera';
import { ETHERA } from '@/constants/testIds';

export const CollectionGrid = () => {
  const [active, setActive] = useState(null);

  return (
    <section
      id="collection"
      data-testid={ETHERA.collection}
      className="relative w-full overflow-hidden bg-burgundy-deep py-28 sm:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-gold/80">
              The Collection
            </p>
            <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-cream sm:text-6xl">
              Four <span className="italic text-gold-gradient">signatures</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light leading-relaxed text-cream/55">
            Each composition is produced in a single annual batch, numbered and
            sealed by hand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTION.map((item, i) => (
            <motion.button
              key={item.name}
              data-testid={`${ETHERA.collectionCard}-${i}`}
              data-cursor="hover"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(item)}
              className="group relative flex flex-col text-left"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ink/40">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute right-4 top-4 flex h-9 w-9 -translate-y-2 items-center justify-center rounded-full border border-gold/40 bg-ink/40 text-gold opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-gold/80">
                    {item.tagline}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-light text-cream">
                  {item.name}
                </h3>
                <span className="text-xs font-light tracking-widest text-gold">
                  {item.price}
                </span>
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cream/40">
                {item.family}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick view modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[9500] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              data-testid={ETHERA.quickViewModal}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative z-10 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2"
            >
              <img
                src={active.image}
                alt={active.name}
                className="h-64 w-full object-cover md:h-full"
              />
              <div className="relative p-10">
                <button
                  data-testid={ETHERA.quickViewClose}
                  onClick={() => setActive(null)}
                  className="absolute right-5 top-5 text-cream/50 transition-colors hover:text-gold"
                  aria-label="Close quick view"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  {active.tagline}
                </p>
                <h3 className="mt-3 font-display text-4xl font-light text-cream">
                  {active.name}
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-cream/40">
                  {active.family}
                </p>
                <div className="my-6 h-px w-full bg-gold/15" />
                <p className="text-sm font-light leading-relaxed text-cream/60">
                  A layered composition built around {active.notes.toLowerCase()}.
                  Presented in a mouth-blown crystal flacon with a gilded cap.
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cream/50">
                  Notes
                </p>
                <p className="mt-2 font-display text-xl font-light text-gold">
                  {active.notes}
                </p>
                <p className="mt-8 font-display text-3xl font-light text-cream">
                  {active.price}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CollectionGrid;
