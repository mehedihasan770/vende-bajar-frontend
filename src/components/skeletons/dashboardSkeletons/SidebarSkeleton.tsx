import { HelpCircle } from 'lucide-react'

const SidebarSkeleton = () => {
  return (
    <div className='py-4 h-screen sticky top-0'>
      <aside className="hidden lg:flex w-60 border-gray-200 border rounded-2xl h-full flex-col z-40 overflow-hidden bg-white">
        
        {/* লোগো সেকশন স্কেলিটন */}
        <div className="p-8 flex justify-center border-b border-gray-50/50">
          <div className="w-32 h-10 bg-gray-100 rounded-xl animate-pulse" />
        </div>

        {/* মেনু আইটেম স্কেলিটন */}
        <div className="flex-1 px-4 py-6 space-y-3 overflow-hidden">
          {/* টাইটেল স্কেলিটন (যেমন: ADMIN CONTROL PANEL) */}
          <div className="px-4 w-32 h-3 bg-gray-100 rounded-full mb-6 animate-pulse" />
          
          {/* মেনু লুপ */}
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-50 rounded-lg animate-pulse" />
                <div className="w-24 h-4 bg-gray-50 rounded-lg animate-pulse" />
              </div>
              <div className="w-3 h-3 bg-gray-50 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* সাপোর্ট কার্ড স্কেলিটন */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="h-8 w-8 bg-gray-100 rounded-lg mb-2 animate-pulse" />
            <div className="w-24 h-3 bg-gray-100 rounded-full mb-2 animate-pulse" />
            <div className="w-32 h-2 bg-gray-50 rounded-full animate-pulse" />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default SidebarSkeleton