import { motion } from 'framer-motion';
import { Droplet, Flower2, TreePine } from 'lucide-react';
import { NOTES } from '@/data/ethera';
import { ETHERA } from '@/constants/testIds';

const ICONS = { top: Droplet, heart: Flower2, base: TreePine };

export const NotesCards = () => {
  return (
    <section
      id="notes"
      data-testid={ETHERA.notes}
      className="relative w-full overflow-hidden bg-ink py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(74,13,22,0.4) 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1500px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-xl"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-gold/80">
            The Composition
          </p>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-cream sm:text-6xl">
            Three acts of a single <span className="italic text-gold-gradient">breath</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {NOTES.map((note, i) => {
            const Icon = ICONS[note.key];
            return (
              <motion.article
                key={note.key}
                data-testid={`${ETHERA.noteCard}-${note.key}`}
                data-cursor="hover"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12 }}
                className="group glass relative overflow-hidden rounded-xl p-10 transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(200,164,107,0.25)]"
              >
                {/* reflection sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold/5">
                  <Icon className="h-6 w-6" strokeWidth={1.3} />
                </div>

                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/70">
                  {note.subtitle}
                </p>
                <h3 className="mt-2 font-display text-3xl font-light text-cream">
                  {note.label}
                </h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-cream/55">
                  {note.body}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {note.accents.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-cream/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream/60"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NotesCards;
