import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { COLLECTION } from '@/data/solea';
import { SOLEA } from '@/constants/testIds';

const CollectionItem = ({ item, index }) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const numY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      data-testid={`${SOLEA.collectionItem}-${index}`}
      data-cursor="hover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* giant background number */}
      <motion.span
        style={{ y: numY }}
        className={`pointer-events-none absolute ${
          flip ? 'right-6' : 'left-6'
        } top-1/2 -translate-y-1/2 font-display text-[40vw] font-light leading-none text-brown/[0.05] lg:text-[26vw]`}
      >
        {index + 1}
      </motion.span>

      <div
        className={`relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-12 px-6 sm:px-12 lg:grid-cols-2 lg:gap-24 ${
          flip ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm lg:aspect-[4/5]">
          <motion.img
            style={{ y: imgY }}
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-[124%] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/30 to-transparent" />
        </div>

        {/* Text */}
        <div className={flip ? 'lg:pr-10' : 'lg:pl-10'}>
          <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-brown/60">
            {item.subtitle}
          </p>
          <h3 className="font-display text-6xl font-light leading-[0.95] tracking-tight text-brown sm:text-7xl lg:text-8xl">
            {item.name}
          </h3>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-brown/50">{item.year}</p>

          {/* hover reveals notes */}
          <div className="mt-10 h-px w-full max-w-xs bg-brown/20" />
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold-ink">Notes</p>
                <p className="mt-2 font-display text-2xl font-light italic text-brown">
                  {item.notes}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {!hover && (
            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-brown/40">
              Hover to reveal notes
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const Scene7Collection = () => {
  return (
    <section
      id="collection"
      data-testid={SOLEA.collection}
      className="relative w-full bg-sand pt-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.5em] text-brown/60">The Collection</p>
          <h2 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-brown sm:text-7xl">
            Three chapters, <span className="italic text-gold-ink">one story</span>.
          </h2>
        </motion.div>
      </div>

      <div className="mt-8">
        {COLLECTION.map((item, i) => (
          <CollectionItem key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Scene7Collection;
