import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Landing: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();

    // Phase 1: Reveal Date
    tl.to('.line-1', { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 1 })
      .to('.line-2', { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=0.8')
      .to('.line-3', { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=0.8')

    // Phase 2: Tagline
      .to(['.line-1', '.line-2', '.line-3'], { opacity: 0, y: -20, duration: 1, delay: 2 })
      .call(() => setPhase(1))
      .to('.tagline', { opacity: 1, duration: 2, ease: 'power2.out' })
      .to('.tagline', { opacity: 0, duration: 1.5, delay: 3 })

    // Phase 3: Book
      .call(() => setPhase(2))
      .to('.book-container', { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' })
      .to('.book-cover', { rotateY: -110, duration: 2, ease: 'power2.inOut', delay: 1 })
      .to('.book-container', { scale: 5, opacity: 0, duration: 1.5, ease: 'power2.in', delay: 0.5 })

    // Transition to Chapter 1
      .call(() => {
        setTimeout(() => navigate('/chapter/1'), 500);
      });

    return () => { tl.kill(); };
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-50"
      style={{ background: '#0D0B07' }}
    >
      {/* Cinematic cover image background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/cover.jpg')" }}
      />
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/72" />

      {/* Phase 0: Date Reveal */}
      <AnimatePresence>
        {phase === 0 && (
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <h2
              className="line-1 opacity-0 translate-y-4 font-playfair text-cream-200/80 mb-2"
              style={{ fontSize: 'clamp(1rem, 4vw, 1.75rem)' }}
            >
              Wednesday
            </h2>
            <h1
              className="line-2 opacity-0 translate-y-4 font-playfair text-cream-50 mb-4"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 3.25rem)' }}
            >
              11 December 2024
            </h1>
            <h2
              className="line-3 opacity-0 translate-y-4 font-playfair text-gold-400"
              style={{ fontSize: 'clamp(1rem, 4vw, 1.75rem)' }}
            >
              6:55 PM
            </h2>
          </div>
        )}
      </AnimatePresence>

      {/* Phase 1: Tagline */}
      <AnimatePresence>
        {phase === 1 && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center z-10">
            <h1
              className="tagline opacity-0 font-playfair text-cream-100 leading-relaxed"
              style={{ fontSize: 'clamp(1.1rem, 3.5vw, 2.25rem)', maxWidth: '36rem' }}
            >
              "Some shortcuts don't change your path.<br />
              <span className="text-gold-400">They change your life.</span>"
            </h1>
          </div>
        )}
      </AnimatePresence>

      {/* Phase 2: Book Open Animation */}
      <AnimatePresence>
        {phase === 2 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center perspective-[2000px] z-10">
            <p className="text-cream-200/50 font-inter text-xs tracking-[0.3em] uppercase mb-10 animate-pulse-soft">
              The Journey Begins
            </p>
            <div
              className="book-container opacity-0 scale-95 relative preserve-3d"
              style={{
                width: 'clamp(140px, 30vw, 220px)',
                height: 'clamp(210px, 45vw, 330px)',
              }}
            >
              {/* Book pages */}
              <div className="absolute inset-0 bg-cream-100 rounded-r-lg shadow-page transform translate-z-[-2px]" />
              {/* Book cover */}
              <div
                className="book-cover absolute inset-0 bg-gradient-to-br from-charcoal-900 to-charcoal-800 rounded-r-lg border border-white/10 shadow-xl origin-left flex flex-col items-center justify-center p-4 sm:p-6 text-center backface-visible"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-full h-full border border-gold-400/30 rounded flex flex-col items-center justify-center p-3">
                  <span
                    className="font-playfair text-gold-400 mb-2 sm:mb-4"
                    style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}
                  >
                    6:55 PM
                  </span>
                  <h2
                    className="font-playfair text-cream-100 uppercase tracking-widest leading-tight"
                    style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)' }}
                  >
                    The Shortcut
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
