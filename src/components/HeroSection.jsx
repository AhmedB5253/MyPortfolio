import React from 'react';
import { motion } from 'framer-motion';
import BlurText from './BlurText';
import RotatingText from './RotatingText';
import BorderGlow from './BorderGlow';

const HeroSection = () => {
  return (
    <section id="home" className="min-vh-100 position-relative d-flex flex-column justify-content-center align-items-center" style={{ overflow: 'hidden' }}>

      {/* Main Content Container */}
      <div className="container position-relative z-1 text-center d-flex flex-column align-items-center justify-content-center h-100" style={{ paddingTop: '10vh', paddingBottom: '15vh' }}>
        
        <motion.p 
          className="text-uppercase tracking-widest text-white opacity-50 mb-1"
          style={{ letterSpacing: '8px', fontSize: '0.75rem', fontWeight: 600 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Portfolio
        </motion.p>

        <motion.h2 
          className="h3 fw-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ letterSpacing: '-0.02em' }}
        >
          Hello, I'm
        </motion.h2>

        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <BorderGlow glowColor="#c0a3ff" duration={4}>
            <div className="px-4 py-3 text-center">
              <h1 className="display-3 fw-bolder mb-0 text-white" style={{ lineHeight: 1.1, letterSpacing: '-0.04em' }}>
                <BlurText text="Ahmed " delay={0.8} /><br/>
                <BlurText text="Bhawrasawala" delay={1} />
              </h1>
            </div>
          </BorderGlow>
        </motion.div>

        <motion.div 
          className="d-flex justify-content-center align-items-center text-white opacity-100 mb-3 fs-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <RotatingText words={['Web Developer', 'Graphic Designer', 'UI/UX Designer', 'AI Enthusiast']} interval={3000} />
        </motion.div>

        <motion.a 
          href="#projects" 
          className="btn btn-primary-custom px-4 py-3 rounded-3 fw-semibold d-inline-flex align-items-center gap-3"
          style={{ 
            background: 'var(--accent-gradient)', 
            border: 'none',
            boxShadow: '0 0 30px rgba(138, 43, 226, 0.4)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(138, 43, 226, 0.6)' }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Workspace
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </motion.a>

      </div>

      {/* Decorative Bottom Elements */}
      <motion.div 
        className="position-absolute bottom-0 w-100 d-flex flex-column align-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        style={{ zIndex: 1, paddingBottom: '3vh' }}
      >
        <motion.p 
          className="text-uppercase text-white mb-0 fw-bold" 
          style={{ fontSize: '0.85rem', letterSpacing: '4px', textShadow: '0 0 15px rgba(255,255,255,0.7)' }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Press Space to Explore
        </motion.p>
        <div style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} className="mt-3" />
      </motion.div>
      
      {/* Footer-like elements from Screenshot 1 */}
      <motion.div 
        className="position-absolute bottom-0 w-100 d-flex justify-content-between px-4 px-md-5 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        style={{ zIndex: 2 }}
      >
        <div className="d-flex flex-column text-start">
          <span className="text-white opacity-50" style={{ fontSize: '0.55rem', letterSpacing: '2px' }}>SYSTEM STATUS</span>
          <div className="d-flex align-items-center text-white mt-1">
            <span style={{ width: '6px', height: '6px', backgroundColor: '#00ff00', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 8px #00ff00' }}></span>
            <span style={{ fontSize: '0.75rem' }}>Operational</span>
          </div>
        </div>
        
        <div className="d-flex gap-4 align-items-end text-white opacity-75" style={{ fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>
          <a href="#" className="text-white text-decoration-none hover-opacity">LINKEDIN</a>
          <a href="#" className="text-white text-decoration-none hover-opacity">GITHUB</a>
          <a href="#" className="text-white text-decoration-none hover-opacity">TWITTER</a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
