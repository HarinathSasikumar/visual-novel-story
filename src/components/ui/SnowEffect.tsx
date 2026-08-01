import React from 'react';
import { motion } from 'framer-motion';

const SnowEffect: React.FC = () => {
  const flakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 6 + 3,
    duration: Math.random() * 5 + 4,
    delay: Math.random() * 8,
    drift: (Math.random() - 0.5) * 100,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.x}%`,
            top: '-10px',
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
          }}
          animate={{
            y: ['0', '110vh'],
            x: [0, flake.drift],
            opacity: [flake.opacity, flake.opacity * 0.5, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
