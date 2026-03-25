import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLogin, HiOutlineUser } from 'react-icons/hi';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const AuthButtons = () => {
    const { user, loading } = useAuth();
    if (loading || user?.isLoggedIn) return null;

    return (
        <div className="flex items-center space-x-2">
          <Link href={"/login"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 xl:px-4 py-1.5 xl:py-2 cursor-pointer rounded-lg font-medium transition-all duration-300 flex items-center space-x-1 lg:space-x-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm lg:text-base group"
            >
              <HiOutlineLogin className="w-4 h-4 xl:w-5 xl:h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden xl:inline">Login</span>
            </motion.button>
          </Link>
          <Link href={"/register"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 xl:px-4 py-2 xl:py-2.5 cursor-pointer rounded-lg font-medium text-white transition-all duration-300 flex items-center space-x-1 lg:space-x-2 bg-secondary hover:bg-secondary/90 text-sm lg:text-base shadow-md hover:shadow-lg"
            >
              <HiOutlineUser className="w-4 h-4 xl:w-5 xl:h-5" />
              <span className="hidden xl:inline">Register</span>
            </motion.button>
          </Link>
        </div>
    );
};

export default AuthButtons;