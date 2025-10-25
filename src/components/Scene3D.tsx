"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

interface Scene3DProps {
  isTyping: boolean;
  isSpeaking: boolean;
  reducedMotion?: boolean;
}

function Scene3DContent({ isTyping, isSpeaking }: { isTyping: boolean; isSpeaking: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      
      {/* Directional lights */}
      <directionalLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      
      {/* Spot lights for drama */}
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#06b6d4"
        castShadow
      />

      {/* Simple animated sphere instead of complex avatar */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={isSpeaking ? "#8b5cf6" : isTyping ? "#06b6d4" : "#3b82f6"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Orbit controls for interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function Scene3D({ isTyping, isSpeaking, reducedMotion = false }: Scene3DProps) {
  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 backdrop-blur-3xl" />
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <Scene3DContent isTyping={isTyping} isSpeaking={isSpeaking} />
      </Canvas>
    </div>
  );
}