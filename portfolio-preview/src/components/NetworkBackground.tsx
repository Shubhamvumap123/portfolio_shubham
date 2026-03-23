// @ts-nocheck
"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Icosahedron, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 400;
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      coords[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = radius * Math.cos(phi);
    }
    return coords;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#00e5ff" 
        size={0.04} 
        sizeAttenuation={true} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
        opacity={0.6} 
      />
    </Points>
  );
};

const AbstractShape = () => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Gentle constant rotation
      groupRef.current.rotation.y = time * 0.05;
      
      // Mouse interactivity: smooth lerp towards mouse position
      const targetX = (state.pointer.x * state.viewport.width) / 10;
      const targetY = (state.pointer.y * state.viewport.height) / 10;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.02);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.02);
      
      // Independent rotations for complexity
      if (outerRef.current) {
        outerRef.current.rotation.x = time * 0.1;
        outerRef.current.rotation.y = time * 0.15;
      }
      
      if (innerRef.current) {
        innerRef.current.rotation.y = time * -0.1;
        innerRef.current.rotation.z = time * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Tech Cage */}
        <Icosahedron ref={outerRef} args={[2.7, 2]}>
          <meshStandardMaterial 
            color="#ffffff" 
            wireframe={true} 
            transparent={true}
            opacity={0.15}
            roughness={0.2}
            metalness={0.8}
          />
        </Icosahedron>
        
        {/* Inner Distorted Energy Core */}
        <Sphere ref={innerRef} args={[2.3, 64, 64]}>
          <MeshDistortMaterial
            color="#00e5ff"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.5}
            speed={2.5}
            transparent={true}
            opacity={0.85}
          />
        </Sphere>
      </Float>
    </group>
  );
};

export default function NetworkBackground() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden", opacity: 0.8 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        {/* Dual-tone dramatic lighting */}
        <spotLight position={[10, 10, 10]} intensity={3} color="#00e5ff" angle={0.5} penumbra={1} />
        <spotLight position={[-10, -10, -10]} intensity={2.5} color="#9d00ff" angle={0.5} penumbra={1} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        
        <AbstractShape />
        <Particles />
      </Canvas>
    </div>
  );
}
