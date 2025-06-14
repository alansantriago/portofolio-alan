export interface WorkExperience {
  id: string
  company: string
  position: string
  duration: string
  location: string
  description: string[]
  logo: string
  skills: string[]
}

export const experiences: WorkExperience[] = [
  {
    id: "diskominfo",
    company: "Dinas Komunikasi dan Informatika",
    position: "Frontend Developer",
    duration: "Jan 2025 - Present",
    location: "Bengkulu, Indonesia",
    description: [
      "Developed responsive and visually appealing user interfaces using React and Next.js",
      "Integrated REST APIs to ensure dynamic data rendering and seamless interaction",
      "Collaborated with UI/UX designers to enhance user experience across platforms",
      "Optimized performance and conducted thorough testing to ensure application stability",
    ],
    logo: "/logo-kominfo.png",
    skills: ["React", "Next.js", "Laravel", "Tailwind CSS", "MySQL"],
  },
  {
    id: "alfaefsatech",
    company: "AlfaefsaTech",
    position: "Programmer",
    duration: "May 2025 - Present",
    location: "Indonesia (Remote)",
    description: [
      "Designed and developed custom websites for clients using Laravel and Tailwind CSS",
      "Provided end-to-end web solutions from UI/UX design to deployment",
      "Maintained scalable and well-documented codebases for ongoing client projects",
    ],
    logo: "/logo-alfaefsatech.png",
    skills: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Web Design"],
  },
  {
    id: "bpptik-kominfo",
    company: "BPPTIK Kominfo",
    position: "Junior Web Developer",
    duration: "Sep 2024",
    location: "Cikarang, Indonesia",
    description: [
      "Implemented interactive user interfaces using HTML, CSS, JavaScript, and PHP",
      "Organized source files for maintainability and followed structured programming principles",
      "Utilized pre-built libraries and frameworks such as Bootstrap to enhance development speed",
    ],
    logo: "/logo-kominfo.png",
    skills: ["HTML5", "CSS3", "JavaScript", "PHP", "Bootstrap", "MySQL"],
  },
  {
    id: "btn",
    company: "PT. Bank Tabungan Negara (BTN)",
    position: "Business Support Intern",
    duration: "Apr 2024 - Jun 2024",
    location: "Bengkulu, Indonesia",
    description: [
      "Assisted customers with QRIS and EDC setup for their businesses",
      "Managed payroll and deposit client data, created memos and reports",
      "Conducted canvassing activities to attract new business clients",
    ],
    logo: "/logo-BTN.png",
    skills: ["Customer Service", "Data Management", "Banking Services"],
  },
  {
    id: "unib-animation",
    company: "Universitas Bengkulu",
    position: "Computer Lab Assistant - 2D/3D Animation",
    duration: "Jan 2023 - Jun 2023",
    location: "Bengkulu, Indonesia",
    description: [
      "Assisted in teaching 2D/3D animation using Adobe Animate, Blender, and After Effects",
      "Guided students in creative and technical animation techniques",
      "Improved communication skills through academic support and mentoring",
    ],
    logo: "/logo-unib.png",
    skills: ["Adobe Animate", "Blender", "After Effects", "Adobe Illustrator"],
  },
  {
    id: "smait-iqra",
    company: "SMAIT IQRA Kota Bengkulu",
    position: "Web Developer Intern",
    duration: "Feb 2022 - Jun 2022",
    location: "Bengkulu, Indonesia",
    description: [
      "Developed a mail service and archiving web system using CodeIgniter",
      "Handled full project lifecycle from analysis to user training and maintenance",
    ],
    logo: "/logo-SMAIT-Iqra.png",
    skills: ["PHP", "CodeIgniter", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "unib-engineering",
    company: "Universitas Bengkulu",
    position: "Web Developer Intern",
    duration: "Sep 2021 - Dec 2021",
    location: "Bengkulu, Indonesia",
    description: [
      "Developed a Daily Performance Journal system for the Faculty of Engineering",
      "Handled design, development, implementation, and user support",
    ],
    logo: "/logo-unib.png",
    skills: ["PHP", "CodeIgniter", "HTML5", "CSS3"],
  },
  {
    id: "utdi",
    company: "Universitas Teknologi Digital Indonesia (UTDI)",
    position: "IT Intern",
    duration: "May 2017 - Aug 2017",
    location: "Yogyakarta, Indonesia",
    description: [
      "Worked on Arduino-based hardware projects and explored Adobe tools for multimedia",
      "Produced advertising media and gained exposure to robotics and video production",
    ],
    logo: "/logo-akakom.png",
    skills: ["Arduino", "Adobe Premiere Pro", "Adobe Illustrator", "Photoshop", "After Effects"],
  },
]
