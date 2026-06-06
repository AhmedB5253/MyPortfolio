"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Terminal,
  Sparkles,
  Layout,
  Layers
} from "lucide-react";
import { projects, ProjectItem } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import Link from "next/link";

interface MockupProps {
  index: number;
  theme: string;
  title: string;
}

// 5 Dedicated Visual Mockups for each project type
function ProjectMockup({ index, theme, title }: MockupProps) {
  // Case 00 (Hacker Terminal style for Console Grocery Management)
  if (index === 0) {
    return (
      <div className={`relative w-full h-40 sm:h-48 md:h-64 lg:h-full min-h-[160px] sm:min-h-[200px] lg:min-h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br ${theme} p-5 flex flex-col justify-between`}>
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Terminal Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/10 pb-3">
          <div className="flex items-center gap-1.5">
            <Terminal size={14} className="text-emerald-400" />
            <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-400/80">grocery_system.py</span>
          </div>
          <span className="rounded bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
            ACTIVE CONNECTION
          </span>
        </div>

        {/* Terminal Shell Panel */}
        <div className="relative z-10 flex-1 mt-3 rounded-xl border border-emerald-500/15 bg-black/75 p-3.5 font-mono text-[9px] text-emerald-400/90 leading-4 overflow-hidden flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-emerald-500/40 font-bold">&gt;&gt;&gt; import mysql.connector</p>
            <p className="text-emerald-300">&gt;&gt;&gt; db.execute("SELECT * FROM inventory;")</p>
            <div className="mt-2 border border-emerald-500/10 rounded bg-emerald-950/10 p-1.5 text-emerald-400/70 scale-95 origin-left">
              <p className="border-b border-emerald-500/10 pb-1 font-bold">ID | PRODUCT | STOCK | PRICE</p>
              <p className="pt-1">01 | Organic Apples | 142 items | $2.49</p>
              <p>02 | Whole Milk | 85 items  | $3.19</p>
            </div>
          </div>
          <p className="text-[8px] text-emerald-500/50 mt-1 self-end tracking-wider font-bold">STABLE HANDSHAKE • PORT 3306</p>
        </div>
      </div>
    );
  }

  // Web Browsers for Web Sites (Cases 1, 2, 3, 4)
  const icons = [Terminal, Sparkles, Code2, Layout, Layers];
  const DisplayIcon = icons[index] || Layout;

  // Customize dynamic labels inside Bento Modules based on Project index
  const getBentoLabels = () => {
    switch (index) {
      case 1: // Educational Website Design
        return {
          leftLabel: "Design System",
          leftSub: "Typography & Color Grids",
          badge: "Figma Wireframes",
          rightTitle: "Accessibility",
          rightSub: "WCAG 2.1 Compliance"
        };
      case 2: // Personal Expense Tracker
        return {
          leftLabel: "Balance Track",
          leftSub: "Income & Expense Logging",
          badge: "Offline Storage",
          rightTitle: "Analytics",
          rightSub: "Dynamic SVG charts rendered"
        };
      case 3: // InsightBoard
        return {
          leftLabel: "KPI Analytics Grid",
          leftSub: "Interactive metrics dashboards",
          badge: "Bento Layout System",
          rightTitle: "Visual Charts",
          rightSub: "Responsive Flex Grids active"
        };
      case 4: // DevPortfolio
      default:
        return {
          leftLabel: "Visual Motion System",
          leftSub: "Framer Motion springs loaded",
          badge: "Cinematic Showcase Engine",
          rightTitle: "Spring physics",
          rightSub: "Custom dynamic client cursors"
        };
    }
  };

  const labels = getBentoLabels();

  return (
    <div className={`relative w-full h-40 sm:h-48 md:h-64 lg:h-full min-h-[160px] sm:min-h-[200px] lg:min-h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br ${theme} p-5 flex flex-col justify-between`}>
      <div className="absolute inset-0 bg-black/18" />

      {/* Browser Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="size-2 rounded-full bg-red-400/75" />
            <span className="size-2 rounded-full bg-amber-400/80" />
            <span className="size-2 rounded-full bg-emerald-400/80" />
          </div>
          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-0.5 text-[9px] font-bold text-white/50 tracking-wider">
            localhost:3000
          </span>
        </div>
        <div className="grid size-6 place-items-center rounded-lg border border-white/10 bg-white/5">
          <DisplayIcon size={12} className="text-white/80" />
        </div>
      </div>

      {/* Floating Bento Dashboard Modules */}
      <div className="relative z-10 flex-1 mt-3 grid grid-cols-[1.1fr_0.9fr] gap-3">
        {/* Left Bento Module */}
        <div className="rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur-md flex flex-col justify-between transform transition duration-500 group-hover:-translate-x-1 group-hover:bg-black/45">
          <div>
            <div className="h-3.5 w-24 rounded bg-white/70 flex items-center px-2"><span className="text-[7px] text-slate-900 font-bold uppercase truncate">{labels.leftLabel}</span></div>
            <div className="mt-2 space-y-1">
              <div className="h-1 rounded bg-white/20" />
              <div className="text-[7px] text-white/40 leading-none">{labels.leftSub}</div>
            </div>
          </div>
          <div className="h-5 w-full rounded bg-cyan-400/10 border border-cyan-400/20 mt-2 flex items-center justify-center">
            <span className="text-[7px] font-bold text-cyan-300 uppercase tracking-widest">{labels.badge}</span>
          </div>
        </div>

        {/* Right Bento Module */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md flex flex-col justify-between transform transition duration-500 group-hover:translate-x-1 group-hover:bg-white/10">
          <div className="flex justify-between items-center">
            <span className="size-5 rounded bg-white/15 flex items-center justify-center">
              <Code2 size={10} className="text-white/80" />
            </span>
            <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="space-y-1 mt-3">
            <div className="text-[8px] font-bold text-white/90">{labels.rightTitle}</div>
            <div className="text-[6px] leading-tight text-white/50">{labels.rightSub}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  scrollYProgress: any;
}

function ProjectCard({ project, index, total, scrollYProgress }: ProjectCardProps) {
  // Define animation range based on card index
  const startRange = index / total;
  const range = [startRange, 1];

  // Configure target scale and rotation transforms to create receding depth stacking
  // Last card stays at 100% scale and flat rotation since no subsequent card stacks on it
  const targetScale = index === total - 1 ? 1 : 1 - (total - index) * 0.04;
  const targetRotateX = index === total - 1 ? 0 : 12;
  const targetRotateY = index === total - 1 ? 0 : -3;
  const targetTranslateZ = index === total - 1 ? 0 : -80;
  const targetY = index === total - 1 ? 0 : -20 * (total - index);
  const targetOpacity = index === total - 1 ? 0 : 0.45;

  const scale = useTransform(scrollYProgress, range, [1, targetScale]);
  const rotateX = useTransform(scrollYProgress, range, [0, targetRotateX]);
  const rotateY = useTransform(scrollYProgress, range, [0, targetRotateY]);
  const translateZ = useTransform(scrollYProgress, range, [0, targetTranslateZ]);
  const y = useTransform(scrollYProgress, range, [0, targetY]);
  const opacityMask = useTransform(scrollYProgress, range, [0, targetOpacity]);

  return (
    <div 
      className="h-screen w-full flex items-center justify-center sticky top-0"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="w-full max-w-[94vw] lg:max-w-[96vw] h-[85vh] lg:h-[80vh] rounded-3xl border border-white/10 dark:border-white/[0.08] bg-white/95 dark:bg-[#080e18]/85 backdrop-blur-xl p-5 md:p-10 flex flex-col lg:flex-row gap-5 lg:gap-10 overflow-y-auto lg:overflow-hidden relative shadow-2xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition-colors duration-300"
        style={{
          scale,
          rotateX,
          rotateY,
          translateZ,
          y,
          transformStyle: "preserve-3d",
          originY: 1, // Anchor rotation from bottom to make it slide under nicely
        }}
      >
        {/* Dynamic theme backdrop glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.theme} opacity-5 mix-blend-plus-lighter pointer-events-none`} />

        {/* Recede Overlay Mask: gets darker and blurred as card stacks */}
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none rounded-3xl" 
          style={{ opacity: opacityMask, zIndex: 40 }} 
        />

        {/* LEFT COLUMN: Text Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between z-10 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-cyan-400/30 dark:border-cyan-400/20 bg-cyan-50/50 dark:bg-cyan-950/40 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                Project {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-mono text-slate-600 dark:text-white/40 uppercase tracking-widest font-bold">
                STABLE RELEASE
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-slate-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-sm font-semibold text-slate-600 dark:text-white/40 mt-1 uppercase tracking-wider">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
              {project.description}
            </p>

            {/* Tech Badges */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600 dark:text-white/35 block">
                Built With
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-cyan-200/30 dark:border-cyan-200/10 bg-cyan-50/50 dark:bg-cyan-950/25 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights / Performance indicators */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600 dark:text-white/35 block">
                Performance Indicators
              </span>
              <div className="grid grid-cols-3 gap-2">
                {project.metrics.map((metric) => (
                  <div
                    key={metric}
                    className="flex flex-col items-center justify-center rounded-xl border border-amber-200/20 dark:border-amber-200/10 bg-amber-50/30 dark:bg-slate-950/30 px-2.5 py-2.5 text-center"
                  >
                    <span className="text-amber-700 dark:text-amber-200/90 font-mono text-[9px] uppercase font-bold tracking-widest mb-1">
                      Highlight
                    </span>
                    <span className="text-slate-700 dark:text-white/80 text-[9px] font-black leading-tight">
                      {metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/5">
            <Link
              href={`/projects/${project.id}`}
              data-hover="open"
              className="focus-ring group flex items-center justify-center gap-2 rounded-xl border border-cyan-200/50 dark:border-cyan-200/30 bg-cyan-100/40 dark:bg-cyan-200/14 px-5 py-3 text-xs md:text-sm font-black text-cyan-800 dark:text-cyan-50 shadow-[0_4px_16px_rgba(92,242,232,0.08)] hover:bg-cyan-200/20 dark:hover:bg-cyan-200/22 hover:text-cyan-950 dark:hover:text-white transition w-full sm:w-auto"
            >
              View case study
              <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              data-hover="open"
              className="focus-ring group grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/30 dark:bg-white/[0.03] text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:border-cyan-200/40 dark:hover:border-cyan-200/30 transition"
              aria-label="GitHub Repository"
            >
              <Code2 size={16} className="transition group-hover:scale-105" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Mockup preview */}
        <div className="w-full lg:w-1/2 flex items-center justify-center z-10" style={{ transform: "translateZ(20px)" }}>
          <ProjectMockup index={index} theme={project.theme} title={project.title} />
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null);
  
  // Track global scroll progress of the entire projects container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <section id="projects" ref={container} className="relative bg-slate-950/20 dark:bg-transparent py-20">
      <div className="section-shell !pb-0">
        <SectionHeading
          eyebrow="Featured projects"
          title={<>Interactive 3D Projects Showcase Deck.</>}
          copy="Scroll down to explore my projects. Each card stacks on top of the last with 3D perspective depth."
        />
      </div>

      <div className="mt-10 flex flex-col items-center w-full">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            total={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
