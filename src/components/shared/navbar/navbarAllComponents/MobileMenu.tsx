import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  HiOutlineLogin,
  HiOutlineUser,
  HiOutlineLogout
} from 'react-icons/hi'
import { DropdownItem, NavItem } from '../Navbar'
import { useAuth } from '@/context/AuthContext'
import { useUser } from '@/hooks/useUser'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: NavItem[]
  dropdownItems: DropdownItem[]
}

const MobileMenu = ({ isOpen, onClose, navLinks, dropdownItems }: MobileMenuProps) => {
  const { user, loading, logout } = useAuth();
  const { data } = useUser();
  const { fullName, email, profileImage } = data || {}

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-15 bottom-0 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Menu Container */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-15 z-50 md:hidden overflow-y-auto max-h-[calc(100vh-60px)] bg-white/20 dark:bg-black/20 backdrop-blur-sm scrollbar-hide"
          >
            <div className="px-4 py-2 pb-8">
              {/* Mobile Links */}
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/5 transition-all duration-200 group"
                      onClick={onClose}
                    >
                      <link.icon className="w-5 h-5 text-secondary group-hover:text-primary group-hover:scale-110 transition-all duration-200" />
                      <span className="text-gray-700 font-medium group-hover:text-primary">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 }}
                className="my-4 border-t border-gray-200"
              />

              {/* Mobile Login/Register */}
              {!loading && !user?.isLoggedIn && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href={"/login"}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 mb-2 rounded-xl font-medium flex items-center justify-center space-x-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 group"
                  onClick={onClose}
                >
                  <HiOutlineLogin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Login</span>
                </motion.button>
                </Link>
                <Link href={"/register"}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 rounded-xl font-medium text-white flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary/90 transition-all duration-300 shadow-md"
                  onClick={onClose}
                >
                  <HiOutlineUser className="w-5 h-5" />
                  <span>Register</span>
                </motion.button>
                </Link>
              </motion.div>
              )}

              {/* Mobile Avatar Section */}
              {user?.isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                <div className="flex items-center space-x-3 px-4 py-3 bg-linear-to-r from-primary/5 to-secondary/5 rounded-xl">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={profileImage}
                      alt="User Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-accent block">{fullName}</span>
                    <span className="text-xs text-secondary flex items-center space-x-1">
                      {email}
                    </span>
                  </div>
                </div>
                
                {/* Mobile Dropdown Items */}
                <div className="mt-2 space-y-1">
                  {dropdownItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 ${
                          item.name === 'Logout' ? 'mt-1' : ''
                        }`}
                        onClick={onClose}
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className={`text-sm ${item.name === 'Logout' ? 'text-primary' : 'text-accent'} font-medium`}>
                          {item.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 9 * 0.05 }}
                  >
                    <button
                      className={`flex items-center cursor-pointer w-full space-x-3 px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 group border-t border-gray-100 mt-1}`}
                      onClick={() => logout()}
                    >
                      <HiOutlineLogout className={`w-5 h-5 group-hover:scale-110 text-primary transition-transform duration-200`} />
                      <span className={`text-sm text-primary font-medium`}>
                        Logout
                      </span>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu;