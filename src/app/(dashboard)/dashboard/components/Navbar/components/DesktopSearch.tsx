import { Search } from 'lucide-react';
import { useState } from 'react';

const DesktopSearch = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex-1 max-w-xl hidden md:block">
      <div className={`relative flex items-center transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-primary/10' : ''} bg-gray-50 rounded-full`}>
        <Search 
          size={18} 
          className={`absolute left-4 transition-colors ${isSearchFocused ? 'text-primary' : 'text-gray-400'}`} 
        />
        <input 
          type="text"
          placeholder="Search anything..."
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="w-full bg-transparent border border-gray-100 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/30 transition-all outline-none"
        />
      </div>
    </div>
  );
};

export default DesktopSearch;
