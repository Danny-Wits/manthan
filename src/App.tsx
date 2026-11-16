import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/manthan/Navbar';
import { Hero } from './components/manthan/Hero';
import { Sessions } from './components/manthan/Sessions';
import { BookSession } from './components/manthan/BookSession';
import { Contact } from './components/manthan/Contact';
import { Footer } from './components/manthan/Footer';

export const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  // Smooth inertial scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const handleSelectSessionForBooking = (topicTitle: string) => {
    setSelectedTopic(topicTitle);
  };

  return (
    <div className="bg-midnight text-ivory min-h-screen selection:bg-holo-cyan/20 selection:text-ivory font-sans relative">
      {/* 2. Main Navigation: Home, Sessions, Book a Session, Contact */}
      <Navbar />

      <main>
        {/* 3. Home: Introduction, Vortex Canvas, Explore. Understand. Evolve., Primary CTA, Sessions Preview */}
        <Hero onSelectTopic={handleSelectSessionForBooking} />

        {/* 4. Sessions: Dedicated section with the 6 session areas & intended audiences */}
        <Sessions onSelectSessionForBooking={handleSelectSessionForBooking} />

        {/* 5. Book a Session: Heading, Enquiry notice, all requested form fields */}
        <BookSession selectedTopicTitle={selectedTopic} />

        {/* 6. Contact: Email, Phone, Instagram, LinkedIn, Location */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default App;
