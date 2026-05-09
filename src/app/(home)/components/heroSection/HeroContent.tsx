'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiShoppingBag, HiArrowRight } from 'react-icons/hi';

interface HeroContentProps {
  currentSlide: number;
  slides: any[];
}

const HeroContent = ({ currentSlide, slides }: HeroContentProps) => {
  return (
    <div className="max-w-3xl flex flex-col items-start">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-4 sm:gap-6 min-h-[150px] sm:min-h-[220px] md:min-h-0"
        >
          {/* Live Collection Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-gray-200/60 bg-white/50 backdrop-blur-xl shadow-sm">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-primary"></span>
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-700 tracking-widest uppercase">
              {slides[currentSlide].badge}
            </span>
          </div>

          {/* Main Typography */}
          <h1 className="text-[38px] leading-[1] sm:text-6xl lg:text-[95px] xl:text-[105px] font-black text-gray-900 sm:leading-[0.9] tracking-tighter">
            {slides[currentSlide].title.first} <br />
            <span className="text-primary italic font-black">
              {slides[currentSlide].title.highlight}
            </span> {slides[currentSlide].title.last}
          </h1>
        </motion.div>
      </AnimatePresence>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 bg-primary text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-[13px] sm:text-[15px] shadow-[0_10px_30px_rgba(252,99,42,0.3)] hover:bg-secondary hover:shadow-[0_10px_30px_rgba(20,96,169,0.3)] hover:-translate-y-1 transition-all duration-300"
      >
        <HiShoppingBag className="text-lg sm:text-xl" />
        EXPLORE ORIGINALS
        <HiArrowRight className="text-base sm:text-lg" />
      </motion.button>
    </div>
  );
};

export default HeroContent;
