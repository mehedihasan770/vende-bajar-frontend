// components/Navbar.tsx (updated)
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineHome, 
  HiOutlineShoppingBag, 
  HiOutlinePhone, 
  HiOutlineInformationCircle,
  HiOutlineUser,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineUserCircle,
  HiOutlineHeart,
  HiOutlineChartBar,
  HiOutlineShoppingCart
} from 'react-icons/hi'
import MobileMenu from './navbarAllComponents/MobileMenu'
import { IconType } from 'react-icons'
import Logo from './navbarAllComponents/Logo'
import NavLinks from './navbarAllComponents/NavLinks'

export interface NavItem { // এখানে export যোগ করুন
  name: string
  href: string
  icon: IconType
}

export interface DropdownItem extends NavItem { // এখানে export যোগ করুন
  color: string
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(3)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  const navLinks = [
    { name: 'Home', href: '/', icon: HiOutlineHome },
    { name: 'Products', href: '/products', icon: HiOutlineShoppingBag },
    { name: 'Contact', href: '/contact', icon: HiOutlinePhone },
    { name: 'About', href: '/about', icon: HiOutlineInformationCircle },
  ]

  const dropdownItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HiOutlineChartBar, color: 'text-primary' },
    { name: 'Profile', href: '/profile', icon: HiOutlineUserCircle, color: 'text-secondary' },
    { name: 'Wishlist', href: '/wishlist', icon: HiOutlineHeart, color: 'text-secondary' },
    { name: 'Logout', href: '/logout', icon: HiOutlineLogout, color: 'text-primary' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="fixed top-0 py-3 w-full z-50 shadow bg-white/20 dark:bg-black/20 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo/>

            {/* Desktop Navigation */}
            <NavLinks navLinks={navLinks}/>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {/* Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-700 hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/10"
              >
                <HiOutlineShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* Login/Register */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-1 lg:space-x-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm lg:text-base group"
                >
                  <HiOutlineLogin className="w-4 h-4 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden lg:inline">Login</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg font-medium text-white transition-all duration-300 flex items-center space-x-1 lg:space-x-2 bg-secondary hover:bg-secondary/90 text-sm lg:text-base shadow-md hover:shadow-lg"
                >
                  <HiOutlineUser className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden lg:inline">Register</span>
                </motion.button>
              </div>

              {/* Avatar with Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 lg:space-x-2 focus:outline-none group"
                >
                  <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-primary group-hover:border-secondary transition-colors duration-300">
                    <Image
                      src="/avatar-placeholder.jpg"
                      alt="User Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <HiOutlineChevronDown 
                    className={`w-3 h-3 lg:w-4 lg:h-4 text-accent transition-all duration-300 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-accent">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                      
                      {dropdownItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 group ${
                              item.name === 'Logout' ? 'border-t border-gray-100 mt-1' : ''
                            }`}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform duration-200`} />
                            <span className={`text-sm ${item.name === 'Logout' ? 'text-primary' : 'text-accent'} font-medium`}>
                              {item.name}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors duration-300 focus:outline-none shadow-md"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiOutlineX className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiOutlineMenu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Component */}
      <MobileMenu 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
        dropdownItems={dropdownItems}
        cartCount={cartCount}
      />

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  )
}

export default Navbar