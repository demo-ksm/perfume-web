import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CRAFT_STEPS } from '@/data/solea';
import { SOLEA } from '@/constants/testIds';

gsap.registerPlugin(ScrollTrigger);

export const Scene5Craftsmanship = () => {
  const root = useRef(null);
  const fill = useRef(null);
  const imgs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top center', end: 'bottom center', scrub: 0.6 },
        }
      );
      imgs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -14 },
          {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craftsmanship"
      data-testid={SOLEA.craftsmanship}
      className="relative w-full overflow-hidden bg-stone py-28 sm:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 max-w-2xl"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.5em] text-brown/60">
            The Craftsmanship
          </p>
          <h2 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-brown sm:text-7xl">
            From field to <span className="italic text-gold-ink">flacon</span>.
          </h2>
        </motion.div>

        <div ref={root} className="relative">
          {/* golden progress line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-brown/15 lg:left-1/2 lg:block">
            <div
              ref={fill}
              className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-gold via-gold/70 to-gold/10"
            />
          </div>

          <div className="space-y-28 lg:space-y-44">
            {CRAFT_STEPS.map((step, i) => (
              <div
                key={step.index}
                className={`relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="absolute left-4 top-3 z-10 hidden -translate-x-1/2 lg:left-1/2 lg:block">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gold bg-stone">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 1.06 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm"
                >
                  <img
                    ref={(el) => (imgs.current[i] = el)}
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="h-[128%] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/40 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-6xl font-light text-brown/25 sm:text-7xl">
                    {step.index}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-light text-brown sm:text-5xl">
                    {step.title}
                  </h3>
                  <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-brown/65">
                    {step.body}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scene5Craftsmanship;
