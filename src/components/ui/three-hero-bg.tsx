"use client";

import { useEffect, useRef, memo } from "react";
import * as THREE from "three";

export const ThreeDHeroBg = memo(function ThreeDHeroBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ─── Scene Setup ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    let cameraTargetZ = 22;
    camera.position.set(0, 4, cameraTargetZ);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Rotation & Interaction Group
    const group = new THREE.Group();
    scene.add(group);

    // Timer for animations (replacement for deprecated THREE.Clock)
    const clock = new THREE.Timer();
    clock.connect(document); // auto-pause when tab hidden

    // ─── Volumetric Cyber Grid ──────────────────────────────────────────────
    const gridRows = 30;
    const gridCols = 30;
    const gridWidth = 70;
    const gridDepth = 70;
    const gridGeom = new THREE.PlaneGeometry(gridWidth, gridDepth, gridRows, gridCols);
    gridGeom.rotateX(-Math.PI / 2); // Lay flat
    gridGeom.translate(0, -6, 0); // Position below the main viewport focus

    // We'll store the original Y values for referencing
    const originalPositions = gridGeom.attributes.position.clone();

    // Semi-transparent glowing Cyan material
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x5cf2e8,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const gridMesh = new THREE.LineSegments(
      new THREE.WireframeGeometry(gridGeom),
      gridMat
    );
    group.add(gridMesh);

    // Click Ripple State
    const ripple = {
      active: false,
      x: 0,
      z: 0,
      startTime: 0,
      speed: 26,
      maxDuration: 2.2,
    };

    // ─── Floating Wireframe Geometries ─────────────────────────────────────
    interface ShapeData {
      mesh: THREE.Object3D;
      material: THREE.Material;
      basePos: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      floatSeed: number;
      isHovered: boolean;
      targetScale: number;
      baseColor: number;
    }

    const shapes: ShapeData[] = [];

    // Colors
    const cyanColor = 0x5cf2e8;
    const violetColor = 0xa855f7;
    const indigoColor = 0x6366f1;

    // Helper to configure a floating wireframe shape
    function createShape(
      geometry: THREE.BufferGeometry,
      color: number,
      pos: THREE.Vector3,
      useEdges: boolean = false
    ) {
      let object: THREE.Object3D;
      let mat: THREE.Material;

      if (useEdges) {
        const edges = new THREE.EdgesGeometry(geometry);
        mat = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.45,
          blending: THREE.AdditiveBlending,
        });
        object = new THREE.LineSegments(edges, mat);
      } else {
        mat = new THREE.MeshBasicMaterial({
          color: color,
          wireframe: true,
          transparent: true,
          opacity: 0.40,
          blending: THREE.AdditiveBlending,
        });
        object = new THREE.Mesh(geometry, mat);
      }

      object.position.copy(pos);
      group.add(object);

      shapes.push({
        mesh: object,
        material: mat,
        basePos: pos.clone(),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4 + 0.15,
          (Math.random() - 0.5) * 0.3
        ),
        floatSeed: Math.random() * 100,
        isHovered: false,
        targetScale: 1.0,
        baseColor: color,
      });
    }

    // Shape 1: Cyan Icosphere (left background)
    createShape(
      new THREE.IcosahedronGeometry(2.3, 1),
      cyanColor,
      new THREE.Vector3(-11, 2.5, -3)
    );

    // Shape 2: Violet Torus (right center foreground)
    createShape(
      new THREE.TorusGeometry(1.8, 0.45, 10, 24),
      violetColor,
      new THREE.Vector3(10.5, 3.5, 0),
      true // cleaner edges outline
    );

    // Shape 3: Indigo Octahedron (top center background)
    createShape(
      new THREE.OctahedronGeometry(2.0, 0),
      indigoColor,
      new THREE.Vector3(2.5, 6.5, -5)
    );

    // Shape 4: Violet-Blue Box (bottom right foreground)
    createShape(
      new THREE.BoxGeometry(2.2, 2.2, 2.2),
      violetColor,
      new THREE.Vector3(8.5, -3.5, -2)
    );

    // Shape 5: Cyan Tetrahedron (bottom left background)
    createShape(
      new THREE.TetrahedronGeometry(1.9, 0),
      cyanColor,
      new THREE.Vector3(-10.5, -4.5, -1)
    );

    // ─── Glowing Starfield ──────────────────────────────────────────────────
    const starCount = 350;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorsPalette = [
      new THREE.Color(cyanColor),
      new THREE.Color(violetColor),
      new THREE.Color(indigoColor),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < starCount * 3; i += 3) {
      // Box distribution
      starPos[i] = (Math.random() - 0.5) * 90;     // X
      starPos[i + 1] = (Math.random() - 0.5) * 60; // Y
      starPos[i + 2] = (Math.random() - 0.5) * 45; // Z

      const c = colorsPalette[Math.floor(Math.random() * colorsPalette.length)];
      starColors[i] = c.r;
      starColors[i + 1] = c.g;
      starColors[i + 2] = c.b;
    }

    starGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    // Dynamic circle particle texture
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 16;
    starCanvas.height = 16;
    const starCtx = starCanvas.getContext("2d");
    if (starCtx) {
      const g = starCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.3, "rgba(255,255,255,0.7)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      starCtx.fillStyle = g;
      starCtx.fillRect(0, 0, 16, 16);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starMat = new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      map: starTexture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    // ─── Interaction & Physics Variables ─────────────────────────────────────
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const targetGroupRotation = { x: 0, y: 0 };
    
    // Parallax mouse variables
    const rawMouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };

    // Raycaster for Hover detection
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-9999, -9999); // Start offscreen

    // ─── Event Handlers ──────────────────────────────────────────────────────
    
    // Resize Handler
    function handleResize() {
      if (!container || !canvas) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Drag-to-Rotate mouse listeners
    function onMouseDown(e: MouseEvent) {
      // Ignore clicks on header items or buttons (handled by their click handlers)
      if ((e.target as HTMLElement).closest("a, button")) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }

    function onMouseMove(e: MouseEvent) {
      // Mouse coordinates relative to window center [-0.5, 0.5] for parallax
      rawMouse.x = (e.clientX / window.innerWidth) - 0.5;
      rawMouse.y = (e.clientY / window.innerHeight) - 0.5;

      // Mouse NDC [-1, 1] for raycaster
      const rect = renderer.domElement.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetGroupRotation.y += deltaX * 0.0035;
      targetGroupRotation.x += deltaY * 0.0035;

      // Clamp vertical rotation to avoid flipping upside down
      targetGroupRotation.x = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, targetGroupRotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    }

    function onMouseUp() {
      isDragging = false;
    }

    // Drag-to-Rotate Touch Listeners (Mobile)
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 0) return;
      if ((e.target as HTMLElement).closest("a, button")) return;
      isDragging = true;
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 0) return;
      
      const touch = e.touches[0];
      rawMouse.x = (touch.clientX / window.innerWidth) - 0.5;
      rawMouse.y = (touch.clientY / window.innerHeight) - 0.5;

      if (!isDragging) return;

      const deltaX = touch.clientX - previousMousePosition.x;
      const deltaY = touch.clientY - previousMousePosition.y;

      targetGroupRotation.y += deltaX * 0.0045;
      targetGroupRotation.x += deltaY * 0.0045;

      targetGroupRotation.x = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, targetGroupRotation.x));

      previousMousePosition = {
        x: touch.clientX,
        y: touch.clientY,
      };
    }

    function onTouchEnd() {
      isDragging = false;
    }

    // Scroll Zoom Listener
    function onWheel(e: WheelEvent) {
      // Zoom camera target based on scroll direction
      cameraTargetZ += e.deltaY * 0.007;
      cameraTargetZ = Math.max(13, Math.min(32, cameraTargetZ));
    }

    // Click Ripple trigger
    function onClick(e: MouseEvent) {
      if ((e.target as HTMLElement).closest("a, button")) return;

      // Cast ray to find grid intersection point
      raycaster.setFromCamera(mouseNDC, camera);
      
      // Project mouse into a plane lying flat at Grid Height Y=-5
      const planeY = new THREE.Plane(new THREE.Vector3(0, 1, 0), 5);
      const intersectionPoint = new THREE.Vector3();
      
      if (raycaster.ray.intersectPlane(planeY, intersectionPoint)) {
        // Transform the intersection point into the group's local coordinate space
        const localPoint = intersectionPoint.clone().applyMatrix4(group.matrixWorld.invert());
        
        ripple.x = localPoint.x;
        ripple.z = localPoint.z;
        ripple.startTime = clock.getElapsed();
        ripple.active = true;
      }
    }

    // Add listeners
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("click", onClick);

    // ─── Animation Loop ──────────────────────────────────────────────────────
    let animationFrameId: number;

    function animate(timestamp: number = 0) {
      animationFrameId = requestAnimationFrame(animate);

      // Timer must be updated once per frame before querying elapsed time
      clock.update(timestamp);
      const time = clock.getElapsed();
      const isDarkTheme = document.documentElement.classList.contains("dark");

      // 1. Smoothly Interpolate dragging rotations with damping
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetGroupRotation.y, 0.065);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetGroupRotation.x, 0.065);

      // Continuous subtle idle rotation when not dragging
      if (!isDragging) {
        targetGroupRotation.y += 0.00065; // slow drift
      }

      // 2. Smoothly Interpolate scroll zoom
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraTargetZ, 0.08);

      // 3. Smoothly Interpolate Mouse Parallax Camera Shifting
      smoothMouse.x = THREE.MathUtils.lerp(smoothMouse.x, rawMouse.x, 0.045);
      smoothMouse.y = THREE.MathUtils.lerp(smoothMouse.y, rawMouse.y, 0.045);

      camera.position.x = smoothMouse.x * 5.8;
      camera.position.y = 4.2 - (smoothMouse.y * 3.5);
      camera.lookAt(0, 0, 0);

      // 4. Starfield slow rotation (opposite to group)
      starField.rotation.y = -time * 0.009;
      starField.rotation.x = Math.sin(time * 0.05) * 0.04;

      // Dynamic update of starfield properties based on theme
      starMat.opacity = THREE.MathUtils.lerp(starMat.opacity, isDarkTheme ? 0.75 : 0.08, 0.05);
      starMat.blending = isDarkTheme ? THREE.AdditiveBlending : THREE.NormalBlending;

      // 5. Update Volumetric Grid Waving & Ripple Heights
      const posAttr = gridGeom.attributes.position;
      const rippleElapsed = time - ripple.startTime;

      if (ripple.active && rippleElapsed > ripple.maxDuration) {
        ripple.active = false;
      }

      for (let i = 0; i < posAttr.count; i++) {
        // Read original coordinates
        const x = originalPositions.getX(i);
        const z = originalPositions.getZ(i);

        // Sine wave calculations for normal breathing motion
        const distFromCenter = Math.sqrt(x * x + z * z);
        const normalWave = Math.sin(distFromCenter * 0.08 - time * 1.5) * 1.25 + 
                           Math.cos(x * 0.12 + time * 1.1) * 0.65;

        // Click Ripple Wave displacement
        let rippleWave = 0;
        if (ripple.active) {
          const dx = x - ripple.x;
          const dz = z - ripple.z;
          const distToRipple = Math.sqrt(dx * dx + dz * dz);
          
          const waveFront = rippleElapsed * ripple.speed;
          const waveWidth = 7.0;

          if (distToRipple < waveFront && distToRipple > waveFront - waveWidth) {
            // Smooth progress map [-1, 0] inside ripple shell
            const progress = (distToRipple - waveFront) / waveWidth;
            // Pulse wave strength
            const amplitude = 3.5 * Math.max(0, 1 - (rippleElapsed / ripple.maxDuration));
            rippleWave = Math.sin(progress * Math.PI) * amplitude;
          }
        }

        // Apply updated Y coordinate (and retain Y offset)
        posAttr.setY(i, normalWave + rippleWave);
      }
      posAttr.needsUpdate = true;

      // Update grid color, opacity and blending dynamically
      const targetGridColor = new THREE.Color(isDarkTheme ? 0x5cf2e8 : 0x4f46e5);
      gridMat.color.lerp(targetGridColor, 0.05);
      gridMat.opacity = THREE.MathUtils.lerp(gridMat.opacity, isDarkTheme ? 0.28 : 0.15, 0.05);
      gridMat.blending = isDarkTheme ? THREE.AdditiveBlending : THREE.NormalBlending;

      // 6. Raycast Hover detection on floating meshes
      raycaster.setFromCamera(mouseNDC, camera);
      const intersectableObjects = shapes.map((s) => s.mesh);
      const intersections = raycaster.intersectObjects(intersectableObjects);

      // Reset hover status
      shapes.forEach((s) => (s.isHovered = false));

      if (intersections.length > 0) {
        // Find which shape matches the closest intersection
        const closestMesh = intersections[0].object;
        const matchingShape = shapes.find((s) => s.mesh === closestMesh);
        if (matchingShape) {
          matchingShape.isHovered = true;
        }
      }

      // 7. Update floating shape scales, rotations, and positions
      shapes.forEach((shape) => {
        const floatDelta = Math.sin(time * 0.95 + shape.floatSeed) * 0.35;
        
        // Idle floating vertical drift
        shape.mesh.position.y = shape.basePos.y + floatDelta;

        // Apply direct rotation speed
        const currentRotMultiplier = shape.isHovered ? 2.5 : 1.0;
        shape.mesh.rotation.x += shape.rotSpeed.x * 0.015 * currentRotMultiplier;
        shape.mesh.rotation.y += shape.rotSpeed.y * 0.015 * currentRotMultiplier;
        shape.mesh.rotation.z += shape.rotSpeed.z * 0.012 * currentRotMultiplier;

        // Hover scale sizing
        shape.targetScale = shape.isHovered ? 1.30 : 1.0;
        const currentScale = shape.mesh.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, shape.targetScale, 0.08);
        shape.mesh.scale.setScalar(newScale);

        // Hover color / opacity glow boost
        const mat = shape.material as THREE.LineBasicMaterial | THREE.MeshBasicMaterial;
        mat.blending = isDarkTheme ? THREE.AdditiveBlending : THREE.NormalBlending;

        const targetOpacity = shape.isHovered ? (isDarkTheme ? 0.85 : 0.80) : (isDarkTheme ? 0.40 : 0.50);
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.08);
        
        // Morph floating mesh colors based on current theme targets
        let baseColorHex = shape.baseColor;
        if (shape.baseColor === cyanColor) {
          baseColorHex = isDarkTheme ? cyanColor : 0x0d9488;
        } else if (shape.baseColor === violetColor) {
          baseColorHex = isDarkTheme ? violetColor : 0x7c3aed;
        } else if (shape.baseColor === indigoColor) {
          baseColorHex = isDarkTheme ? indigoColor : 0x4f46e5;
        }

        const colorObj = new THREE.Color(baseColorHex);
        if (shape.isHovered) {
          // Boost brightness when hovered in dark mode, or deepen in light mode
          colorObj.multiplyScalar(isDarkTheme ? 1.25 : 0.85);
        }
        mat.color.lerp(colorObj, 0.08);
      });

      renderer.render(scene, camera);
    }

    animate();

    // ─── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("click", onClick);

      // Traverse & dispose geometries / materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
          if (obj.geometry) obj.geometry.dispose();
          
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      starTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
});

export default ThreeDHeroBg;
