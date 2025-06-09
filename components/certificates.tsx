"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Building, Search } from "lucide-react";
import { certificates, type Certificate } from "@/data/certificates";
import CertificateModal from "@/components/certificate-modal";

// Ekstrak semua kategori unik dari data
const allCategories = [
  "All",
  ...Array.from(new Set(certificates.flatMap((c) => c.tags))),
];

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const openCertificateModal = (certificate: Certificate) =>
    setSelectedCertificate(certificate);
  const closeCertificateModal = () => setSelectedCertificate(null);

  // Logika filter yang diperbarui
  const filteredCertificates = useMemo(() => {
    return certificates
      .filter((cert) => {
        const matchesCategory =
          activeCategory === "All" || cert.tags.includes(activeCategory);
        const matchesSearch =
          cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.issueDate.getTime() - a.issueDate.getTime()); // Urutkan dari terbaru
  }, [searchQuery, activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <section
      id="certificates"
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
              ACHIEVEMENTS
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Credentials & Certificates
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl">
            My professional certifications, a testament to my dedication and
            continuous pursuit of knowledge.
          </p>
        </motion.div>

        {/* Control Panel: Search dan Filter */}
        <div className="w-full max-w-3xl mx-auto mb-16 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <label htmlFor="search-certificates" className="sr-only">
              Search Certificates
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              id="search-certificates"
              type="text"
              placeholder="Search certificates by title or issuer..."
              className="
        w-full rounded-full border border-slate-200 bg-white/80 py-4 pl-14 pr-6
        text-base text-slate-900 placeholder:text-slate-400
        shadow-sm outline-none backdrop-blur-sm
        transition-all
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50
        dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:placeholder:text-slate-500
        dark:focus:border-sky-500 dark:focus:ring-sky-500/50
      "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
          rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200
          ${
            activeCategory === category
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105"
              : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }
        `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeCategory} // Ganti key untuk memicu animasi saat filter berubah
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredCertificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="group cursor-pointer"
                onClick={() => openCertificateModal(certificate)}
              >
                {/* Kartu sertifikat sama seperti sebelumnya */}
                <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={certificate.thumbnail}
                      alt={certificate.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {certificate.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-sky-900/50 dark:text-sky-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-md font-bold text-slate-800 dark:text-white mb-2 flex-1 transition-colors group-hover:text-blue-600 dark:group-hover:text-sky-400">
                      {certificate.title}
                    </h3>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Image
                        src={certificate.issuerLogo}
                        alt={certificate.issuer}
                        width={16}
                        height={16}
                      />
                      <span>{certificate.issuer}</span>
                      <span className="mx-1">·</span>
                      <span>
                        {certificate.issueDate.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-16 col-span-full">
            <p className="text-slate-500 dark:text-slate-400">
              No certificates found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          isOpen={!!selectedCertificate}
          onClose={closeCertificateModal}
        />
      )}
    </section>
  );
}
