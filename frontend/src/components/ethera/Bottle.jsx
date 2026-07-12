/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';

// A stylised luxury flacon built from primitives. Glass body with an amber
// gold liquid inside and a metallic cap. `spin` controls auto-rotation speed.
export const Bottle = ({ spin = 0.35, float = true, scale = 1 }) => {
  const group = useRef();

  useFrame((_, delta) => {
    if (group.current && spin) {
      group.current.rotation.y += delta * spin;
    }
  });

  const glass = (
    <meshPhysicalMaterial
      transmission={0.95}
      thickness={1.2}
      roughness={0.06}
      ior={1.5}
      clearcoat={1}
      clearcoatRoughness={0.1}
      color="#f6f2ea"
      attenuationColor="#C8A46B"
      attenuationDistance={2.4}
      envMapIntensity={1.4}
    />
  );

  const inner = (
    <group scale={scale}>
      {/* Bottle body */}
      <RoundedBox args={[1.45, 2.1, 0.72]} radius={0.16} smoothness={6} position={[0, 0, 0]}>
        {glass}
      </RoundedBox>

      {/* Amber liquid */}
      <RoundedBox args={[1.28, 1.55, 0.56]} radius={0.12} smoothness={5} position={[0, -0.2, 0]}>
        <meshPhysicalMaterial
          color="#8a3d1f"
          transmission={0.55}
          thickness={2}
          roughness={0.2}
          ior={1.4}
          attenuationColor="#C8A46B"
          attenuationDistance={0.9}
          emissive="#4A0D16"
          emissiveIntensity={0.25}
        />
      </RoundedBox>

      {/* Shoulder / neck */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.28, 0.42, 0.35, 32]} />
        {glass}
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.55, 48]} />
        <meshStandardMaterial
          color="#C8A46B"
          metalness={1}
          roughness={0.22}
          envMapIntensity={1.6}
        />
      </mesh>
      {/* Cap collar */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.1, 48]} />
        <meshStandardMaterial color="#9c7c48" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  );

  return (
    <group ref={group}>
      {float ? (
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
          {inner}
        </Float>
      ) : (
        inner
      )}
    </group>
  );
};

export default Bottle;
