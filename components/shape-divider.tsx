// components/ShapeDivider.tsx

"use client";

import { motion } from "framer-motion";

// Menambahkan lebih banyak opsi bentuk dan properti untuk kustomisasi
interface ShapeDividerProps {
  shape: "wave" | "wave-2" | "slope" | "curve" | "triangle";
  height?: string; // e.g., 'h-20', 'h-32', 'h-[150px]'
  flipY?: boolean;
  flipX?: boolean;
  className?: string;
}

// Menyimpan data path SVG untuk setiap bentuk
const shapes = {
  wave: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
  "wave-2": "M1200 120L0 120 0 0 1200 0 1200 120z", // Placeholder, ganti dengan path wave lain jika ada
  slope: "M1200 120L0 0 1200 0 1200 120z",
  curve: "M1200,0C759.87,121.15,459.22,121.15,0,0V120H1200Z",
  triangle: "M600,120L1200,0H0Z",
  // Ini adalah path untuk garis lurus, digunakan sebagai state awal animasi
  flat: "M0,120L1200,120L1200,120L0,120Z",
};

export default function ShapeDivider({
  shape,
  height = "h-20", // Default height jika tidak dispesifikasikan
  flipY = false,
  flipX = false,
  className = "",
}: ShapeDividerProps) {
  // Varian animasi untuk path SVG
  const pathVariants = {
    hidden: {
      d: shapes.flat, // Mulai dari garis lurus
      opacity: 0,
    },
    visible: {
      d: shapes[shape], // Animasikan ke bentuk yang dipilih
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <div
      className={`w-full leading-none -mb-px ${height} ${className}`}
      style={{
        transform: `
          ${flipY ? "scaleY(-1)" : ""}
          ${flipX ? "scaleX(-1)" : ""}
        `,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.path
          d={shapes[shape]}
          // Menggunakan `currentColor`, warnanya akan mengikuti warna teks dari parent div
          fill="currentColor"
          variants={pathVariants}
        />
      </motion.svg>
    </div>
  );
}
