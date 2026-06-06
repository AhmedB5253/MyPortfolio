"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { navItems, owner } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -45% 0px", // triggers when section takes up middle of page
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ["home", "about", "skills", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4"
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 transition-all duration-500 md:px-5 ${
          scrolled
            ? "rounded-2xl border border-slate-200/50 bg-white/60 shadow-lg dark:border-white/[0.08] dark:bg-black/45 dark:shadow-2xl dark:shadow-black/30 backdrop-blur-2xl"
            : "border border-transparent bg-transparent shadow-none backdrop-blur-none"
        }`}
      >
        <Link href="/#home" data-hover="open" className="focus-ring flex items-center gap-3 rounded-full">
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-slate-200/40 dark:border-white/10 bg-transparent">
            <span className="absolute inset-0 mesh-gradient opacity-70" />
            <span className="relative font-display text-sm font-bold text-slate-900 dark:text-white">AB</span>
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-sm font-semibold text-slate-800 transition-colors duration-300 dark:text-white">{owner.name}</span>
            <span className="block text-xs text-slate-500 transition-colors duration-300 dark:text-white/50">{owner.title}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = item.href === `/#${activeSection}`;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-hover="open"
                className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50/50 dark:text-cyan-300 dark:bg-white/[0.08] font-bold"
                    : "text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/[0.06] dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={owner.resume}
            download
            data-hover="open"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/40 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-indigo-500/40 hover:bg-indigo-50/20 dark:border-white/10 dark:bg-transparent dark:text-white dark:hover:border-cyan-200/40 dark:hover:bg-cyan-200/5 relative group"
          >
            <Download size={16} />
            <span>Resume <span className="text-[8px] text-amber-600 dark:text-amber-400 font-mono font-bold select-none">(WIP)</span></span>
          </a>
        </div>

        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          data-hover="open"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid size-10 place-items-center rounded-full border border-slate-200 bg-white/40 text-slate-800 dark:border-white/15 dark:bg-white/10 dark:text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 w-[calc(100%-16px)] max-w-7xl rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-lg backdrop-blur-2xl dark:border-white/12 dark:bg-black/75 md:hidden"
        >
          {navItems.map((item) => {
            const isActive = item.href === `/#${activeSection}`;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-hover="open"
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50/50 dark:text-cyan-300 dark:bg-white/[0.08] font-bold"
                    : "text-slate-700 hover:bg-slate-100 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="my-2 flex items-center justify-between border-t border-slate-200/50 pt-3 dark:border-white/5">
            <span className="px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-white/45">Theme</span>
            <ThemeToggle />
          </div>
          <a
            href={owner.resume}
            download
            data-hover="open"
            className="mt-2 flex flex-col items-center justify-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50/30 px-4 py-3 text-sm font-bold text-indigo-950 dark:border-cyan-200/28 dark:bg-cyan-200/12 dark:text-cyan-50"
          >
            <span className="flex items-center gap-2">
              <Download size={16} />
              Download resume
            </span>
            <span className="text-[8px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest animate-pulse">
              Work in progress
            </span>
          </a>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
