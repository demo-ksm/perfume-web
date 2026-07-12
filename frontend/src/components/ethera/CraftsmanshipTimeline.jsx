import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoldDust } from './GoldDust';
import { CRAFT_STAGES } from '@/data/ethera';
import { ETHERA } from '@/constants/testIds';

gsap.registerPlugin(ScrollTrigger);

const CRAFT_VIDEO =
  'https://videos.pexels.com/video-files/7565435/7565435-uhd_2560_1440_25fps.mp4';
const POSTER =
  'https://images.unsplash.com/photo-1672848700906-2b8ca62639e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxwZXJmdW1lciUyMGxhYm9yYXRvcnklMjBhdGVsaWVyJTIwY3JhZnRzbWFuc2hpcHxlbnwwfHx8fDE3ODE5MDM3NDV8MA&ixlib=rb-4.1.0&q=85';

export const CraftsmanshipTimeline = () => {
  const stagesRef = useRef(null);
  const fillRef = useRef(null);
  const imgRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Golden progress line fills as the stages scroll past.
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: stagesRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.6,
          },
        }
      );

      // Parallax on each stage image.
      imgRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, stagesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craftsmanship"
      data-testid={ETHERA.craftsmanship}
      className="relative w-full overflow-hidden bg-ink"
    >
      {/* Cinematic video intro */}
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={POSTER} alt="" className="h-full w-full object-cover" />
        </div>
        <video
          data-testid={ETHERA.craftVideo}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={POSTER}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        >
          <source src={CRAFT_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ink/55" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74,13,22,0.4) 0%, rgba(10,10,10,0.85) 85%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl px-6 text-center"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.5em] text-gold/80">
            The Craft · An Interactive Documentary
          </p>
          <h2 className="font-display text-5xl font-light leading-[0.98] tracking-tight text-cream sm:text-7xl">
            From field to <span className="italic text-gold-gradient">flacon</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-sm font-light leading-relaxed text-cream/60">
            Two hundred and forty raw materials. Fourteen months of maceration.
            A single artisan finishing every bottle by hand. Scroll to follow the
            making of an ÉTHERA fragrance.
          </p>
        </motion.div>
      </div>

      {/* Stages timeline */}
      <div ref={stagesRef} className="relative mx-auto max-w-[1400px] px-6 py-24">
        {/* Progress line */}
        <div className="absolute left-6 top-24 hidden h-[calc(100%-12rem)] w-px bg-cream/10 lg:left-1/2 lg:block">
          <div
            ref={fillRef}
            className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-gold via-gold/70 to-gold/20"
          />
        </div>

        <div className="space-y-28 lg:space-y-40">
          {CRAFT_STAGES.map((stage, i) => (
            <div
              key={stage.index}
              className={`relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-24 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Node */}
              <div className="absolute left-6 top-4 z-10 hidden -translate-x-1/2 lg:left-1/2 lg:block">
                <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gold bg-ink">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                </div>
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 1.06 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <img
                  ref={(el) => (imgRefs.current[i] = el)}
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  className="h-[125%] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-display text-6xl font-light text-gold/25 sm:text-7xl">
                  {stage.index}
                </span>
                <h3 className="mt-2 font-display text-3xl font-light text-cream sm:text-5xl">
                  {stage.title}
                </h3>
                <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-cream/55">
                  {stage.body}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <GoldDust count={14} />
    </section>
  );
};

export default CraftsmanshipTimeline;
