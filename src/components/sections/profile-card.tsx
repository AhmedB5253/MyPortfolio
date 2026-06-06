"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { owner, socials } from "@/lib/data";
import { ArrowUpRight, Code2, Palette, BrainCircuit } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useRef } from "react";
import { useSound } from "@/components/system/sound-provider";

export function ProfileCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const { playTick } = useSound();

  const backingParallax = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [3, -3]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [3, -3]),
  };

  const imageParallax = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [8, -8]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]),
  };

  const frameParallax = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [14, -14]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]),
  };

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x / rect.width);
    mouseY.set(y / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative z-20 mx-auto w-[min(1180px,calc(100%-32px))] mb-[-120px] md:mb-[-150px] overflow-visible">
      
      {/* 3D Volumetric Aura underneath the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-cyan-400/10 to-blue-500/5 blur-3xl opacity-60 pointer-events-none select-none" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{ y: -8, scale: 1.012 }}
        className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-10 lg:gap-16 shadow-[0_15px_40px_rgba(15,23,42,0.06),0_0_50px_rgba(92,242,232,0.03)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(92,242,232,0.06)] border border-slate-200/50 dark:border-white/12 transition-all duration-500 group"
      >
        <div className="absolute inset-0 mesh-gradient opacity-10 pointer-events-none" />

        {/* Visual Portrait Ring (Volumetric 3D Parallax) */}
        <div 
          onMouseEnter={playTick}
          className="relative shrink-0 select-none size-36 md:size-44 [transform-style:preserve-3d]"
        >
          {/* Layer 1: Backing Blur */}
          <motion.div
            style={backingParallax}
            className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-400 blur-md opacity-35 scale-105 pointer-events-none"
          />
          {/* Layer 2: Image */}
          <motion.div
            style={imageParallax}
            className="absolute inset-1 rounded-2xl overflow-hidden border border-slate-200 bg-white dark:border-white/10 dark:bg-[#05070a] shadow-xl pointer-events-none transition-colors duration-300"
          >
            <Image
              src="/ahmed-portrait.png"
              alt="Ahmed Bhawrasa Portrait"
              width={176}
              height={176}
              priority
              className="w-full h-full object-cover filter contrast-[1.04] brightness-95"
            />
          </motion.div>
          {/* Layer 3: Glass border frame */}
          <motion.div
            style={frameParallax}
            className="absolute inset-0 rounded-2xl border-2 border-slate-300/40 bg-white/5 shadow-2xl pointer-events-none transition-all duration-300"
          />
        </div>

        {/* Profile Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left w-full">
          <div className="space-y-4">
            
            {/* Dynamic Role Badges shelf */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-700 border border-cyan-500/20 bg-cyan-50/50 px-2.5 py-1 rounded-md flex items-center gap-1 dark:text-cyan-200 dark:border-cyan-400/20 dark:bg-cyan-950/30">
                <Code2 size={10} /> Frontend Developer
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-purple-700 border border-purple-500/20 bg-purple-50/50 px-2.5 py-1 rounded-md flex items-center gap-1 dark:text-purple-200 dark:border-purple-400/20 dark:bg-purple-950/30">
                <Palette size={10} /> UI/UX Designer
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-700 border border-indigo-500/20 bg-indigo-50/50 px-2.5 py-1 rounded-md flex items-center gap-1 dark:text-indigo-200 dark:border-indigo-400/20 dark:bg-indigo-950/30">
                <BrainCircuit size={10} /> Learning AI
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-5xl font-black text-slate-900 transition-colors duration-300 dark:text-white tracking-tight leading-none mt-2">
              {owner.name}
            </h3>

            {/* Tagline */}
            <p className="text-slate-600 transition-colors duration-300 dark:text-white/70 text-base md:text-lg leading-relaxed max-w-xl font-light">
              "Focused on building modern, user-first digital experiences."
            </p>
          </div>

          {/* Connect & Social Deck */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2">
            
            {/* CTAs */}
            <div className="flex items-center gap-3">
              <MagneticButton href="/#contact" icon={ArrowUpRight} data-hover="open">Let's Connect</MagneticButton>
              <MagneticButton href="/about" icon={ArrowUpRight} variant="ghost" data-hover="know-more">View My Journey</MagneticButton>
            </div>

            {/* Micro Divider */}
            <span className="hidden sm:block h-8 w-px bg-slate-200 transition-colors duration-300 dark:bg-white/10" />

            {/* Social Buttons */}
            <div className="flex items-center gap-2.5">
              {socials.map((social) => {
                const Icon = social.icon;
                if (!Icon) return null;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    data-hover="open"
                    className="focus-ring grid size-11 place-items-center rounded-xl border border-slate-200 bg-white/40 text-slate-500 hover:text-slate-900 hover:border-indigo-300/30 hover:bg-indigo-50/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/60 dark:hover:text-white dark:hover:border-cyan-300/30 dark:hover:bg-cyan-300/5 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
