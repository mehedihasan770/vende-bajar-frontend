// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeOff,
  HiOutlineArrowRight,
} from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import Logo from '@/components/shared/Logo/Logo'
import LoginRightSide from '@/components/auth/loginPage/LoginRightSide'

type LoginFormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormData>({
    mode: 'onBlur'
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Login data:', data)
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Invalid email or password'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log('Google login')
  }

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
        <div className="flex flex-col lg:flex-row-reverse min-h-screen items-center justify-center lg:justify-between">
          {/* Left Side - Form Section */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="w-fit lg:ml-5"
          >
            <div className="max-w-md mx-auto w-full">
              {/* Logo for mobile */}
              <motion.div 
                variants={fadeInUp}
                className="mb-8 lg:hidden flex justify-center"
              >
                <Logo />
              </motion.div>

              {/* Header */}
              <motion.div variants={fadeInUp} className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  Welcome Back!
                </h1>
                <p className="text-gray-600">
                  Sign in to continue your shopping journey with{' '}
                  <span className="text-primary font-semibold">Vende</span>
                  <span className="text-secondary font-semibold">Bajar</span>
                </p>
              </motion.div>

              {/* Form */}
              <motion.form 
                variants={fadeInUp}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6"
                noValidate
              >
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-accent">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineMail className={`h-5 w-5 transition-colors duration-200 ${
                        errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'
                      }`} />
                    </div>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                        ${errors.email 
                          ? 'border-red-500 bg-red-50 focus:border-red-500' 
                          : 'border-gray-200 bg-white focus:border-primary hover:border-primary/50'
                        }`}
                    />
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      >
                        <span className="inline-block w-1 h-1 rounded-full bg-red-600" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-accent">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineLockClosed className={`h-5 w-5 transition-colors duration-200 ${
                        errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'
                      }`} />
                    </div>
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                        ${errors.password 
                          ? 'border-red-500 bg-red-50 focus:border-red-500' 
                          : 'border-gray-200 bg-white focus:border-primary hover:border-primary/50'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-primary transition-colors duration-200" />
                      ) : (
                        <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-primary transition-colors duration-200" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 flex items-center gap-1"
                    >
                      <span className="inline-block w-1 h-1 rounded-full bg-red-600" />
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Root error */}
                {errors.root && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 rounded-xl bg-red-50 border border-red-200"
                  >
                    <p className="text-sm text-red-600 text-center">{errors.root.message}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading || isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>

                {/* Google Login */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <FcGoogle className="w-5 h-5" />
                  <span>Sign in with Google</span>
                </motion.button>

                {/* Sign up link */}
                <p className="text-center text-gray-600">
                  Don t have an account?{' '}
                  <Link 
                    href="/register" 
                    className="text-secondary hover:text-primary font-semibold transition-colors duration-200"
                  >
                    Sign up now
                  </Link>
                </p>
              </motion.form>
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