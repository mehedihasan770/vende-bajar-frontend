"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Settings, Image as ImageIcon, User, Shield } from 'lucide-react';

const sidebarLinks = [
  { name: 'General', href: '/dashboard/admin/settings', icon: Settings },
  { name: 'Banner', href: '/dashboard/admin/settings/banner', icon: ImageIcon },
  { name: 'Profile', href: '/dashboard/admin/settings/profile', icon: User },
  { name: 'Security', href: '/dashboard/admin/settings/security', icon: Shield },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="p-4 md:p-6 xl:p-8">
      <div className="mb-6 xl:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1.5">Manage your website configurations, banners, and preferences.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
        {/* Sidebar */}
        <aside className="w-full xl:w-52 flex-shrink-0 xl:sticky xl:top-8 self-start">
          <nav className="flex flex-row xl:flex-col gap-2 overflow-x-auto pb-2 xl:pb-0 custom-scrollbar">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex flex-shrink-0 whitespace-nowrap items-center gap-2.5 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm md:text-base group z-10 ${
                    isActive 
                      ? 'text-white shadow-lg shadow-orange-200/50' 
                      : 'text-gray-500 hover:bg-orange-50 hover:text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="settings-active-pill"
                      className="absolute inset-0 bg-primary rounded-2xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 md:w-[18px] md:h-[18px] ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} strokeWidth={isActive ? 2.5 : 2} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-4 md:p-6 xl:p-8 shadow-sm overflow-hidden min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
