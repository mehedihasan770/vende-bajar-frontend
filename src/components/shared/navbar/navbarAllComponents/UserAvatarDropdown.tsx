"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { getBrowserUser } from '@/utils/getBrowserUser';
import { useAuth } from '@/context/AuthContext';

interface AuthButtonsProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
}

const UserAvatarDropdown = ({setIsDropdownOpen, isDropdownOpen} : AuthButtonsProps) => {
    const { user, loading } = useAuth();
    if (loading || !user?.isLoggedIn) return null;
    
    return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-1 lg:space-x-2 focus:outline-none group"
        >
          <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-primary group-hover:border-secondary transition-colors duration-300">
            <Image
              src="/avatar-placeholder.jpg"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>
          <HiOutlineChevronDown 
            className={`w-3 h-3 lg:w-4 lg:h-4 text-accent transition-all duration-300 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </motion.button>
    );
};

export default UserAvatarDropdown;