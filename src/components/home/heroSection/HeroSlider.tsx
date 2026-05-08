'use client';

import { useState, useEffect } from 'react';
import { slides } from './slidesData';
import SlideBackground from './SlideBackground';
import HeroWatermark from './HeroWatermark';
import HeroContent from './HeroContent';
import GlassCard from './GlassCard';
import SliderIndicators from './SliderIndicators';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto‑play Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative -mt-16 sm:-mt-20 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-dvh overflow-hidden bg-[#FBFBFD]">
      {/* Background image & overlays */}
      <SlideBackground currentSlide={currentSlide} slides={slides} />

      {/* Watermark text */}
      <HeroWatermark />

      {/* Main content layer */}
      <div className="relative z-20 h-full w-full flex flex-col">
        {/* Spacer to offset fixed navbar */}
        <div className="pt-20 md:pt-28"></div>

        {/* Center canvas – left & right panels */}
        <div className="w-full px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 flex-1 flex flex-col md:flex-row items-center justify-between gap-12 pb-16 lg:pb-24">
          {/* Left side – badge, title, CTA */}
          <HeroContent currentSlide={currentSlide} slides={slides} />

          {/* Right side – frosted glass card */}
          <GlassCard currentSlide={currentSlide} slides={slides} />
        </div>

        {/* Bottom navigation indicators */}
        <SliderIndicators currentSlide={currentSlide} slides={slides} />
      </div>
    </section>
  );
};

export default HeroSection;