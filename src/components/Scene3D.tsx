import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import GlassHeart from './GlassHeart';
import ServiceSpheres from './ServiceSpheres';
import FloatingShards from './FloatingShards';

// Beat duration ~1s, then 3s rest = 4s total cycle
const CYCLE_DURATION = 4;
const BEAT_PORTION = 0.25; // first 25% is the beat

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const heartRef = useRef<{ pulsePhase: number }>({ pulsePhase: 0 });

  useFrame((state) => {
    // Phase 0-1 over CYCLE_DURATION seconds
    heartRef.current.pulsePhase = (state.clock.elapsedTime % CYCLE_DURATION) / CYCLE_DURATION;

    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.12;
      const targetRotX = -state.pointer.y * 0.08;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <GlassHeart pulseRef={heartRef} />
      <ServiceSpheres pulseRef={heartRef} />
      <FloatingShards />
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} color="#c8d8f8" />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#80a0e0" />
          <SceneContent />
          <Environment preset="studio" environmentIntensity={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
}
