import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Calendar, X } from "lucide-react";
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
  // PERUBAHAN: Tambahkan state untuk mengelola gambar fullscreen
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  if (!project) return null;

  // Handler untuk menutup modal dan juga fullscreen view jika terbuka
  const handleClose = () => {
    setFullscreenImage(null); // Pastikan fullscreen tertutup saat modal ditutup
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl w-full p-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="grid md:grid-cols-2 max-h-[90vh] md:max-h-[600px]">
            {/* Kolom Kiri: Carousel Gambar */}
            <div className="md:border-r border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-black min-h-[300px] md:min-h-0">
              {/* PERUBAHAN: Teruskan fungsi ke onImageClick */}
              <ImageCarousel
                images={project.images}
                alt={project.title}
                onImageClick={(imageUrl) => setFullscreenImage(imageUrl)}
              />
            </div>

            {/* Kolom Kanan: Detail Proyek (TIDAK ADA PERUBAHAN DI SINI) */}
            <div className="p-6 flex flex-col overflow-y-auto">
              <DialogHeader>
                <div className="flex justify-between items-start pr-8">
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
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed my-4">
                {project.longDescription}
              </p>
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
                    <Button
                      variant="outline"
                      className="w-full text-black sm:w-auto"
                    >
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

      {/* PERUBAHAN: Tambahkan komponen untuk Fullscreen Image Viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setFullscreenImage(null)} // Tutup saat background diklik
        >
          <button
            className="cursor-pointer absolute top-5 right-5 text-white hover:text-gray-300 transition-colors"
            aria-label="Close fullscreen"
          >
            <X size={30} />
          </button>

          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat gambar itu sendiri diklik
          />
        </div>
      )}
    </>
  );
}
