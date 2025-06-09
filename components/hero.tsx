"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Github, Linkedin, ArrowDown, Code, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

type HeroBackgroundProps = {
  theme?: string;
};
// Dynamically import the 3D background to avoid SSR issues
const HeroBackground = dynamic<HeroBackgroundProps>(
  () => import("@/components/hero-background"),
  { ssr: false }
);

export default function Hero() {
  const { theme } = useTheme();
  const textRef = useRef<HTMLHeadingElement>(null);

  // useEffect for the mouse-following gradient effect on the heading
  useEffect(() => {
    // This effect should only run in dark mode
    if (theme !== "dark") {
      // If we switch to light mode, reset any inline styles
      if (textRef.current) {
        textRef.current.style.cssText = "";
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      textRef.current.style.setProperty("--x", `${x}px`);
      textRef.current.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]); // Rerun the effect if the theme changes

  // Conditional style object for the h1 element, only applied in dark mode
  const headingStyle =
    theme === "dark"
      ? {
          background:
            "radial-gradient(circle 8rem at var(--x) var(--y), #3b82f6, #06b6d4, #fff)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }
      : {};

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 md:pt-0 overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-500"
    >
      {/* The 3D background component */}
      <HeroBackground theme={theme} />

      {/* Decorative gradient blurs */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-10 dark:opacity-10 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-violet-500 to-blue-400 rounded-full opacity-10 dark:opacity-10 blur-2xl animate-pulse delay-1000"></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col-reverse md:flex-row items-center gap-12"
        >
          {/* Left Side: Text Content */}
          <div className="md:w-3/5 lg:w-1/2 space-y-6 text-center md:text-left">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm border bg-slate-100/60 dark:bg-slate-800/80 border-slate-200 dark:border-blue-500/20 mb-4">
                <Sparkles className="h-4 w-4 text-blue-500 dark:text-sky-400" />
                <TypeAnimation
                  sequence={[
                    "Full-Stack Developer",
                    2000,
                    "Front-End Specialist",
                    2000,
                    "Back-End Engineer",
                    2000,
                    "UI/UX Enthusiast",
                    2000,
                  ]}
                  wrapper="p"
                  speed={50}
                  className="text-sm font-medium text-blue-500 dark:text-sky-400"
                  repeat={Infinity}
                />
              </div>
            </motion.div>

            <motion.h1
              ref={textRef}
              variants={itemVariants}
              className={`text-5xl md:text-6xl lg:text-7xl font-bold relative ${
                theme === "dark"
                  ? "text-transparent"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              }`}
              style={headingStyle}
            >
              Hi, I'm Alan Syahlan Santiago
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 text-slate-600 dark:text-slate-400"
            >
              I create{" "}
              <span className="text-slate-900 dark:text-white font-medium">
                beautiful
              </span>{" "}
              and{" "}
              <span className="text-slate-900 dark:text-white font-medium">
                functional
              </span>{" "}
              digital experiences with code.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center md:justify-start gap-4 pt-2"
            >
              <div className="flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-lg border bg-slate-100/60 dark:bg-slate-800/80 border-slate-200 dark:border-blue-500/20">
                <Code className="h-4 w-4 text-blue-500 dark:text-sky-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="text-slate-900 dark:text-white font-medium">
                    2+ years
                  </span>{" "}
                  of experience
                </span>
              </div>
              <div className="flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-lg border bg-slate-100/60 dark:bg-slate-800/80 border-slate-200 dark:border-blue-500/20">
                <Zap className="h-4 w-4 text-blue-500 dark:text-sky-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="text-slate-900 dark:text-white font-medium">
                    20+ projects
                  </span>{" "}
                  completed
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-6 flex flex-wrap items-center justify-center md:justify-start gap-4"
            >
              <a href="#projects">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all px-6 py-6 h-auto text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 rounded-lg">
                  View Projects
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="outline"
                  className="transition-all px-6 py-6 h-auto text-base border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 rounded-lg"
                >
                  Contact Me
                </Button>
              </a>
              <div className="flex items-center gap-3">
                <Link
                  href="https://github.com"
                  target="_blank"
                  aria-label="GitHub"
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors group"
                >
                  <Github className="h-5 w-5 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors group"
                >
                  <Linkedin className="h-5 w-5 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Image */}
          <motion.div
            variants={itemVariants}
            className="md:w-2/5 lg:w-1/2 flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/20 animate-spin-slow"></div>
              <div className="absolute -inset-4 rounded-full border border-blue-500/10 dark:border-blue-500/5"></div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 rounded-full"></div>
                <div className="absolute inset-1 rounded-full bg-white dark:bg-slate-900 transition-colors duration-500"></div>
                <Image
                  src="/profil.jpg"
                  alt="Profile"
                  width={320}
                  height={320}
                  className="rounded-full object-cover relative z-10 p-2"
                  priority
                />
              </div>

              {/* Floating tech badges */}
              {["React", "TypeScript", "Next.js"].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="absolute backdrop-blur-sm px-3 py-1.5 rounded-full border z-20 bg-white/70 dark:bg-slate-800/80 border-slate-200 dark:border-blue-500/20"
                  style={{
                    top: index === 0 ? "-1rem" : index === 1 ? "50%" : "auto",
                    bottom: index === 2 ? "-1rem" : "auto",
                    right: index === 0 ? "1rem" : index === 2 ? "1rem" : "auto",
                    left: index === 1 ? "-3rem" : "auto",
                    transform: index === 1 ? "translateY(-50%)" : "none",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8 + index * 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <span className="text-sm font-medium text-blue-500 dark:text-sky-400">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <Link href="#about" aria-label="Scroll down">
          <ArrowDown className="h-6 w-6 text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors" />
        </Link>
      </div>

      {/* Keyframes for spin animation */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
