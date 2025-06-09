"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Palette,
  Zap,
  Award as AwardIcon,
  GraduationCap,
  Building,
} from "lucide-react";
import { skills } from "@/data/skills";
import AboutBackground from "@/components/about-background";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Building responsive and performant web applications with modern technologies.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating beautiful and intuitive user interfaces with a focus on user experience.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Optimizing applications for speed, accessibility, and search engine visibility.",
  },
  {
    icon: AwardIcon,
    title: "Technical Consultation",
    description:
      "Providing expert advice on technology stack and architecture decisions.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-black transition-colors duration-500"
    >
      <AboutBackground /> {/* <-- PANGGIL KOMPONEN BACKGROUND DI SINI */}
      <div className="container mx-auto px-4 relative z-10">
        {/* === SECTION TITLE === */}
        <motion.div
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-sky-500/10 border border-blue-200 dark:border-sky-500/20 mb-4">
            <p className="text-sm font-semibold text-blue-600 dark:text-sky-400">
              GET TO KNOW ME
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            About My Journey
          </h2>
        </motion.div>

        {/* === MAIN CONTENT GRID === */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid lg:grid-cols-5 gap-12 items-start"
        >
          {/* === LEFT COLUMN: Narrative & Education === */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                Who I Am
              </h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                I'm a passionate and results-driven{" "}
                <span className="font-semibold text-blue-600 dark:text-sky-400">
                  Computer Science graduate
                </span>{" "}
                specializing in full-stack development and UI/UX design. I
                transform complex problems into elegant, high-performance
                digital solutions. My work is a blend of clean code, intuitive
                design, and a relentless focus on user experience.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                Education
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                    <GraduationCap className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">
                      Bachelor of Computer Science
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      University of Bengkulu (2019 - 2023)
                    </p>
                    <p className="text-xs font-medium text-blue-600 dark:text-sky-500 mt-1">
                      Graduated with GPA: 3.7/4.0
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                    <Building className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">
                      Multimedia Major
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      SMKN 1 Bengkulu Selatan (2016 - 2019)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* === RIGHT COLUMN: Skills === */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">
              Technical Skills
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group flex flex-col items-center text-center space-y-2"
                >
                  <div className="relative p-4 bg-white hover:bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 transition-all duration-300 group-hover:shadow-lg group-hover:border-slate-300 dark:group-hover:border-sky-500/30 group-hover:scale-105 group-hover:-translate-y-1">
                    <Image
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors group-hover:text-slate-800 dark:group-hover:text-white">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* === SERVICES SECTION === */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            What I Offer
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative text-center p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-sky-500/10 hover:-translate-y-2"
              >
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full"></div>
                <div className="relative inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-sky-900/50 rounded-full mb-4 border border-blue-200 dark:border-sky-800">
                  <service.icon className="h-6 w-6 text-blue-600 dark:text-sky-400" />
                </div>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
