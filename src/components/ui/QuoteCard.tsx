import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShare2, FiCopy, FiCheck } from 'react-icons/fi';
import { useNovelStore } from '../../store/useNovelStore';
import type { FavoriteQuote } from '../../types/chapter';

interface QuoteCardProps {
  text: string;
  chapterId: number;
  chapterTitle: string;
  variant?: 'chapter' | 'inline' | 'ending';
}

const QuoteCard: React.FC<QuoteCardProps> = ({ text, chapterId, chapterTitle, variant = 'chapter' }) => {
  const [copied, setCopied] = useState(false);
  const { addFavoriteQuote, removeFavoriteQuote, isFavoriteQuote } = useNovelStore();
  const id = `quote-${chapterId}-${text.slice(0, 20).replace(/\s/g, '-')}`;
  const isLiked = isFavoriteQuote(id);

  const handleLike = () => {
    if (isLiked) {
      removeFavoriteQuote(id);
    } else {
      const fq: FavoriteQuote = { id, text, chapterId, chapterTitle };
      addFavoriteQuote(fq);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`"${text}" — Chapter ${chapterId}: ${chapterTitle}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="my-10 px-6 py-6 border-l-4 border-gold-400 bg-cream-100 dark:bg-charcoal-900 rounded-r-2xl"
      >
        <p className="font-playfair text-lg text-sepia-700 dark:text-cream-300 italic leading-relaxed">
          "{text}"
        </p>
      </motion.div>
    );
  }

  if (variant === 'ending') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative my-16 mx-auto max-w-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-gold-600/5 rounded-3xl" />
        <div className="relative border border-gold-400/30 rounded-3xl p-8 md:p-10 text-center backdrop-blur-sm">
          <div className="text-4xl text-gold-400/40 font-playfair mb-4 leading-none">"</div>
          <p className="font-playfair text-xl md:text-2xl text-sepia-700 dark:text-cream-200 italic leading-relaxed">
            {text}
          </p>
          <div className="text-4xl text-gold-400/40 font-playfair mt-4 leading-none">"</div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={handleLike} aria-label={isLiked ? 'Unlike quote' : 'Like quote'}
              className={`transition-colors ${isLiked ? 'text-red-400' : 'text-sepia-400 hover:text-red-400'}`}>
              <FiHeart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button onClick={handleCopy} aria-label="Copy quote"
              className="text-sepia-400 hover:text-gold-400 transition-colors">
              {copied ? <FiCheck size={18} className="text-green-400" /> : <FiCopy size={18} />}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative my-10 mx-auto max-w-xl text-center"
    >
      <span className="absolute -top-4 left-0 text-6xl text-gold-400/20 font-playfair leading-none">"</span>
      <p className="font-playfair text-xl md:text-2xl text-sepia-600 dark:text-cream-300 italic leading-relaxed px-8">
        {text}
      </p>
      <span className="absolute -bottom-4 right-0 text-6xl text-gold-400/20 font-playfair leading-none">"</span>
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={handleLike} aria-label={isLiked ? 'Unlike quote' : 'Like quote'}
          className={`transition-colors ${isLiked ? 'text-red-400' : 'text-sepia-400 hover:text-red-400'}`}>
          <FiHeart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        <button onClick={handleCopy} aria-label="Copy quote"
          className="text-sepia-400 hover:text-gold-400 transition-colors">
          {copied ? <FiCheck size={16} className="text-green-400" /> : <FiCopy size={16} />}
        </button>
        <button onClick={() => { if (navigator.share) { navigator.share({ title: chapterTitle, text }); } }}
          aria-label="Share quote" className="text-sepia-400 hover:text-gold-400 transition-colors">
          <FiShare2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default QuoteCard;
