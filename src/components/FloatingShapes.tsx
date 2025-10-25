"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingShapes() {
  const shape1Ref = useRef<THREE.Mesh>(null);
  const shape2Ref = useRef<THREE.Mesh>(null);
  const shape3Ref = useRef<THREE.Mesh>(null);
  const shape4Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (shape1Ref.current) {
      shape1Ref.current.position.x = Math.sin(t * 0.3) * 3;
      shape1Ref.current.position.y = Math.cos(t * 0.2) * 2 + 1;
      shape1Ref.current.position.z = -3;
      shape1Ref.current.rotation.x = t * 0.2;
      shape1Ref.current.rotation.y = t * 0.3;
    }

    if (shape2Ref.current) {
      shape2Ref.current.position.x = Math.cos(t * 0.25) * 3.5;
      shape2Ref.current.position.y = Math.sin(t * 0.3) * 2 - 1;
      shape2Ref.current.position.z = -4;
      shape2Ref.current.rotation.x = t * 0.15;
      shape2Ref.current.rotation.z = t * 0.2;
    }

    if (shape3Ref.current) {
      shape3Ref.current.position.x = Math.sin(t * 0.2 + 2) * 2.5;
      shape3Ref.current.position.y = Math.cos(t * 0.25 + 1) * 1.5 + 0.5;
      shape3Ref.current.position.z = -3.5;
      shape3Ref.current.rotation.y = t * 0.25;
      shape3Ref.current.rotation.z = t * 0.15;
    }

    if (shape4Ref.current) {
      shape4Ref.current.position.x = Math.cos(t * 0.35 + 3) * 3;
      shape4Ref.current.position.y = Math.sin(t * 0.2 + 2) * 2 - 0.5;
      shape4Ref.current.position.z = -3;
      shape4Ref.current.rotation.x = t * 0.3;
      shape4Ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group>
      {/* Torus */}
      <mesh ref={shape1Ref}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Octahedron */}
      <mesh ref={shape2Ref}>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.25}
          wireframe
        />
      </mesh>

      {/* Icosahedron */}
      <mesh ref={shape3Ref}>
        <icosahedronGeometry args={[0.4]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Tetrahedron */}
      <mesh ref={shape4Ref}>
        <tetrahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color="#a78bfa"
          transparent
          opacity={0.28}
          wireframe
        />
      </mesh>
    </group>
  );
}