"use client";

import { useRef, useMemo } from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Stars } from "@react-three/drei";
import * as THREE from "three";

function ThemeAwareScene() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.1 : 0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={isDarkMode ? 0.3 : 0.6}
        color={isDarkMode ? "#60a5fa" : "#3b82f6"}
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={isDarkMode ? 0.5 : 0.3}
        color={isDarkMode ? "#818cf8" : "#a5b4fc"}
      />
      <OrbitingNodes count={15} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={isDarkMode ? 4 : 5}
        saturation={0}
        fade
        speed={isDarkMode ? 0.5 : 0.3}
      />
    </>
  );
}

// Komponen untuk simpul/node yang mengorbit
function OrbitingNodes({ count }: { count: number }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 4 + 2;
      const speed = (Math.random() - 0.5) * 0.2;
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
      temp.push({
        radius,
        speed,
        position,
        initialAngle: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const { radius, speed, position, initialAngle } = nodes[index];
        const time = clock.getElapsedTime() * speed + initialAngle;

        child.position.x = position.x + Math.cos(time) * radius;
        child.position.y = position.y + Math.sin(time) * radius;
        child.position.z =
          position.z + Math.sin(time) * Math.cos(time) * radius * 0.5;

        child.rotation.x += 0.005;
        child.rotation.y += 0.005;
      });
    }
  });

  const nodeColor = isDarkMode ? "#a78bfa" : "#4f46e5";
  const emissiveColor = isDarkMode ? "#8b5cf6" : "#6366f1";
  const emissiveIntensity = isDarkMode ? 0.2 : 0.1;

  return (
    <group ref={groupRef}>
      {nodes.map((_, i) => (
        <Icosahedron key={i} args={[0.2, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={nodeColor}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
            roughness={0.4}
            metalness={0.1}
          />
        </Icosahedron>
      ))}
    </group>
  );
}

// Komponen utama yang diekspor
export default function AboutBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ThemeAwareScene />
      </Canvas>
    </div>
  );
}
