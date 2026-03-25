import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import CurtButton from './CurtButton';
import { div } from 'framer-motion/client';

interface MibileMenu {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

const MobileMenuButton = ({setIsOpen, isOpen} : MibileMenu) => {
    return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg cursor-pointer bg-primary hover:bg-primary/90 transition-colors duration-300 focus:outline-none shadow-md"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <HiOutlineX className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90 }}
                animate={{ rotate: 0 }}
                exit={{ rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <HiOutlineMenu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
    );
};

export default MobileMenuButton;