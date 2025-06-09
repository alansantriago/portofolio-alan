"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, Linkedin, Twitter, Code2 } from "lucide-react";
import { useTheme } from "next-themes"; // <-- Import hook yang benar

export default function Footer() {
  // Kita tidak lagi memerlukan state manual, cukup gunakan hook dari next-themes
  const { theme } = useTheme();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/alansantriago",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/alan-syahlan-santriago",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/alansantriago",
      icon: Instagram,
    },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Kolom 1: Brand & Deskripsi */}
          <div>
            <Link
              href="#home"
              className="inline-flex items-center gap-2 mb-4 text-slate-800 dark:text-white"
            >
              <Image
                src="/logo.png"
                alt="Alan Syahlan Santiago Logo"
                width={40}
                height={40}
                className="p-1 rounded-full object-cover"
              />
              <span className="text-xl font-bold leading-tight">
                Alan Syahlan Santiago
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              A passionate developer crafting beautiful and functional digital
              experiences.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <nav aria-label="Footer Navigation">
            <h3 className="text-md font-semibold text-slate-800 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kolom 3: Hubungi Saya */}
          <div>
            <h3 className="text-md font-semibold text-slate-800 dark:text-white mb-4">
              Get in Touch
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Feel free to reach out for collaborations or just a friendly
              hello.
            </p>
            <a
              href="mailto:alansyahlansantriago99@gmail.com"
              className="block text-sm font-semibold text-blue-600 dark:text-sky-400 hover:underline"
            >
              alansyahlansantriago99@gmail.com
            </a>
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="my-8 border-b border-slate-200 dark:border-slate-800"></div>

        {/* Bagian Bawah: Copyright & Media Sosial */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} Alan Syahlan Santiago. All rights
            reserved.
          </p>
          <div className="flex space-x-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="group p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <link.icon className="h-5 w-5 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
