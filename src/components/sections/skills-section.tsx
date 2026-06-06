"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { skillGroups } from "@/lib/data";

const accentMap = {
  cyan: "text-cyan-600 dark:text-cyan-200 bg-cyan-50/50 dark:bg-cyan-200/10 border-cyan-200/60 dark:border-cyan-200/20",
  blue: "text-blue-600 dark:text-blue-200 bg-blue-50/50 dark:bg-blue-200/10 border-blue-200/60 dark:border-blue-200/20",
  indigo: "text-indigo-600 dark:text-indigo-200 bg-indigo-50/50 dark:bg-indigo-200/10 border-indigo-200/60 dark:border-indigo-200/20",
  violet: "text-violet-600 dark:text-violet-200 bg-violet-50/50 dark:bg-violet-200/10 border-violet-200/60 dark:border-violet-200/20",
};

export function SkillsSection() {
  return (
    <section id="skills" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Skills & technologies"
          title={<>Learned skills shown through practical capability.</>}
          copy="No percentage bars or inflated stats. Each skill is framed by what it helps build, so recruiters can quickly understand the practical value."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <TiltCard key={group.title} className="p-6 md:p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className={`mb-5 grid size-12 place-items-center rounded-2xl border ${accentMap[group.accent as keyof typeof accentMap]}`}>
                    <group.icon size={22} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">{group.title}</h3>
                </div>
                <span className="rounded-full border border-cyan-200/40 dark:border-cyan-200/20 bg-slate-100/60 dark:bg-slate-950/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-100 transition-all duration-300">
                  Learned
                </span>
              </div>

              <div className="mt-7 grid gap-4">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100/40 dark:bg-black/18 p-4 transition-all duration-300">
                    <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[2rem] bg-white/[0.045]" />
                    <div className="relative">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-display text-xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">{skill.name}</h4>
                        <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider font-bold bg-slate-100/60 dark:bg-slate-950/60 transition-all duration-300 ${
                          group.accent === "cyan" ? "border-cyan-400/30 text-cyan-700 dark:border-cyan-400/20 dark:text-cyan-200" :
                          group.accent === "violet" ? "border-violet-400/30 text-violet-700 dark:border-violet-400/20 dark:text-violet-200" :
                          group.accent === "blue" ? "border-blue-400/30 text-blue-700 dark:border-blue-400/20 dark:text-blue-200" :
                          "border-indigo-400/30 text-indigo-700 dark:border-indigo-400/20 dark:text-indigo-200"
                        }`}>
                          {skill.signal}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/58 transition-colors duration-300">{skill.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
