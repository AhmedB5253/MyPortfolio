"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, Code2, Palette, BrainCircuit, GraduationCap, CheckCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { InteractiveCanvasBg } from "@/components/ui/interactive-canvas-bg";
import { owner } from "@/lib/data";
import { useSound } from "@/components/system/sound-provider";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playTick } = useSound();
  
  // Parallax mouse movements configuration (Light and performant)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Responsive state detection
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallDesktop, setIsSmallDesktop] = useState(false);
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  // Dynamic bounce transition configuration
  const springTransition = (delay: number) => ({
    type: "spring" as const,
    stiffness: 100,
    damping: 12,
    mass: 0.8,
    delay
  });
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSmallDesktop(window.innerWidth >= 1024 && window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax equations for various depth layers
  const backgroundParallax = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]),
  };

  const portraitParallax = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [12, -12]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]),
  };

  const backingParallax = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [4, -4]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]),
  };

  const imageParallax = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [12, -12]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]),
  };

  const frameParallax = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]),
  };

  const cardDepth1 = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [-24, 24]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [-24, 24]),
  };

  const cardDepth2 = {
    x: useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]),
    y: useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]),
  };

  // Scroll animations linked to scroll position for cinematic scroll transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const backgroundFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x / width);
    mouseY.set(y / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Floating bento-style badges lists
  const proofBadges = [
    { label: "5+ Projects Built", icon: CheckCircle, accent: "border-cyan-400/20 text-cyan-200" },
    { label: "Frontend Focused", icon: Code2, accent: "border-blue-400/20 text-blue-200" },
    { label: "UI/UX Certified", icon: Palette, accent: "border-purple-400/20 text-purple-200" },
    { label: "Learning AI", icon: BrainCircuit, accent: "border-amber-400/20 text-amber-200" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden bg-transparent transition-colors duration-300 dark:bg-black"
    >

      {/* ═══════════════════════════════════════════════
          BACKGROUND LAYER 1 — Interactive high-performance 2D Canvas
      ═══════════════════════════════════════════════ */}
      <motion.div
        style={{
          opacity: backgroundFade,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
        className="absolute inset-0 z-[1]"
      >
        <InteractiveCanvasBg />
      </motion.div>


      {/* ═══════════════════════════════════════════════
          BACKGROUND LAYER 3 — Grid lines (calm & subtle)
      ═══════════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: backgroundFade }}
        className="absolute inset-0 z-[3] pointer-events-none dark:hidden"
      >
        {/* Grid lines (pulsing, very low opacity) */}
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BACKGROUND LAYER 4 — Noise grain texture
      ═══════════════════════════════════════════════ */}
      <div className="noise-mask z-[4] opacity-[0.05] pointer-events-none dark:hidden" />

      {/* Main Structural Container (Centering padding to fit layout on standard laptop screens) */}
      <div className="relative z-20 mx-auto w-[min(1180px,calc(100%-32px))] pt-24 pb-16 lg:pt-28 lg:pb-20 min-h-screen grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-16">
        
        {/* 2. LEFT SIDE: Typography & CTA (Foreground Layer) */}
        <motion.div
          style={{ y: contentY, opacity: contentFade }}
          className="max-w-2xl text-left order-2 lg:order-1"
        >
          {/* Identity Tag Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="inline-flex items-center gap-2 mb-4 lg:mb-5 max-w-max rounded-full border border-indigo-100 dark:border-cyan-400/20 bg-indigo-50/50 dark:bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-indigo-600 dark:text-cyan-200 backdrop-blur-xl transition-all duration-300"
          >
            <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
            Personal Brand Website
          </motion.div>

          {/* Giant Display Typography */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[6.5rem] font-black leading-[0.88] tracking-tighter text-slate-900 transition-colors duration-300 dark:text-white select-none">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, ease: [0.25, 1, 0.5, 1] }}
              >
                HELLO,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
              >
                I'M AHMED
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-600 to-cyan-600 dark:from-white dark:via-cyan-200 dark:to-cyan-300">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.16, ease: [0.25, 1, 0.5, 1] }}
              >
                BHAWRASA
              </motion.span>
            </span>
          </h1>

          {/* Subheading Identity Statement */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.32 }}
            className="mt-4 lg:mt-5 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm font-bold tracking-wider text-slate-700 transition-colors duration-300 dark:text-white/60">
              Frontend Developer & UI/UX Designer
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors duration-300 dark:bg-white/20" />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 transition-colors duration-300 dark:text-cyan-400">
              Learning AI & ML
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44 }}
            className="mt-4 lg:mt-5 text-base md:text-lg leading-8 text-slate-700 transition-colors duration-300 dark:text-white/70 max-w-xl"
          >
            {owner.intro}
          </motion.p>

          {/* CTA Magnet Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.56 }}
            className="mt-5 lg:mt-6 flex flex-wrap items-start gap-4"
          >
            <MagneticButton href="#projects" icon={ArrowUpRight} data-hover="view-project">View Projects</MagneticButton>
            <MagneticButton href="/about" icon={ArrowUpRight} variant="ghost" data-hover="know-more">Read Story</MagneticButton>
            <div className="flex flex-col items-center gap-1.5 relative group">
              <MagneticButton href={owner.resume} icon={Download} variant="ghost" download data-hover="open">Resume</MagneticButton>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase select-none opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                Work in progress
              </span>
            </div>
          </motion.div>

          {/* 3. PROOF SECTION / BADGES */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.68 }}
            className="mt-8 pt-6 lg:mt-10 lg:pt-6 border-t border-slate-200/60 transition-colors duration-300 dark:border-white/5"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {proofBadges.map((badge, idx) => {
                const Icon = badge.icon;
                const cleanAccent = badge.accent
                  .replace("text-cyan-200", "text-cyan-700 dark:text-cyan-200")
                  .replace("text-blue-200", "text-blue-700 dark:text-blue-200")
                  .replace("text-purple-200", "text-purple-700 dark:text-purple-200")
                  .replace("text-amber-200", "text-amber-700 dark:text-amber-200")
                  .replace("border-cyan-400/20", "border-cyan-500/20 dark:border-cyan-400/20")
                  .replace("border-blue-400/20", "border-blue-500/20 dark:border-blue-400/20")
                  .replace("border-purple-400/20", "border-purple-500/20 dark:border-purple-400/20")
                  .replace("border-amber-400/20", "border-amber-500/20 dark:border-amber-400/20");
                return (
                  <div
                    key={badge.label}
                    className={`flex items-center gap-2.5 rounded-xl border border-indigo-100/60 bg-white/80 p-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-slate-100/50 dark:border-white/10 dark:bg-[#05070a] dark:shadow-md dark:hover:bg-[#0c1017] ${cleanAccent}`}
                  >
                    <Icon size={14} className="shrink-0 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-white/80 transition-colors duration-300">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* 4. RIGHT SIDE: Cinematic Layered Portrait & Floating Bento Cards */}
        <div
          onMouseLeave={() => setIsPortraitHovered(false)}
          className="relative order-1 lg:order-2 flex items-center justify-center min-h-[380px] lg:min-h-[400px] w-full [perspective:1200px]"
        >


          {/* Idle-floating layered portrait container */}
          <motion.div
            style={{ ...portraitParallax, scale: portraitScale }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            onMouseEnter={() => {
              if (!isMobile) setIsPortraitHovered(true);
              playTick();
            }}
            onClick={() => {
              if (isMobile) {
                setIsPortraitHovered(prev => !prev);
                playTick();
              }
            }}
            className="relative z-10 w-[220px] sm:w-[260px] md:w-[300px] lg:w-[280px] xl:w-[320px] aspect-[4/5] cursor-pointer [transform-style:preserve-3d]"
          >
            {/* Layer 1: Volumetric Glowing Background & back panel */}
            <motion.div
              style={{ ...backingParallax, transformStyle: "preserve-3d" }}
              className="absolute inset-0 rounded-[2rem] border border-slate-200/80 bg-slate-100/50 dark:border-white/10 dark:bg-slate-950/40 shadow-xl dark:shadow-3xl transition-all duration-300 pointer-events-none"
            />

            {/* Layer 2: Portrait Image */}
            <motion.div
              style={{ ...imageParallax, transformStyle: "preserve-3d" }}
              className="absolute inset-2.5 rounded-[1.6rem] overflow-hidden border border-slate-200/50 bg-white dark:border-white/15 dark:bg-[#05070a] transition-all duration-300 pointer-events-none"
            >
              <Image
                src="/ahmed-portrait.png"
                alt="Ahmed Bhawrasa Portrait"
                width={320}
                height={400}
                priority
                className="w-full h-full object-cover filter contrast-[1.03] brightness-95"
              />
              {/* Soft overlay gradient shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#fafafc] via-transparent to-white/5 dark:from-[#030508] dark:via-transparent dark:to-white/5 pointer-events-none transition-colors duration-300" />
            </motion.div>

            {/* Layer 3: Floating Outer Glass border frame */}
            <motion.div
              style={{ ...frameParallax, transformStyle: "preserve-3d" }}
              className="absolute inset-0 rounded-[2rem] border border-slate-300/60 dark:border-white/20 shadow-2xl transition-all duration-300 pointer-events-none"
            />
          </motion.div>

          {/* 5. INTERACTIVE FLOATING INFO CARDS (Middle Layer Depth - Pop-out on Hover/Tap) */}
          
          {/* Card 1: Top-Left (React Developer) */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: isPortraitHovered ? (isMobile ? -100 : (isSmallDesktop ? -145 : -175)) : 0,
              y: isPortraitHovered ? (isMobile ? -130 : (isSmallDesktop ? -150 : -180)) : 0,
              scale: isPortraitHovered ? (isMobile ? 0.72 : (isSmallDesktop ? 0.85 : 1)) : 0,
              opacity: isPortraitHovered ? 1 : 0,
            }}
            transition={springTransition(0)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              style={cardDepth1}
              animate={{ y: [0, -6, 0], rotate: [0, -0.5, 0] }}
              transition={{ duration: 5.2, ease: "easeInOut", repeat: Infinity }}
              className="glass rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-xl shadow-lg border border-cyan-500/20 dark:border-cyan-400/20 whitespace-nowrap"
            >
              <div className="grid size-8 place-items-center rounded-lg border border-cyan-300/30 dark:border-cyan-400/20 bg-cyan-50/50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 transition-colors duration-300">
                <Code2 size={16} />
              </div>
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Expertise</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mt-0.5 transition-colors duration-300">React Developer</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2: Top-Right (UI/UX Designer) */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: isPortraitHovered ? (isMobile ? 100 : (isSmallDesktop ? 145 : 175)) : 0,
              y: isPortraitHovered ? (isMobile ? -80 : (isSmallDesktop ? -100 : -120)) : 0,
              scale: isPortraitHovered ? (isMobile ? 0.72 : (isSmallDesktop ? 0.85 : 1)) : 0,
              opacity: isPortraitHovered ? 1 : 0,
            }}
            transition={springTransition(0.04)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              style={cardDepth2}
              animate={{ y: [0, 6, 0], rotate: [0, 0.5, 0] }}
              transition={{ duration: 5.8, ease: "easeInOut", repeat: Infinity }}
              className="glass rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-xl shadow-lg border border-purple-500/20 dark:border-purple-400/20 whitespace-nowrap"
            >
              <div className="grid size-8 place-items-center rounded-lg border border-purple-300/30 dark:border-purple-400/20 bg-purple-50/50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 transition-colors duration-300">
                <Palette size={16} />
              </div>
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-300 transition-colors duration-300">Specialty</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mt-0.5 transition-colors duration-300">UI/UX Designer</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3: Bottom-Left (Learning AI & ML) */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: isPortraitHovered ? (isMobile ? -100 : (isSmallDesktop ? -145 : -175)) : 0,
              y: isPortraitHovered ? (isMobile ? 80 : (isSmallDesktop ? 100 : 120)) : 0,
              scale: isPortraitHovered ? (isMobile ? 0.72 : (isSmallDesktop ? 0.85 : 1)) : 0,
              opacity: isPortraitHovered ? 1 : 0,
            }}
            transition={springTransition(0.08)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              style={cardDepth2}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
              className="glass rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-xl shadow-lg border border-indigo-500/20 dark:border-indigo-400/20 whitespace-nowrap"
            >
              <div className="grid size-8 place-items-center rounded-lg border border-indigo-300/30 dark:border-indigo-400/20 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 transition-colors duration-300">
                <BrainCircuit size={16} />
              </div>
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300 transition-colors duration-300">Curiosity</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mt-0.5 transition-colors duration-300">Learning AI & ML</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 4: Bottom-Right (BCA SVIMS Student) */}
          <motion.div
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: isPortraitHovered ? (isMobile ? 100 : (isSmallDesktop ? 145 : 175)) : 0,
              y: isPortraitHovered ? (isMobile ? 130 : (isSmallDesktop ? 150 : 180)) : 0,
              scale: isPortraitHovered ? (isMobile ? 0.72 : (isSmallDesktop ? 0.85 : 1)) : 0,
              opacity: isPortraitHovered ? 1 : 0,
            }}
            transition={springTransition(0.12)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <motion.div
              style={cardDepth1}
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 6.2, ease: "easeInOut", repeat: Infinity }}
              className="glass rounded-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-xl shadow-lg border border-blue-500/20 dark:border-blue-400/20 whitespace-nowrap"
            >
              <div className="grid size-8 place-items-center rounded-lg border border-blue-300/30 dark:border-blue-400/20 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 transition-colors duration-300">
                <GraduationCap size={16} />
              </div>
              <div>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300 transition-colors duration-300">Academic</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mt-0.5 transition-colors duration-300">BCA SVIMS Student</p>
              </div>
            </motion.div>
          </motion.div>

        </div>

      </div>

      {/* Cinematic scroll down link */}
      <motion.a
        href="#about"
        data-hover="know-more"
        style={{ opacity: contentFade }}
        className="focus-ring absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-600 transition-colors duration-300 dark:text-white/50"
      >
        Scroll
        <motion.span
          className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white/40 dark:border-white/15 dark:bg-white/[0.02] transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-indigo-600 dark:text-cyan-300 animate-bounce transition-colors duration-300" />
        </motion.span>
      </motion.a>
    </section>
  );
}
