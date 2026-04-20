import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sprout, DollarSign, Briefcase, Building2, GraduationCap } from 'lucide-react';

const PHI = 1.618;

const SERVICES = [
  { name: 'Incubation', desc: 'Nurturing early-stage ideas into viable ventures', color: '#5b8dee', Icon: Sprout },
  { name: 'Funding', desc: 'Strategic capital for growth-ready startups', color: '#e8a040', Icon: DollarSign },
  { name: 'Business Services', desc: 'Operations, legal & market access support', color: '#50c878', Icon: Briefcase },
  { name: 'Infrastructure', desc: 'Shared spaces, labs & digital platforms', color: '#b46ee8', Icon: Building2 },
  { name: 'Training', desc: 'Upskilling founders and teams', color: '#e86070', Icon: GraduationCap },
];

type PulseRef = React.MutableRefObject<{ pulsePhase: number }>;

// Icon radius from heart center (golden ratio based)
const ICON_RADIUS = 1.1 * PHI; // ~1.78

function ServiceIcon({ service, position, pulseRef, index }: {
  service: typeof SERVICES[0];
  position: [number, number, number];
  pulseRef: PulseRef;
  index: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + index * 1.2) * 0.06;

    // Pulse arrives at icon after traveling through tube
    // Beat happens in phase 0-0.35, pulse travels during 0.2-0.6
    const pp = pulseRef.current.pulsePhase;
    const delay = index * 0.06;
    const travelStart = 0.2 + delay;
    const travelEnd = 0.5 + delay;
    const pulseArrival = Math.max(0, Math.min(1, (pp - travelStart) / (travelEnd - travelStart)));
    // Fade out after arrival
    const fadeOut = pp > travelEnd + 0.15 ? Math.max(0, 1 - (pp - travelEnd - 0.15) * 4) : 1;
    const intensity = pulseArrival * fadeOut;

    if (iconRef.current) {
      const scale = 1 + intensity * 0.3;
      const glowStrength = intensity * 16;
      iconRef.current.style.transform = `scale(${scale})`;
      iconRef.current.style.boxShadow = `0 0 ${glowStrength}px ${service.color}, 0 0 ${glowStrength * 1.5}px ${service.color}40`;
      iconRef.current.style.borderColor = intensity > 0.1
        ? service.color
        : 'rgba(255,255,255,0.12)';
    }
  });

  const IconComponent = service.Icon;

  return (
    <group ref={ref} position={position}>
      <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div
          ref={iconRef}
          className="flex flex-col items-center gap-1"
          style={{ pointerEvents: 'auto', transition: 'transform 0.08s ease-out' }}
        >
          <div
            className="flex items-center justify-center rounded-lg backdrop-blur-md border"
            style={{
              width: '32px',
              height: '32px',
              background: `${service.color}14`,
              borderColor: 'rgba(255,255,255,0.12)',
              transition: 'box-shadow 0.1s ease, border-color 0.1s ease',
            }}
          >
            <IconComponent size={16} color={service.color} strokeWidth={2} />
          </div>
          <span className="text-[9px] font-display font-semibold text-foreground/70 whitespace-nowrap">
            {service.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

function GlassTube({ start, end, pulseRef, index }: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  pulseRef: PulseRef;
  index: number;
}) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  const geometry = useMemo(() => {
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    const offset = new THREE.Vector3(
      Math.sin(index * 2.1) * 0.2,
      Math.cos(index * 1.7) * 0.15,
      Math.sin(index * 3.2) * 0.1
    );
    mid.add(offset);
    const c = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.TubeGeometry(c, 24, 0.012, 8, false);
  }, [start, end, index]);

  useFrame(() => {
    if (!matRef.current) return;
    const pp = pulseRef.current.pulsePhase;
    const delay = index * 0.06;
    const travelStart = 0.15 + delay;
    const travelEnd = 0.5 + delay;
    const lp = Math.max(0, Math.min(1, (pp - travelStart) / (travelEnd - travelStart)));
    const fadeOut = pp > travelEnd + 0.1 ? Math.max(0, 1 - (pp - travelEnd - 0.1) * 3) : 1;
    const intensity = lp * fadeOut;

    matRef.current.opacity = 0.18 + intensity * 0.45;
    matRef.current.emissiveIntensity = intensity * 1.5;
  });

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        ref={matRef}
        color="#c8d8f0"
        transmission={0.7}
        thickness={0.3}
        roughness={0.1}
        transparent
        opacity={0.18}
        emissive="#e84057"
        emissiveIntensity={0}
      />
    </mesh>
  );
}

export default function ServiceSpheres({ pulseRef }: { pulseRef: PulseRef }) {
  // Position icons around the heart using golden ratio radius
  const positions: [number, number, number][] = useMemo(() => {
    return SERVICES.map((_, i) => {
      const angle = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2;
      return [
        Math.cos(angle) * ICON_RADIUS,
        Math.sin(angle) * ICON_RADIUS * 0.85 + 0.15, // offset to match heart center
        (Math.sin(angle * 2) * 0.15), // slight z variation
      ] as [number, number, number];
    });
  }, []);

  const heartCenter = new THREE.Vector3(0, 0.15, 0);

  return (
    <group>
      {SERVICES.map((service, i) => (
        <ServiceIcon
          key={service.name}
          service={service}
          position={positions[i]}
          pulseRef={pulseRef}
          index={i}
        />
      ))}
      {positions.map((pos, i) => (
        <GlassTube
          key={i}
          start={heartCenter}
          end={new THREE.Vector3(...pos)}
          pulseRef={pulseRef}
          index={i}
        />
      ))}
    </group>
  );
}
