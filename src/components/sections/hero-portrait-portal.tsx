"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent, useMemo } from "react";

const particles = [
  { x: "8%", y: "23%", size: 8, delay: 0 },
  { x: "86%", y: "18%", size: 5, delay: 0.35 },
  { x: "92%", y: "62%", size: 9, delay: 0.7 },
  { x: "16%", y: "74%", size: 6, delay: 1.05 },
  { x: "72%", y: "86%", size: 4, delay: 1.4 },
  { x: "34%", y: "8%", size: 5, delay: 1.75 },
];

export function HeroPortraitPortal() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 18, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 18, mass: 0.4 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["35%", "65%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["35%", "65%"]);
  const auraX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const auraY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const highlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.24), transparent 28%)`;

  const { scrollY } = useScroll();
  const auraScrollY = useTransform(scrollY, [0, 800], [0, 160]);
  const outerBorderScrollY = useTransform(scrollY, [0, 800], [0, 95]);
  const innerCardScrollY = useTransform(scrollY, [0, 800], [0, 45]);

  const orbitParticles = useMemo(() => particles, []);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[285px] sm:max-w-[390px] lg:max-w-[470px]"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label="Animated portrait of Ahmed Bhawrasawala"
    >
      <motion.div
        className="absolute inset-[-18%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(92,242,232,0.28), transparent 36%), radial-gradient(circle at 58% 26%, rgba(122,167,255,0.24), transparent 32%)",
          x: reduceMotion ? 0 : auraX,
          y: reduceMotion ? 0 : auraY,
          translateY: reduceMotion ? 0 : auraScrollY,
        }}
      />

      <motion.div
        className="absolute inset-[-7%] rounded-full border border-cyan-200/18"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 90deg, transparent 0deg, rgba(92,242,232,0.78) 58deg, transparent 116deg, rgba(122,167,255,0.66) 188deg, transparent 250deg, rgba(255,255,255,0.38) 320deg, transparent 360deg)",
          padding: 1,
          translateY: reduceMotion ? 0 : outerBorderScrollY,
        }}
      />

      <motion.div
        className="absolute inset-[-2%] rounded-full border border-emerald-200/18"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      />

      {orbitParticles.map((particle, index) => (
        <motion.span
          key={`${particle.x}-${particle.y}`}
          className="absolute z-20 rounded-full bg-cyan-100 shadow-[0_0_24px_rgba(92,242,232,0.68)]"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, index % 2 ? -14 : 14, 0],
                  opacity: [0.38, 0.9, 0.38],
                  scale: [0.85, 1.18, 0.85],
                }
          }
          transition={{
            duration: 4.2 + index * 0.35,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/18 bg-[#05070a]/58 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:rounded-[2.4rem]"
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
          translateY: reduceMotion ? 0 : innerCardScrollY,
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-70"
          style={{
            background: highlight,
          }}
        />
        <div className="pointer-events-none absolute inset-3 z-20 rounded-[1.45rem] border border-white/12 sm:rounded-[1.85rem]" />
        <div className="pointer-events-none absolute inset-3 z-20 rounded-[1.45rem] bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.18)_42%,transparent_58%)] opacity-45 mix-blend-screen sm:rounded-[1.85rem]" />
        <div className="pointer-events-none absolute inset-3 z-20 rounded-[1.45rem] opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.95)_1px,transparent_1px)] [background-size:100%_7px] sm:rounded-[1.85rem]" />

        <div className="relative aspect-[0.84] overflow-hidden rounded-[1.45rem] bg-slate-900 sm:rounded-[1.85rem]">
          <Image
            src="/ahmed-portrait.png"
            alt="Ahmed Bhawrasawala portrait"
            fill
            priority
            sizes="(max-width: 768px) 82vw, 430px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,transparent_58%,rgba(5,7,13,0.18)_100%)]" />
        </div>
      </motion.div>

      <div className="absolute -bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-200/20 bg-[#05070a]/82 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-100 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(92,255,177,0.72)]" />
        Portfolio Identity
      </div>
    </motion.div>
  );
}
