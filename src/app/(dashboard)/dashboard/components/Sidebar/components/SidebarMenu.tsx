import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon: any;
}

interface SidebarMenuProps {
  currentMenu: MenuItem[];
  pathname: string;
  isCollapsed: boolean;
}

const SidebarMenu = ({ currentMenu, pathname, isCollapsed }: SidebarMenuProps) => {
  return (
    <nav className="flex-1 px-4 pb-6 space-y-1 overflow-y-auto custom-scrollbar">
      {currentMenu.map((item, index) => {
        // Find if there's a more specific match in the menu
        const hasMoreSpecificMatch = currentMenu.some(
          (other) => other.href !== item.href && 
                     other.href.startsWith(item.href) && 
                     pathname.startsWith(other.href)
        );

        const isActive = item.name === 'Overview' 
          ? pathname === item.href 
          : (pathname === item.href || (pathname.startsWith(item.href + '/') && !hasMoreSpecificMatch));
          
        const isLastTwo = index === currentMenu.length - 2;

        return (
          <div key={item.name}>
            {isLastTwo && (
              <div className="my-4">
                <hr className="border-gray-200" />
              </div>
            )}
            
            <Link href={item.href} className="block">
              <motion.div 
                className={`relative flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-3'} rounded-2xl cursor-pointer transition-all duration-300 group ${
                  isActive ? 'text-white shadow-lg shadow-orange-200/50' : 'text-gray-500 hover:bg-orange-50 hover:text-primary'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 bg-primary rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className={`relative z-10 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <item.icon size={19} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className={`text-[13px] font-bold whitespace-nowrap overflow-hidden ${isActive ? 'text-white' : 'text-gray-600'}`}
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="relative z-10 overflow-hidden"
                    >
                      <ChevronRight 
                        size={14} 
                        className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          </div>
        )
      })}

      <div className='mt-4'>
        <hr className="border-gray-200" />
      </div>
    </nav>
  );
};

export default SidebarMenu;
