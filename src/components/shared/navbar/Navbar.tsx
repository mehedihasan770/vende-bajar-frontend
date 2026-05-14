// components/Navbar.tsx (updated)
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlinePhone,
  HiOutlineInformationCircle,
  HiOutlineUserCircle,
  HiOutlineHeart,
  HiOutlineChartBar,
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
import CurtButton from './navbarAllComponents/CurtButton'
import WishlistButton from './navbarAllComponents/WishlistButton'

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
  const pathname = usePathname();

  const disableNavbarFooter: string[] = ["/login", "/register"];
  const isAuthOrDashboard = disableNavbarFooter.some((route) =>
    pathname === route || pathname.startsWith("/dashboard/")
  );

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
  ]

  if (isAuthOrDashboard) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="fixed top-0 py-3 w-full z-50 bg-transparent"
      >
        <div className="max-w-11/12 md:max-w-10/12 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Right Section (Links + Actions) */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              
              {/* Navigation Group - Floating Box Style */}
              <div className="flex items-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-1.5 py-1 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
                <NavLinks navLinks={navLinks}/>
              </div>

              {/* Actions Group - Floating Box Style */}
              <div className="relative flex items-center">
                <div className="flex items-center gap-2 lg:gap-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-2 lg:px-3 py-1 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
                  {/* Wishlist Icon */}
                  <WishlistButton/>

                  {/* Cart Icon */}
                  <CurtButton/>

                  {/* Login/Register or Avatar */}
                  <AuthButtons/>

                  {/* Avatar with Dropdown */}
                  <div className="relative flex items-center">
                    <UserAvatarDropdown setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen}/>
                  </div>
                </div>

                {/* Dropdown Menu (Moved outside blurred parent so backdrop-blur works) */}
                <DropdownMenu isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} dropdownItems={dropdownItems}/>
              </div>
            </div>

            {/* Mobile Actions Group - Floating Box Style */}
            <div className='flex items-center gap-2 md:hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-1.5 py-1 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]'>
              <WishlistButton />
              <CurtButton />
              <MobileMenuButton setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
        dropdownItems={dropdownItems}
      />

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  )
}

export default Navbar