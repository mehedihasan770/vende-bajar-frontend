import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <div className="relative transition-transform duration-300 group-hover:rotate-6">
              <Image
                src="/logo.png"
                alt="Vende Bajar"
                width={100}
                height={100}
                className="xl:w-full xl:h-full object-contain"
                priority
              />
            </div>
          </Link>
        </motion.div>
    );
};

export default Logo;