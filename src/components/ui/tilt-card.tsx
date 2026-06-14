"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ReactNode } from "react";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 24, mass: 0.55 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 24, mass: 0.55 });
  const shineX = useMotionValue("50%");
  const shineY = useMotionValue("50%");
  const background = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(120,220,255,0.18), transparent 36%)`;

  return (
    <motion.div
      className={`group relative transform-gpu overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 dark:border-white/12 dark:bg-[#0f1422]/72 shadow-[0_15px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl ${className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000, willChange: "transform" }}
      whileHover={{ y: -6, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.6 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        rotateX.set((0.5 - py) * 7);
        rotateY.set((px - 0.5) * 9);
        shineX.set(`${px * 100}%`);
        shineY.set(`${py * 100}%`);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        shineX.set("50%");
        shineY.set("50%");
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
