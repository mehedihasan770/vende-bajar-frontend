import React, { useState } from 'react';
import { HiOutlineHeart } from 'react-icons/hi';
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const WishlistButton = () => {
    const [wishlistCount, setWishlistCount] = useState(0)
    const { user, loading } = useAuth();

    return (
        <Link href="/wishlist">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 cursor-pointer text-secondary bg-secondary/10 border border-secondary/20 hover:bg-secondary hover:text-white transition-all duration-300 rounded-lg group"
            >
              <HiOutlineHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm border-2 border-white group-hover:border-secondary transition-colors">
                  {wishlistCount}
                </span>
              )}
            </motion.button>
        </Link>
    );
};

export default WishlistButton;
