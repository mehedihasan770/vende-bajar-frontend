import React from 'react';
import DashboardPageTitle from '@/app/(dashboard)/dashboard/components/DashboardPageTitle';

const VendorAnalyticsPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto py-8">
      <DashboardPageTitle
        title="Vendor Analytics"
        moduleLabel="Vendor Module"
        pathLabel="vendor/analytics"
      />
      <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm text-gray-600">
        <p className="text-sm leading-7">
          Analytics tools and performance charts will appear here once data is available.
        </p>
      </div>
    </div>
  );
};

export default VendorAnalyticsPage;
