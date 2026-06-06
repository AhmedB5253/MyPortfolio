"use client";

import { useEffect, memo } from "react";

export const InteractiveCanvasBg = memo(function InteractiveCanvasBg() {
  const containerId = "particles-js-container";

  useEffect(() => {
    // To avoid SSR issues
    if (typeof window === "undefined") return;

    let isMounted = true;
    let scriptElement: HTMLScriptElement | null = null;

    const getConfig = (isDark: boolean) => {
      return {
        particles: {
          number: {
            value: 120,
            max_cap: 200,
            density: {
              enable: false,
            },
          },
          // White stars in dark mode, indigo stars in light mode
          color: {
            value: isDark ? "#ffffff" : "#4f46e5",
          },
          shape: {
            type: "star-glow",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: isDark ? 0.8 : 0.7,
            random: true,
            anim: {
              enable: true,
              speed: 0.8,
              opacity_min: 0.15,
              sync: false,
            },
          },
          size: {
            value: 1.8,
            random: true,
            anim: {
              enable: false,
            },
          },
          // Cyan lines in dark mode, soft indigo lines in light mode
          line_linked: {
            enable: false,
            distance: 140,
            color: isDark ? "#a0dcff" : "#818cf8",
            opacity: isDark ? 0.22 : 0.28,
            width: isDark ? 0.9 : 1.0,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          // Detect on window globally so clicks register even over card/text overlays
          detect_on: "window",
          events: {
            onhover: {
              enable: false,
              mode: [],
            },
            onclick: {
              enable: false,
              mode: [],
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              line_linked: {
                opacity: isDark ? 0.35 : 0.42,
              },
            },
            repulse: {
              distance: 180,
              duration: 0.4,
            },
            push: {
              particles_nb: 8,
            },
          },
        },
        retina_detect: true,
      };
    };

    const destroyCurrentInstance = () => {
      const pJSDom = (window as any).pJSDom;
      if (pJSDom && pJSDom.length > 0) {
        for (let i = pJSDom.length - 1; i >= 0; i--) {
          const instance = pJSDom[i];
          if (instance && instance.pJS) {
            // Cancel drawing animation frame
            if (instance.pJS.fn && instance.pJS.fn.drawAnimFrame) {
              cancelAnimationFrame(instance.pJS.fn.drawAnimFrame);
            }
            // Remove canvas element
            if (instance.pJS.canvas && instance.pJS.canvas.el) {
              instance.pJS.canvas.el.remove();
            }
            pJSDom.splice(i, 1);
          }
        }
      }
    };

    const initParticles = () => {
      if (!isMounted) return;
      
      destroyCurrentInstance();

      const isDark = document.documentElement.classList.contains("dark");
      const config = getConfig(isDark);

      if ((window as any).particlesJS) {
        (window as any).particlesJS(containerId, config);
      }
    };

    // Initialize MutationObserver to re-initialize particles when theme toggles
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          initParticles();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if ((window as any).particlesJS) {
      initParticles();
    } else {
      // Check if script already exists to avoid duplicate loading
      const existingScript = document.getElementById("particles-js-script") as HTMLScriptElement;
      if (existingScript) {
        if (existingScript.dataset.loaded === "true") {
          initParticles();
        } else {
          existingScript.addEventListener("load", initParticles);
        }
      } else {
        scriptElement = document.createElement("script");
        scriptElement.id = "particles-js-script";
        scriptElement.src = "/particles.js";
        scriptElement.async = true;
        scriptElement.dataset.loaded = "false";
        scriptElement.addEventListener("load", () => {
          if (scriptElement) {
            scriptElement.dataset.loaded = "true";
          }
          initParticles();
        });
        document.body.appendChild(scriptElement);
      }
    }

    return () => {
      isMounted = false;
      observer.disconnect();
      
      // Cleanup script listener if it hasn't loaded yet
      const existingScript = document.getElementById("particles-js-script");
      if (existingScript) {
        existingScript.removeEventListener("load", initParticles);
      }

      destroyCurrentInstance();
    };
  }, []);

  return (
    <div
      id={containerId}
      className="absolute inset-0 w-full h-full pointer-events-none bg-[#fafafc] dark:bg-black transition-colors duration-300 overflow-hidden"
    >
      {/* Drifting Color Blobs (Light Mode Only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:hidden select-none z-[0]">
        {/* Blob 1: Indigo */}
        <div 
          className="absolute rounded-full bg-indigo-400/20 blur-[90px] top-[-50px] left-[10%] w-[350px] h-[350px]"
          style={{ animation: "float-blob-1 25s infinite alternate ease-in-out" }}
        />
        
        {/* Blob 2: Cyan */}
        <div 
          className="absolute rounded-full bg-cyan-300/15 blur-[100px] bottom-[-80px] right-[15%] w-[400px] h-[400px]"
          style={{ animation: "float-blob-2 30s infinite alternate ease-in-out" }}
        />
        
        {/* Blob 3: Violet/Purple */}
        <div 
          className="absolute rounded-full bg-purple-300/15 blur-[80px] top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]"
          style={{ animation: "float-blob-3 20s infinite alternate ease-in-out" }}
        />
      </div>
    </div>
  );
});

export default InteractiveCanvasBg;
