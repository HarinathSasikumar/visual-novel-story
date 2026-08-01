import React from 'react';

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { getTotalChapters, getChapterById } from '../../data/chapterIndex';

interface ChapterNavProps {
  currentId: number;
}

const ChapterNav: React.FC<ChapterNavProps> = ({ currentId }) => {
  const navigate = useNavigate();
  const total = getTotalChapters();

  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId < total ? currentId + 1 : null;

  const prevChapter = prevId ? getChapterById(prevId) : null;
  const nextChapter = nextId ? getChapterById(nextId) : null;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 py-10 sm:py-12 border-t border-sepia-200 dark:border-sepia-800/50 mt-16">
      {/* Previous */}
      {prevId && prevChapter ? (
        <button
          onClick={() => navigate(`/chapter/${prevId}`)}
          className="group flex flex-col text-left w-full sm:w-auto flex-1 p-3 sm:p-0 rounded-xl sm:rounded-none hover:bg-cream-200/50 dark:hover:bg-charcoal-800/40 sm:hover:bg-transparent sm:dark:hover:bg-transparent transition-colors active:scale-[0.98]"
        >
          <span className="flex items-center gap-2 font-inter font-semibold uppercase text-sepia-400 group-hover:text-gold-500 transition-colors mb-1.5"
            style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)', letterSpacing: '0.15em' }}
          >
            <FiArrowLeft size={13} /> Previous Chapter
          </span>
          <span
            className="font-playfair text-sepia-700 dark:text-cream-200 group-hover:text-gold-400 transition-colors leading-tight"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
          >
            {prevChapter.title}
          </span>
        </button>
      ) : (
        <div className="hidden sm:block sm:flex-1" />
      )}

      {/* Divider (desktop only) */}
      <div className="hidden sm:block w-px h-10 bg-sepia-200 dark:bg-sepia-800/50 shrink-0" />

      {/* Next / Epilogue */}
      {nextId && nextChapter ? (
        <button
          onClick={() => navigate(`/chapter/${nextId}`)}
          className="group flex flex-col text-right items-end w-full sm:w-auto flex-1 p-3 sm:p-0 rounded-xl sm:rounded-none hover:bg-cream-200/50 dark:hover:bg-charcoal-800/40 sm:hover:bg-transparent sm:dark:hover:bg-transparent transition-colors active:scale-[0.98]"
        >
          <span className="flex items-center gap-2 font-inter font-semibold uppercase text-sepia-400 group-hover:text-gold-500 transition-colors mb-1.5"
            style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)', letterSpacing: '0.15em' }}
          >
            Next Chapter <FiArrowRight size={13} />
          </span>
          <span
            className="font-playfair text-sepia-700 dark:text-cream-200 group-hover:text-gold-400 transition-colors leading-tight"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
          >
            {nextChapter.title}
          </span>
        </button>
      ) : (
        <button
          onClick={() => navigate('/epilogue')}
          className="group flex flex-col text-right items-end w-full sm:w-auto flex-1 p-3 sm:p-0 rounded-xl sm:rounded-none hover:bg-cream-200/50 dark:hover:bg-charcoal-800/40 sm:hover:bg-transparent sm:dark:hover:bg-transparent transition-colors active:scale-[0.98]"
        >
          <span className="flex items-center gap-2 font-inter font-semibold uppercase text-sepia-400 group-hover:text-gold-500 transition-colors mb-1.5"
            style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)', letterSpacing: '0.15em' }}
          >
            Epilogue <FiArrowRight size={13} />
          </span>
          <span
            className="font-playfair text-sepia-700 dark:text-cream-200 group-hover:text-gold-400 transition-colors leading-tight"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
          >
            The Journey's End
          </span>
        </button>
      )}
    </div>
  );
};

export default ChapterNav;
