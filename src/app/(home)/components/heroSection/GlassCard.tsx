'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GlassCardProps {
  currentSlide: number;
  slides: any[];
}

const GlassCard = ({ currentSlide, slides }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full lg:w-[410px] shrink-0 p-8 rounded-4xl bg-white/60 backdrop-blur-3xl border border-white shadow-[0_20px_50px_rgb(0,0,0,0.05)] flex flex-col gap-6"
    >
      {/* Context Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.4 }}
          className="min-h-[110px] sm:min-h-[130px] flex flex-col justify-center"
        >
          <p className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed mb-1 sm:mb-2">
            {slides[currentSlide].descHeader}
          </p>
          <p className="text-[13px] sm:text-[15px] font-medium text-gray-600 leading-relaxed">
            {slides[currentSlide].descBody}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Trust Indicator */}
      <div className="flex items-center gap-2 sm:gap-3 mt-1">
        <div className="flex gap-0.5 sm:gap-1 text-primary">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-[9px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest">Premium Quality</span>
      </div>

      <div className="h-px w-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-100"></div>

      {/* Social Proof Context */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex -space-x-2 sm:-space-x-3">
            <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" width={40} height={40} alt="User" className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-sm bg-gray-200" />
            <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" width={40} height={40} alt="User" className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-sm bg-gray-200 z-10" />
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-primary/20 bg-primary/10 backdrop-blur-md flex items-center justify-center text-primary text-[8px] sm:text-[10px] font-bold z-30 shadow-sm">+2k</div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-gray-900 text-[13px] sm:text-[15px] leading-tight mb-0.5">2,000+</span>
            <span className="text-[9px] sm:text-[11px] font-medium text-gray-500 leading-none">Global Members</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GlassCard;
