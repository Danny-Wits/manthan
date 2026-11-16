import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-midnight-darker border-t border-lavender/10 py-12 px-5 sm:px-8 text-ivory/60 font-sans text-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand Ethos */}
        <div className="flex flex-col sm:items-start items-center text-center sm:text-left gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-holo-cyan shadow-[0_0_8px_#4FD8E8]" />
            <span className="font-mono text-sm font-bold text-ivory tracking-wider">
              MANTHAN
            </span>
          </div>
          <p className="text-[11px] text-ivory/50 font-mono mt-1">
            Explore. Understand. Evolve. · Psychology, Philosophy & Human Understanding
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] font-mono text-lavender/70">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-holo-cyan transition-colors"
          >
            Home
          </a>
          <a
            href="#sessions"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('sessions')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-holo-cyan transition-colors"
          >
            Sessions
          </a>
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-holo-cyan transition-colors"
          >
            Book a Session
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-holo-cyan transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Back to top */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-ivory/40">
            Initial Plan | Version 1
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-lavender hover:text-ivory border border-white/5 transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-ivory/30">
        © {new Date().getFullYear()} MANTHAN Initiative. All rights reserved.
      </div>
    </footer>
  );
};
