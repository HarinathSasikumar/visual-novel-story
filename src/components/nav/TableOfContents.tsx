import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiBookOpen } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useNovelStore } from '../../store/useNovelStore';
import { chapters } from '../../data/chapterIndex';

const TableOfContents: React.FC = () => {
  const { isTocOpen, toggleToc, currentChapterId } = useNovelStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isTocOpen && (
        <>
          {/* Backdrop — tap to close on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={toggleToc}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: -320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -320 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed left-0 top-0 h-full z-50 backdrop-blur-xl bg-cream-100/97 dark:bg-charcoal-900/97 border-r border-sepia-200 dark:border-sepia-800 shadow-warm-lg overflow-y-auto overscroll-contain"
            style={{
              width: 'clamp(260px, 80vw, 320px)',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="font-playfair text-lg sm:text-xl font-semibold text-sepia-700 dark:text-cream-200 flex items-center gap-2">
                  <FiBookOpen size={18} /> Contents
                </h2>
                <button
                  onClick={toggleToc}
                  aria-label="Close table of contents"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-sepia-400 hover:text-sepia-700 dark:hover:text-cream-200 hover:bg-cream-200 dark:hover:bg-charcoal-800 transition-all active:scale-90"
                >
                  <FiX size={20} />
                </button>
              </div>

              <nav className="space-y-1">
                {chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => { navigate(`/chapter/${ch.id}`); toggleToc(); }}
                    className={`w-full text-left px-3 sm:px-4 py-3 rounded-xl transition-all flex flex-col group active:scale-[0.98] ${
                      currentChapterId === ch.id
                        ? 'bg-gold-400/10 border border-gold-400/30'
                        : 'hover:bg-cream-200 dark:hover:bg-charcoal-800 border border-transparent'
                    }`}
                  >
                    <span className={`font-inter font-semibold uppercase mb-0.5 ${
                      currentChapterId === ch.id ? 'text-gold-500' : 'text-sepia-400 group-hover:text-sepia-500'
                    }`}
                      style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.65rem)', letterSpacing: '0.15em' }}
                    >
                      Chapter {ch.id < 10 ? `0${ch.id}` : ch.id}
                    </span>
                    <span className={`font-playfair leading-tight ${
                      currentChapterId === ch.id ? 'text-sepia-800 dark:text-cream-100' : 'text-sepia-600 dark:text-sepia-300'
                    }`}
                      style={{ fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)' }}
                    >
                      {ch.title}
                    </span>
                  </button>
                ))}

                {/* Epilogue entry */}
                <button
                  onClick={() => { navigate('/epilogue'); toggleToc(); }}
                  className="w-full text-left px-3 sm:px-4 py-3 rounded-xl transition-all flex flex-col group mt-3 hover:bg-cream-200 dark:hover:bg-charcoal-800 border border-transparent active:scale-[0.98]"
                >
                  <span className="font-inter font-semibold uppercase text-sepia-400 group-hover:text-gold-500 mb-0.5"
                    style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.65rem)', letterSpacing: '0.15em' }}
                  >
                    Epilogue
                  </span>
                  <span className="font-playfair text-sepia-600 dark:text-sepia-300"
                    style={{ fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)' }}
                  >
                    The Journey's End
                  </span>
                </button>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TableOfContents;
