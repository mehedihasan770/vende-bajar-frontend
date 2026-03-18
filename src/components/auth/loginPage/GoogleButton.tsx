import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const GoogleButton = () => {

    const handleGoogleLogin = () => {
        console.log('Google login')
    }

    return (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogleLogin}
          className="w-full cursor-pointer bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center space-x-2 group"
        >
          <FcGoogle className="w-5 h-5" />
          <span>Sign in with Google</span>
        </motion.button>
    );
};

export default GoogleButton;