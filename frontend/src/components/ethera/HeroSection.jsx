/* eslint-disable react/no-unknown-property */
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Bottle } from './Bottle';
import { GoldDust } from './GoldDust';
import { MagneticButton } from './MagneticButton';
import { scrollToSection } from '@/hooks/useLenis';
import { ETHERA } from '@/constants/testIds';

// Matte black podium rotating clockwise; bottle counter-rotates.
const Podium = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.25;
  });
  return (
    <group ref={ref} position={[0, -1.55, 0]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[1.7, 1.9, 0.35, 64]} />
        <meshStandardMaterial color="#111013" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.72, 1.72, 0.04, 64]} />
        <meshStandardMaterial color="#C8A46B" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
};

const HeroScene = () => (
  <>
    <ambientLight intensity={0.35} />
    <spotLight position={[4, 8, 6]} angle={0.3} penumbra={1} intensity={40} color="#fff2d6" castShadow />
    <spotLight position={[-6, 3, -4]} angle={0.5} penumbra={1} intensity={20} color="#4A0D16" />
    <pointLight position={[0, -2, 3]} intensity={8} color="#C8A46B" />

    <group position={[0, 0.3, 0]}>
      <Bottle spin={0.45} float scale={1.05} />
    </group>
    <Podium />

    <ContactShadows
      position={[0, -1.35, 0]}
      opacity={0.55}
      scale={8}
      blur={2.8}
      far={4}
      color="#000000"
    />

    <Environment resolution={256}>
      <Lightformer intensity={2.4} color="#C8A46B" position={[0, 4, 3]} scale={[8, 8, 1]} />
      <Lightformer intensity={1.2} color="#4A0D16" position={[-5, 1, -2]} scale={[5, 5, 1]} />
      <Lightformer intensity={3} color="#ffffff" position={[4, 2, 4]} scale={[3, 3, 1]} form="ring" />
      <Lightformer intensity={1.5} color="#F6F2EA" position={[0, -3, 2]} scale={[6, 3, 1]} />
    </Environment>
  </>
);

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 2.9 + i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const HeroSection = () => {
  return (
    <section
      id="hero"
      data-testid={ETHERA.hero}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Ambient burgundy glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(74,13,22,0.65) 0%, rgba(43,8,16,0.3) 40%, rgba(10,10,10,0) 72%)',
        }}
      />
      <div className="absolute inset-0 animate-fog-drift" style={{
        background: 'radial-gradient(circle at 30% 70%, rgba(120,122,72,0.12) 0%, transparent 45%)',
      }} />

      {/* 3D canvas */}
      <div className="absolute inset-0" data-testid="hero-canvas">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0.5, 6.5], fov: 40 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, alpha: true }}
          >
            <HeroScene />
          </Canvas>
        </Suspense>
      </div>

      <GoldDust count={26} />

      {/* Overlay content */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-6 text-[11px] uppercase tracking-[0.5em] text-gold/80"
        >
          Maison de Parfum · Est. 1998
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-display text-5xl font-light leading-[0.95] tracking-tight text-cream sm:text-7xl lg:text-8xl"
        >
          Every Drop Tells
          <br />
          <span>a </span>
          <span className="italic font-light text-gold-gradient">Story</span>
          <span>.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-md text-sm font-light leading-relaxed tracking-wide text-cream/60 sm:text-base"
        >
          An olfactory manuscript composed in Grasse. Rare essences, aged oud, and
          hand-blown crystal — bottled for those who remember.
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton
            data-testid={ETHERA.heroDiscoverCta}
            variant="primary"
            onClick={() => scrollToSection('collection')}
          >
            Discover Collection
          </MagneticButton>
          <MagneticButton
            data-testid={ETHERA.heroWatchCta}
            variant="ghost"
            onClick={() => scrollToSection('craftsmanship')}
          >
            Watch Craftsmanship
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        data-testid={ETHERA.heroScrollIndicator}
        onClick={() => scrollToSection('experience')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/50 transition-colors hover:text-gold"
      >
        <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.button>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
};

export default HeroSection;
