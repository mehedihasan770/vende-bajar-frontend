import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/shared/Logo/Logo';

interface MenuItem {
  name: string;
  href: string;
  icon: any;
}

interface MobileSidebarDrawerProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  currentMenu: MenuItem[];
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
            className="fixed top-0 left-0 w-full h-[100dvh] bg-black/20 backdrop-blur-sm z-[120] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Menu Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 h-[100dvh] w-[260px] bg-white/90 backdrop-blur-2xl shadow-2xl z-[130] flex flex-col lg:hidden border-r border-white/50"
          >
            <div className="h-[84px] px-5 flex items-center justify-between border-b border-gray-100">
              <Logo />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"
              >
                <ArrowLeft size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
              {currentMenu.map((item) => {
                 const hasMoreSpecificMatch = currentMenu.some(
                   (other) => other.href !== item.href && 
                              other.href.startsWith(item.href) && 
                              pathname.startsWith(other.href)
                 );
                 const isActive = item.name === 'Overview' 
                   ? pathname === item.href 
                   : (pathname === item.href || (pathname.startsWith(item.href + '/') && !hasMoreSpecificMatch));
                   
                 return (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                       <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all mb-1 ${isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-600 hover:bg-primary/5 hover:text-primary'}`}>
                         <item.icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                         <span className="text-[13px] font-bold">{item.name}</span>
                       </div>
                    </Link>
                 )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebarDrawer;
