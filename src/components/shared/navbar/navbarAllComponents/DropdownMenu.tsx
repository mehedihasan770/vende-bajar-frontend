import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';
import { DropdownItem } from '../Navbar';
import { HiOutlineLogout } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';

interface AuthButtonsProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  dropdownItems: DropdownItem[];
}

const DropdownMenu = ({isDropdownOpen, setIsDropdownOpen, dropdownItems} : AuthButtonsProps) => {
    const { user, logout } = useAuth();

    return (
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
                <p className="text-sm font-semibold text-accent">{user?.fullName || "User Name"}</p>
                <p className="text-xs text-gray-500">{user?.email || "User Email"}</p>
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
              <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 6 * 0.05 }}
                >
                  <button
                    className={`flex items-center cursor-pointer w-full space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 group border-t border-gray-100 mt-1}`}
                    onClick={() => (setIsDropdownOpen(false), logout())}
                  >
                    <HiOutlineLogout className={`w-5 h-5 group-hover:scale-110 text-primary transition-transform duration-200`} />
                    <span className={`text-sm text-primary font-medium`}>
                      Logout
                    </span>
                  </button>
                </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    );
};

export default DropdownMenu;