import React from 'react';
import { CONTACT_INFO } from '../../data/manthanContent';
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 px-5 sm:px-8 bg-midnight-surface/90 border-t border-lavender/10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-mono tracking-widest text-holo-cyan uppercase mb-3">
            Get in Touch
          </span>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-ivory tracking-tight mb-4">
            Contact MANTHAN
          </h2>
          <p className="text-sm sm:text-base text-ivory/70 font-sans leading-relaxed">
            Have questions about our sessions, collaborative formats, or prospective workshops?
            Reach out through our official channels.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {/* Email */}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-lavender/15 bg-midnight/60 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-holo-cyan/10 border border-holo-cyan/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-holo-cyan" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-lavender/60 block mb-1">
                Official Email
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ivory group-hover:text-holo-cyan transition-colors break-all">
                {CONTACT_INFO.email}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-holo-cyan font-mono mt-4 pt-3 border-t border-white/5">
              <span>Send Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Phone */}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-lavender/15 bg-midnight/60 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-holo-magenta/10 border border-holo-magenta/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-holo-magenta" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-lavender/60 block mb-1">
                Direct Line
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ivory group-hover:text-holo-magenta transition-colors">
                {CONTACT_INFO.phone}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-holo-magenta font-mono mt-4 pt-3 border-t border-white/5">
              <span>Call Team</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href={CONTACT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-lavender/15 bg-midnight/60 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-holo-gold/10 border border-holo-gold/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-5 h-5 text-holo-gold" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-lavender/60 block mb-1">
                Instagram
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ivory group-hover:text-holo-gold transition-colors">
                {CONTACT_INFO.instagramHandle}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-holo-gold font-mono mt-4 pt-3 border-t border-white/5">
              <span>Visit Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-lavender/15 bg-midnight/60 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-holo-cyan/10 border border-holo-cyan/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LinkedinIcon className="w-5 h-5 text-holo-cyan" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-lavender/60 block mb-1">
                LinkedIn
              </span>
              <p className="text-xs sm:text-sm font-semibold text-ivory group-hover:text-holo-cyan transition-colors">
                {CONTACT_INFO.linkedinHandle}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-holo-cyan font-mono mt-4 pt-3 border-t border-white/5">
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* Location & Outreach Note */}
        <div className="p-5 sm:p-6 rounded-2xl border border-lavender/15 bg-midnight/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
              <MapPin className="w-5 h-5 text-holo-cyan" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-lavender/60 block">
                Session Outreach & Footprint
              </span>
              <p className="text-xs sm:text-sm text-ivory font-medium mt-0.5">
                {CONTACT_INFO.location}
              </p>
            </div>
          </div>

          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold text-lavender hover:text-ivory bg-white/5 hover:bg-white/10 border border-lavender/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-holo-cyan" />
            <span>Enquire for your City</span>
          </a>
        </div>
      </div>
    </section>
  );
};
