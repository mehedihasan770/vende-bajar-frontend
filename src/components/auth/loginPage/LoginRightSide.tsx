import React from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/shared/Logo/Logo';
import { HiOutlineHeart, HiOutlineShieldCheck, HiOutlineShoppingBag, HiOutlineStar } from 'react-icons/hi';
import BackButton from '@/components/shared/auth/BackButton';

const LoginRightSide = () => {

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full lg:w-1/2 lg:border-0 border-t-2 border-primary pt-5 lg:pt-0"
        >
          <div className='hidden lg:block mb-5'>
            <BackButton/>
          </div>
          <div className="mx-auto lg:ml-auto lg:mr-0">
            {/* Logo for desktop */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex mb-6"
            >
              <Logo />
            </motion.div>
            {/* Main Content */}
            <div className="space-y-8">
              {/* Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl lg:text-4xl font-bold text-accent text-center lg:text-left"
              >
                Discover Amazing
                <br />
                <span className="text-primary">Deals</span> &{' '}
                <span className="text-secondary">Offers</span>
              </motion.h2>
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-gray-600 leading-relaxed text-justify lg:text-left"
              >
                Join thousands of happy customers who shop with us everyday.
                Get exclusive access to special offers and new arrivals.
              </motion.p>
              {/* Stats Cards */}
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { number: '50K+', label: 'Happy Customers', icon: HiOutlineHeart, color: 'text-primary' },
                  { number: '10K+', label: 'Products', icon: HiOutlineShoppingBag, color: 'text-secondary' },
                  { number: '4.8', label: 'Rating', icon: HiOutlineStar, color: 'text-primary' },
                  { number: '24/7', label: 'Support', icon: HiOutlineShieldCheck, color: 'text-secondary' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-lineatr-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all duration-300 group"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="lg:text-2xl font-bold text-accent">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
    );
};

export default LoginRightSide;