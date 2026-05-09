import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

interface BannerTabsProps {
  activeSlide: number;
  setActiveSlide: (slide: number) => void;
}

export default function BannerTabs({ activeSlide, setActiveSlide }: BannerTabsProps) {
  return (
    <div className="flex gap-2 mb-6 md:mb-8 bg-gray-50/50 p-1.5 rounded-xl md:rounded-2xl w-full md:w-fit overflow-x-auto border border-gray-100 custom-scrollbar">
      {[1, 2, 3].map((slideNum) => (
        <button
          key={slideNum}
          onClick={() => setActiveSlide(slideNum)}
          className={`relative cursor-pointer px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-2xl font-bold transition-all duration-300 flex-shrink-0 whitespace-nowrap flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base group z-10 ${
            activeSlide === slideNum
              ? 'text-white shadow-lg shadow-orange-200/50'
              : 'text-gray-500 hover:text-primary hover:bg-orange-50'
          }`}
        >
          {activeSlide === slideNum && (
            <motion.div 
              layoutId="slide-tab-active-pill"
              className="absolute inset-0 bg-primary rounded-lg md:rounded-2xl -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <ImageIcon className={`w-4 h-4 md:w-[18px] md:h-[18px] ${activeSlide === slideNum ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} strokeWidth={activeSlide === slideNum ? 2.5 : 2} />
          Slide {slideNum}
        </button>
      ))}
    </div>
  );
}
