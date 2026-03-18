"use client"

import { motion } from 'framer-motion'
import Logo from '@/components/shared/Logo/Logo'
import LoginRightSide from '@/components/auth/loginPage/LoginRightSide'
import LgoinForm from '@/components/auth/loginPage/LgoinForm'

const LoginPage = () => {

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
    <div className="min-h-screen w-full">
      <div className="min-h-screen py-5">
        <div className="flex flex-col lg:flex-row-reverse min-h-screen items-center justify-center lg:justify-between gap-20">
          {/* Left Side - Form Section */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="w-full lg:w-lg"
          >
            <div className="">
              {/* Logo for mobile */}
              <motion.div 
                variants={fadeInUp}
                className="mb-8 lg:hidden flex justify-center border-b-blue-800"
              >
                <Logo />
              </motion.div>

              {/* Header */}
              <motion.div variants={fadeInUp} className="mb-8 text-center lg:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-accent mb-2">
                  Welcome Back!
                </h1>
                <p className="text-gray-600">
                  Sign in to continue your shopping journey with{' '}
                  <span className="text-primary font-semibold">Vende</span>
                  <span className="text-secondary font-semibold">Bajar</span>
                </p>
              </motion.div>

              {/* Longin Form */}
              <LgoinForm/>
            </div>
          </motion.div>

          {/* Right Side - Enhanced Branding Section */}
          <LoginRightSide/>
        </div>
      </div>
    </div>
  )
}

export default LoginPage