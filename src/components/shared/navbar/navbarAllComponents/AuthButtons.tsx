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
              className="px-4 py-2 cursor-pointer rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 border border-primary text-primary hover:bg-primary hover:text-white text-sm group"
            >
              <HiOutlineLogin className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Login</span>
            </motion.button>
          </Link>
          <Link href={"/register"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 cursor-pointer rounded-lg font-medium text-white transition-all duration-300 flex items-center space-x-2 border border-transparent bg-secondary hover:bg-secondary/90 text-sm shadow-sm hover:shadow"
            >
              <HiOutlineUser className="w-4 h-4" />
              <span>Register</span>
            </motion.button>
          </Link>
        </div>
    );
};

export default AuthButtons;