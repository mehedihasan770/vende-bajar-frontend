import React, { useState } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext';

const CurtButton = () => {
    const [cartCount, setCartCount] = useState(0)
    const { user, loading } = useAuth();
    if (loading || !user?.isLoggedIn) return null;

    return (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-2 cursor-pointer text-gray-700 hover:text-primary transition-colors duration-300 rounded-full bg-gray-100 hover:bg-primary/10"
        >
          <HiOutlineShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </motion.button>
    );
};

export default CurtButton;