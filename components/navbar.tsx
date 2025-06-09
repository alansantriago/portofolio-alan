"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Download,
  Star,
  Moon,
  Sun,
  Home,
  User,
  Briefcase,
  Code,
  Award,
  Mail,
  ScrollText,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          setActiveLink(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat di-resize ke ukuran desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    {
      name: "Experience",
      href: "#experience",
      icon: Briefcase,
    },
    { name: "Projects", href: "#projects", icon: Code },
    {
      name: "Certificates",
      href: "#certificates",
      icon: Award,
    },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  // Varian animasi untuk menu mobile
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.07,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`
            flex justify-between items-center px-4 py-2 rounded-2xl border transition-all duration-300 ease-in-out
            ${
              scrolled
                ? "shadow-lg backdrop-blur-lg bg-white/70 dark:bg-black/70 border-slate-200 dark:border-slate-800"
                : "bg-transparent border-transparent"
            }
          `}
        >
          {/* Logo */}
          <Link href="#home" onClick={() => setActiveLink("home")}>
            <motion.div
              className="relative h-10 w-10 flex items-center justify-center rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                layout="fill"
                className="p-1 rounded-full object-cover"
              />
            </motion.div>
          </Link>

          {/* Navigasi Desktop */}
          <nav
            className={`
              hidden md:flex items-center gap-1 p-1 rounded-full border transition-colors duration-300
              ${
                scrolled
                  ? "bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700"
                  : "border-transparent"
              }
            `}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.href.substring(1))}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300
                  ${
                    activeLink === link.href.substring(1)
                      ? "text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
                  }
                `}
              >
                {activeLink === link.href.substring(1) && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 z-0"
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {<link.icon className="h-4 w-4" />} {link.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Tombol Aksi Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-slate-500/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-600" />
              )}
            </motion.button>
            <a href="/cv/alan-cv.pdf" download>
              <Button className="group rounded-full bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-slate-200 transition-colors">
                <ScrollText className="h-4 w-4 mr-2" /> Resume
                <Download className="h-4 w-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 z-50 relative rounded-full text-black dark:text-white hover:bg-slate-500/10 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* ===== MOBILE NAVIGATION (SEKARANG LENGKAP) ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="md:hidden fixed inset-0 top-0 pt-24 p-4 backdrop-blur-xl bg-white/80 dark:bg-black/80"
          >
            <div className="container mx-auto h-full flex flex-col">
              {/* === Navigasi Utama Mobile === */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={mobileLinkVariants}>
                    <a
                      href={link.href}
                      className={`flex items-center justify-between p-4 rounded-lg text-lg font-semibold transition-all duration-300
                        ${
                          activeLink === link.href.substring(1)
                            ? "bg-blue-500/10 text-blue-600 dark:text-sky-400"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-4">
                        {<link.icon className="h-5 w-5" />} {link.name}
                      </span>
                      {activeLink === link.href.substring(1) ? (
                        <Star
                          className="h-5 w-5 text-blue-500 dark:text-sky-500"
                          fill="currentColor"
                        />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* === Aksi di Bagian Bawah Menu Mobile === */}
              <motion.div
                className="mt-auto pb-8 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                  <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Sun className="h-5 w-5" /> / <Moon className="h-5 w-5" />{" "}
                    Theme
                  </span>
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="p-2 rounded-full bg-white dark:bg-black"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-blue-500" />
                    )}
                  </button>
                </div>
                <a href="/cv/alan-cv.pdf" download className="w-full block">
                  <Button
                    size="lg"
                    className="w-full group bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20"
                  >
                    <Download className="h-5 w-5 mr-3" />
                    Download Resume
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
