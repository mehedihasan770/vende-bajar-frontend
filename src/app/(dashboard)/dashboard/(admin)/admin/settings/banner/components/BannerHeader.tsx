import { Layers } from 'lucide-react';

export default function BannerHeader() {
  return (
    <div className="mb-6 md:mb-8 border-b border-gray-100 pb-4 md:pb-5 flex items-start md:items-center gap-3 md:gap-4">
      <div className="p-2 md:p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
        <Layers className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Slider Settings</h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Manage all 3 slides of your homepage banner from here.</p>
      </div>
    </div>
  );
}
