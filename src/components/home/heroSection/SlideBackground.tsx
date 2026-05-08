'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SlideBackgroundProps {
  currentSlide: number;
  slides: any[];
}

const SlideBackground = ({ currentSlide, slides }: SlideBackgroundProps) => {
  return (
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

      {/* Soft white washes for perfect text legibility */}
      <div className="absolute inset-0 bg-linear-to-r from-[#FBFBFD] via-[#FBFBFD]/85 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-linear-to-t from-[#FBFBFD]/60 via-transparent to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default SlideBackground;
