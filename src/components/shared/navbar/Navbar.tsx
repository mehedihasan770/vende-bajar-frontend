// components/Navbar.tsx (updated)
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  HiOutlineHome, 
  HiOutlineShoppingBag, 
  HiOutlinePhone, 
  HiOutlineInformationCircle,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineHeart,
  HiOutlineChartBar,
  HiOutlineShoppingCart
} from 'react-icons/hi'
import MobileMenu from './navbarAllComponents/MobileMenu'
import { IconType } from 'react-icons'
import Logo from '../Logo/Logo'
import NavLinks from './navbarAllComponents/NavLinks'
import AuthButtons from './navbarAllComponents/AuthButtons'
import UserAvatarDropdown from './navbarAllComponents/UserAvatarDropdown'
import DropdownMenu from './navbarAllComponents/DropdownMenu'
import MobileMenuButton from './navbarAllComponents/MobileMenuButton'
import { usePathname } from 'next/navigation'

export interface NavItem {
  name: string
  href: string
  icon: IconType
}

export interface DropdownItem extends NavItem {
  color: string
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname();

  // যে পেজগুলোতে নেভবার এবং ফুটার দেখাতে চান না সেগুলোর লিস্ট
  const disableNavbarFooter : string[] = ["/login", "/register", "/dashboard"];

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

  if (disableNavbarFooter.includes(pathname)) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="fixed top-0 py-3 w-full z-50 shadow bg-white/20 dark:bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-11/12 md:max-w-10/12 mx-auto">
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
                className="relative p-2 hidden text-gray-700 hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/10"
              >
                <HiOutlineShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* Login/Register */}
              <AuthButtons/>

              {/* Avatar with Dropdown */}
              <div className="relative">
                <UserAvatarDropdown setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen}/>

                {/* Dropdown Menu */}
                <DropdownMenu isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} dropdownItems={dropdownItems}/>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <MobileMenuButton setIsOpen={setIsOpen} isOpen={isOpen} />
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