import { useState, useEffect, useCallback } from 'react';

export const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    setProgress(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return progress;
};
