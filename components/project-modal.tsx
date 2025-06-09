// components/ProjectModal.tsx

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Tag, Calendar } from "lucide-react";
import ImageCarousel from "@/components/image-carousel";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <div className="grid md:grid-cols-2">
          {/* Kolom Kiri: Carousel Gambar */}
          <div className="md:border-r border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-black">
            <ImageCarousel images={project.images} alt={project.title} />
          </div>

          {/* Kolom Kanan: Detail Proyek */}
          <div className="p-6 flex flex-col">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-sky-900/50 dark:text-sky-300">
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>{project.year}</span>
                </div>
              </div>
              <DialogTitle className="text-3xl font-bold text-slate-900 dark:text-white pt-2">
                {project.title}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-grow my-4 space-y-4 overflow-y-auto pr-2">
              {/* Deskripsi panjang */}
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.longDescription}
              </p>

              {/* Tags/Teknologi */}
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full border border-slate-200 dark:border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Github className="h-4 w-4 mr-2" />
                    Source Code
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
