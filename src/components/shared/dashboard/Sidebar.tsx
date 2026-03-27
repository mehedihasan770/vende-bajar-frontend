'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  LayoutDashboard, Users, ShoppingBag, 
  Settings, Package, DollarSign, ChevronRight, HelpCircle
} from 'lucide-react'
import Logo from '../Logo/Logo'

const Sidebar = () => {
  const pathname = usePathname()
  
  // আপাতত এডমিন মেনু ডেমো হিসেবে দেওয়া হলো
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Users Control', href: '/dashboard/admin/users', icon: Users },
    { name: 'Product List', href: '/dashboard/admin/products', icon: Package },
    { name: 'Orders', href: '/dashboard/admin/orders', icon: ShoppingBag },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: DollarSign },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ]

  return (
    <div className='py-4 h-screen'>
    <aside className="hidden shadow-sm lg:flex w-72 border-gray-200 border rounded-2xl h-full flex-col z-40">
      
      {/* ১. লোগো সেকশন */}
      <div className="flex justify-center border-b border-gray-50/50">
        <Logo />
      </div>

      {/* ২. মেনু আইটেম সেকশন */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4">Main Menu</p>
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.name} href={item.href} className="block">
              <motion.div 
                whileHover={{ x: 5 }}
                className={`relative flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group ${
                  isActive ? 'text-white shadow-lg shadow-orange-200/50' : 'text-gray-500 hover:bg-orange-50 hover:text-primary'
                }`}
              >
                {/* একটিভ ব্যাকগ্রাউন্ড এনিমেশন */}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-pill"
                    className="absolute inset-0 bg-primary rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-[15px] font-bold ${isActive ? 'text-white' : 'text-gray-600'}`}>
                    {item.name}
                  </span>
                </div>

                <ChevronRight 
                  size={16} 
                  className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} 
                />
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* ৩. বটম সেকশন (Help/Support Card) */}
      <div className="p-4 border-t border-gray-50">
        <div className="bg-secondary/5 rounded-3xl p-5 border border-secondary/10 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="h-10 w-10 bg-secondary rounded-xl flex items-center justify-center text-white mb-3 shadow-lg shadow-secondary/20 group-hover:rotate-12 transition-transform">
              <HelpCircle size={20} />
            </div>
            <p className="text-sm font-bold text-gray-800">Need Help?</p>
            <p className="text-[11px] text-gray-500 mt-1 mb-3">Check our documentation or contact support.</p>
            <button className="text-[11px] font-bold text-secondary hover:underline">Read Docs</button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-secondary/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </aside>
    </div>
  )
}

export default Sidebar