import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiBookmark, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useNovelStore } from '../../store/useNovelStore';

const BookmarkPanel: React.FC = () => {
  const { isBookmarkPanelOpen, toggleBookmarkPanel, bookmarks, removeBookmark, favoriteQuotes, removeFavoriteQuote } = useNovelStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isBookmarkPanelOpen && (
        <>
          {/* Backdrop — tap to close on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={toggleBookmarkPanel}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full z-50 backdrop-blur-xl bg-cream-100/97 dark:bg-charcoal-900/97 border-l border-sepia-200 dark:border-sepia-800 shadow-warm-lg overflow-y-auto overscroll-contain"
            style={{
              width: 'clamp(260px, 80vw, 320px)',
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="font-playfair text-lg sm:text-xl font-semibold text-sepia-700 dark:text-cream-200">
                  Bookmarks
                </h2>
                <button
                  onClick={toggleBookmarkPanel}
                  aria-label="Close bookmarks"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-sepia-400 hover:text-sepia-700 dark:hover:text-cream-200 hover:bg-cream-200 dark:hover:bg-charcoal-800 transition-all active:scale-90"
                >
                  <FiX size={20} />
                </button>
              </div>

              {bookmarks.length === 0 ? (
                <div className="text-center py-12">
                  <FiBookmark className="mx-auto text-sepia-300 dark:text-sepia-700 mb-3" size={32} />
                  <p className="text-sepia-400 dark:text-sepia-500 font-inter text-sm">No bookmarks yet.</p>
                  <p className="text-sepia-300 dark:text-sepia-600 font-inter text-xs mt-1">Click the bookmark icon on any chapter.</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 mb-10">
                  {bookmarks.map((bm) => (
                    <div
                      key={bm.chapterId}
                      className="group flex items-center justify-between p-3 rounded-xl border border-sepia-200 dark:border-sepia-800 hover:border-gold-400 dark:hover:border-gold-600 transition-all cursor-pointer active:scale-[0.98]"
                      onClick={() => { navigate(`/chapter/${bm.chapterId}`); toggleBookmarkPanel(); }}
                    >
                      <div className="min-w-0 flex-1 mr-2">
                        <p className="font-playfair text-sm text-sepia-700 dark:text-cream-300 font-medium truncate">{bm.chapterTitle}</p>
                        <p className="font-inter text-xs text-sepia-400 dark:text-sepia-500 mt-0.5">{bm.savedAt}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeBookmark(bm.chapterId); }}
                        aria-label="Remove bookmark"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-sepia-300 hover:text-red-400 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 active:scale-90 shrink-0"
                        style={{ minHeight: 'unset', minWidth: 'unset' }}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {favoriteQuotes.length > 0 && (
                <>
                  <h3 className="font-playfair text-base sm:text-lg font-semibold text-sepia-700 dark:text-cream-200 mb-3 sm:mb-4">
                    Favorite Quotes
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {favoriteQuotes.map((q) => (
                      <div key={q.id} className="group p-3 rounded-xl border border-sepia-200 dark:border-sepia-800 bg-cream-50 dark:bg-charcoal-900">
                        <p className="font-playfair text-sm text-sepia-700 dark:text-cream-300 italic leading-relaxed">
                          "{q.text}"
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-inter text-xs text-gold-500 truncate flex-1 mr-2">{q.chapterTitle}</p>
                          <button
                            onClick={() => removeFavoriteQuote(q.id)}
                            aria-label="Remove quote"
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-sepia-300 hover:text-red-400 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 active:scale-90 shrink-0"
                            style={{ minHeight: 'unset', minWidth: 'unset' }}
                          >
                            <FiTrash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookmarkPanel;
