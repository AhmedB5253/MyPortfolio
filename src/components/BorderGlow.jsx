import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';

const BorderGlow = ({ children, className = '', glowColor = '#c0a3ff', duration = 3 }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth out the mouse following slightly using Framer Motion springs for premium feel
  const springConfig = { stiffness: 500, damping: 28 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    
    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const borderRadialGradient = useMotionTemplate`radial-gradient(circle 120px at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 100%)`;

  return (
    <div 
      className={`position-relative overflow-hidden ${className}`} 
      style={{ padding: '2px', borderRadius: '1rem', cursor: 'default' }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Underlying rotating gradient for continuous subtle glow when not hovered */}
      <motion.div
        className="position-absolute"
        style={{
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(from 0deg, transparent 0 270deg, transparent 270deg, rgba(192, 163, 255, 0.4) 360deg)`,
          opacity: isHovered ? 0 : 1, // Fades out when the mouse glow takes over
          zIndex: 0,
          willChange: 'transform'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* 2. Concentrated mouse-tracking radial glow */}
      <motion.div
        className="position-absolute"
        style={{
          top: 0, left: 0, right: 0, bottom: 0,
          background: borderRadialGradient,
          opacity: isHovered ? 1 : 0,
          zIndex: 0,
          transition: 'opacity 0.4s ease',
          willChange: 'opacity, background'
        }}
      />

      {/* 3. The content container that masks the inside, leaving only a 2px glowing border */}
      <div 
        className="position-relative w-100 h-100 d-flex justify-content-center align-items-center" 
        style={{ 
          backgroundColor: 'rgba(5, 5, 8, 0.7)',  // Ultra dark distinct background to let the rim pop
          backdropFilter: 'blur(10px)', 
          borderRadius: 'calc(1rem - 2px)',
          zIndex: 1 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
