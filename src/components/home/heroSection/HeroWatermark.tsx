'use client';

import { motion } from 'framer-motion';

const HeroWatermark = () => {
  return (
    <div className="absolute bottom-[-1%] left-0 w-full overflow-hidden flex justify-center items-end z-10 pointer-events-none">
      <motion.h2
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 0.12 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-[17vw] lg:text-[18vw] font-black text-gray-900 leading-[0.8] tracking-tighter select-none whitespace-nowrap"
      >
        BOLD GAZE
      </motion.h2>
    </div>
  );
};

export default HeroWatermark;
