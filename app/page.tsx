import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ShapeDivider from "@/components/shape-divider";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Navbar />
      <Hero />
      <div className="bg-white dark:bg-black">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
      <About />
      <div className="bg-white dark:bg-black">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
      <Experience />
      <div className="bg-white dark:bg-black">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
      <Projects />
      <div className="bg-white dark:bg-black">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
      <Certificates />
      <div className="bg-white dark:bg-black">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}
