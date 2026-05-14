'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { getBrowserUser } from '@/utils/getBrowserUser'
import SidebarSkeleton from '@/components/skeletons/dashboardSkeletons/SidebarSkeleton'
import { MENU_ITEMS } from '../../config/menuItems'

import SidebarHeader from './components/SidebarHeader'
import SidebarMenu from './components/SidebarMenu'
import SupportCard from './components/SupportCard'

const Sidebar = () => {
  const pathname = usePathname()
  const [role, setRole] = useState<'ADMIN' | 'VENDOR' | 'USER' | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true)
      if (pathname.includes('/dashboard/admin')) {
        setRole('ADMIN')
      } else if (pathname.includes('/dashboard/vendor')) {
        setRole('VENDOR')
      } else if (pathname.includes('/dashboard/user')) {
        setRole('USER')
      } else {
        const user = getBrowserUser()
        if (user?.role) {
          setRole(user.role as 'ADMIN' | 'VENDOR' | 'USER')
        }
      }
    }, 0)
  }, [pathname])

  if (!isMounted || !role) {
    return <SidebarSkeleton />
  }

  const currentMenu = MENU_ITEMS[role] || MENU_ITEMS.USER

  return (
    <div className='py-4 h-screen sticky top-0'>
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 84 : 240 }}
        className="hidden shadow-sm lg:flex border-gray-200 border rounded-2xl h-full flex-col z-40 overflow-hidden bg-white"
      >
        <SidebarHeader 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
        
        <SidebarMenu 
          currentMenu={currentMenu} 
          pathname={pathname} 
          isCollapsed={isCollapsed} 
        />
        
        <SupportCard 
          isCollapsed={isCollapsed} 
          role={role} 
        />
      </motion.aside>
    </div>
  )
}

export default Sidebar;