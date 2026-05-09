'use client';

import { motion } from 'framer-motion';

const HeroWatermark = () => {
  return (
    <div className="absolute bottom-[-1%] left-0 w-full px-4 sm:px-6 md:px-10 overflow-hidden flex z-10 pointer-events-none">
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 0.12 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full flex justify-between text-[16vw] font-black text-gray-900 leading-[0.8] tracking-tighter select-none"
      >
        <span>BOLD</span>
        <span>GAZE</span>
      </motion.div>
    </div>
  );
};

export default HeroWatermark;
