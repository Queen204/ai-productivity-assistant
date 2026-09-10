import portrait from "@/assets/portrait.png.asset.json";
import googleAiCert from "@/assets/google-ai-essentials.pdf.asset.json";
import projectManagementCert from "@/assets/project-management-certificate.pdf.asset.json";

export const PROFILE = {
  name: "Nomvuselelo Queen Thwala",
  shortName: "Nomvuselelo",
  headline: "Diploma in Operations Management student — CPUT",
  intro:
    "Motivated and goal-driven, with a passion for solving problems, improving processes and making systems work better for people.",
  phone: "071 532 3649",
  phoneHref: "tel:+27715323649",
  email: "queennomvuselelo670@gmail.com",
  location: "Belhar, Cape Town, South Africa",
  photo: portrait.url,
};

export const ABOUT_PARAGRAPHS = [
  "I am a motivated and goal-driven Diploma in Operations Management student at the Cape Peninsula University of Technology (CPUT).",
  "I am organised, adaptable, analytical, and committed to continuous learning and personal growth.",
  "I enjoy solving problems, improving processes, working with people, and finding ways to make systems more effective and efficient.",
];

export const TRAITS = [
  "Organised",
  "Adaptable",
  "Analytical",
  "Problem solver",
  "Team player",
  "Always learning",
];

export const EDUCATION = [
  {
    qualification: "Diploma in Operations Management",
    status: "In progress",
    institution: "Cape Peninsula University of Technology (CPUT)",
    period: "2024 – Present",
    modules: [
      "Operations Management",
      "Organisational Effectiveness",
      "Operations Management Techniques",
      "Communication Skills",
      "Business Computer Applications",
      "Labour Law",
      "Quality and Maintenance Management",
      "Costing and Financial Management",
    ],
  },
  {
    qualification: "National Senior Certificate (Grade 12)",
    status: "Completed",
    institution: "Vukuzenzele Combined School",
    period: "2022",
    modules: [],
  },
];

export const CERTIFICATES = [
  {
    title: "Google AI Essentials Specialisation",
    institution: "Google / Coursera",
    date: "September 2026",
    areas: [
      "Introduction to AI",
      "Maximizing Productivity With AI Tools",
      "Discover the Art of Prompting",
      "Use AI Responsibly",
      "Stay Ahead of the AI Curve",
    ],
    fileUrl: googleAiCert.url,
  },
  {
    title: "Introduction to Project Management",
    institution: "National School of Government, Republic of South Africa",
    date: "August 2026",
    areas: [],
    fileUrl: projectManagementCert.url,
  },
];

export const SKILLS = [
  { name: "Analytical thinking and problem-solving", icon: "◈" },
  { name: "Organisation and time management", icon: "◷" },
  { name: "Microsoft Excel and Microsoft Office", icon: "▤" },
  { name: "Effective written and verbal communication", icon: "✎" },
  { name: "Teamwork and collaboration", icon: "◎" },
  { name: "AI tools and responsible AI use", icon: "✦" },
];

export const ACHIEVEMENTS = [
  {
    title: "Top achiever in Languages",
    detail: "English and isiZulu, Grades 10–12",
  },
  {
    title: "Class Representative",
    detail: "Elected by classmates, Grades 9–12",
  },
];

export const PROFILE_NAV = [
  { to: "/profile", label: "Home" },
  { to: "/profile/about", label: "About Me" },
  { to: "/profile/education", label: "Education" },
  { to: "/profile/certificates", label: "Certificates" },
  { to: "/profile/skills", label: "Skills" },
  { to: "/profile/contact", label: "Contact" },
] as const;
