import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNovelStore } from '../store/useNovelStore';
import PageTransition from '../components/ui/PageTransition';
import GoldenDust from '../components/ui/GoldenDust';

const Epilogue: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const { setCurrentChapterId } = useNovelStore();

  useEffect(() => {
    setCurrentChapterId(-1); // special ID for epilogue
    
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Show text
      setTimeout(() => setPhase(2), 6000), // Fade text, close book
      setTimeout(() => setPhase(3), 10000), // Final thank you
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [setCurrentChapterId]);

  return (
    <PageTransition>
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden z-50">
        <GoldenDust />

        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center text-center px-6"
            >
              <h1 className="font-playfair text-2xl md:text-4xl text-cream-100 leading-loose max-w-2xl">
                "Some stories never truly end.<br/>
                They continue being written...<br/>
                <span className="text-gold-400">One memory at a time.</span>"
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 2 && (
            <div className="absolute inset-0 flex items-center justify-center perspective-[2000px]">
              <div className="relative w-48 h-72 md:w-64 md:h-96 preserve-3d scale-90">
                <div className="absolute inset-0 bg-cream-100 rounded-r-lg" />
                <motion.div
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-br from-charcoal-900 to-charcoal-800 rounded-r-lg border border-white/10 shadow-xl origin-left transform-style-preserve-3d"
                />
              </div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center bg-black z-20"
            >
              <h1 className="font-playfair text-3xl md:text-5xl text-gold-400 uppercase tracking-[0.2em] text-shadow-gold">
                Thank You For Reading
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default Epilogue;
