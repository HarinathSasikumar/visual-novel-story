import React from 'react';
import { motion } from 'framer-motion';

const GoldenDust: React.FC = () => {
  const motes = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {motes.map((mote) => (
        <motion.div
          key={mote.id}
          className="absolute rounded-full"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: mote.size,
            height: mote.size,
            background: `radial-gradient(circle, rgba(212,160,23,${mote.opacity}) 0%, rgba(232,194,82,0) 70%)`,
          }}
          animate={{
            y: [0, -60, -20, -80, 0],
            x: [0, 30, -20, 10, 0],
            scale: [1, 1.5, 0.8, 1.2, 1],
            opacity: [mote.opacity, mote.opacity * 1.5, mote.opacity * 0.3, mote.opacity],
          }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default GoldenDust;
