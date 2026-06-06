"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/system/theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-10 rounded-full border border-slate-200/50 dark:border-white/10 bg-white/45 dark:bg-[#05070a] backdrop-blur-xl" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      data-hover="open"
      className="focus-ring relative flex size-10 items-center justify-center rounded-full border border-slate-200/50 bg-white/45 text-slate-800 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/80 active:scale-95 dark:border-white/10 dark:bg-[#05070a] dark:text-cyan-200 dark:hover:bg-[#0c1017] dark:shadow-black/20"
    >
      <motion.div
        animate={{ rotate: isDark ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative flex size-5 items-center justify-center"
      >
        {/* Sun center / Moon body */}
        <motion.div
          animate={{
            borderRadius: isDark ? "50%" : "50%",
            width: isDark ? 10 : 12,
            height: isDark ? 10 : 12,
            x: isDark ? 4 : 0,
            y: isDark ? -4 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute rounded-full bg-current"
        />

        {/* Moon shadow mask overlay to create crescent shape */}
        {isDark && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: -1, y: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -left-0.5 -top-0.5 size-3.5 rounded-full bg-white/45 dark:bg-[#05070a]"
          />
        )}

        {/* Sun Rays */}
        {!isDark && (
          <svg
            className="absolute size-5 text-current animate-spin-slow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}
