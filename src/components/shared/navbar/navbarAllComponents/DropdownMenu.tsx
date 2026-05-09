import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';
import { DropdownItem } from '../Navbar';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';

interface AuthButtonsProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  dropdownItems: DropdownItem[];
}

const DropdownMenu = ({isDropdownOpen, setIsDropdownOpen, dropdownItems} : AuthButtonsProps) => {
    const { logout } = useAuth();
    const { data } = useUser();
    const { fullName, email, profileImage } = data || {}

    return (
        <AnimatePresence>
          {isDropdownOpen && (
            <>
              {/* Overlay to close dropdown when clicking outside */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-4 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] py-2 z-50 border border-white/20 dark:border-gray-800/50 overflow-hidden"
              >
                {/* User Info Section */}
                <div className="px-5 py-4 border-b border-gray-100/50 dark:border-gray-800/50 bg-linear-to-br from-primary/5 to-secondary/5">
                  <div className="flex items-center space-x-3 mb-1">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                      {profileImage ? (
                        <Image src={profileImage} alt={fullName || ''} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <HiOutlineUser className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-accent dark:text-white truncate">{fullName}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate font-medium">{email}</p>
                    </div>
                  </div>
                </div>
                
                {/* Menu Items */}
                <div className="py-1">
                  {dropdownItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 px-5 py-2.5 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className={`p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors duration-200 shadow-xs`}>
                          <item.icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform duration-200`} />
                        </div>
                        <span className="text-sm text-accent dark:text-gray-300 group-hover:text-primary font-semibold transition-colors duration-200">
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Logout Button */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (dropdownItems.length) * 0.05 + 0.1 }}
                  className="mt-1 border-t border-gray-100/50 dark:border-gray-800/50"
                >
                  <button
                    className="flex items-center cursor-pointer w-full space-x-3 px-5 py-3 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200 group"
                    onClick={() => (setIsDropdownOpen(false), logout())}
                  >
                    <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 group-hover:bg-white dark:group-hover:bg-red-900/40 transition-colors duration-200 shadow-xs">
                      <HiOutlineLogout className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <span className="text-sm text-primary font-bold group-hover:tracking-wide transition-all duration-200">
                      Sign Out
                    </span>
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    );
};

export default DropdownMenu;