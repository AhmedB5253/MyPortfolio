"use client";

import { useEffect, useRef, memo } from "react";

interface Star {
  xPercent: number; // 0 to 1
  yPercent: number; // 0 to 1
  size: number;
  baseAlpha: number;
  alpha: number;
  phase: number;
  phaseSpeed: number;
  depth: number; // 0.15 to 1.0 for parallax depth
  hue: number;
}

interface Nebula {
  xPercent: number;
  yPercent: number;
  radiusPercent: number; // radius relative to Math.min(w, h)
  hue: number;
  alpha: number;
  phase: number;
  speed: number;
  scaleY: number;
  rotation: number;
}

interface Dust {
  xPercent: number;
  yPercent: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  phase: number;
  phaseSpeed: number;
  vx: number;
  vy: number;
  depth: number; // 0.2 to 0.7 for parallax
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  maxLife: number;
  life: number;
  active: boolean;
}

export const SpaceBg = memo(function SpaceBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  
  // Physics and parallax states
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const timeRef = useRef(0);
  
  // Persistent coordinates to prevent popping on resize
  const starsRef = useRef<Star[]>([]);
  const nebulasRef = useRef<Nebula[]>([]);
  const dustRef = useRef<Dust[]>([]);
  
  const shootingStarRef = useRef<ShootingStar>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    length: 0,
    maxLife: 0,
    life: 0,
    active: false,
  });
  
  // Prevent shooting stars from spawning too close together
  const lastShootingStarTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : null;
      
      // Fallback to window dimensions if parent rect is missing or 0
      const w = rect && rect.width > 0 ? rect.width : window.innerWidth;
      const h = rect && rect.height > 0 ? rect.height : window.innerHeight;
      
      if (w === 0 || h === 0) return;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      
      initScene(w, h);
    }

    function initScene(w: number, h: number) {
      // 1. Initialize stars if not already done (moderate-size stars, visible and elegant)
      if (starsRef.current.length === 0) {
        const stars: Star[] = [];
        const starHues = [180, 200, 220, 260, 280, 320]; // Cyan, light blue, soft blue, violet, indigo, magenta
        
        for (let i = 0; i < 170; i++) {
          const depth = 0.15 + Math.random() * 0.85; // depth distribution
          stars.push({
            xPercent: Math.random(),
            yPercent: Math.random(),
            size: (0.55 + Math.random() * 1.25) * (depth * 0.7 + 0.3), // moderate size, clearly visible
            baseAlpha: 0.22 + Math.random() * 0.68,
            alpha: 0,
            phase: Math.random() * Math.PI * 2,
            phaseSpeed: 0.006 + Math.random() * 0.014, // very slow twinkle
            depth,
            hue: starHues[Math.floor(Math.random() * starHues.length)],
          });
        }
        starsRef.current = stars;
      }

      // 2. Initialize nebulas if not already done (slightly brighter than before to avoid complete black screen)
      if (nebulasRef.current.length === 0) {
        nebulasRef.current = [
          {
            xPercent: 0.2,
            yPercent: 0.35,
            radiusPercent: 0.45,
            hue: 260, // Deep purple
            alpha: 0.24,
            phase: 0,
            speed: 0.0002, // extremely slow
            scaleY: 0.7,
            rotation: 0.2,
          },
          {
            xPercent: 0.8,
            yPercent: 0.25,
            radiusPercent: 0.5,
            hue: 220, // Serene blue/indigo
            alpha: 0.20,
            phase: 1.8,
            speed: 0.00015,
            scaleY: 0.65,
            rotation: -0.4,
          },
          {
            xPercent: 0.45,
            yPercent: 0.65,
            radiusPercent: 0.4,
            hue: 185, // Cyan/teal highlight
            alpha: 0.16,
            phase: 3.2,
            speed: 0.00025,
            scaleY: 0.8,
            rotation: 0.55,
          },
          {
            xPercent: 0.75,
            yPercent: 0.75,
            radiusPercent: 0.35,
            hue: 290, // Soft violet/pink
            alpha: 0.18,
            phase: 4.5,
            speed: 0.00018,
            scaleY: 0.75,
            rotation: 1.2,
          },
        ];
      }

      // 3. Initialize cosmic dust particles if not already done (soft, slow floating blobs for layered depth)
      if (dustRef.current.length === 0) {
        const dust: Dust[] = [];
        const dustHues = [185, 220, 260, 290]; // Cyan, blue/indigo, violet, pink
        for (let i = 0; i < 24; i++) {
          const depth = 0.2 + Math.random() * 0.5; // mid-depth parallax
          dust.push({
            xPercent: Math.random(),
            yPercent: Math.random(),
            size: 20 + Math.random() * 32, // soft blobs
            baseAlpha: 0.015 + Math.random() * 0.025, // extremely faint to avoid clutter
            alpha: 0,
            phase: Math.random() * Math.PI * 2,
            phaseSpeed: 0.002 + Math.random() * 0.004, // slow breath
            vx: (Math.random() - 0.5) * 0.0002, // almost static drift
            vy: (Math.random() - 0.5) * 0.0001,
            depth,
            hue: dustHues[Math.floor(Math.random() * dustHues.length)],
          });
        }
        dustRef.current = dust;
      }
    }

    function triggerShootingStar(w: number, h: number) {
      const now = timeRef.current;
      // Enforce at least 600 frames (~10 seconds) cooldown
      if (now - lastShootingStarTimeRef.current < 600) return;

      const angle = Math.PI * 0.15 + Math.random() * Math.PI * 0.1; // Diagonal travel angle
      const speed = 8 + Math.random() * 6;
      
      shootingStarRef.current = {
        x: Math.random() * w * 0.6,
        y: -20, // Start off-screen top
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 70 + Math.random() * 60,
        maxLife: 50 + Math.random() * 25,
        life: 0,
        active: true,
      };
      
      lastShootingStarTimeRef.current = now;
    }

    function updateScene(w: number, h: number) {
      timeRef.current += 1;
      const t = timeRef.current;

      // 1. Lerp mouse offset for ultra-smooth fluid response
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.04;
      m.y += (m.targetY - m.y) * 0.04;

      // 2. Randomly trigger shooting star (approx. every 18 seconds / 1080 frames)
      if (!shootingStarRef.current.active && Math.random() < 0.00085) {
        triggerShootingStar(w, h);
      }

      // 3. Update shooting star life
      const ss = shootingStarRef.current;
      if (ss.active) {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life += 1;
        if (ss.life >= ss.maxLife || ss.x > w + 50 || ss.y > h + 50) {
          ss.active = false;
        }
      }

      // 4. Update dust particle positions
      const dust = dustRef.current;
      for (let i = 0; i < dust.length; i++) {
        const p = dust[i];
        
        // Organic slow float + minor mouse deflection
        const mouseParallaxX = m.x * p.depth * 8;
        const mouseParallaxY = m.y * p.depth * 8;

        p.xPercent += p.vx;
        p.yPercent += p.vy;

        // Wrap around bounds
        if (p.xPercent < 0) p.xPercent += 1.0;
        if (p.xPercent > 1.0) p.xPercent -= 1.0;
        if (p.yPercent < 0) p.yPercent += 1.0;
        if (p.yPercent > 1.0) p.yPercent -= 1.0;
      }
    }

    function draw(w: number, h: number) {
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "source-over";

      const m = mouseRef.current;
      const t = timeRef.current;

      // Draw faint, breathing nebulas
      nebulasRef.current.forEach((neb, i) => {
        // Slow organic drift + mouse deflection
        const driftX = Math.sin(t * neb.speed + neb.phase) * w * 0.015;
        const driftY = Math.cos(t * neb.speed * 0.8 + neb.phase) * h * 0.015;
        
        // Mouse shift (deflects opposite to mouse)
        const mouseShiftX = m.x * -14;
        const mouseShiftY = m.y * -14;
        
        const nebX = neb.xPercent * w + driftX + mouseShiftX;
        const nebY = neb.yPercent * h + driftY + mouseShiftY;

        // Breathe effect on radius
        const breathe = 1 + Math.sin(t * 0.0008 + i) * 0.04;
        const baseRadius = Math.min(w, h) * neb.radiusPercent;
        const r = baseRadius * breathe;

        // Clean bounds check
        if (r <= 0) return;

        ctx!.save();
        ctx!.translate(nebX, nebY);
        ctx!.rotate(neb.rotation + t * 0.00003);
        ctx!.scale(1, neb.scaleY);

        const g = ctx!.createRadialGradient(0, 0, 0, 0, 0, r);
        const clampedAlpha = Math.max(0, Math.min(1, neb.alpha));
        g.addColorStop(0, `hsla(${neb.hue}, 80%, 65%, ${clampedAlpha})`);
        g.addColorStop(0.35, `hsla(${neb.hue + 15}, 75%, 55%, ${clampedAlpha * 0.5})`);
        g.addColorStop(0.7, `hsla(${neb.hue - 20}, 70%, 45%, ${clampedAlpha * 0.15})`);
        g.addColorStop(1, "transparent");

        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(0, 0, r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      });

      // Draw soft cosmic dust particles (large glowing blobs with layered depth)
      const dust = dustRef.current;
      for (let i = 0; i < dust.length; i++) {
        const p = dust[i];

        // Cosmic slow drift
        const driftX = Math.sin(t * 0.00003 + i) * 1.0;
        const driftY = Math.cos(t * 0.00002 + i * 0.7) * 1.0;

        // Parallax offset
        const parallaxX = m.x * p.depth * 20;
        const parallaxY = m.y * p.depth * 20;

        const drawX = p.xPercent * w + driftX + parallaxX;
        const drawY = p.yPercent * h + driftY + parallaxY;

        // Sinusoidal breathe on opacity
        const breathe = 0.4 + 0.6 * Math.sin(t * p.phaseSpeed + p.phase);
        p.alpha = Math.max(0, Math.min(1, p.baseAlpha * breathe));

        if (p.alpha <= 0.002) continue;

        // Draw soft glowing dust particle
        const dg = ctx!.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size);
        dg.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${p.alpha})`);
        dg.addColorStop(0.5, `hsla(${p.hue + 20}, 80%, 65%, ${p.alpha * 0.4})`);
        dg.addColorStop(1, "transparent");

        ctx!.fillStyle = dg;
        ctx!.beginPath();
        ctx!.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Draw twinkling stars
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Cosmic slow drift
        const driftX = Math.sin(t * 0.00004 + i) * 1.2;
        const driftY = Math.cos(t * 0.00002 + i * 0.6) * 1.2;

        // Parallax offset (closer stars shift more than distant ones)
        const parallaxX = m.x * star.depth * 28;
        const parallaxY = m.y * star.depth * 28;

        let drawX = star.xPercent * w + driftX + parallaxX;
        let drawY = star.yPercent * h + driftY + parallaxY;

        // Wrap stars around bounds cleanly
        if (drawX < 0) {
          star.xPercent += 1.0;
          drawX += w;
        }
        if (drawX > w) {
          star.xPercent -= 1.0;
          drawX -= w;
        }
        if (drawY < 0) {
          star.yPercent += 1.0;
          drawY += h;
        }
        if (drawY > h) {
          star.yPercent -= 1.0;
          drawY -= h;
        }

        // Soft sinusoidal twinkle clamped to strictly [0, 1] to prevent browser parse errors
        const twinkle = 0.35 + 0.65 * Math.sin(t * star.phaseSpeed + star.phase);
        star.alpha = Math.max(0, Math.min(1, star.baseAlpha * twinkle));

        // Draw star core
        ctx!.fillStyle = `hsla(${star.hue}, 100%, 98%, ${star.alpha})`;
        ctx!.beginPath();
        ctx!.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx!.fill();

        // Draw soft glow for brighter, larger stars
        if (star.size > 0.95 && star.alpha > 0.45) {
          const glowG = ctx!.createRadialGradient(drawX, drawY, 0, drawX, drawY, star.size * 3.5);
          glowG.addColorStop(0, `hsla(${star.hue}, 95%, 85%, ${star.alpha * 0.3})`);
          glowG.addColorStop(1, "transparent");
          ctx!.fillStyle = glowG;
          ctx!.beginPath();
          ctx!.arc(drawX, drawY, star.size * 3.5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Draw shooting star
      const ss = shootingStarRef.current;
      if (ss.active) {
        const lifeRatio = ss.life / ss.maxLife;
        const fade = lifeRatio < 0.15 ? lifeRatio / 0.15 : 1 - lifeRatio;
        const alpha = Math.max(0, Math.min(1, fade * 0.8));

        ctx!.save();
        // Path gradient for tail fade
        const startX = ss.x - ss.vx * (ss.length / 15);
        const startY = ss.y - ss.vy * (ss.length / 15);
        
        const grad = ctx!.createLinearGradient(startX, startY, ss.x, ss.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.3, `rgba(180, 220, 255, ${alpha * 0.15})`);
        grad.addColorStop(0.8, `rgba(139, 92, 246, ${alpha * 0.5})`); // violet tail core
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`); // white head

        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.6;
        ctx!.beginPath();
        ctx!.moveTo(startX, startY);
        ctx!.lineTo(ss.x, ss.y);
        ctx!.stroke();

        // Extra glowing head
        const headG = ctx!.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 4);
        headG.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        headG.addColorStop(0.4, `rgba(180, 220, 255, ${alpha * 0.6})`);
        headG.addColorStop(1, "transparent");
        ctx!.fillStyle = headG;
        ctx!.beginPath();
        ctx!.arc(ss.x, ss.y, 4, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.restore();
      }
    }

    function tick() {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        try {
          updateScene(w, h);
          draw(w, h);
        } catch (err) {
          console.error("Error drawing space background canvas:", err);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    const onMouseMove = (e: MouseEvent) => {
      // Map mouse position to normal coordinates [-0.5, 0.5] relative to center
      const targetX = (e.clientX / window.innerWidth) - 0.5;
      const targetY = (e.clientY / window.innerHeight) - 0.5;
      
      mouseRef.current.targetX = targetX;
      mouseRef.current.targetY = targetY;
    };

    const ro = new ResizeObserver(() => {
      resize();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
});

export default SpaceBg;
