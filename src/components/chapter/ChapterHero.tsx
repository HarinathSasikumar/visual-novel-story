import React from 'react';
import { motion } from 'framer-motion';

interface ChapterHeroProps {
  id: number;
  title: string;
  subtitle?: string;
  date?: string;
  image?: string;
}

const ChapterHero: React.FC<ChapterHeroProps> = ({ id, title, subtitle, date, image }) => {
  const padded = id < 10 ? `0${id}` : `${id}`;
  const imgSrc = image || `/images/chapter${padded}.jpg`;

  return (
    <div
      className="relative w-full mb-10 md:mb-16"
      style={{ height: 'clamp(55vh, 75vw, 85vh)' }}
    >
      {/* ── Cinematic Background Image ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 'clamp(0.5rem, 2vw, 1.5rem)',
          left: 'clamp(0.5rem, 2vw, 1.5rem)',
          right: 'clamp(0.5rem, 2vw, 1.5rem)',
          bottom: 0,
          borderRadius: 'clamp(0.75rem, 2vw, 1.5rem)',
          overflow: 'hidden',
        }}
      >
        <img
          src={imgSrc}
          alt={title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* Cinematic gradient overlay — lighter on top to show image, fades to bg at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(10,7,3,0.45) 0%, rgba(20,12,6,0.25) 35%, rgba(250,246,239,0.95) 100%)',
            zIndex: 2,
          }}
          className="dark:[background:linear-gradient(to_bottom,rgba(5,4,2,0.5)_0%,rgba(10,7,3,0.3)_35%,rgba(13,11,7,0.97)_100%)]"
        />
      </motion.div>

      {/* ── Text Content — centered vertically in upper 60% ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '25%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1rem clamp(1rem, 5vw, 3rem)',
          zIndex: 10,
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-inter text-gold-400 font-semibold uppercase tracking-[0.25em] mb-4"
          style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}
        >
          Chapter {id < 10 ? `0${id}` : id}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-playfair text-cream-50 font-medium leading-tight mb-4"
          style={{
            fontSize: 'clamp(1.6rem, 6vw, 4.5rem)',
            textShadow: '0 2px 32px rgba(0,0,0,0.9)',
            maxWidth: '90vw',
          }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-playfair text-cream-200/80 italic mb-6"
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)',
              textShadow: '0 1px 16px rgba(0,0,0,0.8)',
              maxWidth: '80vw',
            }}
          >
            {subtitle}
          </motion.h2>
        )}

        {date && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-3 mt-2"
          >
            <div className="h-px w-8 bg-gold-400/50" />
            <span
              className="font-inter text-cream-200/60 uppercase tracking-widest"
              style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}
            >
              {date}
            </span>
            <div className="h-px w-8 bg-gold-400/50" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChapterHero;
