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
    id: "project-management-dashboard",
    featured: true, // <-- Tandai ini sebagai proyek unggulan
    title: "Kanban Project Management Dashboard",
    description: "A comprehensive project management solution with drag-and-drop tasks, real-time updates, and team collaboration features.",
    longDescription: "This full-stack application was built to streamline team workflows. It features a drag-and-drop interface powered by React Beautiful DnD, real-time database synchronization with Firebase, and a secure RESTful API built with Node.js and Express for data handling.",
    thumbnail: "/projects/kanban-thumb.jpg", // Ganti dengan path gambar asli Anda
    images: ["/projects/kanban-1.jpg", "/projects/kanban-2.jpg", "/projects/kanban-3.jpg"],
    tags: ["React", "Node.js", "Firebase", "Tailwind CSS", "Express"],
    category: "Web App",
    year: 2023,
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    id: "ecommerce-mobile-app",
    featured: false,
    title: "E-commerce Mobile App",
    description: "Modern e-commerce mobile application with a stunning UI, seamless UX, and integration with a payment gateway.",
    longDescription: "A fully functional mobile shopping app for both iOS and Android. It includes features like product search and filtering, a shopping cart, user authentication, and a checkout process powered by a mock payment gateway.",
    thumbnail: "/projects/ecommerce-thumb.jpg",
    images: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
    tags: ["React Native", "Firebase", "Stripe API"],
    category: "Mobile App",
    year: 2023,
    liveUrl: "#",
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