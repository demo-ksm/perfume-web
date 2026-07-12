import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { GoldDust } from './GoldDust';
import { ETHERA } from '@/constants/testIds';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Visual-only: no backend submission.
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
    }, 3200);
  };

  return (
    <section
      id="newsletter"
      data-testid={ETHERA.newsletter}
      className="relative w-full overflow-hidden bg-burgundy py-32 sm:py-44"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(74,13,22,0) 0%, rgba(10,10,10,0.6) 90%)',
        }}
      />
      <GoldDust count={18} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-6 text-[11px] uppercase tracking-[0.5em] text-gold/80"
        >
          The Inner Circle
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-light leading-tight tracking-tight text-cream sm:text-6xl"
        >
          Receive the next <span className="italic text-gold-gradient">chapter</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-cream/60"
        >
          Private previews, limited batches, and invitations to our atelier — sent
          rarely, and only to those who ask.
        </motion.p>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mx-auto mt-12 flex max-w-md items-center gap-4 border-b border-gold/30 pb-3 transition-colors focus-within:border-gold"
        >
          <input
            data-testid={ETHERA.newsletterInput}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-transparent text-base font-light tracking-wide text-cream placeholder:text-cream/30 focus:outline-none"
          />
          <button
            data-testid={ETHERA.newsletterSubmit}
            type="submit"
            className="flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold transition-colors hover:text-cream"
          >
            {sent ? (
              <>
                Joined <Check className="h-4 w-4" strokeWidth={1.5} />
              </>
            ) : (
              <>
                Subscribe <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;
