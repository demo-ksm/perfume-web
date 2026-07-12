import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/ethera';
import { ETHERA } from '@/constants/testIds';

export const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      data-testid={ETHERA.testimonials}
      className="relative w-full overflow-hidden bg-ink py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(74,13,22,0.35) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-gold/80">
            In Their Words
          </p>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-cream sm:text-5xl">
            A scent remembered.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="glass flex flex-col rounded-xl p-8"
            >
              <Quote className="mb-6 h-6 w-6 text-gold/60" strokeWidth={1.2} />
              <blockquote className="font-display text-2xl font-light italic leading-snug text-cream/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-cream/10 pt-5">
                <p className="text-sm text-cream">{t.author}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold/70">
                  {t.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
