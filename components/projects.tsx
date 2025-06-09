// components/Projects.tsx

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectModal from "@/components/project-modal";
import { Button } from "./ui/button";

const allCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];
const INITIAL_VISIBLE_PROJECTS = 3;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_PROJECTS);

  const openProjectModal = (project: Project) => setSelectedProject(project);
  const closeProjectModal = () => setSelectedProject(null);

  const featuredProject = projects.find((p) => p.featured);
  const nonFeaturedProjects = useMemo(() => {
    return projects
      .filter(
        (p) =>
          !p.featured &&
          (activeCategory === "All" || p.category === activeCategory)
      )
      .sort((a, b) => b.year - a.year);
  }, [activeCategory]);

  const showMoreProjects = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-black transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-dot-slate-300/[0.4] dark:bg-dot-white/[0.1] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col items-center mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-sky-500/10 border border-blue-200 dark:border-sky-500/20 mb-4">
            <p className="text-sm font-semibold text-blue-600 dark:text-sky-400">
              MY WORK
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Featured Projects
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl">
            A selection of projects that showcase my passion for creating
            intuitive and powerful applications.
          </p>
        </motion.div>

        {/* Featured Project Section */}
        {featuredProject && (
          <motion.div
            className="mb-16 group cursor-pointer"
            onClick={() => openProjectModal(featuredProject)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl dark:shadow-sky-500/5 hover:shadow-blue-500/10 transition-all duration-300">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                <Image
                  src={featuredProject.thumbnail}
                  alt={featuredProject.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-sky-900/50 dark:text-sky-300">
                  {featuredProject.category} - {featuredProject.year}
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Regular Projects Grid */}
        <motion.div
          key={activeCategory} // Animate when category changes
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {nonFeaturedProjects.slice(0, visibleCount).map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
              {/* Desain kartu reguler sama seperti sebelumnya */}
              <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg dark:hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 transition-colors group-hover:text-blue-600 dark:group-hover:text-sky-400">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex-1 mb-4">
                    {project.description.substring(0, 100)}...
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-full bg-slate-300 text-slate-800 dark:text-slate-300 dark:bg-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More Button */}
        {visibleCount < nonFeaturedProjects.length && (
          <div className="mt-16 text-center">
            <Button size="lg" variant="outline" onClick={showMoreProjects}>
              Show More Projects
            </Button>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={closeProjectModal}
        />
      )}
    </section>
  );
}
