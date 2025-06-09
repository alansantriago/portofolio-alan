"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye, ChevronRight, X, Home } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectModal from "@/components/project-modal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const ref = useRef(null);
  const headerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isHeaderInView = useInView(headerRef, { once: true });

  // Get all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  ).sort();

  // Filtered projects
  const filteredProjects = filterTag
    ? projects.filter((project) => project.tags.includes(filterTag))
    : projects;

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setIsDarkMode(storedTheme === "dark");
      }
    };

    checkTheme();
    window.addEventListener("storage", checkTheme);
    window.addEventListener("themeChange", (e) => {
      const customEvent = e as CustomEvent<{ isDarkMode: boolean }>;
      if (customEvent.detail && customEvent.detail.isDarkMode !== undefined) {
        setIsDarkMode(customEvent.detail.isDarkMode);
      }
    });

    return () => {
      window.removeEventListener("storage", checkTheme);
      window.removeEventListener("themeChange", checkTheme);
    };
  }, []);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const headerFade = {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  // Determine theme colors based on isDarkMode state
  const theme = isDarkMode
    ? {
        // Dark theme
        sectionBg: "bg-[#f8fafc]",
        cardBg: "bg-white",
        cardBorder: "border-gray-200",
        cardHoverBorder: "group-hover:border-blue-300",
        cardShadow: "group-hover:shadow-blue-100/50",
        tagBg: "from-blue-50 to-cyan-50",
        tagBorder: "border-blue-100",
        tagText: "text-blue-600",
        activeTagBg: "bg-blue-100",
        activeTagBorder: "border-blue-300",
        heading: "from-gray-800 to-gray-600",
        text: "text-gray-600",
        buttonBg: "bg-white",
        buttonHoverBg: "hover:bg-gray-50",
        buttonBorder: "border-blue-200",
        buttonHoverBorder: "hover:border-blue-300",
        buttonText: "text-gray-800",
        overlayBg: "bg-white/90",
        overlayHoverBg: "hover:bg-white",
        overlayBorder: "border-blue-200",
        overlayIcon: "text-blue-600",
        titleText: "text-gray-800",
        titleHover: "group-hover:text-blue-600",
        accent: "text-blue-600",
        filterButtonBg: "bg-white",
        filterButtonHoverBg: "hover:bg-gray-50",
      }
    : {
        // Light theme
        sectionBg: "bg-[#0a0f1a]",
        cardBg: "bg-[#131d31]",
        cardBorder: "border-[#3b82f6]/15",
        cardHoverBorder: "group-hover:border-[#3b82f6]/40",
        cardShadow: "group-hover:shadow-[#3b82f6]/10",
        tagBg: "from-[#3b82f6]/10 to-[#06b6d4]/10",
        tagBorder: "border-[#3b82f6]/20",
        tagText: "text-[#38bdf8]",
        activeTagBg: "bg-[#3b82f6]/20",
        activeTagBorder: "border-[#3b82f6]/40",
        heading: "from-white to-[#94a3b8]",
        text: "text-[#94a3b8]",
        buttonBg: "bg-[#1e293b]",
        buttonHoverBg: "hover:bg-[#0f172a]",
        buttonBorder: "border-[#3b82f6]/20",
        buttonHoverBorder: "hover:border-[#3b82f6]/40",
        buttonText: "text-white",
        overlayBg: "bg-[#0f172a]/90",
        overlayHoverBg: "hover:bg-[#0f172a]",
        overlayBorder: "border-[#3b82f6]/30",
        overlayIcon: "text-[#38bdf8]",
        titleText: "text-white",
        titleHover: "group-hover:text-[#38bdf8]",
        accent: "text-[#38bdf8]",
        filterButtonBg: "bg-[#1e293b]",
        filterButtonHoverBg: "hover:bg-[#152032]",
      };

  return (
    <>
      <section
        id="projects"
        className={`py-24 ${theme.sectionBg} relative overflow-hidden min-h-screen`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent"></div>
        <div className="absolute top-0 -left-40 w-96 h-96 bg-[#3b82f6] rounded-full opacity-5 blur-[100px]"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-[#06b6d4] rounded-full opacity-5 blur-[100px]"></div>
        <div className="absolute top-96 right-60 w-32 h-32 bg-[#3b82f6] rounded-full opacity-5 blur-[50px]"></div>
        <div className="absolute bottom-40 left-40 w-64 h-64 bg-[#06b6d4] rounded-full opacity-5 blur-[80px]"></div>

        <div className="container mx-auto py-8 px-4 max-w-6xl">
          <motion.div
            className="flex flex-col items-left mb-16"
            ref={headerRef}
            initial="hidden"
            animate={isHeaderInView ? "show" : "hidden"}
            variants={headerFade}
          >
            <h2
              className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.heading} text-left`}
            >
              Featured Projects
            </h2>
            <p
              className={`mt-5 ${theme.text} max-w-2xl text-left text-lg leading-relaxed`}
            >
              A showcase of my creative work, personal projects, and
              professional contributions spanning web development, design, and
              problem-solving.
            </p>
          </motion.div>

          {/* Filter tags */}
          <motion.div
            className="mb-12 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              onClick={() => setFilterTag(null)}
              className={`px-4 py-2 rounded-lg text-sm ${
                theme.filterButtonBg
              } ${theme.filterButtonHoverBg} border transition-all ${
                filterTag === null
                  ? `${theme.activeTagBorder} ${theme.activeTagBg}`
                  : theme.buttonBorder
              }`}
            >
              All Projects
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag === filterTag ? null : tag)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  theme.filterButtonBg
                } ${theme.filterButtonHoverBg} border transition-all ${
                  tag === filterTag
                    ? `${theme.activeTagBorder} ${theme.activeTagBg}`
                    : theme.buttonBorder
                }`}
              >
                {tag}
                {tag === filterTag && (
                  <X className="inline-block ml-2 h-4 w-4 opacity-70" />
                )}
              </button>
            ))}
          </motion.div>

          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={item}
                  layout
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div
                    className={`${theme.cardBg} rounded-2xl overflow-hidden cursor-pointer border ${theme.cardBorder} ${theme.cardHoverBorder} transition-all group-hover:shadow-2xl ${theme.cardShadow} h-full flex flex-col`}
                  >
                    <div className="relative h-52 md:h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                      <Image
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-[#3b82f6]/0 group-hover:bg-[#3b82f6]/10 transition-all duration-300 z-10"></div>

                      {/* Overlay buttons with animations */}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <motion.button
                          onClick={() => openProjectModal(project)}
                          className={`p-3 ${theme.overlayBg} rounded-full ${theme.overlayHoverBg} transition-colors border ${theme.overlayBorder} shadow-lg`}
                          aria-label={`View ${project.title} details`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className={`h-5 w-5 ${theme.overlayIcon}`} />
                        </motion.button>
                        <motion.a
                          href="#"
                          className={`p-3 ${theme.overlayBg} rounded-full ${theme.overlayHoverBg} transition-colors border ${theme.overlayBorder} shadow-lg`}
                          aria-label={`View ${project.title} live demo`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink
                            className={`h-5 w-5 ${theme.overlayIcon}`}
                          />
                        </motion.a>
                        <motion.a
                          href="#"
                          className={`p-3 ${theme.overlayBg} rounded-full ${theme.overlayHoverBg} transition-colors border ${theme.overlayBorder} shadow-lg`}
                          aria-label={`View ${project.title} source code`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className={`h-5 w-5 ${theme.overlayIcon}`} />
                        </motion.a>
                      </div>

                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-[#3b82f6] rounded-full z-20 shadow-lg">
                          <p className="text-xs font-semibold text-white">
                            Featured
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="p-7 flex-1 flex flex-col">
                      <h3
                        className={`text-xl font-semibold mb-3 ${theme.titleText} ${theme.titleHover} transition-colors`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-sm mb-5 ${theme.text} flex-1 leading-relaxed`}
                      >
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#3b82f6]/10">
                        {project.tags.map((tag) => (
                          <span
                            key={`${project.id}-${tag}`}
                            className={`px-3 py-1 bg-gradient-to-r ${theme.tagBg} ${theme.tagText} text-xs font-medium rounded-full border ${theme.tagBorder}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom action bar */}
                    <div
                      className={`p-4 ${theme.cardBg} border-t ${theme.cardBorder}`}
                    >
                      <button
                        onClick={() => openProjectModal(project)}
                        className="w-full flex items-center justify-between"
                      >
                        <span className={`text-sm font-medium ${theme.accent}`}>
                          View Details
                        </span>
                        <ChevronRight
                          className={`h-4 w-4 ${theme.accent} group-hover:translate-x-1 transition-transform`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <motion.a
              href="/"
              className={`inline-flex px-8 py-4 ${theme.buttonBg} ${theme.buttonHoverBg} transition-all duration-300 border ${theme.buttonBorder} ${theme.buttonHoverBorder} rounded-xl ${theme.buttonText} font-medium group shadow-lg hover:shadow-xl`}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Home
                <Home className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </div>
        </div>

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      </section>
    </>
  );
}
