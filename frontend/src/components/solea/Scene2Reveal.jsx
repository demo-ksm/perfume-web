/* eslint-disable react/no-unknown-property */
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bottle } from './Bottle';
import { FloatingDust } from './FloatingDust';
import { MEDIA } from '@/data/solea';
import { SOLEA } from '@/constants/testIds';

// Travertine podium rotating slowly; bottle (inside <Bottle/>) counter-rotates.
const Podium = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.22;
  });
  return (
    <group ref={ref} position={[0, -1.55, 0]}>
      <mesh>
        <cylinderGeometry args={[1.55, 1.7, 0.45, 64]} />
        <meshStandardMaterial color="#C6A57D" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[1.56, 1.56, 0.05, 64]} />
        <meshStandardMaterial color="#b8946a" roughness={0.7} />
      </mesh>
    </group>
  );
};

const RevealScene = () => {
  const grp = useRef();
  useFrame((state) => {
    if (grp.current) {
      // subtle mouse-reactive tilt + camera breathing
      grp.current.rotation.y += (state.pointer.x * 0.25 - grp.current.rotation.y) * 0.04;
      grp.current.rotation.x += (-state.pointer.y * 0.12 - grp.current.rotation.x) * 0.04;
      state.camera.position.z = 6 + Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight position={[3, 8, 5]} angle={0.35} penumbra={1} intensity={55} color="#ffe6bd" castShadow />
      <spotLight position={[-5, 4, -3]} angle={0.5} penumbra={1} intensity={18} color="#D29C53" />
      <pointLight position={[0, -1, 4]} intensity={8} color="#FAF7F2" />

      <group ref={grp}>
        <group position={[0, 0.35, 0]}>
          <Bottle spin={0.4} float scale={1.05} />
        </group>
        <Podium />
        <ContactShadows position={[0, -1.32, 0]} opacity={0.35} scale={8} blur={3} far={4} color="#5A3B22" />
      </group>

      <Environment resolution={256}>
        <Lightformer intensity={2.6} color="#FAF7F2" position={[0, 4, 3]} scale={[9, 9, 1]} />
        <Lightformer intensity={1.6} color="#D29C53" position={[-4, 1, -2]} scale={[5, 5, 1]} />
        <Lightformer intensity={3} color="#ffffff" position={[4, 2, 4]} scale={[3, 3, 1]} form="ring" />
        <Lightformer intensity={1.4} color="#C6A57D" position={[0, -3, 2]} scale={[6, 3, 1]} />
      </Environment>
    </>
  );
};

export const Scene2Reveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.55], ['0%', '-65%']);
  const rightX = useTransform(scrollYProgress, [0, 0.55], ['0%', '65%']);
  const floralOpacity = useTransform(scrollYProgress, [0.1, 0.55], [1, 0]);
  const floralScale = useTransform(scrollYProgress, [0, 0.55], [1, 1.3]);

  const bottleY = useTransform(scrollYProgress, [0.15, 0.7], ['38%', '0%']);
  const bottleScale = useTransform(scrollYProgress, [0.15, 0.75], [0.5, 1]);
  const bottleOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  const lightScale = useTransform(scrollYProgress, [0.1, 0.7], [0.3, 1.5]);
  const lightOpacity = useTransform(scrollYProgress, [0.1, 0.45, 1], [0, 0.9, 0.6]);
  const captionOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  return (
    <section
      id="scene-reveal"
      data-testid={SOLEA.scene2}
      ref={ref}
      className="relative w-full"
      style={{ height: '240vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-sand">
        {/* Center light bloom */}
        <motion.div
          style={{ scale: lightScale, opacity: lightOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          aria-hidden="true"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(250,247,242,0.9) 0%, rgba(210,156,83,0.4) 35%, rgba(216,193,160,0) 70%)',
            }}
          />
        </motion.div>

        {/* 3D bottle rising */}
        <motion.div
          data-testid={SOLEA.revealCanvas}
          data-cursor="hover"
          style={{ y: bottleY, scale: bottleScale, opacity: bottleOpacity }}
          className="absolute inset-0 z-10"
        >
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0.4, 6], fov: 42 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
              <RevealScene />
            </Canvas>
          </Suspense>
        </motion.div>

        {/* Parting floral halves */}
        <motion.div
          style={{ x: leftX, opacity: floralOpacity, scale: floralScale }}
          className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left overflow-hidden"
          aria-hidden="true"
        >
          <img src={MEDIA.floralReveal} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sand/40" />
        </motion.div>
        <motion.div
          style={{ x: rightX, opacity: floralOpacity, scale: floralScale }}
          className="absolute inset-y-0 right-0 z-20 w-1/2 origin-right overflow-hidden"
          aria-hidden="true"
        >
          <img src={MEDIA.floralReveal} alt="" className="h-full w-full -scale-x-100 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-sand/40" />
        </motion.div>

        <FloatingDust count={20} className="z-30" />

        {/* Caption */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-brown/60">The Unveiling</p>
          <h2 className="mt-3 font-display text-4xl font-light italic tracking-tight text-brown sm:text-5xl">
            Soléa Originel
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Scene2Reveal;
