import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import TimelineSection from './components/TimelineSection';
import EtheralShadow from './components/ui/EtheralShadow';

import './App.css'; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while in loading state
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 0, pointerEvents: 'none' }}>
        <EtheralShadow 
          color="rgba(192, 163, 255, 0.2)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>
      <div className="text-light min-vh-100 position-relative" style={{ zIndex: 1 }}>
        <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: !loading ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ pointerEvents: !loading ? 'auto' : 'none', height: !loading ? 'auto' : '100vh', overflow: 'hidden' }}
      >
        <Navbar />
        {!loading && (
          <main>
            <HeroSection />
            <SkillsSection />
            <ProjectsSection />
            <TimelineSection />
          </main>
        )}
        
        <footer className="py-4 mt-5" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <div className="container text-center">
            <p className="text-white opacity-50 mb-0">© {new Date().getFullYear()} Ahmed Bhawrasa wala. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </div>
    </>
  );
}

export default App;
