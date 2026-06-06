"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/components/system/theme-provider";

type Particle = {
  angle: number;
  radius: number;
  baseRadius: number;
  speed: number;
  size: number;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function PortraitParticles({ isHovered = false }: { isHovered?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isHoveredRef = useRef(isHovered);
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Generate 850 particles orbiting in a ring shape
    const particleCount = 850;
    const particles: Particle[] = [];

    const colors = isDark 
      ? [
          "rgba(92, 242, 232, 0.45)", // Cyan
          "rgba(168, 85, 247, 0.35)", // Violet
          "rgba(255, 255, 255, 0.25)" // White
        ]
      : [
          "rgba(99, 102, 241, 0.45)", // Indigo
          "rgba(13, 148, 136, 0.35)",  // Teal
          "rgba(79, 70, 229, 0.25)"   // Deep Blue
        ];

    for (let i = 0; i < particleCount; i++) {
      // Ring radius between 110px and 170px
      const baseRadius = 110 + Math.random() * 60;
      const angle = Math.random() * Math.PI * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        angle,
        radius: baseRadius,
        baseRadius,
        speed: (0.001 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : -1),
        size: 0.6 + Math.random() * 1.5,
        color,
        x: width / 2 + Math.cos(angle) * baseRadius,
        y: height / 2 + Math.sin(angle) * baseRadius,
        vx: 0,
        vy: 0
      });
    }

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    let prevHovered = false;
    let blastProgress = 0;

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;
      const cx = width / 2;
      const cy = height / 2;

      const hovered = isHoveredRef.current;
      if (hovered && !prevHovered) {
        blastProgress = 1.0;
      }
      prevHovered = hovered;

      if (blastProgress > 0.001) {
        blastProgress *= 0.91; // smooth exponential decay
      } else {
        blastProgress = 0;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Dynamic speed boost during blast
        const speedMultiplier = 1 + blastProgress * 4.0;
        p.angle += p.speed * speedMultiplier;

        // Pulse/blast radius expansion
        const blastRadiusOffset = blastProgress * 75; // expand up to 75px
        const currentRadius = p.radius + blastRadiusOffset;

        // Target base orbital positions
        const targetX = cx + Math.cos(p.angle) * currentRadius;
        const targetY = cy + Math.sin(p.angle) * currentRadius;

        // Repulsion logic when mouse is close
        let rx = 0;
        let ry = 0;

        if (mActive) {
          const dx = targetX - mx;
          const dy = targetY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelDist = 90; // Proximity threshold

          if (dist < repelDist) {
            const force = (repelDist - dist) / repelDist;
            const angleToMouse = Math.atan2(dy, dx);
            // Repulsion strength
            rx = Math.cos(angleToMouse) * force * 35;
            ry = Math.sin(angleToMouse) * force * 35;
          }
        }

        // Apply smooth interpolation (damping) for organic elasticity
        p.x += (targetX + rx - p.x) * 0.08;
        p.y += (targetY + ry - p.y) * 0.08;

        // Draw particle
        ctx.beginPath();
        // Dynamic sizing during pulse
        const displaySize = p.size * (1 + blastProgress * 0.6);
        ctx.arc(p.x, p.y, displaySize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = isDark ? "#5cf2e8" : "#6366f1";
        // Boost glow during blast
        ctx.shadowBlur = (p.size > 1.2 ? 6 : 0) + blastProgress * 8;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}

export default PortraitParticles;
