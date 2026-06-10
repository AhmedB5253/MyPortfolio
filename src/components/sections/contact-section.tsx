"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Send, CheckCircle2, ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { owner, socials } from "@/lib/data";

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xkoaoypv", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title={<>Ready to contribute. Let’s talk.</>}
          copy="Connect regarding frontend roles, internship opportunities, UI/UX collaborations, or project builds."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="glass rounded-2xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-100/64">Open to work</p>
            <h3 className="mt-5 font-display text-4xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Frontend roles, UI work, and creative web builds.</h3>
            <p className="mt-5 text-base leading-8 text-slate-600 transition-colors duration-300 dark:text-white/62">
              Reach out for portfolio reviews, frontend development, landing pages, dashboard interfaces, UI/UX concepts, or interactive web experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href={`mailto:${owner.email}`} icon={Mail} data-hover="open">Email me</MagneticButton>
              <MagneticButton href="#projects" icon={ArrowUpRight} variant="ghost" data-hover="view-project">See work</MagneticButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  data-hover="open"
                  className="focus-ring grid size-11 place-items-center rounded-full border border-slate-200 bg-white/40 text-slate-500 hover:text-slate-900 hover:border-indigo-300/30 hover:bg-indigo-50/20 dark:border-white/12 dark:bg-white/[0.055] dark:text-white/68 dark:hover:border-cyan-200/34 dark:hover:text-cyan-100 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="glass rounded-2xl p-5 md:p-7">
            {isSubmitted ? (
              <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center py-12 px-4" aria-live="polite">
                <div className="grid size-16 place-items-center rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-500/20 dark:border-emerald-400/20">
                  <CheckCircle2 size={32} className="animate-bounce" />
                </div>
                <h4 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h4>
                <p className="mt-3 text-sm text-slate-600 dark:text-white/60 max-w-sm leading-relaxed">
                  Thank you for reaching out! I've received your message and will get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  data-hover="open"
                  className="mt-8 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="contact-name" className="text-sm font-semibold text-slate-600 transition-colors duration-300 dark:text-white/68">Name</label>
                    <input id="contact-name" name="name" required className="focus-ring rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500/45 dark:border-white/12 dark:bg-black/24 dark:text-white dark:placeholder:text-white/28 dark:focus:border-cyan-200/45" placeholder="Your name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="contact-email" className="text-sm font-semibold text-slate-600 transition-colors duration-300 dark:text-white/68">Email</label>
                    <input id="contact-email" name="email" required type="email" className="focus-ring rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500/45 dark:border-white/12 dark:bg-black/24 dark:text-white dark:placeholder:text-white/28 dark:focus:border-cyan-200/45" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="contact-project-type" className="text-sm font-semibold text-slate-600 transition-colors duration-300 dark:text-white/68">Project type</label>
                  <div className="relative">
                    <select
                      id="contact-project-type"
                      name="project_type"
                      required
                      defaultValue=""
                      className="w-full focus-ring rounded-2xl border border-slate-200 bg-white/60 pl-4 pr-10 py-3 text-slate-800 outline-none transition appearance-none cursor-pointer focus:border-indigo-500/45 dark:border-white/12 dark:bg-black/24 dark:text-white dark:focus:border-cyan-200/45"
                    >
                      <option value="" disabled className="text-slate-400 dark:text-white/28 bg-white dark:bg-[#0c1017]">Select a skill / project type...</option>
                      <option value="Frontend Development" className="bg-white dark:bg-[#0c1017]">Frontend Development (React/Next.js)</option>
                      <option value="UI/UX Design" className="bg-white dark:bg-[#0c1017]">UI/UX Design (Figma)</option>
                      <option value="Graphic Design" className="bg-white dark:bg-[#0c1017]">Graphic Design (Branding & Assets)</option>
                      <option value="Web Design" className="bg-white dark:bg-[#0c1017]">Web Design (Responsive Layouts)</option>
                      <option value="AI & ML Prototyping" className="bg-white dark:bg-[#0c1017]">AI & ML Prototyping</option>
                      <option value="Other Consultation" className="bg-white dark:bg-[#0c1017]">Other Collaboration</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-white/50">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="contact-message" className="text-sm font-semibold text-slate-600 transition-colors duration-300 dark:text-white/68">Message</label>
                  <textarea id="contact-message" name="message" required rows={6} className="focus-ring resize-none rounded-2xl border border-slate-200 bg-white/60 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500/45 dark:border-white/12 dark:bg-black/24 dark:text-white dark:placeholder:text-white/28 dark:focus:border-cyan-200/45" placeholder="Tell me what you want to build." />
                </div>
                <button type="submit" disabled={isSubmitting} data-hover="open" className="focus-ring group inline-flex items-center justify-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/30 px-5 py-3 text-sm font-bold text-indigo-950 transition hover:bg-indigo-100/50 hover:text-indigo-950 dark:border-cyan-200/35 dark:bg-cyan-200/12 dark:text-cyan-50 dark:hover:bg-cyan-200/20 dark:hover:text-white disabled:opacity-50 disabled:pointer-events-none">
                  {isSubmitting ? "Sending..." : "Send message"}
                  {!isSubmitting && <Send size={16} className="transition group-hover:translate-x-0.5" />}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
