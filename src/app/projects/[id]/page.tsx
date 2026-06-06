"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { ArrowLeft, ArrowUpRight, Code2, Database, Terminal, Layout, Cpu, Sparkles, BookOpen, CheckCircle } from "lucide-react";
import { Navigation } from "@/components/system/navigation";
import { ProfileCard } from "@/components/sections/profile-card";
import { Footer } from "@/components/sections/footer";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // Find project matching the routing id
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#fafafc] dark:bg-[#030508] text-slate-900 dark:text-white flex flex-col items-center justify-center gap-6 transition-colors duration-400">
        <h2 className="font-display text-3xl font-bold">Case Study Not Found</h2>
        <Link href="/" className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5 text-sm font-semibold text-slate-800 dark:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all duration-300">
          Return Home
        </Link>
      </div>
    );
  }

  // Get next project for continuous portfolio exploration loop
  const nextProjectIndex = (projectIndex + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];

  // Map icon based on tech or ID
  const getProjectIcon = () => {
    if (project.id === "grocery-management") return Terminal;
    if (project.tech.includes("React JS")) return Layout;
    return Cpu;
  };

  const ProjectIcon = getProjectIcon();

  // Dynamic Section Labels to perfectly fulfill custom sections requirements
  const getSectionTitles = () => {
    switch (project.id) {
      case "grocery-management":
        return {
          section01: "01. The Problem",
          section01Title: "Manual Ledgers & Gaps",
          section02: "02. Technical Showcase",
          section02Title: "Product Tracking & MySQL",
          section03: "03. The CLI Solution",
          section03Title: "Billing & stock management",
          section04: "04. Relational Database Integration",
          section04Title: "MySQL Schemas & Connection"
        };
      case "educational-design":
        return {
          section01: "01. Research Process",
          section01Title: "User Personas & flows",
          section02: "02. Wireframes & Layout",
          section02Title: "Low-fidelity Blueprints",
          section03: "03. UI Decisions",
          section03Title: "Design system & high-fi screens",
          section04: "04. Accessibility Improvements",
          section04Title: "Contrast & Spatial spacing"
        };
      case "expense-tracker":
        return {
          section01: "01. Problem Statement",
          section01Title: "Complex budget tracking",
          section02: "02. Component Architecture",
          section02Title: "Modular component trees",
          section03: "03. The Solution",
          section03Title: "Income & expense tracker dashboard",
          section04: "04. State Management",
          section04Title: "Local storage & charts analytics"
        };
      case "insight-board":
        return {
          section01: "01. Overview",
          section01Title: "Static or locked organizations analytics",
          section02: "02. Dashboard Architecture",
          section02Title: "Responsive bento box grid",
          section03: "03. Visualization Strategy",
          section03Title: "Interactive KPI cards & trend lines",
          section04: "04. UI Components",
          section04Title: "Reusable widgets blueprints"
        };
      case "dev-portfolio":
      default:
        return {
          section01: "01. Design Process",
          section01Title: "Visual identity and cinematic research",
          section02: "02. Motion System",
          section02Title: "Tactile spring physics cursors",
          section03: "03. UI Architecture",
          section03Title: "Next.js structure & layout portals",
          section04: "04. Performance Optimizations",
          section04Title: "Asset payloads & compilation pipelines"
        };
    }
  };

  const sections = getSectionTitles();

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-[#f7f7fb] font-sans transition-colors duration-400 selection:bg-cyan-500/30 selection:text-white">
      <Navigation />

      {/* Parallax background highlights */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className={`absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b ${project.theme} opacity-25 dark:opacity-35 blur-[100px] transition-opacity duration-400`} />
        <div className="absolute inset-0 project-glow-overlay" />
      </div>

      <main className="relative z-10 mx-auto w-[min(1180px,calc(100%-32px))] pt-32 pb-20 flex flex-col gap-14 md:gap-20">
        
        {/* Navigation & Header */}
        <section className="space-y-8">
          <Link
            href="/#projects"
            data-hover="open"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-100/30 dark:bg-white/[0.03] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-white/60 transition hover:border-cyan-300/35 dark:hover:border-cyan-300/35 hover:bg-slate-100/60 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5" />
            Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-cyan-400/30 dark:border-cyan-400/20 bg-cyan-50/50 dark:bg-cyan-950/40 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider transition-colors duration-300">
                  Case Study
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-white/40 uppercase tracking-widest transition-colors duration-300">
                  Production Specs
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none transition-colors duration-300">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-cyan-700 dark:text-cyan-300/80 font-medium tracking-wide transition-colors duration-300">
                {project.subtitle}
              </p>
            </div>

            {/* Launch links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                data-hover="open"
                className="focus-ring group flex items-center justify-center gap-2 rounded-xl border border-slate-200/80 dark:border-white/12 bg-slate-100/30 dark:bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-slate-800 dark:text-white transition hover:bg-slate-100/60 dark:hover:bg-white/[0.08] hover:border-cyan-300/35 dark:hover:border-cyan-300/30"
              >
                <Code2 size={16} /> Repository
              </a>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
            <div className="glass rounded-xl p-5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest block transition-colors duration-300">Type</span>
              <span className="text-sm font-bold text-slate-800 dark:text-white mt-1.5 block flex items-center gap-2 transition-colors duration-300">
                <ProjectIcon size={14} className="text-cyan-600 dark:text-cyan-300" /> Web Showcase
              </span>
            </div>
            {project.metrics.map((metric, i) => (
              <div key={metric} className="glass rounded-xl p-5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest block transition-colors duration-300">KPI 0{i + 1}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white mt-1.5 block transition-colors duration-300">{metric}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Narrative columns: Problem / Solution */}
        <section className="grid gap-8 md:grid-cols-2">
          {/* Left Column: Problem & Planning */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden transition hover:border-cyan-300/30 dark:hover:border-cyan-300/10">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[2rem] bg-red-400/5 pointer-events-none" />
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">{sections.section01}</span>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{sections.section01Title}</h3>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-7 transition-colors duration-300">
                  {project.caseStudy.problem}
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden transition hover:border-cyan-300/30 dark:hover:border-cyan-300/10">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[2rem] bg-blue-400/5 pointer-events-none" />
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">{sections.section02}</span>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{sections.section02Title}</h3>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-7 transition-colors duration-300">
                  {project.caseStudy.planning}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Solution & Tech Stack */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden transition hover:border-cyan-300/30 dark:hover:border-cyan-300/10">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[2rem] bg-emerald-400/5 pointer-events-none" />
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">{sections.section03}</span>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{sections.section03Title}</h3>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-7 transition-colors duration-300">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Tech Stack checklist */}
            <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 font-mono transition-colors duration-300">{sections.section04}</span>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">{sections.section04Title}</h3>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.tech.map((tool) => (
                    <div key={tool} className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/[0.02] p-3 text-xs font-semibold text-slate-700 dark:text-white/80 transition-colors duration-300">
                      <CheckCircle size={12} className="text-cyan-600 dark:text-cyan-300 shrink-0" />
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges & Learnings */}
        <section className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(122,167,255,0.04),transparent_50%)]" />
          <div className="grid gap-8 md:grid-cols-2 relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Dev Logs • Obstacles</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Technical Challenges</h3>
              <p className="text-slate-600 dark:text-white/60 text-sm leading-7 transition-colors duration-300">
                {project.caseStudy.challenges}
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Growth • Retrospective</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Key Take-aways</h3>
              <p className="text-slate-600 dark:text-white/60 text-sm leading-7 transition-colors duration-300">
                {project.caseStudy.learnings}
              </p>
            </div>
          </div>
        </section>

        {/* Next Project exploration CTA */}
        <section className="border-t border-slate-200 dark:border-white/10 pt-16 pb-6 flex flex-col md:flex-row items-center justify-between gap-8 transition-colors duration-300">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Continue Exploring</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
              {nextProject.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-white/50 transition-colors duration-300">{nextProject.subtitle}</p>
          </div>
          <Link
            href={`/projects/${nextProject.id}`}
            data-hover="view-project"
            className="focus-ring group inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan-200/50 dark:border-cyan-200/30 bg-cyan-50/50 dark:bg-cyan-200/10 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-50 shadow-[0_4px_20px_rgba(92,242,232,0.12)] dark:shadow-[0_0_40px_rgba(92,242,232,0.14)] backdrop-blur-xl transition hover:border-cyan-100/50 hover:bg-cyan-200/20 dark:hover:bg-cyan-200/20 hover:text-cyan-900 dark:hover:text-white"
          >
            Next Project
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </section>

        <ProfileCard />
      </main>
      <Footer />
    </div>
  );
}
