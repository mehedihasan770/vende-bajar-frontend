import React, { useState } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const CurtButton = () => {
    const [cartCount, setCartCount] = useState(0)
    const { user, loading } = useAuth();
    if (loading || !user?.isLoggedIn) return null;

    return (
        <Link href="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 lg:py-1.5 lg:px-2.5 cursor-pointer text-primary bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg group"
            >
              <HiOutlineShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] lg:text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm border-2 border-white group-hover:border-primary transition-colors">
                  {cartCount}
                </span>
              )}
            </motion.button>
        </Link>
    );
};

export default CurtButton;