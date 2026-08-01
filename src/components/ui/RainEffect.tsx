import React from 'react';
import { motion } from 'framer-motion';

const RainEffect: React.FC = () => {
  const drops = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 2,
    height: Math.random() * 20 + 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute bg-blue-300 dark:bg-blue-400"
          style={{
            left: `${drop.x}%`,
            top: '-20px',
            width: 1,
            height: drop.height,
            opacity: drop.opacity,
            borderRadius: 1,
          }}
          animate={{ y: ['0', '110vh'], opacity: [drop.opacity, 0] }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default RainEffect;
