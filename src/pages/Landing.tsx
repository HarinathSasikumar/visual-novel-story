import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Landing: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);

  // ── Parallax: move bg slightly on mouse move (desktop only) ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const xPct = (e.clientX / window.innerWidth - 0.5) * 12;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 8;
      bgRef.current.style.transform = `scale(1.08) translate(${xPct}px, ${yPct}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ── Cinematic timeline ──
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to('.line-1', { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 1 })
      .to('.line-2', { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=0.8')
      .to('.line-3', { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=0.8')
      .to(['.line-1', '.line-2', '.line-3'], { opacity: 0, y: -20, duration: 1, delay: 2.5 })
      .call(() => setPhase(1))
      .to('.tagline', { opacity: 1, duration: 2, ease: 'power2.out' })
      .to('.tagline', { opacity: 0, duration: 1.5, delay: 3.5 })
      .call(() => setPhase(2))
      .to('.book-container', { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' })
      .to('.book-cover', { rotateY: -110, duration: 2, ease: 'power2.inOut', delay: 1 })
      .to('.book-container', { scale: 5, opacity: 0, duration: 1.5, ease: 'power2.in', delay: 0.5 })
      .call(() => { setTimeout(() => navigate('/chapter/1'), 500); });

    return () => { tl.kill(); };
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden z-50"
      style={{ background: '#0A0806' }}
    >
      {/* ── Cinematic Cover Image with Ken Burns Zoom ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: 'scale(1.08)',
          transition: 'transform 0.12s ease-out',
        }}
      >
        <img
          src="/images/cover.jpg"
          alt="6:55 PM – The Shortcut That Changed My Life"
          fetchPriority="high"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            // Keep characters centered — portrait image anchored to center-top
            objectFit: 'cover',
            objectPosition: 'center 20%',
            // CSS Ken Burns slow zoom
            animation: 'kenBurns 18s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* ── Layered Cinematic Overlay (vignette style, not flat black) ── */}
      {/* Top vignette — darkens top edge for text safety */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,4,2,0.55) 0%, rgba(5,4,2,0.10) 30%, rgba(5,4,2,0.10) 60%, rgba(5,4,2,0.72) 100%)',
          zIndex: 2,
        }}
      />
      {/* Side vignettes — darken left/right edges on ultra-wide */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,4,2,0.55) 100%)',
          zIndex: 3,
        }}
      />
      {/* Warm cinematic grade — adds orange/gold film tone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(80,40,10,0.18) 0%, transparent 50%, rgba(10,20,40,0.18) 100%)',
          zIndex: 4,
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── Phase 0: Date Reveal ── */}
      <AnimatePresence>
        {phase === 0 && (
          <div className="relative flex flex-col items-center text-center px-6" style={{ zIndex: 10 }}>
            {/* Decorative line above */}
            <div className="w-12 h-px bg-gold-400/50 mb-6" />

            <h2
              className="line-1 opacity-0 font-playfair tracking-[0.2em] uppercase mb-3"
              style={{
                fontSize: 'clamp(0.75rem, 2.5vw, 1.1rem)',
                color: 'rgba(245, 217, 139, 0.75)',
                transform: 'translateY(20px)',
                textShadow: '0 2px 20px rgba(0,0,0,0.9)',
                letterSpacing: '0.35em',
              }}
            >
              Wednesday
            </h2>
            <h1
              className="line-2 opacity-0 font-playfair text-cream-50 mb-3"
              style={{
                fontSize: 'clamp(1.6rem, 6vw, 3.5rem)',
                transform: 'translateY(20px)',
                textShadow: '0 2px 40px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,0.8)',
                letterSpacing: '0.05em',
                fontWeight: 500,
              }}
            >
              11 December 2024
            </h1>
            <h2
              className="line-3 opacity-0 font-playfair"
              style={{
                fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                color: '#E8C252',
                transform: 'translateY(20px)',
                textShadow: '0 0 40px rgba(232,194,82,0.6), 0 2px 20px rgba(0,0,0,0.9)',
                letterSpacing: '0.3em',
              }}
            >
              6:55 PM
            </h2>

            {/* Decorative line below */}
            <div className="w-12 h-px bg-gold-400/50 mt-6" />
          </div>
        )}
      </AnimatePresence>

      {/* ── Phase 1: Tagline ── */}
      <AnimatePresence>
        {phase === 1 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ zIndex: 10 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              {/* Top ornament */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-16 bg-gold-400/40" />
                <div className="w-1 h-1 rounded-full bg-gold-400/60" />
                <div className="h-px w-16 bg-gold-400/40" />
              </div>

              <h1
                className="tagline opacity-0 font-playfair text-cream-50 leading-relaxed"
                style={{
                  fontSize: 'clamp(1.1rem, 3.2vw, 2.1rem)',
                  maxWidth: '38rem',
                  textShadow: '0 2px 32px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.8)',
                  lineHeight: 1.7,
                }}
              >
                "Some shortcuts don't change your path.
                <br />
                <span
                  style={{
                    color: '#E8C252',
                    textShadow: '0 0 40px rgba(232,194,82,0.5), 0 2px 20px rgba(0,0,0,0.9)',
                  }}
                >
                  They change your life.
                </span>"
              </h1>

              {/* Bottom ornament */}
              <div className="flex items-center gap-3 mt-8">
                <div className="h-px w-16 bg-gold-400/40" />
                <div className="w-1 h-1 rounded-full bg-gold-400/60" />
                <div className="h-px w-16 bg-gold-400/40" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Phase 2: Book Open Animation ── */}
      <AnimatePresence>
        {phase === 2 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ perspective: '2000px', zIndex: 10 }}
          >
            <p
              className="text-cream-200/50 font-inter uppercase mb-10 animate-pulse-soft"
              style={{
                fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
                letterSpacing: '0.4em',
                textShadow: '0 1px 12px rgba(0,0,0,0.8)',
              }}
            >
              The Journey Begins
            </p>

            <div
              className="book-container opacity-0 scale-95 relative preserve-3d"
              style={{
                width: 'clamp(130px, 28vw, 210px)',
                height: 'clamp(195px, 42vw, 315px)',
              }}
            >
              {/* Book pages (back) */}
              <div
                className="absolute inset-0 rounded-r-lg shadow-page"
                style={{ background: '#FAF6EF', transform: 'translateZ(-2px)' }}
              />
              {/* Book cover */}
              <div
                className="book-cover absolute inset-0 rounded-r-lg border border-white/10 shadow-2xl origin-left flex items-center justify-center backface-visible"
                style={{
                  background: 'linear-gradient(135deg, #1A1814 0%, #0D0B07 100%)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="w-[85%] h-[85%] flex flex-col items-center justify-center text-center"
                  style={{ border: '1px solid rgba(232,194,82,0.3)', borderRadius: '4px', padding: '1rem' }}
                >
                  <span
                    className="font-playfair text-gold-400 mb-3 tracking-[0.3em] uppercase"
                    style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
                  >
                    6:55 PM
                  </span>
                  <h2
                    className="font-playfair text-cream-100 uppercase leading-snug"
                    style={{
                      fontSize: 'clamp(0.75rem, 2.2vw, 1.1rem)',
                      letterSpacing: '0.2em',
                    }}
                  >
                    The<br />Shortcut
                  </h2>
                  <div className="w-8 h-px bg-gold-400/40 mt-3" />
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Ken Burns CSS keyframe ── */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.0) translate(0px, 0px); }
          100% { transform: scale(1.06) translate(-8px, -4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes kenBurns { 0%, 100% { transform: scale(1.04); } }
        }
      `}</style>
    </div>
  );
};

export default Landing;
