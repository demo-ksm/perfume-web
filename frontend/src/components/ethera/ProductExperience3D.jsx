/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { Bottle } from './Bottle';
import { GoldDust } from './GoldDust';
import { ETHERA } from '@/constants/testIds';

const Scene = () => (
  <>
    <ambientLight intensity={0.4} />
    <spotLight position={[5, 6, 5]} angle={0.35} penumbra={1} intensity={45} color="#fff2d6" />
    <pointLight position={[-4, 2, 4]} intensity={12} color="#C8A46B" />
    <pointLight position={[0, -3, -3]} intensity={6} color="#4A0D16" />
    <Bottle spin={0.12} float={false} scale={1.25} />
    <ContactShadows position={[0, -1.9, 0]} opacity={0.5} scale={9} blur={3} far={4} color="#000" />
    <Environment resolution={256}>
      <Lightformer intensity={2.6} color="#C8A46B" position={[0, 4, 3]} scale={[9, 9, 1]} />
      <Lightformer intensity={1.3} color="#4A0D16" position={[-5, 0, -2]} scale={[6, 6, 1]} />
      <Lightformer intensity={3.2} color="#ffffff" position={[5, 3, 4]} scale={[3, 3, 1]} form="ring" />
    </Environment>
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.7}
      autoRotate
      autoRotateSpeed={0.6}
      rotateSpeed={0.8}
    />
  </>
);

export const ProductExperience3D = () => {
  return (
    <section
      id="experience"
      data-testid={ETHERA.experience3d}
      className="relative min-h-screen w-full overflow-hidden bg-ink py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(43,8,16,0.6) 0%, rgba(10,10,10,0) 70%)',
        }}
      />
      <GoldDust count={16} />

      <div className="relative z-10 mx-auto flex max-w-[1500px] flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-gold/80">
            The Object
          </p>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-cream sm:text-6xl">
            Hold it in the <span className="italic text-gold-gradient">light</span>.
          </h2>
        </motion.div>

        {/* Interactive canvas */}
        <div
          data-testid={ETHERA.bottleCanvas}
          data-cursor="hover"
          className="relative mt-4 h-[62vh] w-full max-w-4xl"
        >
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.8]} gl={{ alpha: true, antialias: true }}>
              <Scene />
            </Canvas>
          </Suspense>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-2 flex items-center gap-3 text-cream/50"
        >
          <RotateCw className="h-4 w-4 animate-spin-slow" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.35em]">Drag to rotate</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductExperience3D;
