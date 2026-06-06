"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ComponentType, MouseEvent, ReactNode } from "react";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { useSound } from "@/components/system/sound-provider";

const MotionLink = motion.create(Link);

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  icon?: ComponentType<LucideProps>;
  variant?: "solid" | "ghost";
  download?: boolean;
  "data-hover"?: string;
};

export function MagneticButton({ children, href, icon: Icon, variant = "solid", download, "data-hover": dataHover }: MagneticButtonProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.45 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.45 });
  const { playTick } = useSound();

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const isInternal = href.startsWith("/") && !download;

  const btnClasses = `focus-ring group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition md:px-6 ${
    variant === "solid"
      ? "border border-cyan-200/45 bg-cyan-200 !text-black font-extrabold shadow-[0_0_12px_rgba(92,242,232,0.15)] hover:bg-emerald-100 hover:shadow-[0_0_18px_rgba(92,242,232,0.2)]"
      : "border border-slate-200 dark:border-white/18 bg-white/40 dark:bg-[#05070a] text-slate-800 dark:text-white backdrop-blur-xl hover:border-indigo-400/50 dark:hover:border-cyan-200/35 hover:bg-slate-100/50 dark:hover:bg-[#07111a]"
  }`;

  if (isInternal) {
    return (
      <MotionLink
        href={href}
        data-hover={dataHover}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onMouseEnter={playTick}
        style={{ x, y }}
        whileTap={{ scale: 0.97 }}
        className={btnClasses}
      >
        <span className="relative z-10">{children}</span>
        {Icon ? <Icon size={17} className="relative z-10 transition group-hover:translate-x-0.5" /> : null}
      </MotionLink>
    );
  }

  return (
    <motion.a
      href={href}
      download={download}
      data-hover={dataHover}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onMouseEnter={playTick}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={btnClasses}
    >
      <span className="relative z-10">{children}</span>
      {Icon ? <Icon size={17} className="relative z-10 transition group-hover:translate-x-0.5" /> : null}
    </motion.a>
  );
}
