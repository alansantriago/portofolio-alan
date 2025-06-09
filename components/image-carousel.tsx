"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes"; // <-- Import hook yang benar

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Varian animasi untuk efek slide
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToIndex = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1); // Autoplay selalu bergerak maju
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, images.length]);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
      {/* Gambar utama dengan animasi slide */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${alt} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0} // Prioritaskan loading gambar pertama
          />
          {/* Lapisan gradien untuk memperjelas teks/kontrol di atasnya */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
        </motion.div>
      </AnimatePresence>

      {/* Tombol Navigasi (Hanya muncul jika ada lebih dari 1 gambar) */}
      {images.length > 1 && (
        <>
          {/* Tombol Previous */}
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-white/20 dark:border-white/10 text-slate-800 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Tombol Next */}
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-white/20 dark:border-white/10 text-slate-800 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indikator Titik */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`transition-all duration-300 rounded-full
                  ${
                    index === currentIndex
                      ? "w-6 h-2 bg-white"
                      : "w-2 h-2 bg-white/50 hover:bg-white"
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
