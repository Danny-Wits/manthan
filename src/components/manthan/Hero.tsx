import React, { useRef, useState } from 'react';
import { ArrowDown, Play, Pause, Building2, Music } from 'lucide-react';
import { CelestialStarfieldCanvas } from '../hero/CelestialStarfieldCanvas';
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
      className="relative w-full min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-theme-bg"
    >
      {/* 1. Celestial Night Sky Starfield Canvas */}
      <CelestialStarfieldCanvas className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* 2. Ambient Celestial Gradient Mesh Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[850px] h-[500px] sm:h-[650px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/20 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* 3. Background Video (Shifted upward, higher opacity with soft feathered edges) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <div className="relative -translate-y-16 sm:-translate-y-24 md:-translate-y-28 transition-transform duration-700">
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-[88vh] max-w-[560px] object-cover opacity-65 sm:opacity-75 rounded-3xl select-none shadow-[0_0_100px_rgba(34,211,238,0.2)]"
          />
          {/* Subtle cosmic vignette gradient over the video to preserve text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B1E]/30 via-transparent to-[#0A0B1E]/80 rounded-3xl pointer-events-none" />
        </div>
        {/* Soft edge fade into cosmic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B1E]/40 via-transparent to-[#0A0B1E] pointer-events-none" />
      </div>

      {/* 4. Foreground Hero Content (Clean, Spacious, Majestic Gradient Theme) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Brand Emblem with Starlight Aura */}
        <div className="relative mb-5 flex items-center justify-center group">
          <div className="absolute -inset-8 bg-gradient-to-tr from-indigo-600/25 via-amber-400/25 to-cyan-400/25 blur-3xl rounded-full pointer-events-none" />
          <img
            src="/manthan-emblem-transparent.png"
            alt="MANTHAN Celestial Emblem"
            className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_0_35px_rgba(251,191,36,0.4)] select-none transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Grand Brand Heading with Gradient Theme & Logo Tracking */}
        <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.22em] text-gradient-celestial uppercase pl-[0.22em] mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          MANTHAN
        </h1>

        {/* Celestial Warm Amber Tagline with Gradient */}
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-gradient-gold font-normal mb-8 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
          &ldquo;{MANTHAN_CONTENT.tagline}&rdquo;
        </p>

        {/* Introduction Paragraph from Document */}
        <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-sans max-w-2xl mb-10 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
          {MANTHAN_CONTENT.introduction.lead}
        </p>

        {/* Rounded Pill Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => scrollTo('about')}
            className="btn-primary px-8 py-3.5 text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            <span>Explore Our Work</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('institutions')}
            className="btn-secondary px-8 py-3.5 text-sm font-semibold flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Book an Institutional Session</span>
          </button>
        </div>

        {/* Interdisciplinary Fields with Soft Rounded Gradient Pills */}
        <div className="pt-8 w-full flex flex-col items-center relative">
          <div className="absolute top-0 inset-x-0 gradient-divider" />
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
            Interdisciplinary Inquiry Fields
          </span>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {MANTHAN_CONTENT.introduction.disciplines.map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 rounded-full text-xs font-mono text-amber-100/90 badge-gradient"
              >
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Ambient Controls Dock (Soft Rounded Pill) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 p-1.5 px-2 rounded-full bg-[#0F112B]/95 border border-white/10 shadow-2xl backdrop-blur-md">
        <button
          onClick={handleSoundToggle}
          className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-2 text-xs ${
            soundActive
              ? 'text-amber-200 bg-gradient-to-r from-amber-500/25 via-purple-500/25 to-cyan-500/25 border border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
              : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/5 hover:border-white/15'
          }`}
          aria-label={soundActive ? 'Pause ambient cosmic music' : 'Play ambient cosmic music'}
          title={soundActive ? 'Pause ambient cosmic music & chimes' : 'Play ambient cosmic music & chimes'}
        >
          <Music className={`w-3.5 h-3.5 ${soundActive ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
          <span className="text-[11px] font-mono font-medium">
            {soundActive ? 'Music: ON' : 'Ambient Music'}
          </span>
          {soundActive && (
            <span className="flex items-center gap-0.5 ml-0.5">
              <span className="w-0.5 h-3 bg-amber-400 animate-[bounce_1s_infinite_100ms] rounded-full" />
              <span className="w-0.5 h-2 bg-amber-300 animate-[bounce_1s_infinite_250ms] rounded-full" />
              <span className="w-0.5 h-3.5 bg-cyan-400 animate-[bounce_1s_infinite_400ms] rounded-full" />
            </span>
          )}
        </button>

        <span className="w-px h-4 bg-white/10" />

        <button
          onClick={togglePlay}
          className="p-2 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          title={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
};
