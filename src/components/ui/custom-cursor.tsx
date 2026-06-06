"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for liquid follow-through lag-free motion
  const springConfig = { stiffness: 280, damping: 28, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only mount on desktop screens with hover capabilities
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest("[data-hover]") as HTMLElement | null;
      if (hoverEl) {
        setHoverState(hoverEl.getAttribute("data-hover"));
      } else {
        setHoverState(null);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  // Determine cursor content based on hover state
  const getCursorLabel = () => {
    switch (hoverState) {
      case "view-project":
        return "View Project";
      case "know-more":
        return "Know More";
      case "open":
        return "Open";
      default:
        return null;
    }
  };

  const label = getCursorLabel();
  const isExpanded = Boolean(label);

  // Determine cursor styles based on expanded state (unified across themes)
  const cursorBgColor = isExpanded ? "rgba(99, 102, 241, 0.95)" : "rgba(99, 102, 241, 0)";
  const cursorBorderColor = isExpanded ? "rgba(99, 102, 241, 0)" : "#6366f1";

  return (
    <motion.div
      style={{
        left: cursorX,
        top: cursorY,
      }}
      animate={{
        width: isExpanded ? 110 : 20,
        height: isExpanded ? 110 : 20,
        backgroundColor: cursorBgColor,
        borderColor: cursorBorderColor,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className="fixed pointer-events-none z-[99999] rounded-full border border-indigo-400 flex items-center justify-center text-center overflow-hidden transition-[border-color] duration-300 -translate-x-1/2 -translate-y-1/2"
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="text-[11px] font-display font-bold uppercase tracking-wider px-2 text-white"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}
