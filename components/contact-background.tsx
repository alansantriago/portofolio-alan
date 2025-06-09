"use client";

import { useTheme } from "next-themes";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function WavingLines({
  count,
  isDarkMode,
}: {
  count: number;
  isDarkMode: boolean;
}) {
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => {
      const points = [];
      const length = 50;
      const freq = 0.1;
      const amp = 0.2;
      for (let j = 0; j <= length; j++) {
        points.push(
          new THREE.Vector3((j / length) * 20 - 10, Math.sin(j * freq) * amp, 0)
        );
      }
      return {
        points,
        positionZ: (Math.random() - 0.5) * 20,
        speed: Math.random() * 0.1 + 0.05,
      };
    });
  }, [count]);

  return (
    <group position={[0, -5, -15]}>
      {lines.map((line, i) => (
        <WavingLine key={i} {...line} isDarkMode={isDarkMode} />
      ))}
    </group>
  );
}

function WavingLine({ points, positionZ, speed, isDarkMode }: any) {
  const ref = useRef<any>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      ref.current.position.z = positionZ + Math.sin(time * speed) * 5;
    }
  });
  return (
    <Line
      ref={ref}
      points={points}
      color={isDarkMode ? "#38bdf8" : "#3b82f6"}
      lineWidth={0.5}
      opacity={0.1}
      transparent
    />
  );
}

export default function ContactBackground() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <directionalLight intensity={0.5} position={[0, 0, 50]} />
        <WavingLines count={20} isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
}
