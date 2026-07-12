import { motion } from 'framer-motion';
import { ETHERA } from '@/constants/testIds';

const STORY_LINES = [
  'It begins in the cool hush before dawn,',
  'when the jasmine fields of Grasse',
  'are still heavy with the night.',
  'We gather what the sun has not yet touched —',
  'petals, resin, and rain-soaked earth —',
  'and let time do the rest.',
];

const line = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const StorySection = () => {
  return (
    <section
      id="story"
      data-testid={ETHERA.story}
      className="relative w-full overflow-hidden bg-burgundy-deep py-28 sm:py-40"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12 lg:gap-24">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1518343265568-51eec52d40da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxqYXNtaW5lJTIwZmxvd2VyJTIwZGFyayUyMG1vb2R5fGVufDB8fHx8MTc4Mzg0ODU5NXww&ixlib=rb-4.1.0&q=85"
              alt="Jasmine at dawn"
              className="h-[70vh] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/70 via-transparent to-burgundy-deep/20" />
          </div>
          <div className="absolute -bottom-6 left-8 font-display text-[7rem] leading-none text-gold/10 sm:text-[10rem]">
            I
          </div>
        </motion.div>

        {/* Poetic text */}
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-8 text-[11px] uppercase tracking-[0.5em] text-gold/80"
          >
            Chapter I · The Harvest
          </motion.p>

          <div className="space-y-1">
            {STORY_LINES.map((l, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={line}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="font-display text-3xl font-light leading-snug tracking-tight text-cream sm:text-4xl"
              >
                {l}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-10 max-w-md text-sm font-light leading-relaxed text-cream/55"
          >
            Every ÉTHERA fragrance carries the memory of a place and a moment —
            distilled, aged, and never rushed. This is scent as narrative.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
