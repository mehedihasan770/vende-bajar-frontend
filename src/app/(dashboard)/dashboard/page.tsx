import React from 'react';
import DashboardPageTitle from '@/app/(dashboard)/dashboard/components/DashboardPageTitle';

const DashboardEntryPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-8">
      <DashboardPageTitle
        title="Dashboard Home"
        moduleLabel="Dashboard"
        description="Choose a workspace from the sidebar to manage products, orders, users, and analytics."
      />
      <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm text-gray-600">
        <p className="text-sm leading-7">
          Welcome to your dashboard. Use the navigation panel to open admin, vendor, or user sections and continue managing the store.
        </p>
      </div>
    </div>
  );
};

export default DashboardEntryPage;
