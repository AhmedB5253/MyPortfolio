import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle responsive layout detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse coordinates for immersive 3D parallax depth
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate premium progress loading
  useEffect(() => {
    const duration = 2400; // 2.4 seconds for cinematic loading feel
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // Custom easeOut-like progress progression for realistic load
      const easeProgress = Math.sin((currentStep / steps) * (Math.PI / 2)) * 100;
      const newProgress = Math.min(easeProgress, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        // Subtle hold at 100% for satisfying visual closure before transitioning
        setTimeout(onComplete, 600);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Terminal-style loading logs to show technical attention to detail
  const logs = [
    { threshold: 0, text: "CONNECTING: secure_session_handshake..." },
    { threshold: 10, text: "LOAD: ./assets/ahmed-portrait.png" },
    { threshold: 25, text: "COMPILING: cinematic_lighting_pass.glsl" },
    { threshold: 45, text: "INIT: ThreeJS WebGL Render Context" },
    { threshold: 60, text: "CALIBRATING: Mouse Parallax Coordinates" },
    { threshold: 75, text: "READY: Animating fluid interface structures" },
    { threshold: 92, text: "DEPLOY: System Operational. Welcoming User." }
  ];

  const activeLogs = logs.filter(log => progress >= log.threshold).slice(-3);

  // Parallax offsets (opposite directions to create 3D depth)
  const portraitParallax = {
    x: mousePos.x * (isMobile ? 12 : 25),
    y: mousePos.y * (isMobile ? 12 : 25)
  };

  const textParallax = {
    x: -mousePos.x * (isMobile ? 8 : 15),
    y: -mousePos.y * (isMobile ? 8 : 15)
  };

  // Split name for cinematic letter-by-letter reveal
  const nameLetters = "AHMED".split("");

  return (
    <motion.div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#020205', zIndex: 9999, overflow: 'hidden' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Volumetric Glowing Backdrop */}
      <div 
        className="position-absolute"
        style={{
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(157, 124, 255, 0.08) 0%, rgba(240, 185, 11, 0.04) 40%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          opacity: 0.2 + (progress / 100) * 0.8
        }}
      />

      <div className="container px-4">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 gap-md-5">
          
          {/* PORTRAIT BLOCK (Left on Desktop, Top on Mobile) */}
          <motion.div
            style={portraitParallax}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            exit={{ 
              scale: 1.35, 
              opacity: 0, 
              filter: "blur(12px)", 
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            {/* Ambient Aura behind portrait */}
            <div
              className="position-absolute"
              style={{
                width: isMobile ? '230px' : '340px',
                height: isMobile ? '230px' : '340px',
                background: 'radial-gradient(circle, rgba(157, 124, 255, 0.45) 0%, rgba(240, 185, 11, 0.25) 50%, transparent 80%)',
                filter: 'blur(45px)',
                zIndex: -1,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${0.85 + (progress / 100) * 0.2})`,
                opacity: 0.1 + (progress / 100) * 0.8,
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease, transform 0.2s ease'
              }}
            />

            {/* Continuous Idle Float container */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 6, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
              className="loading-portrait-container"
              style={{
                width: isMobile ? '190px' : '280px',
                height: isMobile ? '190px' : '280px',
                borderRadius: '24px',
                border: '2px solid rgba(255, 255, 255, 0.08)',
                padding: '3px',
                boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.9), 
                            0 0 ${progress * 0.35}px rgba(157, 124, 255, ${progress / 100 * 0.35}),
                            0 0 ${progress * 0.15}px rgba(240, 185, 11, ${progress / 100 * 0.25})`,
                transition: 'box-shadow 0.1s ease'
              }}
            >
              <img 
                src="/ahmed-portrait.png" 
                alt="Ahmed Bhawrasawala Portrait" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  filter: `blur(${Math.max(0, 12 - (progress / 100) * 12)}px) brightness(${0.3 + (progress / 100) * 0.75}) contrast(${0.9 + (progress / 100) * 0.1})`,
                  transition: 'filter 0.05s ease'
                }}
              />
            </motion.div>
          </motion.div>

          {/* LOADING TEXT & DATA BLOCK (Right on Desktop, Bottom on Mobile) */}
          <motion.div
            style={textParallax}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="d-flex flex-column align-items-center align-items-md-start"
            exit={{ 
              scale: 3.5, 
              opacity: 0, 
              filter: "blur(20px)", 
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
            }}
          >
            {/* Continuous Idle Float in opposite phase */}
            <motion.div
              animate={{ y: [2, -4, 2] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
              className="d-flex flex-column align-items-center align-items-md-start"
              style={{ width: '100%', maxWidth: '360px' }}
            >
              {/* Premium Character Reveal Name Header */}
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <h1 
                  className="display-4 fw-black text-white mb-0"
                  style={{ 
                    letterSpacing: '0.22em', 
                    fontWeight: 900,
                    fontSize: isMobile ? '2.4rem' : '3.6rem',
                    textShadow: `0 0 ${progress * 0.15}px rgba(255, 255, 255, ${progress / 100 * 0.4})`
                  }}
                >
                  {nameLetters.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 + (index * 0.08), ease: "easeOut" }}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
                
                {/* Micro Percentage display */}
                <span className="mono-text fs-5 ms-1" style={{ color: 'var(--accent-light)', opacity: 0.85 }}>
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Minimalist Subtext */}
              <p className="text-uppercase mb-3 opacity-50" style={{ letterSpacing: '4px', fontSize: '0.65rem', fontWeight: 600 }}>
                Creative Frontend Experience
              </p>

              {/* Custom Linear Progress Bar */}
              <div 
                className="w-100" 
                style={{ 
                  height: '2px', 
                  backgroundColor: 'var(--glass-border)', 
                  overflow: 'hidden', 
                  borderRadius: '2px',
                  position: 'relative',
                  marginBottom: '15px'
                }}
              >
                <motion.div
                  style={{ 
                    height: '100%', 
                    background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-light))' 
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.02 }}
                />
              </div>

              {/* Scrolling Log Loader Feed */}
              <div 
                style={{ height: '52px', overflow: 'hidden', pointerEvents: 'none', width: '100%' }} 
                className="d-flex flex-column justify-content-end text-start mono-text opacity-40"
              >
                {activeLogs.map((log) => (
                  <motion.div
                    key={log.threshold}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="loading-log-line"
                  >
                    &gt; {log.text}
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

