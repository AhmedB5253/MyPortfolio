"use client";

import { useEffect, useRef, memo } from "react";

// ─── 3D Math Utilities ───────────────────────────────────────────────────────

interface Vec3 { x: number; y: number; z: number; }
interface Vec2 { x: number; y: number; }

function rotateX(v: Vec3, a: number): Vec3 {
  const cos = Math.cos(a), sin = Math.sin(a);
  return { x: v.x, y: v.y * cos - v.z * sin, z: v.y * sin + v.z * cos };
}
function rotateY(v: Vec3, a: number): Vec3 {
  const cos = Math.cos(a), sin = Math.sin(a);
  return { x: v.x * cos + v.z * sin, y: v.y, z: -v.x * sin + v.z * cos };
}
function rotateZ(v: Vec3, a: number): Vec3 {
  const cos = Math.cos(a), sin = Math.sin(a);
  return { x: v.x * cos - v.y * sin, y: v.x * sin + v.y * cos, z: v.z };
}
function project(v: Vec3, fov: number, cx: number, cy: number): Vec2 {
  const z = v.z + fov;
  const scale = fov / (z < 1 ? 1 : z);
  return { x: cx + v.x * scale, y: cy + v.y * scale };
}

// ─── Geometry Generators ─────────────────────────────────────────────────────

function makeOcta(r: number): { verts: Vec3[]; edges: [number, number][] } {
  const verts: Vec3[] = [
    { x: r, y: 0, z: 0 }, { x: -r, y: 0, z: 0 },
    { x: 0, y: r, z: 0 }, { x: 0, y: -r, z: 0 },
    { x: 0, y: 0, z: r }, { x: 0, y: 0, z: -r },
  ];
  const edges: [number, number][] = [
    [0,2],[0,3],[0,4],[0,5],
    [1,2],[1,3],[1,4],[1,5],
    [2,4],[2,5],[3,4],[3,5],
  ];
  return { verts, edges };
}

function makeIco(r: number): { verts: Vec3[]; edges: [number, number][] } {
  const phi = (1 + Math.sqrt(5)) / 2;
  const a = r, b = r / phi;
  const verts: Vec3[] = [
    { x: 0, y: b, z: -a }, { x: b, y: a, z: 0 }, { x: -b, y: a, z: 0 },
    { x: 0, y: b, z: a }, { x: 0, y: -b, z: a }, { x: -a, y: 0, z: b },
    { x: 0, y: -b, z: -a }, { x: a, y: 0, z: -b }, { x: a, y: 0, z: b },
    { x: -a, y: 0, z: -b }, { x: b, y: -a, z: 0 }, { x: -b, y: -a, z: 0 },
  ];
  const edges: [number, number][] = [
    [0,1],[0,2],[0,6],[0,7],[0,9],
    [1,2],[1,3],[1,7],[1,8],
    [2,3],[2,5],[2,9],
    [3,4],[3,5],[3,8],
    [4,5],[4,8],[4,10],[4,11],
    [5,9],[5,11],
    [6,7],[6,9],[6,10],
    [7,8],[7,10],
    [8,10],
    [9,11],[10,11],
  ];
  return { verts, edges };
}

function makeCube(r: number): { verts: Vec3[]; edges: [number, number][] } {
  const h = r * 0.7;
  const verts: Vec3[] = [
    { x: -h, y: -h, z: -h }, { x: h, y: -h, z: -h },
    { x: h, y: h, z: -h },  { x: -h, y: h, z: -h },
    { x: -h, y: -h, z: h },  { x: h, y: -h, z: h },
    { x: h, y: h, z: h },   { x: -h, y: h, z: h },
  ];
  const edges: [number, number][] = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7],
  ];
  return { verts, edges };
}

function makeTorus(R: number, r: number, segs: number, rings: number): { verts: Vec3[]; edges: [number, number][] } {
  const verts: Vec3[] = [];
  for (let i = 0; i < rings; i++) {
    const theta = (i / rings) * Math.PI * 2;
    for (let j = 0; j < segs; j++) {
      const phi = (j / segs) * Math.PI * 2;
      verts.push({
        x: (R + r * Math.cos(phi)) * Math.cos(theta),
        y: r * Math.sin(phi),
        z: (R + r * Math.cos(phi)) * Math.sin(theta),
      });
    }
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < segs; j++) {
      const a = i * segs + j;
      const b = i * segs + (j + 1) % segs;
      const c = ((i + 1) % rings) * segs + j;
      edges.push([a, b], [a, c]);
    }
  }
  return { verts, edges };
}

function makeTetra(r: number): { verts: Vec3[]; edges: [number, number][] } {
  const verts: Vec3[] = [
    { x: 0, y: r, z: 0 },
    { x: r * 0.94, y: -r * 0.33, z: 0 },
    { x: -r * 0.47, y: -r * 0.33, z: r * 0.82 },
    { x: -r * 0.47, y: -r * 0.33, z: -r * 0.82 },
  ];
  const edges: [number, number][] = [
    [0,1],[0,2],[0,3],[1,2],[1,3],[2,3],
  ];
  return { verts, edges };
}

// ─── Shape Instance ───────────────────────────────────────────────────────────

interface Shape {
  verts: Vec3[];
  edges: [number, number][];
  rx: number; ry: number; rz: number;  // current Euler angles
  drx: number; dry: number; drz: number; // per-frame rotation deltas
  cx: number; cy: number; cz: number;   // center offset in 3D space
  hue: number;
  alpha: number;
  lineWidth: number;
  glowWidth: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const WireframeBg = memo(function WireframeBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const shapesRef = useRef<Shape[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const w = (parent?.getBoundingClientRect().width) || window.innerWidth;
      const h = (parent?.getBoundingClientRect().height) || window.innerHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      if (shapesRef.current.length === 0) initShapes(w, h);
    }

    function initShapes(w: number, h: number) {
      const cx = w / 2, cy = h / 2;
      const base = Math.min(w, h);

      shapesRef.current = [
        // Icosphere — left-center background, cyan
        {
          ...makeIco(base * 0.11),
          rx: 0.4, ry: 0.2, rz: 0.1,
          drx: 0.0007, dry: 0.0011, drz: 0.0004,
          cx: cx - w * 0.28, cy: cy - h * 0.08, cz: -80,
          hue: 180, alpha: 0.5, lineWidth: 0.7, glowWidth: 6,
        },
        // Torus — right-center, violet
        {
          ...makeTorus(base * 0.09, base * 0.032, 16, 24),
          rx: 0.8, ry: 0, rz: 0.4,
          drx: 0.0006, dry: 0.0008, drz: 0.0003,
          cx: cx + w * 0.30, cy: cy - h * 0.15, cz: -40,
          hue: 265, alpha: 0.45, lineWidth: 0.6, glowWidth: 5,
        },
        // Octahedron — top center, cyan-teal
        {
          ...makeOcta(base * 0.08),
          rx: 0.2, ry: 0.9, rz: 0.3,
          drx: 0.0009, dry: 0.0006, drz: 0.0007,
          cx: cx + w * 0.04, cy: cy - h * 0.30, cz: -60,
          hue: 195, alpha: 0.4, lineWidth: 0.65, glowWidth: 5,
        },
        // Cube — bottom-right, violet-pink
        {
          ...makeCube(base * 0.085),
          rx: 0.5, ry: 0.3, rz: 0.7,
          drx: 0.0005, dry: 0.001, drz: 0.0006,
          cx: cx + w * 0.22, cy: cy + h * 0.28, cz: -100,
          hue: 290, alpha: 0.35, lineWidth: 0.7, glowWidth: 5,
        },
        // Tetrahedron — bottom-left, amber-cyan
        {
          ...makeTetra(base * 0.075),
          rx: 1.0, ry: 0.4, rz: 0.8,
          drx: 0.001, dry: 0.0007, drz: 0.0005,
          cx: cx - w * 0.32, cy: cy + h * 0.22, cz: -50,
          hue: 220, alpha: 0.38, lineWidth: 0.6, glowWidth: 4,
        },
      ];
    }

    function drawShape(shape: Shape, w: number, h: number, mx: number, my: number, glowGrad: CanvasGradient, coreGrad: CanvasGradient) {
      const fov = 600;
      const cx = w / 2, cy = h / 2;

      // Apply autonomous rotation
      shape.rx += shape.drx;
      shape.ry += shape.dry;
      shape.rz += shape.drz;

      // Apply subtle mouse tilt (max ±0.12 rad)
      const mouseTiltX = my * 0.12;
      const mouseTiltY = mx * 0.12;

      // Transform all vertices
      const projected: Vec2[] = shape.verts.map(v => {
        let p = { x: v.x, y: v.y, z: v.z };
        p = rotateX(p, shape.rx + mouseTiltX);
        p = rotateY(p, shape.ry + mouseTiltY);
        p = rotateZ(p, shape.rz);
        p.x += shape.cx - cx;
        p.y += shape.cy - cy;
        p.z += shape.cz;
        return project(p, fov, cx, cy);
      });

      // Glow pass (batched for performance)
      ctx!.save();
      ctx!.globalAlpha = shape.alpha * 0.35; // slightly increased glow vibrancy
      ctx!.strokeStyle = glowGrad;
      ctx!.lineWidth = shape.glowWidth;
      ctx!.lineCap = "round";
      ctx!.beginPath();
      for (const [a, b] of shape.edges) {
        const p1 = projected[a];
        const p2 = projected[b];
        if (p1 && p2) {
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
        }
      }
      ctx!.stroke();
      ctx!.restore();

      // Core line pass (batched for performance)
      ctx!.save();
      ctx!.globalAlpha = shape.alpha;
      ctx!.strokeStyle = coreGrad;
      ctx!.lineWidth = shape.lineWidth;
      ctx!.lineCap = "round";
      ctx!.beginPath();
      for (const [a, b] of shape.edges) {
        const p1 = projected[a];
        const p2 = projected[b];
        if (p1 && p2) {
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
        }
      }
      ctx!.stroke();
      ctx!.restore();
    }

    function tick() {
      const { w, h } = sizeRef.current;
      const m = mouseRef.current;

      // Lerp mouse
      m.x += (m.tx - m.x) * 0.06;
      m.y += (m.ty - m.y) * 0.06;

      if (w > 0 && h > 0) {
        ctx!.clearRect(0, 0, w, h);
        ctx!.globalCompositeOperation = "source-over";

        // Create beautiful horizontal gradient matching the website's branding
        const glowGrad = ctx!.createLinearGradient(0, 0, w, 0);
        glowGrad.addColorStop(0, "rgba(92, 242, 232, 0.9)");   // Branding Cyan
        glowGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.9)"); // Sky Blue
        glowGrad.addColorStop(1, "rgba(139, 92, 246, 0.9)");   // Violet

        const coreGrad = ctx!.createLinearGradient(0, 0, w, 0);
        coreGrad.addColorStop(0, "rgba(224, 253, 252, 0.95)"); // Soft Cyan/white core
        coreGrad.addColorStop(0.5, "rgba(230, 247, 255, 0.95)"); // Soft Blue/white core
        coreGrad.addColorStop(1, "rgba(240, 230, 255, 0.95)"); // Soft Violet/white core

        for (const shape of shapesRef.current) {
          try {
            drawShape(shape, w, h, m.x, m.y, glowGrad, coreGrad);
          } catch (_) {}
        }
      }

      timeRef.current++;
      rafRef.current = requestAnimationFrame(tick);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.ty = (e.clientY / window.innerHeight) - 0.5;
    };

    const ro = new ResizeObserver(resize);
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
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
});

export default WireframeBg;
