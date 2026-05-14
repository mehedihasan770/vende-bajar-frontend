import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Logo from '@/components/shared/Logo/Logo';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const SidebarHeader = ({ isCollapsed, setIsCollapsed }: SidebarHeaderProps) => {
  return (
    <>
      <div className={`h-[84px] px-5 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start gap-4'}`}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 active:scale-95 shrink-0 ${isCollapsed ? 'bg-primary/5 text-primary hover:bg-primary/10' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
        >
          <Menu size={22} strokeWidth={2.5} />
        </button>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <Logo />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Premium Separator */}
      <div className="px-5 mb-4">
        <div className="h-[1px] w-full bg-linear-to-r from-gray-50 via-gray-200 to-gray-50"></div>
      </div>
    </>
  );
};

export default SidebarHeader;
