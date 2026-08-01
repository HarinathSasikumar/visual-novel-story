import React from 'react';
import { motion } from 'framer-motion';
import type { ContentBlock } from '../../types/chapter';
import { useNovelStore } from '../../store/useNovelStore';
import QuoteCard from '../ui/QuoteCard';

interface ChapterBodyProps {
  content: ContentBlock[];
  chapterId: number;
  chapterTitle: string;
}

const ChapterBody: React.FC<ChapterBodyProps> = ({ content, chapterId, chapterTitle }) => {
  const { settings } = useNovelStore();

  const getFontClass = () => {
    switch (settings.fontFamily) {
      case 'inter': return 'font-inter';
      case 'lora': return 'font-lora';
      case 'eb-garamond': return 'font-eb-garamond';
      default: return 'font-playfair';
    }
  };

  return (
    <div
      className={`mx-auto pb-16 ${getFontClass()}`}
      style={{
        maxWidth: 'min(72ch, 100% - 2rem)',
        paddingLeft: 'clamp(1rem, 5vw, 3rem)',
        paddingRight: 'clamp(1rem, 5vw, 3rem)',
        fontSize: settings.fontSize,
        lineHeight: settings.lineHeight,
      }}
    >
      {content.map((block, idx) => {
        if (block.type === 'paragraph') {
          return (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="mb-5 sm:mb-6 text-sepia-800 dark:text-cream-100"
            >
              {block.text}
            </motion.p>
          );
        }

        if (block.type === 'emphasis') {
          return (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 sm:mb-6 text-sepia-900 dark:text-cream-50 italic font-semibold"
            >
              {block.text}
            </motion.p>
          );
        }

        if (block.type === 'dialogue') {
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 sm:mb-6 ml-3 sm:ml-6 pl-3 sm:pl-4 border-l-2 border-gold-400/40"
            >
              <p className="text-sepia-800 dark:text-cream-100 italic">
                "{block.text}"
              </p>
              {block.speaker && (
                <p
                  className="font-inter font-semibold uppercase text-gold-500 mt-2"
                  style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)', letterSpacing: '0.15em' }}
                >
                  — {block.speaker}
                </p>
              )}
            </motion.div>
          );
        }

        if (block.type === 'section-break') {
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex justify-center items-center gap-3 my-10 sm:my-16"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400/50" />
            </motion.div>
          );
        }

        if (block.type === 'quote') {
          return (
            <QuoteCard
              key={idx}
              text={block.text || ''}
              chapterId={chapterId}
              chapterTitle={chapterTitle}
              variant="inline"
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default ChapterBody;
