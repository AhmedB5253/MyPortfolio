"use client";

import { motion } from "framer-motion";
import { Code2, Compass, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { stats } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute inset-0 pointer-events-none -z-20 select-none">
        {/* Left cyan glow */}
        <div className="absolute -left-[20%] top-0 size-[70%] rounded-full bg-[radial-gradient(circle,rgba(92,242,232,0.12)_0%,transparent_70%)] blur-[80px]" />
        {/* Right violet glow */}
        <div className="absolute -right-[20%] top-[20%] size-[70%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-[80px]" />
      </div>

      {/* Deep luxury fade transition from Hero solid black */}
      <div className="absolute inset-x-0 top-0 h-[700px] bg-gradient-to-b from-[#fafafc] via-[#fafafc]/85 via-[#fafafc]/35 to-transparent dark:from-black dark:via-black/85 dark:via-black/35 dark:to-transparent pointer-events-none -z-10 transition-colors duration-300" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="About me"
          title={<>A fresher building strong fundamentals through real projects.</>}
          copy="I am focused on learning by building: responsive websites, React interfaces, Python console applications, SQL database workflows, and clean UI layouts."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="glass relative min-h-[520px] overflow-hidden rounded-2xl p-6 md:p-8">
            <div className="absolute inset-0 mesh-gradient opacity-70" />
            <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
            <motion.div
              className="absolute right-8 top-10 size-24 rounded-full border border-cyan-200/25 bg-cyan-200/10 blur-[1px]"
              animate={{ y: [0, -18, 0], rotate: [0, 14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-16 left-8 size-32 rounded-[2rem] border border-violet-200/22 bg-violet-200/10"
              animate={{ y: [0, 18, 0], rotate: [8, -8, 8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex h-full flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-white/52 transition-colors duration-300">Profile card</p>
                <h3 className="mt-5 font-display text-4xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">Ahmed Bhawrasa</h3>
                <p className="mt-3 text-slate-600 dark:text-white/68 transition-colors duration-300">Frontend Developer & UI/UX Designer</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-slate-200 dark:border-white/14 bg-slate-100/50 dark:bg-black/28 p-5 backdrop-blur-xl transition-all duration-300">
                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-white/[0.055] p-4 transition-all duration-300">
                        <p className="font-display text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">{stat.value}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-white/55 transition-colors duration-300">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/about"
                  data-hover="know-more"
                  className="focus-ring group flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/30 dark:bg-white/[0.03] py-3.5 text-sm font-bold tracking-wider uppercase text-slate-700 dark:text-white transition hover:bg-slate-100/70 dark:hover:bg-white/[0.08] hover:border-cyan-200/50 dark:hover:border-cyan-200/30 hover:text-cyan-600 dark:hover:text-cyan-100"
                >
                  Learn More About Me
                  <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-200" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            {[
              {
                icon: Code2,
                title: "Frontend Foundations",
                copy: "I build responsive pages with HTML, CSS, and React JS, focusing on clean structure, clear sections, and readable interfaces.",
              },
              {
                icon: Compass,
                title: "UI/UX Awareness",
                copy: "I study modern layouts, spacing, contrast, typography, and user flow so my projects feel more professional and easier to scan.",
              },
              {
                icon: Sparkles,
                title: "Backend Logic Practice",
                copy: "I practice Python, SQL, and MySQL through simple but useful systems like inventory, billing, records, and reporting flows.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} className="glass rounded-2xl p-6 md:p-8">
                <div className="flex gap-5">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-slate-200/60 dark:border-white/14 bg-slate-100/50 dark:bg-white/[0.07] text-cyan-600 dark:text-cyan-100 transition-all duration-300">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">{item.title}</h3>
                    <p className="mt-3 text-base leading-8 text-slate-600 dark:text-white/62 transition-colors duration-300">{item.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
