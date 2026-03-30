"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiOutlineChevronDown, HiOutlineUser } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/hooks/useUser';

interface AuthButtonsProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
}

const UserAvatarDropdown = ({setIsDropdownOpen, isDropdownOpen} : AuthButtonsProps) => {
    const { user, loading } = useAuth();
    const { data } = useUser();
    const { profileImage } = data || {}
    
    if (loading || !user?.isLoggedIn) return null;
    
    return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex cursor-pointer items-center space-x-1 lg:space-x-2 focus:outline-none group"
        >
          <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-primary group-hover:border-secondary transition-colors duration-300">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="User Avatar"
                fill
                className="object-cover"
              />
            ) : (
              // ফ্যালব্যাক আভাতার - যখন কোন ইমেজ নেই
              <div className="w-full h-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <HiOutlineUser className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
              </div>
            )}
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