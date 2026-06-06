import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = ["Web Developer", "AI Developer", "React Developer"];

const IntroAnimation = ({ onComplete }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    // Start showing roles shortly after intro starts
    const roleTimer = setTimeout(() => setShowRoles(true), 1200);

    // Cycle through roles efficiently
    const cycleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 1500); // 1.5s per role

    // Complete intro after cycling through all roles (approx 5 seconds total)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5500); 

    return () => {
      clearTimeout(roleTimer);
      clearInterval(cycleInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: 'var(--bg-dark)', zIndex: 9998 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 1, ease: "easeInOut" } }}
      >
        <motion.h1 
          className="display-4 text-center mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ letterSpacing: '-0.04em', fontWeight: 700 }}
        >
          Hello, I'm <span className="text-gradient">Ahmed Bhawrasa wala</span>
        </motion.h1>

        <div style={{ height: '40px', position: 'relative', width: '300px' }} className="text-center overflow-hidden">
          {showRoles && (
            <AnimatePresence mode="popLayout">
              <motion.h4
                key={currentRole}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                style={{ position: 'absolute', width: '100%' }}
                className="text-white opacity-75 fw-light m-0"
              >
                {roles[currentRole]}
              </motion.h4>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
