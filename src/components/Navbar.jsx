import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState('about');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Background opacity based on scroll
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'timeline' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      className="navbar navbar-expand-lg fixed-top py-3"
      style={{
        backgroundColor: `rgba(10, 10, 10, ${isScrolled || isExpanded ? 0.9 : 0})`,
        backdropFilter: isScrolled || isExpanded ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease'
      }}
    >
      <div className="container">
        <a className="navbar-brand text-white fw-bold fs-5" href="#home" onClick={() => setActiveSection('home')}>
          Ahmed <br />B<span className="text-gradient">.</span>
        </a>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsExpanded(!isExpanded)}
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ padding: 0 }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex flex-column flex-lg-row align-items-center mx-auto mt-3 mt-lg-0">
            {/* Pill Navigation Container */}
            <ul 
              className="navbar-nav flex-row flex-wrap justify-content-center p-1 rounded-pill shadow-sm" 
              style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {navLinks.map((link) => {
                const isHovered = hoveredSection === link.id;
                const isActive = activeSection === link.id;
                const showPill = hoveredSection ? isHovered : isActive;

                return (
                  <li 
                    className="nav-item position-relative" 
                    key={link.id} 
                    style={{ zIndex: 1 }}
                    onMouseEnter={() => setHoveredSection(link.id)}
                  >
                    {showPill && (
                      <motion.div
                        layoutId="pill-indicator"
                        className="position-absolute top-0 start-0 w-100 h-100 rounded-pill"
                        style={{ backgroundColor: '#000000', zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <a 
                      className="nav-link position-relative"
                      href={`#${link.id}`}
                      onClick={() => {
                        setActiveSection(link.id);
                        setIsExpanded(false);
                        const collapseEl = document.getElementById('navbarNav');
                        if (collapseEl && collapseEl.classList.contains('show')) {
                          collapseEl.classList.remove('show');
                        }
                      }}
                      style={{ 
                        padding: '0.4rem 1.25rem', 
                        fontSize: '0.9rem',
                        color: showPill ? '#ffffff' : '#000000',
                        transition: 'color 0.2s ease',
                        fontWeight: 600
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
            
          {/* Action Button on the Right */}
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <a 
              href="#resume"
              className="btn btn-sm text-white px-3 py-1 rounded-pill fw-semibold"
              style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)', fontSize: '0.75rem', letterSpacing: '1px' }}
            >
              RESUME
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
