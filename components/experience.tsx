"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import { experiences } from "@/data/experiences"; // Pastikan path ini benar

export default function Experience() {
  const { theme } = useTheme();

  // Buka item pertama secara default
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences[0]?.id || null
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section
      id="experience"
      className="relative w-full py-24 md:py-32 bg-white dark:bg-slate-900/70 bg-dot-slate-300/[0.4] dark:bg-dot-white/[0.1] transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white dark:from-black dark:via-black/90 dark:to-black z-0"></div>

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
              CAREER PATH
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Work Experience
          </h2>
        </motion.div>

        {/* === TIMELINE === */}
        <div className="relative max-w-3xl mx-auto">
          {/* Garis vertikal timeline */}
          <div className="absolute left-6 md:left-8 top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12"
          >
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative flex items-start gap-6 md:gap-8"
              >
                {/* Titik Waktu dengan Logo */}
                <div className="flex-shrink-0 mt-1 z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full border-2 border-slate-200 dark:border-slate-800">
                  <div className="w-full h-full p-2 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={exp.logo || "/placeholder.svg"}
                      alt={`${exp.company} logo`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Kartu Konten */}
                <div className="flex-1">
                  <div
                    className="cursor-pointer bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
                    onClick={() => toggleExpand(exp.id)}
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                            {exp.position}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm font-medium text-blue-600 dark:text-sky-400">
                            <Briefcase className="h-4 w-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${
                            expandedId === exp.id ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Konten yang bisa di-expand/collapse */}
                    <AnimatePresence>
                      {expandedId === exp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-200 dark:border-slate-800 p-4 md:p-6 pt-4">
                            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                              {exp.description.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 dark:bg-sky-500 shrink-0"></span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {exp.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
