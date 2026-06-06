"use client";

import { Quote, Trophy } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Fresher highlights"
          title={<>Clear strengths without pretending to have experience.</>}
          copy="This section keeps the profile honest: current learning focus, portfolio direction, and first-opportunity readiness."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item: { name: string; quote: string; role: string }, index: number) => (
            <Reveal key={item.name} delay={index * 0.06} className="glass rounded-2xl p-6">
              <Quote className="text-cyan-600 dark:text-cyan-100/70 transition-colors duration-300" size={28} />
              <p className="mt-6 text-base leading-8 text-slate-600 dark:text-white/68 transition-colors duration-300">{item.quote}</p>
              <div className="mt-8 border-t border-slate-200 dark:border-white/10 pt-5 transition-colors duration-300">
                <p className="font-display text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">{item.name}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-white/45 transition-colors duration-300">{item.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 rounded-2xl border border-amber-200/30 dark:border-amber-200/16 bg-amber-50/50 dark:bg-amber-200/[0.055] p-6 text-amber-900 dark:text-amber-50 backdrop-blur-xl transition-all duration-300">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-amber-200/30 dark:border-amber-200/20 bg-amber-100/50 dark:bg-amber-200/10 transition-colors duration-300">
                <Trophy size={22} className="text-amber-600 dark:text-amber-300 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-amber-950 dark:text-white transition-colors duration-300">Portfolio strategy highlight</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-white/62 transition-colors duration-300">
                  The site is structured for a fresher profile: strong first impression, honest skills, practical project cards, learning journey, and a direct contact path.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
