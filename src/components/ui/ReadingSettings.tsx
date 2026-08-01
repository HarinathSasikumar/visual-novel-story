import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiType, FiAlignLeft } from 'react-icons/fi';
import { useNovelStore } from '../../store/useNovelStore';
import type { FontFamily } from '../../types/chapter';

const FONTS: { label: string; value: FontFamily }[] = [
  { label: 'Playfair', value: 'playfair' },
  { label: 'Lora', value: 'lora' },
  { label: 'Inter', value: 'inter' },
  { label: 'Garamond', value: 'eb-garamond' },
];

const ReadingSettings: React.FC = () => {
  const { isSettingsOpen, toggleSettings, settings, setFontSize, setFontFamily, setLineHeight } = useNovelStore();

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <>
          {/* Backdrop — tap to close on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={toggleSettings}
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
                  Reading Settings
                </h2>
                <button
                  onClick={toggleSettings}
                  aria-label="Close settings"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-sepia-400 hover:text-sepia-700 dark:hover:text-cream-200 hover:bg-cream-200 dark:hover:bg-charcoal-800 transition-all active:scale-90"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Font Size */}
              <div className="mb-7 sm:mb-8">
                <label className="flex items-center gap-2 text-sm font-inter font-medium text-sepia-600 dark:text-sepia-400 mb-3">
                  <FiType size={14} /> Font Size: {settings.fontSize}px
                </label>
                <input
                  type="range" min={14} max={26} step={1}
                  value={settings.fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                  aria-label="Font size"
                  style={{ minHeight: 'unset' }}
                />
                <div className="flex justify-between text-xs text-sepia-400 mt-2 font-inter">
                  <span>Small</span><span>Large</span>
                </div>
              </div>

              {/* Font Family */}
              <div className="mb-7 sm:mb-8">
                <label className="flex items-center gap-2 text-sm font-inter font-medium text-sepia-600 dark:text-sepia-400 mb-3">
                  <FiType size={14} /> Font Family
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FONTS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFontFamily(f.value)}
                      className={`py-2.5 px-3 rounded-lg text-sm border transition-all font-inter active:scale-95 ${
                        settings.fontFamily === f.value
                          ? 'bg-gold-500 text-charcoal-900 border-gold-500'
                          : 'bg-transparent border-sepia-300 dark:border-sepia-700 text-sepia-600 dark:text-sepia-400 hover:border-gold-400'
                      }`}
                      style={{ minHeight: 'unset' }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div className="mb-7 sm:mb-8">
                <label className="flex items-center gap-2 text-sm font-inter font-medium text-sepia-600 dark:text-sepia-400 mb-3">
                  <FiAlignLeft size={14} /> Line Spacing: {settings.lineHeight.toFixed(1)}
                </label>
                <input
                  type="range" min={1.4} max={2.6} step={0.1}
                  value={settings.lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  className="w-full"
                  aria-label="Line height"
                  style={{ minHeight: 'unset' }}
                />
                <div className="flex justify-between text-xs text-sepia-400 mt-2 font-inter">
                  <span>Tight</span><span>Spacious</span>
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-sepia-200 dark:border-sepia-800 p-4 bg-cream-50 dark:bg-charcoal-900">
                <p className="text-sepia-600 dark:text-sepia-400 text-xs font-inter mb-2">Preview</p>
                <p
                  className="text-sepia-800 dark:text-cream-200"
                  style={{
                    fontSize: settings.fontSize,
                    lineHeight: settings.lineHeight,
                    fontFamily: settings.fontFamily === 'inter' ? 'Inter, sans-serif'
                      : settings.fontFamily === 'lora' ? 'Lora, serif'
                      : settings.fontFamily === 'eb-garamond' ? 'EB Garamond, serif'
                      : 'Playfair Display, serif',
                  }}
                >
                  And in that single moment... time stopped.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReadingSettings;
