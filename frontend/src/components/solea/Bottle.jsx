/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';

// A luxury crystal flacon: warm-tinted glass body, golden liquid, brushed
// brass cap. `glow` tints an accent point light (used for the ingredient
// interaction in the Fragrance scene).
export const Bottle = ({ spin = 0.3, float = true, scale = 1, glow = '#D29C53' }) => {
  const group = useRef();
  const glowLight = useRef();

  useFrame((state, delta) => {
    if (group.current && spin) group.current.rotation.y += delta * spin;
    if (glowLight.current) {
      // gentle breathing intensity
      glowLight.current.intensity = 6 + Math.sin(state.clock.elapsedTime * 1.2) * 1.5;
    }
  });

  const glass = (
    <meshPhysicalMaterial
      transmission={0.96}
      thickness={1.4}
      roughness={0.05}
      ior={1.5}
      clearcoat={1}
      clearcoatRoughness={0.08}
      color="#faf3e6"
      attenuationColor="#D29C53"
      attenuationDistance={2.6}
      envMapIntensity={1.5}
    />
  );

  const inner = (
    <group scale={scale}>
      <RoundedBox args={[1.4, 2.0, 0.7]} radius={0.14} smoothness={6}>
        {glass}
      </RoundedBox>

      {/* golden liquid */}
      <RoundedBox args={[1.24, 1.4, 0.55]} radius={0.1} smoothness={5} position={[0, -0.25, 0]}>
        <meshPhysicalMaterial
          color="#c98a3c"
          transmission={0.5}
          thickness={2}
          roughness={0.22}
          ior={1.4}
          attenuationColor="#D29C53"
          attenuationDistance={0.8}
          emissive="#8a5a2b"
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* neck */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.26, 0.4, 0.32, 32]} />
        {glass}
      </mesh>

      {/* brushed brass cap */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.55, 48]} />
        <meshStandardMaterial color="#C08A45" metalness={0.95} roughness={0.35} envMapIntensity={1.4} />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.09, 48]} />
        <meshStandardMaterial color="#9a6a34" metalness={0.95} roughness={0.4} />
      </mesh>

      <pointLight ref={glowLight} position={[0, 0, 1.4]} intensity={6} distance={6} color={glow} />
    </group>
  );

  return (
    <group ref={group}>
      {float ? (
        <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.45}>
          {inner}
        </Float>
      ) : (
        inner
      )}
    </group>
  );
};

export default Bottle;
