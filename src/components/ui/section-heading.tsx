import { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, copy, align = "center" }: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-600 dark:text-cyan-300 transition-colors duration-300">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] text-slate-900 dark:text-white text-balance md:text-6xl transition-colors duration-300">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-600 dark:text-white/62 md:text-lg transition-colors duration-300">{copy}</p>
    </Reveal>
  );
}
