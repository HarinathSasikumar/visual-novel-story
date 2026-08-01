import React, { useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { getChapterById } from '../data/chapterIndex';
import { useNovelStore } from '../store/useNovelStore';
import ChapterHero from '../components/chapter/ChapterHero';
import ChapterBody from '../components/chapter/ChapterBody';
import ChapterNav from '../components/nav/ChapterNav';
import QuoteCard from '../components/ui/QuoteCard';
import MusicPlayer from '../components/ui/MusicPlayer';
import PageTransition from '../components/ui/PageTransition';

// Atmospheres
import ParticleField from '../components/ui/ParticleField';
import FloatingLeaves from '../components/ui/FloatingLeaves';
import RainEffect from '../components/ui/RainEffect';
import SnowEffect from '../components/ui/SnowEffect';
import GoldenDust from '../components/ui/GoldenDust';

const ChapterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const chapterId = parseInt(id || '1', 10);
  const chapter = useMemo(() => getChapterById(chapterId), [chapterId]);
  const { setCurrentChapterId, isBookmarked, addBookmark, removeBookmark } = useNovelStore();

  useEffect(() => {
    if (chapter) {
      setCurrentChapterId(chapter.id);
    }
  }, [chapter, setCurrentChapterId]);

  if (!chapter) {
    return <Navigate to="/chapter/1" replace />;
  }

  const bookmarked = isBookmarked(chapter.id);
  const handleBookmark = () => {
    if (bookmarked) removeBookmark(chapter.id);
    else addBookmark({ chapterId: chapter.id, chapterTitle: chapter.title, savedAt: new Date().toLocaleDateString() });
  };

  return (
    <PageTransition>
      {/* Atmosphere rendering */}
      {chapter.atmosphere === 'particles' && <ParticleField />}
      {chapter.atmosphere === 'leaves' && <FloatingLeaves />}
      {chapter.atmosphere === 'rain' && <RainEffect />}
      {chapter.atmosphere === 'snow' && <SnowEffect />}
      {chapter.atmosphere === 'golden' && <GoldenDust />}

      <div className="relative z-10 w-full min-h-screen min-h-[100dvh] pb-20"
        style={{ paddingTop: 'clamp(52px, 8vw, 72px)' }}
      >
        {/* Music Player — centered, fluid width */}
        <div className="w-full flex justify-center px-4 mb-4 mt-2">
          <MusicPlayer src={chapter.music} chapterTitle={chapter.title} />
        </div>

        {/* Chapter Hero Image */}
        <ChapterHero
          id={chapter.id}
          title={chapter.title}
          subtitle={chapter.subtitle}
          date={chapter.date}
          image={chapter.image}
        />

        {/* Meta row: reading time + bookmark */}
        <div
          className="mx-auto mb-10 flex justify-between items-center text-sepia-400 dark:text-sepia-500 font-inter"
          style={{
            maxWidth: 'min(72ch, 100% - 2rem)',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)',
          }}
        >
          <span>~ {chapter.readingTime} min read</span>
          <button
            onClick={handleBookmark}
            className="hover:text-gold-500 transition-colors py-1 px-2 -mr-2 rounded"
          >
            {bookmarked ? 'Remove Bookmark' : 'Bookmark Chapter'}
          </button>
        </div>

        <QuoteCard
          text={chapter.quote}
          chapterId={chapter.id}
          chapterTitle={chapter.title}
        />

        <ChapterBody
          content={chapter.content}
          chapterId={chapter.id}
          chapterTitle={chapter.title}
        />

        {chapter.endQuote && (
          <QuoteCard
            text={chapter.endQuote}
            chapterId={chapter.id}
            chapterTitle={chapter.title}
            variant="ending"
          />
        )}

        {/* Chapter navigation */}
        <div
          className="mx-auto mt-16"
          style={{
            maxWidth: 'min(72ch, 100% - 2rem)',
            paddingLeft: 'clamp(1rem, 5vw, 3rem)',
            paddingRight: 'clamp(1rem, 5vw, 3rem)',
          }}
        >
          <ChapterNav currentId={chapter.id} />
        </div>
      </div>
    </PageTransition>
  );
};

export default ChapterPage;
