import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { JOURNAL } from '@/data/solea';
import { SOLEA } from '@/constants/testIds';

export const Scene8Journal = () => {
  return (
    <section
      id="journal"
      data-testid={SOLEA.journal}
      className="relative w-full overflow-hidden bg-stone py-32 sm:py-44"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.5em] text-brown/60">The Journal</p>
            <h2 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-brown sm:text-7xl">
              Notes from the <span className="italic text-gold-ink">maison</span>.
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
          {JOURNAL.map((post, i) => (
            <motion.article
              key={post.title}
              data-testid={`${SOLEA.journalCard}-${i}`}
              data-cursor="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`group ${i === 1 ? 'md:mt-20' : ''}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-gold-ink">
                {post.tag}
              </p>
              <h3 className="mt-3 flex items-start justify-between gap-4 font-display text-3xl font-light leading-tight text-brown">
                {post.title}
                <ArrowUpRight
                  className="mt-1 h-5 w-5 shrink-0 -translate-x-2 text-brown/50 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                  strokeWidth={1.3}
                />
              </h3>
              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-brown/60">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scene8Journal;
