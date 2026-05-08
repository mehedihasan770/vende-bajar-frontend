'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiShoppingBag, HiArrowRight } from 'react-icons/hi';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2000",
    badge: "New Collection",
    title: { first: "CRAFTING THE", highlight: "FUTURE", last: "OF VISION" },
    descHeader: "Elevate Your Perspective.",
    descBody: "Make your smart glasses an extension of your personal style. Choose from elegant frames paired with cutting-edge AR technology."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000",
    badge: "Premium Series",
    title: { first: "REDEFINE YOUR", highlight: "REALITY", last: "TODAY" },
    descHeader: "Immersive Experience.",
    descBody: "Step into the next dimension of digital interaction without compromising your classic style and premium comfort."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=2000",
    badge: "Limited Edition",
    title: { first: "DISCOVER TRUE", highlight: "ELEGANCE", last: "IN SIGHT" },
    descHeader: "Timeless Design.",
    descBody: "A seamless blend of minimalist luxury and advanced features. Find the perfect frame to complement your daily aesthetic."
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6s per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative -mt-16 sm:-mt-20 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-[100vw] h-[100dvh] overflow-hidden bg-[#FBFBFD]">

      {/* Background Image & Premium Apple-style Light Overlays */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt="Fashion Hero"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft white washes for perfect text legibility, fading to transparent on the right so the image pops beautifully */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBFBFD]/100 via-[#FBFBFD]/85 to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFD]/60 via-transparent to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Prominent BOLD GAZE Watermark */}
      <div className="absolute bottom-[-1%] left-0 w-full overflow-hidden flex justify-center items-end z-10 pointer-events-none">
        <motion.h2
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 0.12 }} // Explicitly visible and premium
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[17vw] lg:text-[18vw] font-black text-gray-900 leading-[0.8] tracking-tighter select-none whitespace-nowrap"
        >
          BOLD GAZE
        </motion.h2>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-20 h-full w-full flex flex-col">

        {/* Spacer offsetting the fixed navbar */}
        <div className="pt-20 md:pt-28"></div>

        {/* Center Canvas: Full width, no container boundaries */}
        <div className="w-full px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 flex-1 flex flex-col md:flex-row items-center justify-between gap-12 pb-16 lg:pb-24">

          {/* Left Side: Title and Calls to Action */}
          <div className="max-w-3xl flex flex-col items-start">

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start gap-6"
              >
                {/* Live Collection Badge - Minimal & Premium */}
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gray-200/60 bg-white/50 backdrop-blur-xl shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span className="text-xs md:text-sm font-bold text-gray-700 tracking-widest uppercase">{slides[currentSlide].badge}</span>
                </div>

                {/* Main Typography - Extremely Sharp */}
                <h1 className="text-5xl sm:text-7xl lg:text-[95px] xl:text-[105px] font-black text-gray-900 leading-[0.9] tracking-tighter">
                  {slides[currentSlide].title.first} <br />
                  <span className="text-primary italic font-black">{slides[currentSlide].title.highlight}</span> {slides[currentSlide].title.last}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Action Button - Vibrant Config Colors (Static, doesn't animate out between slides to ensure easy clicking) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-4 bg-primary text-white px-10 py-4 rounded-full font-bold text-[15px] shadow-[0_10px_30px_rgba(252,99,42,0.3)] hover:bg-secondary hover:shadow-[0_10px_30px_rgba(20,96,169,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              <HiShoppingBag className="text-xl" />
              EXPLORE ORIGINALS
              <HiArrowRight className="text-lg" />
            </motion.button>
          </div>

          {/* Right Side: Frosted Glass Panel - Pure Minimalist "Halka" Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-[410px] p-8 rounded-[2rem] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_20px_50px_rgb(0,0,0,0.05)] flex flex-col gap-6"
          >
            {/* Context Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl font-bold text-gray-900 leading-relaxed mb-2">
                  {slides[currentSlide].descHeader}
                </p>
                <p className="text-[15px] font-medium text-gray-600 leading-relaxed">
                  {slides[currentSlide].descBody}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* HALKA KICHU CONTENT: Extremely minimal Star Rating for ecommerce trust */}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex gap-1 text-primary">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Premium Quality</span>
            </div>

            {/* Thin Divider Line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-100"></div>

            {/* Social Proof Context */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" width={40} height={40} alt="User" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm bg-gray-200" />
                  <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" width={40} height={40} alt="User" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm bg-gray-200 z-10" />
                  <div className="w-9 h-9 rounded-full border-2 border-primary/20 bg-primary/10 backdrop-blur-md flex items-center justify-center text-primary text-[10px] font-bold z-30 shadow-sm">+2k</div>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-gray-900 text-[15px] leading-tight mb-0.5">2,000+</span>
                  <span className="text-[11px] font-medium text-gray-500 leading-none">Global Members</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: Full width Slider Navigation & Indicators */}
        <div className="w-full px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32 pb-8 mt-auto flex items-end justify-between relative z-30">
          {/* Pagination Indicators - Auto Updating based on active slide */}
          <div className="flex gap-3 items-center">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-700 ease-in-out ${currentSlide === index ? 'w-10 sm:w-12 bg-primary shadow-sm' : 'w-2 bg-gray-300'
                  }`}
              ></div>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <div className="hidden md:flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase origin-center rotate-90 mb-7">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;