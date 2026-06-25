"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Settings } from "lucide-react";

const sidebarLinks = [
  {
    name: "All Notifications",
    href: "/dashboard/user/notifications",
    icon: Bell,
  },
  {
    name: "Preferences",
    href: "/dashboard/user/notifications/preferences",
    icon: Settings,
  },
];

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="p-4 md:p-5 xl:p-6">
      <div className="mb-5 xl:mb-6">
        <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
          Notifications
        </h1>
        <p className="text-[13px] md:text-sm text-gray-500 mt-1 font-medium">
          Manage your alert settings and view recent updates.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-5 xl:gap-6">
        <aside className="w-full xl:w-[138px] flex-shrink-0 xl:sticky xl:top-6 self-start">
          <nav className="flex flex-row xl:flex-col gap-1 overflow-x-auto pb-2 xl:pb-0 custom-scrollbar">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex flex-shrink-0 whitespace-nowrap items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-300 font-bold text-[13px] group z-10 ${
                    isActive
                      ? "text-white shadow-md shadow-primary/10"
                      : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="notifications-active-pill"
                      className="absolute inset-0 bg-primary rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary"}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 bg-white border border-gray-100 rounded-2xl md:rounded-[2rem] p-4 md:p-5 xl:p-6 shadow-xs overflow-hidden min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
