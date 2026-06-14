"use client";

import { useEffect, useRef, memo } from "react";

/**
 * Pure-canvas hero background — no external libraries.
 * Runs a continuous requestAnimationFrame loop.
 * Theme changes are handled by reading the DOM class every frame
 * and lerp-ing colors smoothly — NO restart, NO flash.
 */
export const InteractiveCanvasBg = memo(function InteractiveCanvasBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Resize ──────────────────────────────────────────────────────────────
    function resize() {
      if (!canvas) return;
      const w = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      const h = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ── Star particles ───────────────────────────────────────────────────────
    interface Star {
      x: number; y: number;
      size: number;
      alpha: number; baseAlpha: number;
      phase: number; phaseSpeed: number;
      vx: number; vy: number;
      hue: number;
    }

    const STAR_COUNT = 110;
    const stars: Star[] = [];

    function initStars() {
      if (!canvas) return;
      stars.length = 0;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const hues = [210, 230, 260, 280, 300, 185]; // cool blues, violets, cyan
      for (let i = 0; i < STAR_COUNT; i++) {
        const base = 0.15 + Math.random() * 0.65;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 0.4 + Math.random() * 1.4,
          alpha: 0,
          baseAlpha: base,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.005 + Math.random() * 0.012,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.10,
          hue: hues[Math.floor(Math.random() * hues.length)],
        });
      }
    }

    // ── Aurora orbs ─────────────────────────────────────────────────────────
    interface Orb {
      xPct: number; yPct: number;
      radiusPct: number;
      hue: number;
      lightAlpha: number;  // target opacity in light mode
      darkAlpha: number;   // target opacity in dark mode
      currentAlpha: number;
      phase: number; speed: number;
    }

    const orbs: Orb[] = [
      { xPct: 0.15, yPct: 0.35, radiusPct: 0.42, hue: 245, lightAlpha: 0.18, darkAlpha: 0.12, currentAlpha: 0, phase: 0,   speed: 0.00018 },
      { xPct: 0.82, yPct: 0.22, radiusPct: 0.48, hue: 220, lightAlpha: 0.14, darkAlpha: 0.10, currentAlpha: 0, phase: 1.8, speed: 0.00013 },
      { xPct: 0.48, yPct: 0.72, radiusPct: 0.38, hue: 185, lightAlpha: 0.12, darkAlpha: 0.08, currentAlpha: 0, phase: 3.2, speed: 0.00022 },
      { xPct: 0.75, yPct: 0.78, radiusPct: 0.32, hue: 290, lightAlpha: 0.14, darkAlpha: 0.09, currentAlpha: 0, phase: 4.5, speed: 0.00016 },
    ];

    // ── State ────────────────────────────────────────────────────────────────
    let t = 0;
    let isDark = document.documentElement.classList.contains("dark");
    // Smooth theme-transition factor (0 = full light, 1 = full dark)
    let themeFactor = isDark ? 1 : 0;

    // ── Draw loop ────────────────────────────────────────────────────────────
    function tick() {
      t++;
      if (!canvas) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Read theme each frame and smoothly lerp transition factor
      const targetDark = document.documentElement.classList.contains("dark") ? 1 : 0;
      themeFactor += (targetDark - themeFactor) * 0.04; // smooth ~25-frame cross-fade
      isDark = themeFactor > 0.5;

      ctx!.clearRect(0, 0, w, h);

      // Background fill — lerp between light (#fafafc) and dark (#000)
      const bgLight = { r: 250, g: 250, b: 252 };
      const bgDark  = { r: 0,   g: 0,   b: 0   };
      const r = Math.round(bgLight.r + (bgDark.r - bgLight.r) * themeFactor);
      const g = Math.round(bgLight.g + (bgDark.g - bgLight.g) * themeFactor);
      const b = Math.round(bgLight.b + (bgDark.b - bgLight.b) * themeFactor);
      ctx!.fillStyle = `rgb(${r},${g},${b})`;
      ctx!.fillRect(0, 0, w, h);

      // ── Draw aurora orbs ──────────────────────────────────────────────────
      for (const orb of orbs) {
        const driftX = Math.sin(t * orb.speed + orb.phase) * w * 0.015;
        const driftY = Math.cos(t * orb.speed * 0.8 + orb.phase) * h * 0.015;
        const ox = orb.xPct * w + driftX;
        const oy = orb.yPct * h + driftY;

        const targetAlpha = orb.lightAlpha + (orb.darkAlpha - orb.lightAlpha) * themeFactor;
        orb.currentAlpha += (targetAlpha - orb.currentAlpha) * 0.04;

        const breathe = 1 + Math.sin(t * 0.0008 + orb.phase) * 0.04;
        const radius = Math.min(w, h) * orb.radiusPct * breathe;
        if (radius <= 0) continue;

        const grad = ctx!.createRadialGradient(ox, oy, 0, ox, oy, radius);
        const a = Math.max(0, Math.min(1, orb.currentAlpha));
        grad.addColorStop(0,    `hsla(${orb.hue},75%,65%,${a})`);
        grad.addColorStop(0.4,  `hsla(${orb.hue+15},70%,55%,${a * 0.45})`);
        grad.addColorStop(1,    "transparent");

        ctx!.save();
        ctx!.globalCompositeOperation = "source-over";
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      // ── Draw stars ────────────────────────────────────────────────────────
      // Stars only appear in darker conditions — fade with theme factor
      const starOpacityMult = 0.25 + themeFactor * 0.75;

      for (const star of stars) {
        // Drift
        star.x += star.vx;
        star.y += star.vy;
        // Wrap around
        if (star.x < 0)  star.x += w;
        if (star.x > w)  star.x -= w;
        if (star.y < 0)  star.y += h;
        if (star.y > h)  star.y -= h;

        // Twinkle
        const twinkle = 0.3 + 0.7 * Math.sin(t * star.phaseSpeed + star.phase);
        star.alpha = Math.max(0, Math.min(1, star.baseAlpha * twinkle * starOpacityMult));
        if (star.alpha < 0.01) continue;

        // Core dot
        ctx!.fillStyle = `hsla(${star.hue},90%,98%,${star.alpha})`;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx!.fill();

        // Soft glow for brighter stars
        if (star.size > 0.85 && star.alpha > 0.35) {
          const gGrad = ctx!.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3.5);
          gGrad.addColorStop(0, `hsla(${star.hue},90%,90%,${star.alpha * 0.28})`);
          gGrad.addColorStop(1, "transparent");
          ctx!.fillStyle = gGrad;
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, star.size * 3.5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    // ── Boot ─────────────────────────────────────────────────────────────────
    resize();
    initStars();
    rafRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      resize();
      initStars();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
      aria-hidden="true"
    />
  );
});

export default InteractiveCanvasBg;
