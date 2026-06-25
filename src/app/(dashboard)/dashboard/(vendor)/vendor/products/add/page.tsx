import React from 'react';
import AddProductForm from './_components/AddProductForm';
import DashboardPageTitle from '@/app/(dashboard)/dashboard/components/DashboardPageTitle';

export default function AddProductPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto py-8">
      <DashboardPageTitle
        title="Add New Product"
        moduleLabel="Vendor Module"
        pathLabel="vendor/products/add"
        badgeLabel="New Listing"
        badgeTone="success"
      />
      <AddProductForm />
    </div>
  );
}
