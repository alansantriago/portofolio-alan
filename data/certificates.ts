// data/certificates.ts

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string; // <-- BARU: Logo penerbit
  issueDate: Date; // <-- BARU: Tipe Date agar bisa diurutkan
  thumbnail: string;
  fullImage: string;
  tags: string[]; // <-- BARU: Array untuk beberapa tag/kategori
  credentialUrl?: string; // <-- BARU: Link untuk verifikasi (opsional)
}

export const certificates: Certificate[] = [
  {
    id: "web-development",
    title: "The Complete 2023 Web Development Bootcamp",
    issuer: "Udemy",
    issuerLogo: "/logos/udemy.svg", // <-- Contoh path logo
    issueDate: new Date("2023-01-20"), // <-- Gunakan objek Date
    thumbnail: "/certificates/web-thumb.jpg", // Ganti dengan path gambar asli Anda
    fullImage: "/certificates/web-full.jpg",
    tags: ["Development", "Full-Stack", "MERN"],
    credentialUrl: "https://www.udemy.com/certificate/UC-xxxx-xxxx/", // <-- Contoh URL
  },
  {
    id: "ui-ux-design",
    title: "Google UX Design Professional Certificate",
    issuer: "Coursera",
    issuerLogo: "/logos/coursera.svg",
    issueDate: new Date("2023-03-15"),
    thumbnail: "/certificates/ux-thumb.jpg",
    fullImage: "/certificates/ux-full.jpg",
    tags: ["Design", "UI/UX", "Figma"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/xxxx",
  },
  {
    id: "react-advanced",
    title: "Advanced React & Redux",
    issuer: "Udemy",
    issuerLogo: "/logos/udemy.svg",
    issueDate: new Date("2023-05-10"),
    thumbnail: "/certificates/react-thumb.jpg",
    fullImage: "/certificates/react-full.jpg",
    tags: ["Development", "Front-End", "React"],
    credentialUrl: "https://www.udemy.com/certificate/UC-yyyy-yyyy/",
  },
  {
    id: "aws-cloud",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuerLogo: "/logos/aws.svg",
    issueDate: new Date("2023-07-22"),
    thumbnail: "/certificates/aws-thumb.jpg",
    fullImage: "/certificates/aws-full.jpg",
    tags: ["Cloud", "AWS", "Infrastructure"],
    credentialUrl: "https://www.credly.com/badges/zzzz",
  },
  // ...tambahkan sertifikat lainnya dengan format yang sama
];