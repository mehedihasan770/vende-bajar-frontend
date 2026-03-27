'use client'

import { useState, useEffect, useRef } from 'react' // useRef এবং useEffect যোগ করা হয়েছে
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Settings, Bell, User, Search, LogOut, ArrowLeft
} from 'lucide-react'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  
  // ড্রপডাউনের বাইরে ক্লিক করলে যেন বন্ধ হয়ে যায় তার জন্য Ref
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="z-100 w-full py-4"> {/* z-index বাড়িয়ে দেওয়া হয়েছে */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm px-4 h-16 flex items-center justify-between gap-2 sm:gap-4 relative">
        
        {/* --- মোবাইল সার্চ ওভারলে --- */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-white z-110 flex items-center px-4 gap-2 rounded-2xl"
            >
              <button 
                onClick={() => setShowMobileSearch(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-2xl transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <input 
                autoFocus
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-800"
              />
              <button className="p-2 text-primary">
                <Search size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* মাঝখান - ডেক্সটপ সার্চ বার */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className={`relative flex items-center transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-primary/10' : ''} bg-gray-50 rounded-full`}>
            <Search 
              size={18} 
              className={`absolute left-4 transition-colors ${isSearchFocused ? 'text-primary' : 'text-gray-400'}`} 
            />
            <input 
              type="text"
              placeholder="Search anything..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full bg-transparent border border-gray-100 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/30 transition-all outline-none"
            />
          </div>
        </div>

        {/* ডান পাশ - অ্যাকশন আইকনস */}
        <div className={`flex items-center gap-1 sm:gap-3 shrink-0 ${showMobileSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          <button 
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-all"
          >
            <Search size={20} />
          </button>

          <Link href="/dashboard/admin/settings">
            <button className="p-2 text-gray-500 hover:text-primary hover:bg-orange-50 rounded-full transition-all group">
              <Settings size={20} className="group-hover:rotate-45 transition-transform duration-500" />
            </button>
          </Link>

          <button className="relative p-2 text-gray-500 hover:text-primary hover:bg-orange-50 rounded-full transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white shadow-sm"></span>
          </button>

          {/* প্রোফাইল ড্রপডাউন কন্টেইনার */}
          <div className="relative" ref={dropdownRef}>
            <motion.button 
              onClick={(e) => {
                e.stopPropagation(); // ক্লিক যেন প্যারেন্টে না যায়
                setIsProfileOpen(!isProfileOpen);
              }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1 p-1 rounded-2xl border transition-all ${isProfileOpen ? 'border-primary bg-orange-50 shadow-inner' : 'border-gray-200 bg-white hover:border-primary/40'}`}
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-2xl bg-primary flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shadow-sm">
                MH
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-700 hidden sm:block px-1 select-none">Mehedi</span>
            </motion.button>

            {/* ড্রপডাউন মেনু */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-52 sm:w-60 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 z-120"
                  style={{ transformOrigin: 'top right' }}
                >
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Signed in as</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">mdmehedihasan.dev@gmail.com</p>
                  </div>
                  
                  <div className="space-y-1">
                    <Link 
                      href="/dashboard/admin/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-primary rounded-2xl transition-all font-semibold"
                    >
                      <User size={16} /> Profile Info
                    </Link>
                    <button 
                      onClick={() => {
                        console.log("Sign out clicked");
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-2xl transition-all font-semibold"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;