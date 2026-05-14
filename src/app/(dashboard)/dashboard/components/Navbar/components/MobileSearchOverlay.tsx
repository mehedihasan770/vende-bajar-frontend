import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';

interface MobileSearchOverlayProps {
  showMobileSearch: boolean;
  setShowMobileSearch: (show: boolean) => void;
}

const MobileSearchOverlay = ({ showMobileSearch, setShowMobileSearch }: MobileSearchOverlayProps) => {
  return (
    <AnimatePresence>
      {showMobileSearch && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-0 bg-white z-[110] flex items-center px-4 gap-2 rounded-2xl"
        >
          <button 
            onClick={() => setShowMobileSearch(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-2xl transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <input 
            autoFocus
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-800"
          />
          <button className="p-2 text-primary">
            <Search size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSearchOverlay;
