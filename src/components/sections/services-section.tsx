"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data";

export function ServicesSection() {
  return (
    <section id="services" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title={<>Useful ways to turn ideas into polished web experiences.</>}
          copy="Service cards are written for clients and recruiters: direct, practical, and focused on interface outcomes."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.04}>
              <TiltCard className="h-full p-6 md:p-7">
                <div className="grid size-12 place-items-center rounded-2xl border border-slate-200 dark:border-white/12 bg-slate-100/60 dark:bg-white/[0.07] text-cyan-600 dark:text-cyan-100 transition-all duration-300">
                  <service.icon size={22} />
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold text-slate-900 dark:text-white transition-colors duration-300">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500 transition-colors duration-300">{service.detail}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
