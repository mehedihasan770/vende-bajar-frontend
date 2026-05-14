import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const ProfileDropdown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button 
        onClick={(e) => {
          e.stopPropagation();
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
            className="absolute right-0 mt-3 w-52 sm:w-60 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 z-[120]"
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
  );
};

export default ProfileDropdown;
