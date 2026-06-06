import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Nexus Data Platform',
    description: 'A dark-themed analytics dashboard with real-time data visualization and glassmorphism UI.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'D3.js', 'Bootstrap'],
  },
  {
    title: 'Orbital E-Commerce',
    description: 'Premium headless commerce storefront with ultra-smooth 60fps page transitions and cart interactions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Framer Motion', 'Stripe'],
  },
  {
    title: 'Aura AI Assistant',
    description: 'Conversational AI interface featuring streaming text responses and seamless contextual memory routing.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['OpenAI', 'TypeScript', 'Tailwind'],
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-5 position-relative z-1">
      <div className="container py-5">
        <motion.div 
          className="text-center mb-5 pb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="display-4 fw-bold mb-3">Featured <span className="text-gradient">Work</span></h2>
          <p className="text-white opacity-75 mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
            A selection of recent projects showcasing my focus on performance, aesthetics, and user experience.
          </p>
        </motion.div>

        <div className="row g-4 d-flex align-items-stretch">
          {projects.map((project, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <motion.div 
                className="project-card h-100 d-flex flex-column"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="card-img-wrapper position-relative">
                  <img src={project.image} alt={project.title} className="card-img-top" />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25" style={{ pointerEvents: 'none' }}></div>
                </div>
                <div className="p-4 p-xl-5 d-flex flex-column flex-grow-1">
                  <h4 className="fw-bold mb-3">{project.title}</h4>
                  <p className="text-white opacity-75 mb-4 flex-grow-1">{project.description}</p>
                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="badge rounded-pill bg-dark border border-secondary text-light fw-normal px-3 py-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
