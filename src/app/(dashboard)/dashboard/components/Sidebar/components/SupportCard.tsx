import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

interface SupportCardProps {
  isCollapsed: boolean;
  role: string;
}

const SupportCard = ({ isCollapsed, role }: SupportCardProps) => {
  return (
    <div className="p-4 border-t border-gray-50 bg-gray-50/30">
      <Link href={`/dashboard/${role?.toLowerCase()}/support`}>
        {isCollapsed ? (
          <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm hover:border-secondary/20 transition-all flex justify-center items-center h-13">
            <HelpCircle size={18} className="text-secondary" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden group cursor-pointer transition-all hover:border-secondary/20">
            <div className="relative z-10 flex flex-col items-center text-center">
               <div className="h-8 w-8 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-2">
                  <HelpCircle size={18} />
               </div>
               <p className="text-[11px] font-bold text-gray-800">Support Center</p>
               <p className="text-[9px] text-gray-400 mt-0.5">24/7 technical help</p>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default SupportCard;
