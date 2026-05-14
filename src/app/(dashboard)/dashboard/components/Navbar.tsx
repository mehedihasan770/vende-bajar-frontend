'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Search } from 'lucide-react'
import { getBrowserUser } from '@/utils/getBrowserUser'

import { MENU_ITEMS } from '../config/menuItems'
import MobileSidebarDrawer from './Navbar/components/MobileSidebarDrawer'
import DesktopSearch from './Navbar/components/DesktopSearch'
import MobileSearchOverlay from './Navbar/components/MobileSearchOverlay'
import ActionIcons from './Navbar/components/ActionIcons'
import ProfileDropdown from './Navbar/components/ProfileDropdown'

const Navbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const pathname = usePathname()
  const [role, setRole] = useState<'ADMIN' | 'VENDOR' | 'USER' | null>(null)

  useEffect(() => {
    if (pathname.includes('/dashboard/admin')) setRole('ADMIN')
    else if (pathname.includes('/dashboard/vendor')) setRole('VENDOR')
    else if (pathname.includes('/dashboard/user')) setRole('USER')
    else {
      const user = getBrowserUser()
      if (user?.role) setRole(user.role as 'ADMIN' | 'VENDOR' | 'USER')
    }
  }, [pathname])

  const currentMenu = MENU_ITEMS[role || 'USER']

  return (
    <nav className="relative z-[100] w-full py-4">
      <MobileSidebarDrawer 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentMenu={currentMenu}
        pathname={pathname}
      />

      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm px-4 h-16 flex items-center justify-between gap-2 sm:gap-4 relative">
        
        {/* বাম পাশ - মোবাইল মেনু টগল (শুধুমাত্র মোবাইলে) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>

        <MobileSearchOverlay 
          showMobileSearch={showMobileSearch}
          setShowMobileSearch={setShowMobileSearch}
        />

        <DesktopSearch />

        {/* ডান পাশ - অ্যাকশন আইকনস */}
        <div className={`flex items-center gap-1 sm:gap-3 shrink-0 ${showMobileSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          <button 
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-all"
          >
            <Search size={20} />
          </button>

          <ActionIcons />
          <ProfileDropdown />
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar;