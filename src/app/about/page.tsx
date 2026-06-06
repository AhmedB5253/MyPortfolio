"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail, Compass, Sparkles, MapPin, GraduationCap, School, Heart, Calendar } from "lucide-react";
import { Navigation } from "@/components/system/navigation";
import { ProfileCard } from "@/components/sections/profile-card";
import { Footer } from "@/components/sections/footer";
import { owner } from "@/lib/data";
import { useSound } from "@/components/system/sound-provider";

export default function AboutPage() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.55 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.55 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["20%", "80%"]);
  const hoverGlow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(92, 242, 232, 0.22), transparent 35%)`;

  const { playTick } = useSound();

  const backingX = useTransform(smoothX, [-0.5, 0.5], [4, -4]);
  const backingY = useTransform(smoothY, [-0.5, 0.5], [4, -4]);

  const imageX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const frameX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const frameY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const timelineMilestones = [
    {
      icon: School,
      period: "Schooling Journey",
      title: "ABN Senior Secondary School, Indore",
      subtitle: "Completed Class 12 Foundations",
      detail: "Nurtured basic mathematical logic, analytical reasoning, and structured learning discipline. It was here that my fascination with digital interfaces and interactive software began.",
      tag: "Indore"
    },
    {
      icon: Compass,
      period: "Professional UI Training",
      title: "Arena Animation, Bhawarkuan",
      subtitle: "UI/UX & Frontend Development Specialty",
      detail: "Immersed in high-end design systems. Mastered grid structures, visual balance, harmonious palettes, user flow mapping in Figma, and translated them into clean, responsive frontend layouts (HTML, CSS, React JS).",
      tag: "Visual Design"
    },
    {
      icon: GraduationCap,
      period: "Higher Academics",
      title: "SVIMS, Indore",
      subtitle: "Pursuing Bachelor of Computer Applications (BCA)",
      detail: "Deepening theoretical knowledge in database systems (MySQL), programming logic (Python), algorithms, object-oriented concepts, and computational engineering frameworks.",
      tag: "Tech Foundation"
    },
    {
      icon: Heart,
      period: "Personal Blueprint",
      title: "The Dawoodi Bohra Community",
      subtitle: "Grounded in Timeless Principles",
      detail: "Belonging to the Dawoodi Bohra community heavily influences my professional philosophy. I am guided by core merchant values: absolute trustworthiness in commitments, meticulous quality standards, extreme discipline, and community-driven progress.",
      tag: "Core Heritage"
    }
  ];

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-[#f7f7fb] font-sans transition-colors duration-400 selection:bg-cyan-500/30 selection:text-white">
      <Navigation />

      {/* Parallax/Cinematic Ambient Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            backgroundImage: `
              linear-gradient(var(--line) 1px, transparent 1px),
              linear-gradient(90deg, var(--line) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            opacity: 0.16,
          }}
        />
        <div className="absolute top-[10%] left-[5%] size-[36vw] rounded-full bg-cyan-500/[0.04] dark:bg-cyan-200/5 blur-[120px] transition-colors duration-400" />
        <div className="absolute top-[40%] right-[5%] size-[36vw] rounded-full bg-blue-500/[0.03] dark:bg-blue-200/5 blur-[120px] transition-colors duration-400" />
      </div>

      <main className="relative z-10 mx-auto w-[min(1180px,calc(100%-32px))] pb-24 pt-32 flex flex-col gap-16 md:gap-24">
        
        {/* Header Hero Section */}
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-left"
          >
            <Link
              href="/"
              data-hover="open"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-100/30 dark:bg-white/[0.03] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-white/60 transition hover:border-cyan-300/35 dark:hover:border-cyan-300/35 hover:bg-slate-100/60 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white"
            >
              <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5" />
              Back to Home
            </Link>

            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">
                The Narrative Journey
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-slate-900 dark:text-white transition-colors duration-300">
                Ahmed Bhawrasa. <br />
                Shaping Visual Code with Absolute Purpose.
              </h1>
              <p className="max-w-2xl text-base md:text-lg leading-8 text-slate-600 dark:text-white/60 transition-colors duration-300">
                Hi, I'm Ahmed. Based in Indore, India, I specialize in engineering premium, cinematic interfaces. My focus is on writing fast, semantic code, designing modern spatial interfaces, and scaling custom architectures to support emerging AI workflows.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-white/70 transition-colors duration-300">
                <MapPin size={14} className="text-cyan-600 dark:text-cyan-300" /> Indore, India
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-white/70 transition-colors duration-300">
                <GraduationCap size={14} className="text-cyan-600 dark:text-cyan-300" /> SVIMS BCA Student
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-white/70 transition-colors duration-300">
                <Calendar size={14} className="text-cyan-600 dark:text-cyan-300" /> Born: 10th Sept 2006
              </span>
            </div>
          </motion.div>

          {/* Luxury 3D Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[420px] aspect-[4/5] cursor-pointer [perspective:1200px]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
              pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
            }}
            onMouseEnter={playTick}
            onMouseLeave={() => {
              pointerX.set(0);
              pointerY.set(0);
            }}
          >
            <div className="absolute inset-2 rounded-[2.5rem] bg-gradient-to-tr from-cyan-400 to-blue-400 blur-3xl opacity-15 dark:opacity-20 transition-opacity duration-300 pointer-events-none" />
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full [transform-style:preserve-3d] pointer-events-none"
            >
              {/* Layer 1: Volumetric Glowing Background & back panel */}
              <motion.div
                style={{ x: backingX, y: backingY, transformStyle: "preserve-3d" }}
                className="absolute inset-0 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-slate-950/40 shadow-xl dark:shadow-none transition-colors duration-400"
              />

              {/* Layer 2: Portrait Image & Info Overlay */}
              <motion.div
                style={{ x: imageX, y: imageY, transformStyle: "preserve-3d" }}
                className="absolute inset-4 rounded-[1.6rem] overflow-hidden border border-slate-200 dark:border-white/15 bg-white dark:bg-[#05070a] transition-all duration-400 flex flex-col justify-between"
              >
                <div className="relative overflow-hidden flex-1 w-full h-full">
                  <Image
                    src="/ahmed-portrait.png"
                    alt="Ahmed Bhawrasa Portrait"
                    width={400}
                    height={500}
                    priority
                    className="w-full h-full object-cover filter contrast-[1.04] brightness-95 dark:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fafafc] dark:from-[#030508] via-transparent dark:to-white/5 transition-colors duration-400" />
                </div>
                
                <div className="absolute bottom-6 inset-x-6 rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#030508]/80 p-4 backdrop-blur-md transition-colors duration-400">
                  <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Biographical</span>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mt-1 transition-colors duration-300">{owner.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-white/50 transition-colors duration-300">{owner.title}</p>
                </div>
              </motion.div>

              {/* Layer 3: Floating Outer Glass border frame */}
              <motion.div
                style={{ x: frameX, y: frameY, transformStyle: "preserve-3d" }}
                className="absolute inset-0 rounded-[2rem] border border-slate-300/40 shadow-2xl transition-all duration-300"
              />

              {/* Glow Overlay */}
              <motion.div className="absolute inset-0 z-20 rounded-[2rem] opacity-40 dark:opacity-60" style={{ background: hoverGlow }} />
            </motion.div>
          </motion.div>
        </section>

        {/* Deep Story timeline */}
        <section className="space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Biographical Milestones</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white transition-colors duration-300">The Educational & Values Arc</h2>
            <p className="text-slate-600 dark:text-white/60 leading-7 transition-colors duration-300">
              My transition from formal high school studies to UI/UX specialization at Arena, leading up to pursuing BCA higher academics and blending it all with community values.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {timelineMilestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              return (
                <motion.article
                  key={milestone.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-cyan-300/30 dark:hover:border-cyan-300/20 hover:bg-slate-50/50 dark:hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">
                      {milestone.period}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 border border-slate-200 dark:border-white/5 px-2.5 py-1 rounded bg-slate-100/50 dark:bg-white/[0.02] transition-colors duration-300">
                      {milestone.tag}
                    </span>
                  </div>
                  
                  <div className="mt-6 flex items-start gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.05] text-cyan-600 dark:text-cyan-200 transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                        {milestone.title}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-600/80 mt-1 transition-colors duration-300">
                        {milestone.subtitle}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/60 transition-colors duration-300">
                        {milestone.detail}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Philosophical Statement and Growth */}
        <section className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(92,242,232,0.08),transparent_50%)]" />
          <div className="relative max-w-4xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">My Mission</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Beyond Generic Portfolios</h2>
            <p className="text-slate-600 dark:text-white/70 text-base md:text-lg leading-8 transition-colors duration-300">
              A lot of developers learn code but lack design sense. Visual artists build mockups but don't understand computational parameters. My focus is the synthesis of both. I strive to design premium UI wireframes in Figma and build them in code with high structural discipline. Pursuing my BCA has fortified my logic stack, ensuring the systems behind the designs are just as scalable.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {["Framer Motion Springs", "Dawoodi Bohra Integrity", "Semantic UI5 Grid Layouts", "AI/ML Adaptability"].map((principle) => (
                <span key={principle} className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300 bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-400/20 px-4 py-2 rounded-lg transition-colors duration-300">
                  {principle}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-t border-slate-200 dark:border-white/10 pt-16 transition-colors duration-300">
          <div className="text-left space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">Contact & Enquiries</p>
            <h3 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white transition-colors duration-300">Let's craft something memorable.</h3>
            <p className="text-sm text-slate-500 dark:text-white/50 transition-colors duration-300">Open to junior positions, trainee positions, and creative collaborations.</p>
          </div>
          <a
            href={`mailto:${owner.email}`}
            data-hover="open"
            className="focus-ring group inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan-200/50 dark:border-cyan-200/30 bg-cyan-50/50 dark:bg-cyan-200/10 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-50 shadow-[0_4px_20px_rgba(92,242,232,0.12)] dark:shadow-[0_0_40px_rgba(92,242,232,0.18)] backdrop-blur-xl transition hover:border-cyan-100/50 hover:bg-cyan-200/20 dark:hover:bg-cyan-200/20 hover:text-cyan-900 dark:hover:text-white"
          >
            <Mail size={16} />
            Email me directly
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </section>

        <ProfileCard />
      </main>
      <Footer />
    </div>
  );
}
