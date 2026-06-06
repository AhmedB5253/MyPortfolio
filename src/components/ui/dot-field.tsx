"use client";

import { useEffect, useRef, memo } from "react";

const TWO_PI = Math.PI * 2;

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  [key: string]: unknown;
}

const DotField = memo(({
  dotRadius = 3.5,
  dotSpacing = 20,
  cursorRadius = 180,
  cursorForce = 0.12,
  bulgeOnly = true,
  bulgeStrength = 45,
  glowRadius = 220,
  sparkle = true,
  waveAmplitude = 0,
  gradientFrom = "rgba(92, 242, 232, 0.85)",
  gradientTo = "rgba(122, 167, 255, 0.70)",
  glowColor = "rgba(92, 242, 232, 0.15)",
  ...rest
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const lastMoveTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef<Record<string, unknown>>({});
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo };
  const rebuildRef = useRef<(() => void) | null>(null);
  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function doResize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { w, h };
      buildDots(w, h);
    }

    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      const step = (p.dotRadius as number) + (p.dotSpacing as number);
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: Dot[] = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    function onPointerMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        lastMoveTimeRef.current = performance.now();
      } else {
        mouseRef.current.x = -9999;
        mouseRef.current.y = -9999;
      }
    }

    function onPointerLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    const speedInterval = setInterval(updateMouseSpeed, 20);

    let frameCount = 0;

    function tick() {
      frameCount++;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;
      const t = frameCount * 0.02;

      const now = performance.now();
      const timeSinceLastMove = now - lastMoveTimeRef.current;

      let targetEngagement = 0;
      if (m.x !== -9999) {
        const idleDelay = 1200; // ms
        const decayDuration = 1500; // ms
        
        if (timeSinceLastMove < idleDelay) {
          targetEngagement = 1.0;
        } else {
          const elapsed = timeSinceLastMove - idleDelay;
          const progress = Math.min(1.0, elapsed / decayDuration);
          // Cosine ease-in-out for extremely organic, fluid decay
          const ease = (1 - Math.cos(progress * Math.PI)) / 2;
          targetEngagement = 1.0 - ease;
        }
      }

      // Tuned interpolation speeds (from 0.08 to 0.05) for a pillowy, fluid liquid motion feel
      engagement.current += (targetEngagement - engagement.current) * 0.05;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      glowOpacity.current += (eng - glowOpacity.current) * 0.05;

      if (glowEl && m.x !== -9999) {
        glowEl.setAttribute("cx", String(m.x));
        glowEl.setAttribute("cy", String(m.y));
        glowEl.style.opacity = String(glowOpacity.current);
      }

      ctx!.clearRect(0, 0, w, h);

      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, p.gradientFrom as string);
      grad.addColorStop(1, p.gradientTo as string);
      ctx!.fillStyle = grad;

      const cr = p.cursorRadius as number;
      const crSq = cr * cr;
      const rad = (p.dotRadius as number) / 2;
      const isBulge = p.bulgeOnly as boolean;

      ctx!.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        if (!d) continue;
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          if (isBulge) {
            const tVal = 1 - dist / cr;
            const push = tVal * tVal * (p.bulgeStrength as number) * eng;
            const angle = Math.atan2(dy, dx);
            // Soft push transition (0.10) for fluid magnetic movement
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.10;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.10;
          } else {
            const angle = Math.atan2(dy, dx);
            const move = (500 / dist) * (m.speed * (p.cursorForce as number));
            d.vx += Math.cos(angle) * -move;
            d.vy += Math.sin(angle) * -move;
          }
        } else if (isBulge) {
          // Graceful slide back deceleration (0.06) to avoid snapping
          d.sx += (d.ax - d.sx) * 0.06;
          d.sy += (d.ay - d.sy) * 0.06;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if ((p.waveAmplitude as number) > 0) {
          drawY += Math.sin(d.ax * 0.03 + t) * (p.waveAmplitude as number);
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * (p.waveAmplitude as number) * 0.5;
        }

        if (p.sparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          if ((hash % 100) < 3) {
            ctx!.moveTo(drawX + rad * 1.8, drawY);
            ctx!.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
          } else {
            ctx!.moveTo(drawX + rad, drawY);
            ctx!.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx!.moveTo(drawX + rad, drawY);
          ctx!.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx!.fill();

      rafRef.current = requestAnimationFrame(tick);
    }

    const resizeObserver = new ResizeObserver(() => {
      doResize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    doResize();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }

    rafRef.current = requestAnimationFrame(tick);

    rebuildRef.current = () => {
      const p = canvas.parentElement;
      if (!p) return;
      const rect = p.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) buildDots(rect.width, rect.height);
    };

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearInterval(speedInterval);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      if (parent) {
        parent.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className="w-full h-full relative" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = "DotField";

export default DotField;
