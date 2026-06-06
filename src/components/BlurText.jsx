import React from 'react';
import { motion } from 'framer-motion';

const BlurText = ({ text = '', delay = 0, className = '' }) => {
  // Use framer-motion to animate text with a blur effect.
  // We can animate either by words or letters depending on preference.
  // The user requested: animateBy=letters
  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 10 },
    show: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.span
      className={`d-inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={item}
          style={{ 
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            willChange: 'filter, opacity, transform',
            transform: 'translateZ(0)'
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurText;
