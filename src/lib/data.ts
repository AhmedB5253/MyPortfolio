import {
  ArrowUpRight,
  BriefcaseBusiness,
  Brush,
  ChartNoAxesCombined,
  Code2,
  Database,
  FileCode2,
  Globe2,
  Layers3,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Palette,
  PenTool,
  Rocket,
  Sparkles,
  Smartphone,
} from "lucide-react";

export const owner = {
  name: "Ahmed Bhawrasa",
  title: "Frontend Developer, Graphic & Web Designer",
  intro:
    "Crafting cinematic, responsive user interfaces, robust digital experiences, and high-impact branding. Specializing in clean frontend engineering (React, Next.js), intuitive UI/UX design, responsive web design, and bespoke graphic aesthetics.",
  email: "Ahmedmoiz8454@gmail.com",
  location: "Indore, India",
  resume: "/Ahmed-Bhawrasawala-Resume.pdf",
};

export const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/AhmedB5253/", icon: Code2 },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-bhawrasa-wala-6bab59323/", icon: BriefcaseBusiness },
  { label: "Twitter", href: "https://twitter.com", icon: MessageCircle },
  { label: "Email", href: `mailto:${owner.email}`, icon: Mail },
];

export const stats = [
  { value: "Indore", label: "Schooling: ABN Sr. Sec. School" },
  { value: "UI/UX", label: "Trained: Arena Animation" },
  { value: "BCA", label: "SVIMS Indore Student" },
];

export interface ProjectCaseStudy {
  problem: string;
  planning: string;
  solution: string;
  challenges: string;
  learnings: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  theme: string;
  metrics: string[];
  caseStudy: ProjectCaseStudy;
  github: string;
}

export const projects: ProjectItem[] = [
  {
    id: "grocery-management",
    title: "Grocery Management CLI",
    subtitle: "Python CLI with MySQL Database Integration",
    description:
      "A command-line-based grocery management application designed to manage products, inventory, billing, and customer records efficiently.",
    tech: ["Python", "MySQL", "Inventory Management", "Billing System"],
    theme: "from-emerald-300/28 via-teal-500/18 to-white/10",
    metrics: ["Product Tracking", "Customer Records", "MySQL Integration"],
    github: "https://github.com/AhmedB5253/",
    caseStudy: {
      problem: "Local merchants suffer from product counting errors, manual ledger bookkeeping mistakes, and stock discrepancies. There was a direct need for an offline-first inventory management ledger that securely links item categories with sales bills.",
      planning: "Constructed relational database models with foreign-key relationships representing Products, Transactions, Employees, and stock counts. Engineered constraints to block duplicate entry logs.",
      solution: "Coded standard Python connectors managing high-frequency transactions. Developed inventory trackers, billing aggregations, customer purchase logs, and invoice text generators.",
      challenges: "Guaranteeing safe data transactions and configuring thread-safe MySQL connections over standard local sockets.",
      learnings: "Gained structural understanding of primary keys, database normalizations, SQL query speed, and data integrity practices."
    }
  },
  {
    id: "educational-design",
    title: "Educational Website Design",
    subtitle: "Educational Platform UX Case Study",
    description:
      "A complete educational platform redesign focused on improving accessibility, navigation, and overall learning experience.",
    tech: ["Figma", "UI/UX Design", "Wireframes", "Design System"],
    theme: "from-blue-300/30 via-cyan-500/18 to-white/10",
    metrics: ["Research Process", "User Personas", "Accessibility Improvements"],
    github: "https://github.com/AhmedB5253/",
    caseStudy: {
      problem: "Many existing educational websites present high student cognitive load, chaotic content maps, and a total lack of WCAG color contrast standards, leading to poor learning journeys.",
      planning: "Conducted user research with 15 active learners. Mapped student and teacher user flows, designed clean spatial grids, and set up a unified visual design system.",
      solution: "Crafted high-fidelity clickable mockups in Figma using clamped typography scales, generous consistent padding, and accessible interactive buttons.",
      challenges: "Balancing high information density (courses lists, exams schedules, alerts feeds) with clean negative space.",
      learnings: "Refined standard UI spacing rules and realized the impact of structured heading hierarchies on user navigation speed."
    }
  },
  {
    id: "expense-tracker",
    title: "Personal Expense Tracker",
    subtitle: "React Income & Spending Analytics",
    description:
      "A modern expense tracking application helping users monitor income, expenses, and spending habits through a clean and intuitive interface.",
    tech: ["React JS", "Local Storage", "Interactive Charts", "State Management"],
    theme: "from-indigo-300/28 via-blue-500/18 to-white/10",
    metrics: ["Income & Expenses", "Category Analytics", "Monthly Tracking"],
    github: "https://github.com/AhmedB5253/",
    caseStudy: {
      problem: "Individuals struggle to stick to financial budgets because of complex expense logging systems. They need a zero-friction dashboard that visualizes habits instantly and retains records offline.",
      planning: "Visualized a linear grid dashboard. Kept expense creation fields to a single action form, set up categories tags, and structured Local Storage schemas for speed.",
      solution: "Programmed a responsive React app utilizing local state management, custom categories tags, offline browser persistence, and SVG progress charts.",
      challenges: "Structuring dynamic categories filters while preventing redundant re-renders of the chart components.",
      learnings: "Learned React components memoizations, local state lifting, and local storage serialization."
    }
  },
  {
    id: "insight-board",
    title: "InsightBoard Dashboard",
    subtitle: "High-Performance Analytics Platform",
    description:
      "A modern analytics dashboard built to visualize important metrics and data in a clean, user-friendly interface.",
    tech: ["React JS", "Data Visualization", "KPI Grids", "HTML/CSS"],
    theme: "from-cyan-300/30 via-sky-500/18 to-white/10",
    metrics: ["Interactive Charts", "KPI Cards", "Layout System"],
    github: "https://github.com/AhmedB5253/",
    caseStudy: {
      problem: "Organizations lose insights because analytical data is locked in raw text charts. A modern bento-style responsive layout was needed to visualize metrics fluidly.",
      planning: "Mapped core data channels into four quadrants: quick KPIs, main visual trend, category shares, and active event log. Prioritized layout responsiveness down to 375px.",
      solution: "Built standard responsive layout systems with CSS grids and flex containers, integrating customizable interactive visual graphs.",
      challenges: "Optimizing the browser performance when rendering multiple charts concurrently on smaller viewports.",
      learnings: "Discovered best practices for grid alignments, perceived latency tricks (such as skeleton structures), and responsive chart containers."
    }
  },
  {
    id: "dev-portfolio",
    title: "DevPortfolio Redesign",
    subtitle: "Luxury Brand Cinematic Showcase",
    description:
      "A premium portfolio website built to showcase frontend development, UI/UX design skills, projects, and professional journey.",
    tech: ["React/Next.js", "Framer Motion", "Three.js", "Custom Cursor"],
    theme: "from-purple-300/30 via-pink-500/18 to-white/10",
    metrics: ["Advanced Animations", "Custom Cursor System", "Case Study Pages"],
    github: "https://github.com/AhmedB5253/MyPortfolio",
    caseStudy: {
      problem: "Traditional grid resumes look generic and fail to show a developer's visual care and craftsmanship. A recruiter deserves an immersive sensory narrative of skills.",
      planning: "Aimed for high-end cinematic aesthetics: micro-animations, spring-based interactions, loading screen name reveals, and a dedicated storytelling route.",
      solution: "Implemented full client-side spring trackers for custom cursors, letter loading animations, 3D card tilts, and a continuous exploration dynamic project routing system.",
      challenges: "Stopping canvas tracking overlay layers from blocking click events on layout controls beneath.",
      learnings: "Mastered global pointer-events strategies, React closures for animation loops, and Next.js 16 metadata configurations."
    }
  }
];

export const skillGroups = [
  {
    title: "Core Frontend & Code",
    icon: Code2,
    accent: "cyan",
    skills: [
      {
        name: "HTML5 & CSS3",
        signal: "Visual Layouts",
        detail: "Responsive designs, custom grids, CSS variables, typography systems, and modern custom animations.",
      },
      {
        name: "React JS & Next.js",
        signal: "Modular Interfaces",
        detail: "State-driven components, performance hook optimization, routing structures, and clean code patterns.",
      },
      {
        name: "Vanilla JavaScript",
        signal: "Interactive Logic",
        detail: "Asynchronous workflows, ES6+ features, canvas interactions, event bindings, and DOM structures.",
      }
    ],
  },
  {
    title: "UI/UX & Creative Systems",
    icon: Brush,
    accent: "violet",
    skills: [
      {
        name: "Figma UI/UX Design",
        signal: "High-Fi Prototypes",
        detail: "Wireframing, screen structures, design assets creation, cohesive palettes, and interactive user flows.",
      },
      {
        name: "Brand & Spacing Systems",
        signal: "Cinematic Layouts",
        detail: "Structuring visual contrast, consistent typography hierarchy, glassmorphism, and responsive screens.",
      }
    ],
  },
  {
    title: "Graphic Design & Visuals",
    icon: Palette,
    accent: "blue",
    skills: [
      {
        name: "Brand Identity & Logo Design",
        signal: "Aesthetic Core",
        detail: "Crafting distinct visual identities, logos, color theory rules, brand guidelines, and high-impact vector graphics.",
      },
      {
        name: "Digital Assets & Marketing",
        signal: "Visual Assets",
        detail: "Designing bespoke icons, social media graphics, print media layouts, and illustrations using Photoshop & Illustrator.",
      }
    ],
  },
  {
    title: "Web Design & Prototyping",
    icon: Layers3,
    accent: "indigo",
    skills: [
      {
        name: "Responsive Layout Design",
        signal: "Screen Systems",
        detail: "Configuring fluid wireframes, web grid alignments, typography hierarchies, and mobile-first responsive screens.",
      },
      {
        name: "Interactive Mockups",
        signal: "User Journeys",
        detail: "Building clean screen transitions, interactive Figma prototypes, component hover states, and design-to-development handoffs.",
      }
    ],
  },
  {
    title: "Back-End & Programming",
    icon: Database,
    accent: "indigo",
    skills: [
      {
        name: "Python Programming",
        signal: "Script Logic",
        detail: "Writing command-line scripts, handling structured data, automation tasks, and building modular logical workflows.",
      },
      {
        name: "MySQL & Relational DB",
        signal: "Structured Queries",
        detail: "Designing relational database schemas, setting up tables, configuring keys, and writing basic SQL queries.",
      }
    ],
  },
  {
    title: "AI & Machine Learning Vision",
    icon: Rocket,
    accent: "cyan",
    status: "Learning",
    skills: [
      {
        name: "AI/ML Fundamentals",
        signal: "Active Learning",
        detail: "Currently learning Python data stacks, predictive modeling principles, and neural network foundations.",
      }
    ],
  }
];

export const designShowcase = [
  {
    title: "Discovery & UX Mapping",
    icon: Sparkles,
    detail: "Researching target personas, user tasks, constraints, and shaping the core visual & interactive direction.",
  },
  {
    title: "Wireframing & Layout Structure",
    icon: PenTool,
    detail: "Configuring functional blueprints, grid structures, content hierarchy, and page rhythms in Figma.",
  },
  {
    title: "Design System & UI Components",
    icon: Palette,
    detail: "Establishing elegant typography scales, harmonious color schemes, clean buttons, and glass panels.",
  },
  {
    title: "High-Fidelity Interactive Prototype",
    icon: Layers3,
    detail: "Prototyping responsive navigation, active card states, dynamic transitions, and tactile user feedback.",
  },
];

export const services = [
  { title: "Frontend Development", icon: Code2, detail: "Modern React & Next.js interfaces built with modular components and high performance." },
  { title: "High-Fidelity UI/UX Design", icon: Brush, detail: "Elegant, polished vector layouts, wireframes, and design specs designed in Figma." },
  { title: "Responsive Interface Engineering", icon: Smartphone, detail: "Fluid layouts that feel custom-crafted for ultra-wide monitors down to 375px viewports." },
  { title: "Cinematic Web Experiences", icon: Rocket, detail: "Polished glassmorphism, micro-animations, custom cursor follow-throughs, and scroll-triggers." },
  { title: "Data-Backed Business Logic", icon: Database, detail: "Fast CLI systems and MySQL database architectures tailored to process relational business flows." },
  { title: "AI/ML Focused Prototyping", icon: Globe2, detail: "Designing and preparing intuitive frontends and query mechanisms for future AI models." }
];

export const testimonials = [
  {
    quote: "Project-based learning across websites, React interfaces, Python console programs, SQL tables, and simple analysis workflows.",
    name: "Learning Mode",
    role: "Fresher Profile"
  },
  {
    quote: "Focused on building clean layouts, readable structure, responsive behavior, and practical project explanations.",
    name: "Portfolio Focus",
    role: "Recruiter-Ready Presentation"
  },
  {
    quote: "Open to internships, trainee roles, junior frontend work, and opportunities where consistent learning matters.",
    name: "Career Goal",
    role: "First Opportunity"
  }
];
