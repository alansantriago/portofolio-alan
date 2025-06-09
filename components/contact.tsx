"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  AlertTriangle,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactBackground from "./contact-background";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { theme } = useTheme();
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    const formPayload = new FormData(e.target as HTMLFormElement);
    formPayload.append("access_key", "952be998-f50f-4d2f-9131-e6ce41f78bca");

    // Ubah objek formData menjadi JSON untuk dikirim
    const jsonObject = Object.fromEntries(formPayload.entries());

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(jsonObject),
      });

      const result = await response.json();

      if (result.success) {
        setFormState("success");
      } else {
        console.error("Error from Web3Forms:", result);
        setFormState("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormState("error");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setFormState("idle");
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 bg-slate-50 dark:bg-black transition-colors duration-500 overflow-hidden"
    >
      <ContactBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-sky-500/10 border border-blue-200 dark:border-sky-500/20 mb-4">
            <p className="text-sm font-semibold text-blue-600 dark:text-sky-400">
              CONTACT
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Get In Touch
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl">
            Have a project in mind or just want to say hello? My inbox is always
            open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* === LEFT COLUMN: Info Panel === */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div
              variants={itemVariants}
              className="p-6 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Contact Information
              </h3>
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "alansyahlansantriago99@gmail.com",
                  href: "mailto:alansyahlansantriago99@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+62 812-7395-2018",
                  href: "tel:+6281273952018",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Bengkulu, Indonesia",
                },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 p-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                    <info.icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-base font-semibold text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-base font-semibold text-slate-800 dark:text-white">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-900/80 dark:to-slate-800/80 rounded-xl border border-blue-200 dark:border-slate-800"
            >
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                Available for Opportunities
              </h4>
              <p className="text-slate-600 dark:text-slate-300">
                I'm actively seeking new roles and freelance projects. Let's
                connect and build something amazing together.
              </p>
            </motion.div>
          </motion.div>

          {/* === RIGHT COLUMN: Contact Form === */}
          <motion.div
            className="lg:col-span-3 p-8 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <AnimatePresence>
                {formState !== "idle" && formState !== "submitting" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-xl z-10"
                  >
                    {formState === "success" ? (
                      <>
                        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
                          Thank you. I'll get back to you soon.
                        </p>
                        <Button onClick={resetForm}>
                          Send Another Message
                        </Button>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                          An Error Occurred
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
                          Please try sending your message again.
                        </p>
                        <Button
                          variant="destructive"
                          onClick={() => setFormState("idle")}
                        >
                          Try Again
                        </Button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formState === "submitting"}
                    className="bg-white dark:bg-slate-900"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formState === "submitting"}
                    className="bg-white dark:bg-slate-900"
                  />
                </div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={formState === "submitting"}
                  className="bg-white dark:bg-slate-900"
                />
                <Textarea
                  name="message"
                  placeholder="Your message..."
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={formState === "submitting"}
                  className="bg-white dark:bg-slate-900"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={formState === "submitting"}
                >
                  {formState === "submitting" ? (
                    <>
                      {" "}
                      <Loader className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <Send className="mr-2 h-4 w-4" /> Send Message{" "}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
