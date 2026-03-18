import React from 'react';
import { motion } from 'framer-motion'
import Logo from '@/components/shared/Logo/Logo';
import { HiOutlineHeart, HiOutlineRefresh, HiOutlineStar, HiOutlineTruck } from 'react-icons/hi';

const RegisterRight = () => {

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    const fadeInRight = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.08
            }
        }
    }

    return (
        <motion.div 
          variants={fadeInRight}
          initial="initial"
          animate="animate"
          className="w-full lg:w-1/2"
        >
          <div className="">
            {/* Logo for desktop */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex justify-end mb-6"
            >
              <Logo />
            </motion.div>
            {/* Main Content */}
            <div className="space-y-6 bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white/50">
              {/* Title */}
              <motion.h2 
                variants={fadeInRight}
                className="text-2xl lg:text-3xl font-bold text-accent text-right"
              >
                Join Our Community
                <br />
                <span className="text-primary">10,000+</span> Happy{' '}
                <span className="text-secondary">Shoppers</span>
              </motion.h2>
              {/* Description */}
              <motion.p 
                variants={fadeInRight}
                className="text-gray-600 text-right leading-relaxed"
              >
                Create an account to enjoy exclusive benefits and a seamless shopping experience.
              </motion.p>
              {/* Benefits Cards - 2x2 Grid */}
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { icon: HiOutlineStar, title: 'Exclusive Offers', desc: 'Member-only deals', color: 'text-primary' },
                  { icon: HiOutlineHeart, title: 'Wishlist', desc: 'Save favorites', color: 'text-secondary' },
                  { icon: HiOutlineTruck, title: 'Free Shipping', desc: 'On orders $50+', color: 'text-primary' },
                  { icon: HiOutlineRefresh, title: 'Easy Returns', desc: '30-day policy', color: 'text-secondary' },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <benefit.icon className={`w-6 h-6 ${benefit.color} mb-1 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="font-semibold text-accent">{benefit.title}</div>
                    <div className="text-sm text-gray-500">{benefit.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
              {/* Stats - 3 Column */}
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-3 gap-3 text-center"
              >
                {[
                  { number: '50K+', label: 'Customers' },
                  { number: '10K+', label: 'Products' },
                  { number: '4.8', label: 'Rating' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-100"
                  >
                    <div className="text-lg font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
    );
};

export default RegisterRight;