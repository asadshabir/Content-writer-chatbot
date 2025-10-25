"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  isTyping: boolean;
  isSpeaking: boolean;
}

export default function Avatar3D({ isTyping, isSpeaking }: Avatar3DProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      const pulseFactor = isSpeaking || isTyping ? 1 + Math.sin(state.clock.elapsedTime * 8) * 0.1 : 1;
      sphereRef.current.scale.setScalar(pulseFactor);
    }

    if (lightRef.current) {
      const baseIntensity = isSpeaking ? 3 : isTyping ? 2 : 1.5;
      lightRef.current.intensity = baseIntensity + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  const mainColor = isSpeaking ? "#8b5cf6" : isTyping ? "#06b6d4" : "#3b82f6";
  const glowColor = isSpeaking ? "#a78bfa" : isTyping ? "#22d3ee" : "#60a5fa";
  const distortSpeed = isSpeaking ? 3 : isTyping ? 2 : 1;

  return (
    <group position={[0, 0, 0]}>
      <Sphere ref={sphereRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={mainColor}
          distort={0.4}
          speed={distortSpeed}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      <Sphere args={[0.9, 32, 32]}>
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.3}
        />
      </Sphere>

      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color={mainColor}
        intensity={1.5}
        distance={10}
      />
    </group>
  );
}