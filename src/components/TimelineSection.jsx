import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

const timelineData = [
  {
    year: 'Present',
    title: 'Fresher & Tech Enthusiast',
    company: 'Actively Seeking Opportunities',
    description: 'Highly motivated and eager to launch my career in software development. Continuously building projects and learning modern web technologies.',
  },
  {
    year: '2024',
    title: 'Bachelor\'s Degree',
    company: 'Computer Science / IT',
    description: 'Completed comprehensive coursework, mastering data structures, algorithms, and fundamental software engineering methodologies.',
  },
  {
    year: '2023',
    title: 'First Major Project',
    company: 'Academic & Self-Taught',
    description: 'Developed my first full-stack application, learning the practicalities of bridging responsive front-end interfaces with databases.',
  }
];

const TimelineSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="timeline" className="py-5 position-relative overflow-hidden" ref={containerRef}>
      <div className="container py-5">
        <motion.div 
          className="text-center mb-5 pb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="display-4 fw-bold mb-3">My <span className="text-gradient">Experience</span></h2>
          <p className="text-white opacity-75 mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
            My academic background, project history, and early steps into the professional world of software development.
          </p>
        </motion.div>

        <div className="row justify-content-center position-relative">
          {/* Timeline background line */}
          <div className="position-absolute h-100 d-none d-md-block" style={{ width: '2px', background: 'var(--glass-border)', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}></div>
          
          {/* Animated line */}
          <motion.div 
            className="position-absolute d-none d-md-block" 
            style={{ 
              width: '4px', 
              background: 'var(--accent-gradient)', 
              left: '50%', 
              transform: 'translateX(-50%)',
              top: 0,
              height: '100%',
              scaleY: scrollYProgress,
              transformOrigin: 'top',
              zIndex: 1,
              borderRadius: '2px'
            }} 
          />

          <div className="col-12 col-lg-10">
            {timelineData.map((item, index) => (
              <div className={`row mb-5 align-items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`} key={index}>
                <div className="col-md-5 d-none d-md-block"></div>
                
                {/* Center Node */}
                <div className="col-md-2 d-none d-md-flex justify-content-center position-relative z-2 mb-4 mb-md-0">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: 'var(--bg-dark)',
                      border: '4px solid var(--accent-cyan)',
                      boxShadow: '0 0 15px rgba(13, 202, 240, 0.5)'
                    }}
                  />
                </div>

                {/* Content Card */}
                <div className="col-12 col-md-5">
                  <motion.div 
                    className="glass-panel p-4 p-xl-5 position-relative z-2"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 60, damping: 15 }}
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                  >
                    <span className="text-gradient fw-bold d-block mb-3 fs-5">{item.year}</span>
                    <h4 className="fw-bold mb-1">{item.title}</h4>
                    <h6 className="text-white opacity-50 mb-3 fw-normal">{item.company}</h6>
                    <p className="text-white opacity-75 mb-0" style={{ lineHeight: 1.6 }}>{item.description}</p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
