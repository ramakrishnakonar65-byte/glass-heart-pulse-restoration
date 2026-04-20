import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Shard({ position, speed, rotSpeed, size }: {
  position: [number, number, number];
  speed: number;
  rotSpeed: [number, number, number];
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.15;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.05;
    ref.current.rotation.x += rotSpeed[0] * 0.005;
    ref.current.rotation.y += rotSpeed[1] * 0.005;
    ref.current.rotation.z += rotSpeed[2] * 0.003;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshPhysicalMaterial
        color="#d0dff5"
        transmission={0.8}
        thickness={0.3}
        roughness={0.15}
        metalness={0.02}
        ior={1.5}
        transparent
        opacity={0.3}
        clearcoat={1}
      />
    </mesh>
  );
}

export default function FloatingShards() {
  const shards = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 38; i++) {
      const angle = (i / 38) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 2.5 + Math.random() * 2.5;
      arr.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * radius * 0.4 - 2,
        ] as [number, number, number],
        speed: 0.2 + Math.random() * 0.4,
        rotSpeed: [
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ] as [number, number, number],
        size: 0.03 + Math.random() * 0.06,
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {shards.map((s, i) => (
        <Shard key={i} {...s} />
      ))}
    </group>
  );
}
