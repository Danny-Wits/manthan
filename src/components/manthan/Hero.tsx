import React from 'react';
import { Prismatic } from '../ui/prismatic-display';
import { SESSIONS_DATA } from '../../data/manthanContent';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onSelectTopic?: (topicId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTopic }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTopicClick = (topicId: string) => {
    if (onSelectTopic) onSelectTopic(topicId);
    scrollTo('sessions');
  };

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-midnight">
      <Prismatic onScrollDown={() => scrollTo('sessions')} className="min-h-screen w-full">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center px-4 pt-16 sm:pt-20 pb-10">
          {/* Status / Mission Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-lavender/15 bg-midnight/80 backdrop-blur-md mb-6 select-none shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-holo-cyan animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-lavender/90 uppercase">
              Open for Institutional Collaborations
            </span>
          </div>

          {/* Core Title & Tagline */}
          <h1 className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-ivory mb-4 uppercase drop-shadow-lg">
            MANTHAN
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-display font-light text-holo-cyan mb-6 tracking-wide italic">
            Explore. Understand. Evolve.
          </p>

          {/* Introduction Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-ivory/80 leading-relaxed font-sans max-w-2xl mb-8">
            MANTHAN is a platform dedicated to psychology, philosophy, human understanding and creative expression.
            We aim to create meaningful spaces for individuals to learn, reflect, question and explore the human experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10 pointer-events-auto">
            <button
              onClick={() => scrollTo('book')}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-midnight bg-holo-cyan hover:bg-holo-cyan/90 transition-all duration-300 shadow-[0_0_20px_rgba(79,216,232,0.35)] hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>Book an Institutional Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('sessions')}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-lavender border border-lavender/25 hover:border-lavender/55 hover:text-ivory bg-midnight/70 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              Explore Sessions
            </button>
          </div>

          {/* Brief Sessions Preview */}
          <div className="w-full pt-4 border-t border-lavender/10">
            <p className="text-[11px] font-mono tracking-widest uppercase text-lavender/60 mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-holo-cyan" />
              <span>Available Session Focus Areas</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {SESSIONS_DATA.map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleTopicClick(session.id)}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-mono text-ivory/70 hover:text-holo-cyan border border-white/5 hover:border-holo-cyan/30 bg-white/[0.02] hover:bg-white/[0.06] transition-all cursor-pointer"
                >
                  {session.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Prismatic>
    </section>
  );
};
