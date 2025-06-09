"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Theme context consumer component
function ThemeAwareComponents({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.5 : 0.8} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={isDarkMode ? 1 : 1.2}
      />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={isDarkMode ? 0.5 : 0.6}
        color={isDarkMode ? "#06b6d4" : "#0284c7"}
      />
      <AnimatedSphere isDarkMode={isDarkMode} />
      <FloatingParticles count={150} isDarkMode={isDarkMode} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
}

function AnimatedSphere({ isDarkMode }: { isDarkMode: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // Gentle rotation
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;

      // Subtle movement based on mouse position
      sphereRef.current.position.x = THREE.MathUtils.lerp(
        sphereRef.current.position.x,
        mouse.x * viewport.width * 0.05,
        0.05
      );
      sphereRef.current.position.y = THREE.MathUtils.lerp(
        sphereRef.current.position.y,
        mouse.y * viewport.height * 0.05,
        0.05
      );
    }
  });

  // Dark mode: blue sphere with cyan emission
  // Light mode: darker blue sphere with subtle blue emission
  const sphereColor = isDarkMode ? "#3b82f6" : "#2563eb";
  const emissiveColor = isDarkMode ? "#0ea5e9" : "#3b82f6";
  const emissiveIntensity = isDarkMode ? 0.4 : 0.2;
  const distortAmount = isDarkMode ? 0.4 : 0.3;
  const roughness = isDarkMode ? 0.2 : 0.3;
  const metalness = isDarkMode ? 0.8 : 0.5;

  return (
    <Sphere
      ref={sphereRef}
      args={[1.5, 100, 100]}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    >
      <MeshDistortMaterial
        color={sphereColor}
        attach="material"
        distort={distortAmount}
        speed={2}
        roughness={roughness}
        metalness={metalness}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
      />
    </Sphere>
  );
}

function FloatingParticles({
  count = 100,
  isDarkMode,
}: {
  count?: number;
  isDarkMode: boolean;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (mesh.current) {
      const dummy = new THREE.Object3D();
      const particles = [];

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * viewport.width * 3;
        const y = (Math.random() - 0.5) * viewport.height * 3;
        const z = (Math.random() - 0.5) * 10;
        const size = Math.random() * 0.05 + 0.01;

        particles.push({
          position: [x, y, z],
          size,
          speed: Math.random() * 0.01,
        });

        dummy.position.set(x, y, z);
        dummy.scale.set(size, size, size);
        dummy.updateMatrix();

        mesh.current.setMatrixAt(i, dummy.matrix);
      }

      mesh.current.instanceMatrix.needsUpdate = true;

      // Store particles data for animation
      mesh.current.userData.particles = particles;
    }
  }, [count, viewport]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      const dummy = new THREE.Object3D();
      const particles = mesh.current.userData.particles || [];

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const [x, y, z] = particle.position;
        const size = particle.size;

        // Move particles upward and reset when they go too high
        particle.position[1] += particle.speed;
        if (particle.position[1] > viewport.height) {
          particle.position[1] = -viewport.height;
        }

        dummy.position.set(x, y, z);
        dummy.scale.set(size, size, size);
        dummy.updateMatrix();

        mesh.current.setMatrixAt(i, dummy.matrix);
      }

      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Different particle color based on theme
  const particleColor = isDarkMode ? "#06b6d4" : "#0284c7";
  const particleOpacity = isDarkMode ? 0.6 : 0.4;

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={particleColor}
        transparent
        opacity={particleOpacity}
      />
    </instancedMesh>
  );
}

export default function HeroBackground() {
  // Add state to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Listen for theme changes from localStorage or context if available
  useEffect(() => {
    // Check if we can access the theme from localStorage or other state source
    const checkTheme = () => {
      // Try to get theme preference from localStorage if available
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setIsDarkMode(storedTheme === "dark");
      }
    };

    // Check theme on mount
    checkTheme();

    // Set up event listener for theme changes
    window.addEventListener("storage", checkTheme);

    // Listen for custom event that navbar might dispatch when theme changes
    window.addEventListener("themeChange", (e: any) => {
      if (e.detail && e.detail.isDarkMode !== undefined) {
        setIsDarkMode(e.detail.isDarkMode);
      }
    });

    return () => {
      window.removeEventListener("storage", checkTheme);
      window.removeEventListener("themeChange", checkTheme as any);
    };
  }, []);

  // In light mode, use a subtle gradient background
  const lightModeBackground = `
    linear-gradient(
      to bottom right,
      rgba(219, 234, 254, 0.3),
      rgba(191, 219, 254, 0.3),
      rgba(147, 197, 253, 0.1)
    )
  `;

  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background: !isDarkMode ? lightModeBackground : "transparent",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ThemeAwareComponents isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
}
