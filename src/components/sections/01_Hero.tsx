import React from 'react';
import { Prismatic } from '../ui/prismatic-display';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-screen overflow-hidden bg-midnight"
    >
      <Prismatic headline="PSYCHE" className="h-full w-full" />
    </section>
  );
};

export default HeroSection;
