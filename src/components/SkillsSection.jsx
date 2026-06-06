import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiTypescript, SiPostgresql, SiTailwindcss } from 'react-icons/si';

const skills = [
  { name: 'React', level: 'EXPERT', icon: <FaReact color="#b39ddb" size="1.5em" /> },
  { name: 'TypeScript', level: 'ADVANCED', icon: <SiTypescript color="#b39ddb" size="1.5em" /> },
  { name: 'Node.js', level: 'CORE', icon: <FaNodeJs color="#b39ddb" size="1.5em" /> },
  { name: 'PostgreSQL', level: 'ARCHITECTURE', icon: <SiPostgresql color="#b39ddb" size="1.5em" /> },
  { name: 'AWS', level: 'INFRASTRUCTURE', icon: <FaAws color="#b39ddb" size="1.5em" /> },
  { name: 'Tailwind', level: 'DESIGN SYSTEM', icon: <SiTailwindcss color="#b39ddb" size="1.5em" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const SkillsSection = () => {
  return (
    <section id="about" className="py-5 position-relative" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container py-5">
        
        {/* Top Header Section */}
        <div className="row justify-content-center mb-5 text-center px-3">
          <div className="col-lg-9">
            <motion.p 
              className="text-uppercase tracking-widest text-white opacity-50 mb-4"
              style={{ letterSpacing: '4px', fontSize: '0.70rem', fontWeight: 600 }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
            >
              Available For Freelance
            </motion.p>
            
            <motion.h2 
              className="display-4 fw-bolder mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
            >
              Building the digital <br />
              <span className="text-gradient">architecture</span> of<br />
              tomorrow.
            </motion.h2>
            
            <motion.p 
              className="lead text-white opacity-75 mx-auto mb-5"
              style={{ maxWidth: '650px', fontSize: '1.05rem', lineHeight: 1.6 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Full-stack developer specializing in building high-performance web applications with clean, scalable code and exceptional user experiences.
            </motion.p>
            
            <motion.div 
              className="d-flex flex-wrap justify-content-center gap-3 mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a href="#projects" className="btn btn-primary-custom px-4 py-2 rounded-3 fw-semibold" style={{ background: '#9d7cff', boxShadow: 'none' }}>
                View Work
              </a>
              <a href="#contact" className="btn btn-outline-light px-4 py-2 rounded-3 fw-semibold" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                Contact Me
              </a>
            </motion.div>
            
            <motion.div 
              className="mt-5 text-white opacity-50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Bottom Split Section */}
        <div className="row mt-5 pt-5 gx-5">
          {/* Left Text Column */}
          <div className="col-lg-5 mb-5 mb-lg-0 pe-lg-4">
            <motion.h3 
              className="display-6 fw-bold mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              Crafting code with <br />
              <span className="text-gradient">intent and precision</span>
            </motion.h3>
            
            <motion.p 
              className="text-white opacity-75 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '0.95rem', lineHeight: 1.7 }}
            >
              I am Ahmed, a software architect based in the digital void. My approach focuses on bridging the gap between complex backend logic and fluid frontend interfaces.
            </motion.p>
            
            <motion.p 
              className="text-white opacity-75"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '0.95rem', lineHeight: 1.7 }}
            >
              With over 5 years of experience, I treat every project as a piece of engineering art, ensuring that performance is never sacrificed for aesthetics.
            </motion.p>
          </div>

          {/* Right Cards Column */}
          <div className="col-lg-7">
            <motion.div 
              className="row g-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {skills.map((skill, index) => (
                <div className="col-sm-6 col-md-4" key={index}>
                  <motion.div 
                    variants={itemVariants}
                    className="h-100 p-4 rounded-4"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'transform 0.3s ease, background 0.3s ease'
                    }}
                    whileHover={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.06)', 
                      transform: 'translateY(-4px)' 
                    }}
                  >
                    <div className="mb-3 opacity-75">{skill.icon}</div>
                    <div className="text-white fw-bold" style={{ fontSize: '0.95rem' }}>{skill.name}</div>
                    <div className="text-white opacity-50 text-uppercase mt-1" style={{ fontSize: '0.65rem', letterSpacing: '1px', fontWeight: 600 }}>{skill.level}</div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default SkillsSection;
