import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Logo from '@/components/shared/Logo/Logo';

interface MenuItem {
  name: string;
  href: string;
  icon: any;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface MobileSidebarDrawerProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  currentMenu: MenuCategory[];
  pathname: string;
}

const MobileSidebarDrawer = ({ isMobileMenuOpen, setIsMobileMenuOpen, currentMenu, pathname }: MobileSidebarDrawerProps) => {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-[100dvh] bg-black/40 backdrop-blur-sm z-[120] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Menu Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 h-[100dvh] w-[280px] bg-white shadow-2xl z-[130] flex flex-col lg:hidden border-r border-gray-100"
          >
            <div className="h-[70px] px-5 flex items-center justify-between border-b border-gray-50">
              <Logo />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-all active:scale-95"
              >
                <ArrowLeft size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar">
              {currentMenu.map((group) => (
                <div key={group.category} className="space-y-2">
                  <div className="px-4 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      {group.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = item.name === 'Overview'
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                      return (
                        <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                          <div className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}>
                            <div className="flex items-center gap-3">
                              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                              <span className="text-[13px] font-bold">{item.name}</span>
                            </div>
                            <ChevronRight size={14} className={isActive ? 'opacity-100' : 'opacity-0'} />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-50 bg-gray-50/50">
               <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">Vende Bajar Admin v1.0</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebarDrawer;
