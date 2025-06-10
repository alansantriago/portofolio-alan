// data/projects.ts

export interface Project {
  id: string;
  featured?: boolean; // <-- Proyek unggulan
  title: string;
  description: string;
  longDescription: string; // <-- BARU: Deskripsi panjang untuk modal
  thumbnail: string;
  images: string[];
  tags: string[];
  category: "Web App" | "Mobile App" | "3D Graphics" | "Other"; // <-- BARU: Kategori utama
  year: number; // <-- BARU: Tahun pembuatan
  liveUrl?: string;
  repoUrl?: string; // <-- Diubah agar konsisten
}

export const projects: Project[] = [
  {
    id: "spmb-smk-bengkulu",
    featured: true, // <-- Tandai ini sebagai proyek unggulan
    title: "SPMB SMK Provinsi Bengkulu",
    description: "A modern online admission platform for vocational high schools in Bengkulu Province, built with Next.js, Tailwind CSS, TypeScript, and Laravel.",
    longDescription: "SPMB SMK Provinsi Bengkulu is a digital admission system designed to simplify and modernize the student registration process for vocational high schools across the province. The frontend is developed using Next.js, Tailwind CSS, and TypeScript for a clean and responsive user interface, while the backend utilizes Laravel to handle authentication, student data processing, and application management. Features include multi-step registration forms, school selection logic, real-time application tracking, admin dashboards, and integration with secure APIs to manage applicants and results efficiently.",
    thumbnail: "/projects/SPMB SMK/SPMB-SMK (1).png", // Ganti dengan path gambar asli Anda
    images: ["/projects/SPMB SMK/SPMB-SMK (1).png", "/projects/SPMB SMK/SPMB-SMK (2).png", "/projects/SPMB SMK/SPMB-SMK (3).png", "/projects/SPMB SMK/SPMB-SMK (4).png", "/projects/SPMB SMK/SPMB-SMK (5).png", "/projects/SPMB SMK/SPMB-SMK (6).png", "/projects/SPMB SMK/SPMB-SMK (7).png", "/projects/SPMB SMK/SPMB-SMK (8).png", "/projects/SPMB SMK/SPMB-SMK (9).png",],
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Laravel", "Student Admission", "REST API", "Education Platform"],
    category: "Web App",    
    year: 2025,
    liveUrl: "https://spmb-smk.bengkuluprov.go.id/",
    repoUrl: "#",
  },
  {
    id: "loker-merah-putih",
    featured: false,
    title: "Loker Merah Putih Provinsi Bengkulu",
    description: "A modern job listing platform with clean UI, responsive design, and seamless user experience, built with Next.js, Tailwind CSS, and TypeScript.",
    longDescription: "A fully functional mobile shopping app for both iOS and Android. It includes features like product search and filtering, a shopping cart, user authentication, and a checkout process powered by a mock payment gateway.",
    thumbnail: "/projects/Loker Merah Putih/loker-merah-putih1.png",
    images: ["/projects/Loker Merah Putih/loker-merah-putih1.png", "/projects/Loker Merah Putih/loker-merah-putih2.png", "/projects/Loker Merah Putih/loker-merah-putih3.png", "/projects/Loker Merah Putih/loker-merah-putih4.png"],
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Laravel", "Job Portal", "REST API", "RBAC", "Admin Dashboard"],
    category: "Web App",
    year: 2025,
    liveUrl: "https://lokermerahputih.bengkuluprov.go.id/",
    repoUrl: "#",
  },
  {
    id: "3d-portfolio-gallery",
    featured: false,
    title: "3D Portfolio Gallery",
    description: "An interactive and immersive 3D gallery to showcase creative works, built with Three.js and WebGL.",
    longDescription: "This project explores the possibilities of WebGL to create an engaging user experience. It uses react-three-fiber to manage the 3D scene, with custom shaders for effects and interactive camera controls.",
    thumbnail: "/projects/3d-gallery-thumb.jpg",
    images: ["/projects/3d-gallery-1.jpg", "/projects/3d-gallery-2.jpg"],
    tags: ["Three.js", "WebGL", "React", "Shaders"],
    category: "3D Graphics",
    year: 2022,
  },
  // ... Tambahkan proyek lainnya
];