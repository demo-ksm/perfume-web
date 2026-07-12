import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { FloatingDust } from './FloatingDust';
import { MagneticButton } from './MagneticButton';
import { scrollToSection } from '@/hooks/useLenis';
import { MEDIA } from '@/data/solea';
import { SOLEA } from '@/constants/testIds';

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 3.2 + i * 0.22, duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Scene1Botanical = () => {
  return (
    <section
      id="scene-botanical"
      data-testid={SOLEA.scene1}
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Base botanical image (always present) */}
      <div className="absolute inset-0">
        <img
          src={MEDIA.botanicalBg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Optional cinematic video overlay (hides gracefully if blocked) */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-soft-light"
        autoPlay
        muted
        loop
        playsInline
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      >
        <source src={MEDIA.heroVideo} type="video/mp4" />
      </video>

      {/* Warm sand wash for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(216,193,160,0.85) 0%, rgba(216,193,160,0.45) 40%, rgba(198,165,125,0.15) 100%)',
        }}
      />
      {/* God rays */}
      <div className="sun-rays pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <FloatingDust count={26} />

      {/* Content — left aligned, editorial */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-12">
        <div className="max-w-2xl">
          <motion.p
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mb-8 text-[11px] uppercase tracking-[0.5em] text-brown/70"
          >
            SOLÉA · Eau de Parfum
          </motion.p>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-display text-6xl font-light leading-[0.92] tracking-tight text-brown sm:text-8xl lg:text-[7.5rem]"
          >
            Where Nature
            <br />
            <span className="italic text-gold-ink">Becomes</span> Memory.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 max-w-md text-sm font-light leading-relaxed tracking-wide text-brown/70"
          >
            A fragrance composed of golden light, rare botanicals, and the quiet
            patience of the land.
          </motion.p>

          <motion.div custom={3} variants={fade} initial="hidden" animate="show" className="mt-12">
            <MagneticButton
              data-testid={SOLEA.enterCta}
              variant="solid"
              icon={ArrowDown}
              onClick={() => scrollToSection('scene-reveal')}
            >
              Enter the Collection
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        data-testid={SOLEA.scrollHint}
        onClick={() => scrollToSection('scene-reveal')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-brown/60"
      >
        <span className="text-[9px] uppercase tracking-[0.45em]">Scroll to unveil</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="h-4 w-4" strokeWidth={1.3} />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default Scene1Botanical;
