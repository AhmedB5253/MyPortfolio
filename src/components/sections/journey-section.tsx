"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookOpen, BrainCircuit, HeartHandshake, BarChart3 } from "lucide-react";

export function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const learningItems = [
    {
      icon: BrainCircuit,
      category: "AI & Machine Learning",
      title: "Algorithms & Predictive Intelligence",
      detail: "Actively studying the Python data ecosystem (NumPy, Pandas, Scikit-Learn) and neural network basics to build interactive frontend wrappers for predictive algorithms.",
      color: "from-amber-400 to-amber-200"
    },
    {
      icon: BarChart3,
      category: "Data Analytics & Viz",
      title: "Exploratory Analysis & Visualization",
      detail: "Leveraging Python tools (Pandas, Seaborn, Matplotlib) to perform exploratory data analysis, extract structured insights, and build interactive dashboard storytelling systems.",
      color: "from-cyan-400 to-cyan-200"
    },
    {
      icon: BookOpen,
      category: "Academic Focus",
      title: "Bachelor of Computer Applications (BCA)",
      detail: "Pursuing formal foundations in computer science, software engineering workflows, and system analysis at SVIMS College, Indore.",
      color: "from-blue-400 to-blue-200"
    },
    {
      icon: HeartHandshake,
      category: "Ethical Blueprint",
      title: "Community & Dawoodi Bohra Values",
      detail: "Applying standard personal values of extreme dedication, precision, trustworthiness, and ethical discipline to my software craftsmanship and peer collaborations.",
      color: "from-emerald-400 to-emerald-200"
    }
  ];

  return (
    <section id="journey" className="relative" ref={ref}>
      <div className="section-shell">
        <SectionHeading
          eyebrow="Active Horizons"
          title={<>What I am currently focusing on & learning.</>}
          copy="Continuous curiosity is the defining characteristic of my growth mindset. I am actively expanding my skillset beyond standard frontend layouts."
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Vertical Timeline Guide Lines */}
          <div className="absolute left-4 top-0 h-full w-px bg-slate-200 dark:bg-white/10 md:left-1/2 transition-colors duration-300" />
          <motion.div 
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-400 via-blue-400 to-emerald-400 md:left-1/2" 
            style={{ scaleY }} 
          />

          <div className="space-y-12">
            {learningItems.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  className="relative grid gap-6 pl-12 md:grid-cols-2 md:pl-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
                >
                  {/* Timeline Node Icon Pin */}
                  <div className="absolute left-0 top-6 z-10 grid size-9 place-items-center rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-950 text-slate-800 dark:text-white shadow-lg md:left-1/2 md:-translate-x-1/2 transition-all duration-300">
                    <Icon size={16} className="text-cyan-600 dark:text-cyan-300 animate-pulse" />
                  </div>

                  <div className={`glass rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-cyan-300/30 dark:hover:border-cyan-300/20 hover:bg-slate-50/50 dark:hover:bg-white/[0.04] group ${
                    isEven ? "md:text-right" : "md:col-start-2"
                  }`}>
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[3rem] bg-white/[0.02] pointer-events-none" />
                    
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-200 transition-colors duration-300">
                      {item.category}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300 dark:group-hover:text-cyan-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60 transition-colors duration-300">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
