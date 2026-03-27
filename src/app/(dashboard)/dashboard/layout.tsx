import Navbar from "@/components/shared/dashboard/Navbar";
import Sidebar from "@/components/shared/dashboard/Sidebar";

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex gap-4">
      {/* ১. সাইডবার - ডেক্সটপে ফিক্সড থাকবে */}
      <aside className="hidden h-full lg:block w-72 shrink-0 sticky top-0">
        <Sidebar />
      </aside>

      {/* ২. মেইন কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* হেডার/নেববার - এটি উপরে স্টিকি থাকবে */}
        <header className="sticky top-0">
          <Navbar />
        </header>

        {/* মেইন বডি - স্ক্রলযোগ্য হবে */}
        <main className="overflow-y-auto p-4 mb-4 border-gray-200 rounded-2xl shadow-sm h-full border">
          <div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardRootLayout;