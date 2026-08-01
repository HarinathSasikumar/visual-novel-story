import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-sepia-200/30 dark:bg-sepia-800/30">
      <motion.div
        className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
        style={{ width: `${progress}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />
    </div>
  );
};

export default ProgressBar;
