"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { designShowcase } from "@/lib/data";

export function DesignShowcaseSection() {
  return (
    <section id="design" className="relative">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="UI/UX showcase"
            title={<>Systems thinking, not just screens.</>}
            copy="The design showcase explains how ideas become usable interfaces: discovery, wireframes, typography, color systems, user flows, and prototypes."
          />
          <div className="grid grid-cols-2 gap-3">
            {["Typography", "Color", "Components", "Flows"].map((item, index) => (
              <motion.div
                key={item}
                className="rounded-2xl border border-slate-200 dark:border-white/12 bg-slate-100/50 dark:bg-white/[0.05] p-5 backdrop-blur-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-white/42 transition-colors duration-300">{item}</span>
                <div className="mt-4 h-2 rounded-full bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <TiltCard className="min-h-[520px] p-5 md:p-7">
            <div className="grid h-full gap-4 md:grid-cols-[0.76fr_1fr]">
              <div className="rounded-2xl border border-slate-200 dark:border-white/12 bg-slate-100/60 dark:bg-black/24 p-5 transition-all duration-300">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-100/64 transition-colors duration-300">Case study</p>
                <h3 className="mt-5 font-display text-3xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">Analytics dashboard redesign</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/58 transition-colors duration-300">
                  A focused concept for turning dense reporting into a calm, scan-friendly interface with clear hierarchy and useful states.
                </p>
                <div className="mt-8 space-y-3">
                  {["User goals", "Information hierarchy", "Component states", "Responsive behavior"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.045] p-3 text-sm text-slate-700 dark:text-white/68 transition-all duration-300">
                      <span className="size-2 rounded-full bg-cyan-500 dark:bg-cyan-200 transition-colors duration-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-200 dark:border-white/12 bg-slate-50/80 dark:bg-white/[0.055] p-4 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-3 w-28 rounded-full bg-slate-400 dark:bg-white/72 transition-colors duration-300" />
                      <div className="mt-3 h-2 w-44 rounded-full bg-slate-200 dark:bg-white/22 transition-colors duration-300" />
                    </div>
                    <div className="grid size-12 place-items-center rounded-full bg-cyan-200/30 dark:bg-cyan-200/15 text-sm font-bold text-cyan-700 dark:text-cyan-100 transition-colors duration-300">UX</div>
                  </div>
                  <div className="mt-7 grid grid-cols-4 items-end gap-2">
                    {[38, 72, 48, 92, 58, 78, 52, 88].map((height, index) => (
                      <motion.span
                        key={index}
                        className="rounded-t-lg bg-gradient-to-t from-cyan-300/35 to-slate-400 dark:to-white/72 transition-all duration-300"
                        initial={{ height: 0 }}
                        whileInView={{ height }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.04 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 dark:border-white/12 bg-slate-50/80 dark:bg-white/[0.055] p-4 transition-all duration-300">
                    <div className="aspect-[4/3] rounded-xl border border-dashed border-slate-200/80 dark:border-white/20 bg-slate-100/50 dark:bg-black/20 p-4 transition-all duration-300">
                      <div className="h-2 w-20 rounded-full bg-slate-300 dark:bg-white/50 transition-colors duration-300" />
                      <div className="mt-5 grid gap-2">
                        <div className="h-8 rounded-lg bg-slate-200/60 dark:bg-white/10 transition-colors duration-300" />
                        <div className="h-8 rounded-lg bg-slate-200/60 dark:bg-white/10 transition-colors duration-300" />
                        <div className="h-8 rounded-lg bg-slate-200/60 dark:bg-white/10 transition-colors duration-300" />
                      </div>
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/45 transition-colors duration-300">Wireframe</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-white/12 bg-slate-50/80 dark:bg-white/[0.055] p-4 transition-all duration-300">
                    <div className="grid grid-cols-3 gap-2">
                      {["#5CF2E8", "#6366F1", "#A855F7", "#EC4899", "#EAF2FF", "#020407"].map((color) => (
                        <span key={color} className="aspect-square rounded-xl border border-slate-200 dark:border-white/12 transition-colors duration-300" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/45 transition-colors duration-300">Color system</p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          <div className="grid gap-5">
            {designShowcase.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="flex gap-4">
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-slate-200 dark:border-white/12 bg-slate-100/50 dark:bg-white/[0.07] text-cyan-600 dark:text-blue-100 transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/58 transition-colors duration-300">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
