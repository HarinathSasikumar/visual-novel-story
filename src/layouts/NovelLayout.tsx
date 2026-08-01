import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiSettings, FiBookmark, FiMoon, FiSun, FiMaximize } from 'react-icons/fi';
import { useNovelStore } from '../store/useNovelStore';
import { useLenis } from '../hooks/useLenis';
import { useReadingProgress } from '../hooks/useReadingProgress';
import ProgressBar from '../components/ui/ProgressBar';
import TableOfContents from '../components/nav/TableOfContents';
import ReadingSettings from '../components/ui/ReadingSettings';
import BookmarkPanel from '../components/ui/BookmarkPanel';

const NovelLayout: React.FC = () => {
  const { theme, toggleTheme, toggleToc, toggleSettings, toggleBookmarkPanel, toggleFullscreen } = useNovelStore();
  const progress = useReadingProgress();
  const location = useLocation();

  useLenis();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen min-h-[100dvh] bg-cream-100 dark:bg-charcoal-900 transition-colors duration-700 ease-in-out overflow-x-hidden">
      {!isLanding && <ProgressBar progress={progress} />}

      {/* ── Top Navigation Bar ── */}
      {!isLanding && (
        <header
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-gradient-to-b from-cream-100/90 to-transparent dark:from-charcoal-900/90 pointer-events-none"
          style={{
            height: 'clamp(52px, 8vw, 72px)',
            paddingLeft: 'clamp(0.75rem, 4vw, 1.5rem)',
            paddingRight: 'clamp(0.75rem, 4vw, 1.5rem)',
            paddingTop: 'env(safe-area-inset-top)',
          }}
        >
          {/* Left: TOC toggle */}
          <div className="pointer-events-auto flex gap-2 sm:gap-4">
            <button
              onClick={toggleToc}
              aria-label="Table of Contents"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-cream-50/80 dark:bg-charcoal-800/80 backdrop-blur-md text-sepia-600 dark:text-sepia-300 hover:text-gold-500 hover:shadow-warm transition-all border border-sepia-200 dark:border-sepia-700 active:scale-95"
            >
              <FiMenu size={18} />
            </button>
          </div>

          {/* Right: action buttons */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            {/* Fullscreen — hidden on mobile (not useful there) */}
            <button
              onClick={toggleFullscreen}
              aria-label="Toggle Fullscreen"
              className="hidden md:flex w-10 h-10 rounded-full items-center justify-center bg-cream-50/80 dark:bg-charcoal-800/80 backdrop-blur-md text-sepia-600 dark:text-sepia-300 hover:text-gold-500 hover:shadow-warm transition-all border border-sepia-200 dark:border-sepia-700 active:scale-95"
            >
              <FiMaximize size={16} />
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-cream-50/80 dark:bg-charcoal-800/80 backdrop-blur-md text-sepia-600 dark:text-sepia-300 hover:text-gold-500 hover:shadow-warm transition-all border border-sepia-200 dark:border-sepia-700 active:scale-95"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={toggleBookmarkPanel}
              aria-label="Bookmarks"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-cream-50/80 dark:bg-charcoal-800/80 backdrop-blur-md text-sepia-600 dark:text-sepia-300 hover:text-gold-500 hover:shadow-warm transition-all border border-sepia-200 dark:border-sepia-700 active:scale-95"
            >
              <FiBookmark size={18} />
            </button>
            <button
              onClick={toggleSettings}
              aria-label="Reading Settings"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-cream-50/80 dark:bg-charcoal-800/80 backdrop-blur-md text-sepia-600 dark:text-sepia-300 hover:text-gold-500 hover:shadow-warm transition-all border border-sepia-200 dark:border-sepia-700 active:scale-95"
            >
              <FiSettings size={18} />
            </button>
          </div>
        </header>
      )}

      {/* ── Slide-in Panels ── */}
      <TableOfContents />
      <ReadingSettings />
      <BookmarkPanel />

      {/* ── Main Content ── */}
      <main className="w-full min-h-screen min-h-[100dvh]">
        <Outlet />
      </main>
    </div>
  );
};

export default NovelLayout;
