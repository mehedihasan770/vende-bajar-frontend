import React from 'react';
import { PackagePlus } from 'lucide-react';

export default function AddProductHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Vendor Module</span>
        </div>
        <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <PackagePlus className="w-8 h-8 text-primary" strokeWidth={2.5} />
          Add New Product
        </h2>
        <p className="text-[12px] md:text-[13px] text-gray-500 mt-2 font-medium flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          Path: <code className="bg-gray-50 text-primary border border-gray-100 px-1.5 py-0.5 rounded font-mono text-[11px]">vendor/products/add</code>
        </p>
      </div>
      <div className="shrink-0">
        <div className="px-3 py-1.5 bg-green-50 text-green-600 text-[10px] font-black rounded-xl border border-green-100 uppercase tracking-widest flex items-center gap-2 shadow-xs">
          New Listing
        </div>
      </div>
    </div>
  );
}
