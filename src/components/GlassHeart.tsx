import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Golden ratio for sizing
const PHI = 1.618;
const HEART_SCALE = 0.012; // Base scale for the GLB model

export default function GlassHeart({ pulseRef }: { pulseRef: React.MutableRefObject<{ pulsePhase: number }> }) {
  const meshRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const { scene } = useGLTF('/models/realistic_human_heart.glb');

  useEffect(() => {
    // Apply glass material to all meshes, remove any background objects
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#c8d8f0'),
          transmission: 0.55,
          thickness: 1.8,
          roughness: 0.08,
          metalness: 0.02,
          ior: 1.45,
          transparent: true,
          opacity: 0.72,
          envMapIntensity: 1.2,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          emissive: new THREE.Color('#e84057'),
          emissiveIntensity: 0.05,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!meshRef.current) return;
    const t = pulseRef.current.pulsePhase;

    // Double-beat: two quick pumps then rest
    // Beat occupies ~0-0.35 of the cycle, rest is 0.35-1.0
    const beat1 = Math.max(0, Math.sin(t * Math.PI * 2 * 2.8) * 0.9) * (t < 0.18 ? 1 : 0);
    const beat2 = Math.max(0, Math.sin((t - 0.18) * Math.PI * 2 * 3.5) * 0.6) * (t >= 0.15 && t < 0.35 ? 1 : 0);
    const pulse = 1 + (beat1 + beat2) * 0.06;

    meshRef.current.scale.setScalar(HEART_SCALE * pulse);

    // Update emissive on all meshes during beat
    const emissiveStrength = (beat1 + beat2) * 0.15;
    meshRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
        if (mat.emissiveIntensity !== undefined) {
          mat.emissiveIntensity = 0.05 + emissiveStrength;
        }
      }
    });

    if (glowRef.current) {
      glowRef.current.intensity = 1.2 + (beat1 + beat2) * 4;
    }
  });

  return (
    <group position={[0, 0.15, 0]}>
      <primitive ref={meshRef} object={scene} scale={HEART_SCALE} />
      <pointLight ref={glowRef} color="#e84057" intensity={1.5} distance={4} decay={2} />
      {/* Inner glow sphere */}
      <mesh scale={0.35}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#e84057" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/realistic_human_heart.glb');
