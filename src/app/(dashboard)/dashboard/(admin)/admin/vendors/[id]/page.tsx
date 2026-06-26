import React from "react";
import DashboardPageTitle from "@/app/(dashboard)/dashboard/components/DashboardPageTitle";

const VendorDetailPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto py-8">
      <DashboardPageTitle
        title="Vendor Details"
        moduleLabel="Admin Module"
        pathLabel="admin/vendors/[id]"
      />
      <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm text-gray-600">
        <p className="text-sm leading-7">
          Vendor profile information will appear here once a vendor is selected.
        </p>
      </div>
    </div>
  );
};

export default VendorDetailPage;
