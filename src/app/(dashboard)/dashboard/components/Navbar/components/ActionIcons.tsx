import Link from 'next/link';
import { Settings, Bell } from 'lucide-react';

const ActionIcons = () => {
  return (
    <>
      <Link href="/dashboard/admin/settings">
        <button className="p-2 text-gray-500 hover:text-primary hover:bg-orange-50 rounded-full transition-all group">
          <Settings size={20} className="group-hover:rotate-45 transition-transform duration-500" />
        </button>
      </Link>

      <button className="relative p-2 text-gray-500 hover:text-primary hover:bg-orange-50 rounded-full transition-all">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white shadow-sm"></span>
      </button>
    </>
  );
};

export default ActionIcons;
