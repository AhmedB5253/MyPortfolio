import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0, pointerEvents: 'none' }}>
      
      {/* 1. Fine-grained noise overlay for the dense texture look in the screenshot */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ 
          opacity: 0.15, // Using opacity instead of overlay blending for performance
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          zIndex: 3
        }}
      />
      
      {/* 2. Minimally visible sweeping light/shadow bands */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{zIndex: 1 }}
      >
        <div className="ethereal-shadow shape-1" />
        <div className="ethereal-shadow shape-2" />
        <div className="ethereal-shadow shape-3" />
        <div className="ethereal-shadow shape-4" />
      </div>

      <style>
        {`
          .ethereal-shadow {
            position: absolute;
            border-radius: 50%;
            will-change: transform;
            transform: translateZ(0);
          }
          
          /* Extremely faint transparent whites creating subtle shifts */
          .shape-1 {
            top: -20%; left: -20%; width: 90vw; height: 35vh;
            background: rgba(255, 255, 255, 0.03); 
            animation: shadow-drift-1 18s infinite alternate ease-in-out;
          }
          .shape-2 {
            bottom: -30%; right: -20%; width: 100vw; height: 50vh;
            background: rgba(255, 255, 255, 0.05); 
            animation: shadow-drift-2 24s infinite alternate-reverse ease-in-out;
          }
          .shape-3 {
            top: 35%; left: 20%; width: 80vw; height: 30vh;
            background: rgba(255, 255, 255, 0.02); 
            animation: shadow-drift-3 20s infinite alternate ease-in-out;
          }
          .shape-4 {
            top: 10%; right: 10%; width: 70vw; height: 40vh;
            background: rgba(255, 255, 255, 0.04); 
            animation: shadow-drift-4 28s infinite alternate-reverse ease-in-out;
          }

          /* Swaying animations */
          @keyframes shadow-drift-1 { 
            0% { transform: translate(0, 0) rotate(-25deg) scale(1); } 
            100% { transform: translate(5%, 10%) rotate(-20deg) scale(1.1); } 
          }
          @keyframes shadow-drift-2 { 
            0% { transform: translate(0, 0) rotate(-35deg) scale(1); } 
            100% { transform: translate(-8%, -15%) rotate(-25deg) scale(1.05); } 
          }
          @keyframes shadow-drift-3 { 
            0% { transform: translate(0, 0) rotate(-15deg) scale(1); } 
            100% { transform: translate(10%, -5%) rotate(-20deg) scale(1.15); } 
          }
          @keyframes shadow-drift-4 { 
            0% { transform: translate(0, 0) rotate(-30deg) scale(1); } 
            100% { transform: translate(-10%, 15%) rotate(-35deg) scale(1.1); } 
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedBackground;
