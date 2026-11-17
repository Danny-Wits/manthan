import React, { useRef, useState } from 'react';
import { ArrowDown, Play, Pause, Building2, Music } from 'lucide-react';
import { MANTHAN_CONTENT } from '../../data/manthanContent';
import { toggleCosmicSound } from '../../lib/cosmicSound';

interface HeroProps {
  onSelectTopic?: (topicId: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundActive, setSoundActive] = useState(false);

  const handleSoundToggle = () => {
    const newState = toggleCosmicSound();
    setSoundActive(newState);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* 1. Seamlessly Blended Background Video (Jet Black Screen Blend & Feathered Radial Mask) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <div className="relative -translate-y-16 sm:-translate-y-24 md:-translate-y-28 transition-transform duration-700">
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-[88vh] max-w-[620px] object-cover opacity-60 sm:opacity-65 select-none mix-blend-screen contrast-125 brightness-95 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black_20%,rgba(0,0,0,0.85)_48%,rgba(0,0,0,0.25)_72%,transparent_92%)] [-webkit-mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black_20%,rgba(0,0,0,0.85)_48%,rgba(0,0,0,0.25)_72%,transparent_92%)]"
          />
          {/* Jet black edge dissolves */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
        </div>
        {/* Full-bleed jet black fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />
      </div>

      {/* 2. Foreground Hero Content (Warm Yellow & Jet Black Theme - Distinctive & Bold) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Brand Emblem with Warm Starlight Halo */}
        <div className="relative mb-5 flex items-center justify-center group">
          <div className="absolute -inset-6 bg-yellow-400/15 blur-2xl rounded-full pointer-events-none" />
          <img
            src="/manthan-emblem-transparent.png"
            alt="MANTHAN Celestial Emblem"
            className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain theme-logo-filter select-none transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Grand Brand Heading in Crisp Warm White */}
        <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.22em] text-[#FFFDF5] uppercase pl-[0.22em] mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,1)]">
          MANTHAN
        </h1>

        {/* Tagline in Solid Radiant Warm Yellow */}
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#FACC15] font-normal mb-8 drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
          &ldquo;{MANTHAN_CONTENT.tagline}&rdquo;
        </p>

        {/* Introduction Paragraph from Document */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl mb-10 drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
          {MANTHAN_CONTENT.introduction.lead}
        </p>

        {/* Rounded Pill Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => scrollTo('about')}
            className="btn-primary px-8 py-3.5 text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <span>Explore Our Work</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('institutions')}
            className="btn-secondary px-8 py-3.5 text-sm font-bold flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Building2 className="w-4 h-4 text-yellow-400" />
            <span>Book an Institutional Session</span>
          </button>
        </div>

        {/* Interdisciplinary Fields with Soft Rounded Pills */}
        <div className="pt-8 border-t border-yellow-500/15 w-full flex flex-col items-center">
          <span className="text-[11px] font-mono text-yellow-400/80 uppercase tracking-wider mb-3">
            Interdisciplinary Inquiry Fields
          </span>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {MANTHAN_CONTENT.introduction.disciplines.map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 rounded-full text-xs font-mono text-yellow-200/90 bg-[#0E0E0E] border border-yellow-500/20 hover:border-yellow-400/50 transition-colors"
              >
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Ambient Controls Dock (Jet Black Pill with Warm Yellow Accents) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 p-1.5 px-2 rounded-full bg-[#0A0A0A]/95 border border-yellow-500/20 shadow-2xl backdrop-blur-md">
        <button
          onClick={handleSoundToggle}
          className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-2 text-xs ${
            soundActive
              ? 'text-black bg-yellow-400 font-bold shadow-[0_0_15px_rgba(250,204,21,0.4)]'
              : 'text-slate-400 hover:text-white bg-white/[0.04] border border-white/5 hover:border-yellow-400/30'
          }`}
          aria-label={soundActive ? 'Pause ambient cosmic music' : 'Play ambient cosmic music'}
          title={soundActive ? 'Pause ambient cosmic music & chimes' : 'Play ambient cosmic music & chimes'}
        >
          <Music className={`w-3.5 h-3.5 ${soundActive ? 'text-black animate-pulse' : 'text-slate-400'}`} />
          <span className="text-[11px] font-mono font-medium">
            {soundActive ? 'Music: ON' : 'Ambient Music'}
          </span>
          {soundActive && (
            <span className="flex items-center gap-0.5 ml-0.5">
              <span className="w-0.5 h-3 bg-black animate-[bounce_1s_infinite_100ms] rounded-full" />
              <span className="w-0.5 h-2 bg-black animate-[bounce_1s_infinite_250ms] rounded-full" />
              <span className="w-0.5 h-3.5 bg-black animate-[bounce_1s_infinite_400ms] rounded-full" />
            </span>
          )}
        </button>

        <span className="w-px h-4 bg-white/10" />

        <button
          onClick={togglePlay}
          className="p-2 rounded-full text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          title={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
};
