import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { FloatingDust } from './FloatingDust';
import { SOLEA } from '@/constants/testIds';

export const Scene9Newsletter = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
    }, 3500);
  };

  return (
    <section
      id="newsletter"
      data-testid={SOLEA.newsletter}
      className="relative w-full overflow-hidden bg-sand py-36 sm:py-52"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(250,247,242,0.5) 0%, rgba(216,193,160,0) 65%)',
        }}
      />
      <FloatingDust count={16} />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 text-[11px] uppercase tracking-[0.5em] text-brown/60"
        >
          Stay in the Light
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-light leading-[0.95] tracking-tight text-brown sm:text-7xl"
        >
          Let scent find <span className="italic text-gold-ink">you</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-brown/65"
        >
          Rare releases and quiet invitations, sent seldom and only to those who
          wish to be found.
        </motion.p>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mx-auto mt-14 flex max-w-md items-center gap-4 border-b border-brown/30 pb-3 transition-colors focus-within:border-brown"
        >
          <input
            data-testid={SOLEA.newsletterInput}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-transparent text-base font-light tracking-wide text-brown placeholder:text-brown/40 focus:outline-none"
          />
          <button
            data-testid={SOLEA.newsletterSubmit}
            type="submit"
            className="flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-brown transition-colors hover:text-gold"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Welcome <Check className="h-4 w-4" strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="sub"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Subscribe <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Scene9Newsletter;
