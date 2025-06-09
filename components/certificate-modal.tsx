"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Building,
  Award,
  ExternalLink,
  Share2,
  Check,
} from "lucide-react";
import type { Certificate } from "@/data/certificates";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  isOpen,
  onClose,
}: CertificateModalProps) {
  const [copied, setCopied] = useState(false);

  if (!certificate) return null;

  const handleShare = () => {
    if (certificate.credentialUrl) {
      navigator.clipboard.writeText(certificate.credentialUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <div className="grid md:grid-cols-2">
          {/* Kolom Kiri: Gambar Sertifikat */}
          <div className="p-6 flex items-center justify-center bg-slate-50 dark:bg-black">
            <div className="relative aspect-[4/3] w-full rounded-lg shadow-lg overflow-hidden">
              <Image
                src={certificate.fullImage}
                alt={certificate.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Kolom Kanan: Detail Sertifikat */}
          <div className="p-6 flex flex-col">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={certificate.issuerLogo}
                  alt={certificate.issuer}
                  width={32}
                  height={32}
                />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {certificate.issuer}
                </span>
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {certificate.title}
              </DialogTitle>
            </DialogHeader>

            <div className="my-4 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <Calendar className="h-5 w-5 text-slate-400" />
                <span>
                  Issued on{" "}
                  {certificate.issueDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                {certificate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-sky-900/50 dark:text-sky-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
              {certificate.credentialUrl && (
                <>
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Verify Credential
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="text-black font-semibold dark:text-white"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <Share2 className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied!" : "Share"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
