"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
        <aside className="w-full xl:w-52 flex-shrink-0">
          <nav className="flex flex-row xl:flex-col gap-2 overflow-x-auto pb-2 xl:pb-0 custom-scrollbar">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex flex-shrink-0 items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm md:text-base ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
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
