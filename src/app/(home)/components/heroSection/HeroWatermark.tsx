'use client';

import { motion } from 'framer-motion';

const HeroWatermark = () => {
  return (
    <div className="absolute bottom-[-1%] left-0 w-full px-2 sm:px-4 overflow-hidden flex justify-center items-end z-10 pointer-events-none">
      <motion.h2
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 0.12 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full text-center text-[15vw] sm:text-[14vw] lg:text-[15.5vw] font-black text-gray-900 leading-[0.8] tracking-tighter select-none whitespace-nowrap"
      >
        BOLD GAZE
      </motion.h2>
    </div>
  );
};

export default HeroWatermark;
