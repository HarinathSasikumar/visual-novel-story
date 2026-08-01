import React from 'react';
import { motion } from 'framer-motion';

const LEAVES = ['🍂', '🍁', '🍃'];

const FloatingLeaves: React.FC = () => {
  const leaves = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: LEAVES[i % LEAVES.length],
    x: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 8,
    size: Math.random() * 16 + 14,
    drift: (Math.random() - 0.5) * 200,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute select-none"
          style={{
            left: `${leaf.x}%`,
            top: '-40px',
            fontSize: leaf.size,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, leaf.drift],
            rotate: [0, 360],
            opacity: [0.8, 0.6, 0.3, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {leaf.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingLeaves;
