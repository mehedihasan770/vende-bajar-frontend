import React, { useState } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const CurtButton = () => {
    const [cartCount, setCartCount] = useState(0)
    const { user, loading } = useAuth();

    return (
        <Link href="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 cursor-pointer text-primary bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg group"
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm border-2 border-white group-hover:border-primary transition-colors">
                  {cartCount}
                </span>
              )}
            </motion.button>
        </Link>
    );
};

export default CurtButton;