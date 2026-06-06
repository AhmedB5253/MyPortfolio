import { owner, navItems, socials } from "@/lib/data";
import Link from "next/link";

export function Footer() {

  return (
    <footer className="relative bg-[#fafafc] dark:bg-[#020406] pt-40 md:pt-48 pb-12 px-4 overflow-hidden border-t border-slate-200/60 dark:border-white/[0.03] transition-colors duration-300">
      {/* Volumetric background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(circle_at_50%_0%,rgba(92,242,232,0.03),transparent_70%)] pointer-events-none select-none" />

      <div className="mx-auto w-[min(1180px,calc(100%-32px))] relative z-10 flex flex-col gap-12">
        
        {/* Main Footer Row */}
        <div className="grid gap-8 md:grid-cols-3 items-start border-b border-slate-200/60 dark:border-white/5 pb-12 transition-colors duration-300">
          
          {/* Column 1: Identity Signature */}
          <div className="space-y-3">
            <h4 className="font-display text-xl font-bold text-slate-800 dark:text-white tracking-wide transition-colors duration-300">
              {owner.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-white/50 leading-relaxed max-w-xs transition-colors duration-300">
              Frontend Developer & UI/UX Designer crafting cinematic, performance-optimized digital brand systems.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-white/30 transition-colors duration-300">
              Quick Links
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-hover="open"
                  className="text-xs text-slate-600 hover:text-indigo-600 dark:text-white/60 dark:hover:text-cyan-300 transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Social Signature Deck */}
          <div className="space-y-3 md:justify-self-end">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-white/30 block md:text-right transition-colors duration-300">
              Social Connect
            </span>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                if (!Icon) return null;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    data-hover="open"
                    className="focus-ring grid size-9 place-items-center rounded-lg border border-slate-200 bg-white/40 text-slate-500 hover:text-slate-900 hover:border-indigo-300/30 dark:border-white/5 dark:bg-white/[0.02] dark:text-white/50 dark:hover:text-white dark:hover:border-cyan-300/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Bottom Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-white/40 font-mono transition-colors duration-300">
          <p>© {new Date().getFullYear()} Ahmed Bhawrasa. Crafted with absolute precision.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 animate-pulse" /> Indore, India</span>
            <span>Dawoodi Bohra Community Integrity</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
