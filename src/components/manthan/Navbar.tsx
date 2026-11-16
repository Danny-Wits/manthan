import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Sessions', href: '#sessions' },
    { label: 'Book a Session', href: '#book' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight/90 backdrop-blur-md border-b border-lavender/10 shadow-lg shadow-midnight/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-holo-cyan group-hover:scale-125 transition-transform shadow-[0_0_8px_#4FD8E8]" />
          <span className="font-mono text-base sm:text-lg font-bold tracking-wider text-ivory">
            MANTHAN
          </span>
          <span className="text-[10px] font-mono tracking-widest text-lavender/50 uppercase ml-1 hidden sm:inline">
            Initiative
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-[13px] font-medium text-ivory/70 hover:text-holo-cyan transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('#book')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold text-midnight bg-holo-cyan hover:bg-holo-cyan/90 transition-all duration-200 shadow-[0_0_15px_rgba(79,216,232,0.3)] cursor-pointer"
          >
            <span>Book a Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ivory-muted hover:text-ivory focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight/95 backdrop-blur-xl border-b border-lavender/10 px-6 py-6 flex flex-col gap-4 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-ivory/80 hover:text-holo-cyan py-1"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => handleNavClick('#book')}
            className="w-full mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-midnight bg-holo-cyan hover:bg-holo-cyan/90 shadow-md cursor-pointer"
          >
            <span>Book an Institutional Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
