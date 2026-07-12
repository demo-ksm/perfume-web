import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MEDIA } from '@/data/solea';
import { SOLEA } from '@/constants/testIds';

const WORDS = ['Crafted', 'By', 'Time.'];

const wordReveal = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { delay: i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Scene3Editorial = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const lineW = useTransform(scrollYProgress, [0.2, 0.5], ['0%', '100%']);

  return (
    <section
      id="scene-editorial"
      data-testid={SOLEA.scene3}
      ref={ref}
      className="relative w-full overflow-hidden bg-sand py-32 sm:py-48"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 sm:px-12 lg:grid-cols-12 lg:gap-8">
        {/* Left — huge type, offset down for asymmetry */}
        <div className="lg:col-span-6 lg:pt-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-10 text-[11px] uppercase tracking-[0.5em] text-brown/60"
          >
            The Philosophy
          </motion.p>

          <h2 className="font-display text-7xl font-light leading-[0.9] tracking-tight text-brown sm:text-8xl lg:text-[9rem]">
            {WORDS.map((w, i) => (
              <span key={w} className="reveal-mask block">
                <motion.span
                  custom={i}
                  variants={wordReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                  className={`block ${i === 2 ? 'italic text-gold-ink' : ''}`}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div style={{ width: lineW }} className="mt-12 h-px max-w-sm bg-brown/40" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-12 max-w-sm text-sm font-light leading-relaxed text-brown/70"
          >
            We do not chase trends. A single SOLÉA fragrance matures over years —
            harvested by hand, aged in silence, and revealed only when it is ready
            to become a memory.
          </motion.p>
        </div>

        {/* Right — large editorial image, parallax */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] overflow-hidden rounded-sm"
          >
            <motion.img
              style={{ y: imgY }}
              src={MEDIA.editorial1}
              alt="Editorial still life"
              className="h-[116%] w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          {/* overlapping small image for magazine tension */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-6 bottom-[-3rem] hidden w-2/5 overflow-hidden rounded-sm shadow-2xl lg:block"
          >
            <img src={MEDIA.editorial2} alt="" className="h-64 w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Scene3Editorial;
