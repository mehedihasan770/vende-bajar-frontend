import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ChevronDown, type LucideIcon } from "lucide-react";
import Tooltip from "@/app/(dashboard)/dashboard/components/Sidebar/components/Tooltip/Tooltip";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface SidebarMenuProps {
  currentMenu: MenuCategory[];
  pathname: string;
  isCollapsed: boolean;
}

const SidebarMenu = ({
  currentMenu,
  pathname,
  isCollapsed,
}: SidebarMenuProps) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    Object.fromEntries(currentMenu.map((c) => [c.category, true])),
  );
  const [tooltipState, setTooltipState] = useState<{
    open: boolean;
    anchorRect: DOMRect | null;
    content: string;
  }>({
    open: false,
    anchorRect: null,
    content: "",
  });

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      <nav
        className={`flex-1 px-3 pb-6 space-y-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar scroll-smooth`}
      >
        {currentMenu.map((group) => {
          const isOpen = openCategories[group.category];

          return (
            <div key={group.category} className="space-y-0.5">
              {/* Category Header */}
              {!isCollapsed ? (
                <button
                  onClick={() => toggleCategory(group.category)}
                  className="w-full cursor-pointer bg-gray-10 flex items-center justify-between px-3 py-2.5 mt-2 rounded-xl hover:bg-gray-50/80 transition-all duration-200 group/header"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover/header:text-primary transition-colors">
                    {group.category}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 0 : -90 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ChevronDown
                      size={12}
                      className="text-gray-400 group-hover/header:text-primary"
                    />
                  </motion.div>
                </button>
              ) : (
                <div className="flex justify-center py-3">
                  <div className="w-6 h-px bg-gray-200" />
                </div>
              )}

              {/* Collapsible Items */}
              <AnimatePresence initial={false}>
                {(isOpen || isCollapsed) && (
                  <motion.div
                    initial={isCollapsed ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-visible space-y-1"
                  >
                    {group.items.map((item) => {
                      const isActive =
                        item.name === "Overview"
                          ? pathname === item.href
                          : pathname.startsWith(item.href);

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block group relative overflow-visible"
                          onMouseEnter={(event) => {
                            if (!isCollapsed) return;
                            const target =
                              event.currentTarget.getBoundingClientRect();
                            setTooltipState({
                              open: true,
                              anchorRect: target,
                              content: item.name,
                            });
                          }}
                          onMouseLeave={() => {
                            if (!isCollapsed) return;
                            setTooltipState((prev) => ({
                              ...prev,
                              open: false,
                            }));
                          }}
                        >
                          <motion.div
                            layout
                            whileHover={{ x: isCollapsed ? 0 : 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative flex items-center ${isCollapsed ? "justify-center px-0 py-2.5" : "justify-between px-3.5 py-2.5"} rounded-xl cursor-pointer transition-all duration-300 ${
                              isActive
                                ? "text-white shadow-md shadow-primary/20 bg-primary"
                                : "text-gray-500 hover:bg-gray-50 hover:text-primary"
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="sidebar-active-pill"
                                className="absolute inset-0 bg-primary rounded-xl -z-10"
                                transition={{
                                  type: "spring",
                                  bounce: 0.2,
                                  duration: 0.6,
                                }}
                              />
                            )}

                            <div
                              className={`relative z-10 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}
                            >
                              <item.icon
                                size={18}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={`shrink-0 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary"}`}
                              />

                              <AnimatePresence mode="popLayout">
                                {!isCollapsed && (
                                  <motion.span
                                    key="sidebar-text"
                                    // এখানে initial, animate এবং exit একই ট্রানজিশন ব্যবহার করছে যাতে জাম্প না করে
                                    initial={{ opacity: 0, width: 0, x: -10 }}
                                    animate={{ opacity: 1, width: "auto", x: 0 }}
                                    exit={{ opacity: 0, width: 0, x: -10 }}
                                    transition={{ 
                                      duration: 0.2, // সাইডবারের ট্রানজিশনের সাথে মিলিয়ে দিন
                                      ease: "linear" // লিনিয়ার দিলে একদম সাইডবারের মুভমেন্টের সাথে মিল থাকবে
                                    }}
                                    className="overflow-hidden text-[13px] font-bold whitespace-nowrap"
                                  >
                                    {item.name}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </div>

                            {!isCollapsed && (
                              <div className="relative z-10">
                                <ChevronRight
                                  size={14}
                                  className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0 text-white" : "opacity-0 -translate-x-2 text-gray-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary"}`}
                                />
                              </div>
                            )}
                          </motion.div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
      <Tooltip
        open={tooltipState.open}
        anchorRect={tooltipState.anchorRect}
        content={tooltipState.content}
      />
    </>
  );
};

export default SidebarMenu;
