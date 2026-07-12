/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { Bottle } from './Bottle';
import { SOLEA } from '@/constants/testIds';

const Scene = () => (
  <>
    <ambientLight intensity={0.65} />
    <spotLight position={[5, 7, 5]} angle={0.35} penumbra={1} intensity={60} color="#ffe6bd" />
    <pointLight position={[-4, 2, 4]} intensity={14} color="#D29C53" />
    <pointLight position={[0, -3, -3]} intensity={7} color="#C6A57D" />
    <Bottle spin={0.1} float={false} scale={1.35} />
    <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={9} blur={3} far={4} color="#5A3B22" />
    <Environment resolution={256}>
      <Lightformer intensity={2.8} color="#FAF7F2" position={[0, 4, 3]} scale={[10, 10, 1]} />
      <Lightformer intensity={1.8} color="#D29C53" position={[-5, 0, -2]} scale={[6, 6, 1]} />
      <Lightformer intensity={3.4} color="#ffffff" position={[5, 3, 4]} scale={[3, 3, 1]} form="ring" />
    </Environment>
    <OrbitControls
      enablePan={false}
      enableZoom
      minDistance={4}
      maxDistance={8}
      minPolarAngle={Math.PI / 3.2}
      maxPolarAngle={Math.PI / 1.7}
      autoRotate
      autoRotateSpeed={0.5}
      rotateSpeed={0.85}
    />
  </>
);

export const Scene6Experience360 = () => {
  return (
    <section
      id="scene-360"
      data-testid={SOLEA.experience360}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-sand py-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 50% 45%, rgba(250,247,242,0.55) 0%, rgba(216,193,160,0) 65%)',
        }}
      />
      {/* huge faint word behind */}
      <span className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 font-display text-[22vw] font-light leading-none tracking-tight text-brown/[0.06] lg:top-[12%]">
        Soléa
      </span>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 mb-2 text-[11px] uppercase tracking-[0.5em] text-brown/60"
      >
        The Object
      </motion.p>

      <div
        data-testid={SOLEA.bottleCanvas}
        data-cursor="hover"
        className="relative z-10 h-[62vh] w-full max-w-4xl"
        onWheel={(e) => e.stopPropagation()}
      >
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 flex items-center gap-3 text-brown/60"
      >
        <RotateCw className="h-4 w-4 animate-spin-slow" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-[0.35em]">Drag to rotate · Scroll to zoom</span>
      </motion.div>
    </section>
  );
};

export default Scene6Experience360;
