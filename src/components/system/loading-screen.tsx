"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSound } from "@/components/system/sound-provider";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { playDrone } = useSound();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle responsive layout detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track mouse coordinates for immersive 3D parallax depth
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simulate premium progress loading
  useEffect(() => {
    const duration = 2400; // 2.4 seconds for cinematic loading feel
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const easeProgress = Math.sin((currentStep / steps) * (Math.PI / 2)) * 100;
      const newProgress = Math.min(easeProgress, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        // Play cinematic ambient sound sweep
        playDrone();
        // Subtle hold at 100% for satisfying visual closure before transitioning
        setTimeout(onComplete, 600);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Compute responsive values — default to desktop sizes until client hydrates
  const mobile = isMobile === true;

  // Parallax offsets (opposite directions to create 3D depth)
  const portraitParallax = {
    x: mousePos.x * (mobile ? 12 : 25),
    y: mousePos.y * (mobile ? 12 : 25),
  };

  const textParallax = {
    x: -mousePos.x * (mobile ? 8 : 15),
    y: -mousePos.y * (mobile ? 8 : 15),
  };

  // Split name for cinematic letter-by-letter reveal
  const nameLetters = "AHMED".split("");

  // Determine if a letter is loaded based on progress:
  // A >= 20%, H >= 40%, M >= 60%, E >= 80%, D >= 100%
  const isLetterLoaded = (index: number) => {
    const threshold = (index + 1) * 20;
    return progress >= threshold;
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#030508" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Volumetric Glowing Backdrop */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle, rgba(92, 242, 232, 0.12) 0%, rgba(122, 167, 255, 0.04) 50%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.2 + (progress / 100) * 0.8,
        }}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          
          {/* PORTRAIT BLOCK (Left on Desktop, Top on Mobile) */}
          <motion.div
            style={portraitParallax}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            exit={{
              scale: 1.35,
              opacity: 0,
              filter: "blur(12px)",
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <div className="relative">
              {/* Ambient Aura behind portrait */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: mobile ? "220px" : "320px",
                  height: mobile ? "220px" : "320px",
                  background:
                    "radial-gradient(circle, rgba(92, 242, 232, 0.45) 0%, rgba(122, 167, 255, 0.20) 50%, transparent 80%)",
                  filter: "blur(45px)",
                  zIndex: -1,
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) scale(${
                    0.85 + (progress / 100) * 0.25
                  })`,
                  opacity: 0.1 + (progress / 100) * 0.9,
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
              />

              {/* Continuous Idle Float container */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 0.5, 0],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="loading-portrait-container"
                style={{
                  width: mobile ? "180px" : "260px",
                  height: mobile ? "180px" : "260px",
                  boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.95), 
                              0 0 ${progress * 0.35}px rgba(92, 242, 232, ${
                    (progress / 100) * 0.35
                  }),
                              0 0 ${progress * 0.15}px rgba(122, 167, 255, ${
                    (progress / 100) * 0.25
                  })`,
                  transition: "box-shadow 0.1s ease",
                }}
              >
                <Image
                  src="/ahmed-portrait.png"
                  alt="Ahmed Bhawrasa Portrait"
                  width={260}
                  height={260}
                  priority
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "20px",
                    filter: `blur(${Math.max(
                      0,
                      12 - (progress / 100) * 12
                    )}px) brightness(${0.2 + (progress / 100) * 0.85}) contrast(${
                      0.85 + (progress / 100) * 0.15
                    })`,
                    transition: "filter 0.05s ease",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* LOADING TEXT & DATA BLOCK (Right on Desktop, Bottom on Mobile) */}
          <motion.div
            style={textParallax}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="flex flex-col items-center md:items-start"
            exit={{
              scale: 3.5,
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <motion.div
              animate={{ y: [2, -4, 2] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
              className="flex flex-col items-center md:items-start w-full max-w-[340px]"
            >
              {/* Premium Character Reveal Name Header */}
              <div className="flex items-baseline gap-2 mb-2">
                <h1
                  className="font-display tracking-[0.24em] font-black text-white leading-none m-0"
                  style={{
                    fontSize: mobile ? "2.6rem" : "3.8rem",
                  }}
                >
                  {nameLetters.map((char, index) => {
                    const loaded = isLetterLoaded(index);
                    return (
                      <motion.span
                        key={index}
                        animate={{
                          opacity: loaded ? 1 : 0.08,
                          filter: loaded ? "blur(0px)" : "blur(4px)",
                          y: loaded ? 0 : 5,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        style={{
                          display: "inline-block",
                          color: loaded ? "#5cf2e8" : "rgba(255, 255, 255, 0.15)",
                          textShadow: loaded
                            ? "0 0 16px rgba(92, 242, 232, 0.35)"
                            : "none",
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </h1>

                {/* Micro Percentage display */}
                <span className="mono-text text-md font-bold ms-1" style={{ color: "#5cf2e8", opacity: 0.85 }}>
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Minimalist Subtext */}
              <p
                className="text-xs uppercase tracking-[0.32em] font-bold opacity-60 mb-5"
                style={{ color: "#a9b0c2" }}
              >
                Personal Brand Portfolio
              </p>

              {/* Custom Linear Progress Bar */}
              <div
                className="w-full relative h-[2.5px] overflow-hidden rounded-[2px] mb-4 bg-slate-900"
              >
                <motion.div
                  className="h-full"
                  style={{
                    background: "linear-gradient(90deg, #7aa7ff, #5cf2e8)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.02 }}
                />
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
