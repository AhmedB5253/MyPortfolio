"use client";

import { motion, type MotionProps } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
} & MotionProps;

export function Reveal({ children, className, delay = 0, y = 28, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.85, delay, ease: [0.215, 0.61, 0.355, 1] }}
      style={{ willChange: "transform, opacity" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
