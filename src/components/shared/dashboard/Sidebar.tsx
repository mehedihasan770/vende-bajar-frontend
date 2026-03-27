'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  LayoutDashboard, Users, ShoppingBag, Settings, Package, 
  DollarSign, ChevronRight, HelpCircle, Heart, MapPin, 
  CreditCard, Star, Store, Ticket, TrendingUp, Headset
} from 'lucide-react'
import Logo from '../Logo/Logo'
import { getBrowserUser } from '@/utils/getBrowserUser'
import SidebarSkeleton from '@/components/skeletons/dashboardSkeletons/SidebarSkeleton'

const MENU_ITEMS = {
  ADMIN: [
    { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Role Management', href: '/dashboard/admin/users', icon: Users },
    { name: 'Verify Vendors', href: '/dashboard/admin/vendors', icon: Store },
    { name: 'Master Products', href: '/dashboard/admin/products', icon: Package },
    { name: 'Master Orders', href: '/dashboard/admin/orders', icon: ShoppingBag },
    { name: 'Transactions', href: '/dashboard/admin/transactions', icon: CreditCard },
    { name: 'Categories', href: '/dashboard/admin/categories', icon: Package },
    { name: 'Coupons', href: '/dashboard/admin/coupons', icon: Ticket },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: TrendingUp },
    { name: 'Review Support', href: '/dashboard/admin/support', icon: Headset },
    { name: 'Reviews', href: '/dashboard/admin/reviews', icon: Star },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ],
  VENDOR: [
    { name: 'Overview', href: '/dashboard/vendor', icon: LayoutDashboard },
    { name: 'My Products', href: '/dashboard/vendor/products', icon: Package },
    { name: 'Orders Management', href: '/dashboard/vendor/orders', icon: ShoppingBag },
    { name: 'Earnings', href: '/dashboard/vendor/earnings', icon: DollarSign },
    { name: 'Payouts', href: '/dashboard/vendor/payouts', icon: CreditCard },
    { name: 'Coupons', href: '/dashboard/vendor/coupons', icon: Ticket },
    { name: 'Shop Settings', href: '/dashboard/vendor/settings', icon: Settings },
  ],
  USER: [
    { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
    { name: 'My Profile', href: '/dashboard/user/profile', icon: Users },
    { name: 'My Orders', href: '/dashboard/user/orders', icon: ShoppingBag },
    { name: 'Wishlist', href: '/dashboard/user/wishlist', icon: Heart },
    { name: 'Addresses', href: '/dashboard/user/addresses', icon: MapPin },
    { name: 'Reviews', href: '/dashboard/user/reviews', icon: Star },
    { name: 'Payments', href: '/dashboard/user/payments', icon: CreditCard },
  ]
}

const Sidebar = () => {
  const pathname = usePathname()
  const [role, setRole] = useState<'ADMIN' | 'VENDOR' | 'USER' | null>(null)
  const [isMounted, setIsMounted] = useState(false)

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
      <aside className="hidden shadow-sm lg:flex w-60 border-gray-200 border rounded-2xl h-full flex-col z-40 overflow-hidden">
        
        {/* লোগো সেকশন - Right Aligned */}
        <div className="px-4 pt-4 flex justify-start">
          <Logo />
          
        </div>
          <div className="py-4 px-4">
            <hr className="border-gray-200" />
          </div>
        {/* নেভিগেশন মেনু */}
        <nav className="flex-1 px-4 pb-6 space-y-1 overflow-y-auto custom-scrollbar">

          {currentMenu.map((item, index) => {
            const isActive = pathname === item.href
            // লাস্ট ২ টা আইটেমের আগে লাইন দেওয়ার লজিক
            const isLastTwo = index === currentMenu.length - 2

            return (
              <div key={item.name}>
                {isLastTwo && (
                  <div className="my-4 px-4">
                    <hr className="border-gray-200" />
                  </div>
                )}
                
                <Link href={item.href} className="block">
                  <motion.div 
                    
                    className={`relative flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 group ${
                      isActive ? 'text-white shadow-lg shadow-orange-200/50' : 'text-gray-500 hover:bg-orange-50 hover:text-primary'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 bg-primary rounded-2xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <item.icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                      <span className={`text-[13px] font-bold ${isActive ? 'text-white' : 'text-gray-600'}`}>
                        {item.name}
                      </span>
                    </div>

                    <ChevronRight 
                      size={14} 
                      className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} 
                    />
                  </motion.div>
                </Link>
              </div>
            )
          })}

          {/* মেনুর শেষে আর একটা লাইন এবং ছোট ব্যানার */}
          <div className='px-4'>
            <hr className="border-gray-200 mt-4" />
          </div>
        </nav>

        {/* সাপোর্ট কার্ড সেকশন */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <Link href={`/dashboard/${role.toLowerCase()}/support`}>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden group cursor-pointer transition-all hover:border-secondary/20">
              <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="h-8 w-8 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-2">
                    <HelpCircle size={18} />
                 </div>
                 <p className="text-[11px] font-bold text-gray-800">Support Center</p>
                 <p className="text-[9px] text-gray-400 mt-0.5">24/7 technical help</p>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar