'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicAxios } from '@/lib/axios';
import { slides as defaultSlides } from './slidesData';
import SlideBackground from './SlideBackground';
import HeroWatermark from './HeroWatermark';
import HeroContent from './HeroContent';
import GlassCard from './GlassCard';
import SliderIndicators from './SliderIndicators';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // React Query দিয়ে API থেকে স্লাইডার ডেটা ফেচ করা
  const { data } = useQuery({
    queryKey: ['heroSliders'],
    queryFn: async () => {
      const res = await publicAxios.get('/sliders');
      return res.data;
    },
    staleTime: 1000 * 60 * 10, // 10 মিনিট ক্যাশ
  });

  // API থেকে ডেটা আসলে সেটা দেখাবে, নাহলে defaultSlides দেখাবে
  const apiSlides = data?.success && data?.data?.length > 0 ? data.data : defaultSlides;

  // স্লাইডের সংখ্যা চেঞ্জ হলে যেন currentSlide ঠিক থাকে
  useEffect(() => {
    if (currentSlide >= apiSlides.length) {
      setCurrentSlide(0);
    }
  }, [apiSlides.length, currentSlide]);

  // Auto‑play Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === apiSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [apiSlides.length]);

  return (
    <section className="relative -mt-16 sm:-mt-20 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[100svh] md:h-screen overflow-hidden bg-[#FBFBFD]">
      {/* Background image & overlays */}
      <SlideBackground currentSlide={currentSlide} slides={apiSlides} />

      {/* Watermark text */}
      <HeroWatermark />

      {/* Main content layer */}
      <div className="relative z-20 h-full w-full flex flex-col">
        {/* Spacer to offset fixed navbar */}
        <div className="pt-20 md:pt-28"></div>

        {/* Center canvas – left & right panels */}
        <div className="w-full px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 flex-1 flex flex-col md:flex-row items-center justify-between gap-12 pb-16 lg:pb-24">
          {/* Left side – badge, title, CTA */}
          <HeroContent currentSlide={currentSlide} slides={apiSlides} />

          {/* Right side – frosted glass card */}
          <GlassCard currentSlide={currentSlide} slides={apiSlides} />
        </div>

        {/* Bottom navigation indicators */}
        <SliderIndicators currentSlide={currentSlide} slides={apiSlides} />
      </div>
    </section>
  );
};

export default HeroSection;