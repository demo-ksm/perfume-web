import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { INGREDIENTS } from '@/data/ethera';
import { ETHERA } from '@/constants/testIds';

const IngredientCard = ({ item, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Alternate parallax direction / speed per column for editorial feel.
  const speed = index % 3 === 0 ? -60 : index % 3 === 1 ? 40 : -30;
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const offset = index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-24';

  return (
    <motion.div
      ref={ref}
      data-testid={`${ETHERA.ingredientCard}-${item.name.toLowerCase()}`}
      data-cursor="hover"
      style={{ y }}
      className={`group relative ${offset}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[30%] transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="font-display text-3xl font-light text-cream">{item.name}</h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold/80">
            {item.origin}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const IngredientsGrid = () => {
  return (
    <section
      id="ingredients"
      data-testid={ETHERA.ingredients}
      className="relative w-full overflow-hidden bg-burgundy-deep py-28 sm:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-xl"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-gold/80">
            The Palette
          </p>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-cream sm:text-6xl">
            Sourced from the corners of the <span className="italic text-gold-gradient">earth</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
          {INGREDIENTS.map((item, i) => (
            <IngredientCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientsGrid;
