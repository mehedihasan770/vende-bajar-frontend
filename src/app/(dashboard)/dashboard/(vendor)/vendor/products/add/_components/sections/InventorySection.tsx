import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface InventorySectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function InventorySection({ register, errors }: InventorySectionProps) {
  return (
    <div className="space-y-8">
      {/* Pricing Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Base Price ($) <span className="text-red-500">*</span></label>
          <p className="text-[11px] text-gray-400 mb-2">প্রোডাক্টের সাধারণ মূল্য</p>
          <input
            {...register('basePrice', { required: 'Required', min: 0 })}
            type="number"
            step="0.01"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Sale Price (Optional)</label>
          <p className="text-[11px] text-gray-400 mb-2">ডিসকাউন্ট প্রাইস (থাকলে)</p>
          <input
            {...register('salePrice')}
            type="number"
            step="0.01"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Cost Price (Optional)</label>
          <p className="text-[11px] text-gray-400 mb-2">আপনার কেনা দাম (লাভ হিসাবের জন্য)</p>
          <input
            {...register('costPrice')}
            type="number"
            step="0.01"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Sale Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Sale Start Date</label>
          <input {...register('saleStartDate')} type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Sale End Date</label>
          <input {...register('saleEndDate')} type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all" />
        </div>
      </div>

      {/* Stock & SKU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Initial Stock <span className="text-red-500">*</span></label>
          <p className="text-[11px] text-gray-400 mb-2">বর্তমানে কতটি আছে</p>
          <input
            {...register('stock', { required: 'Required', min: 0 })}
            type="number"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">SKU (Stock Keeping Unit)</label>
          <p className="text-[11px] text-gray-400 mb-2">ইউনিক আইডি (যেমন: SNY-HDP-01)</p>
          <input
            {...register('sku')}
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="Unique SKU code"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Low Stock Alert</label>
          <p className="text-[11px] text-gray-400 mb-2">কত নিচে নামলে নোটিফিকেশন পাবেন</p>
          <input
            {...register('inventory.lowStockThreshold')}
            type="number"
            defaultValue={5}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
          />
        </div>
      </div>

      {/* Backorder Toggle */}
      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
        <input {...register('inventory.allowBackorder')} type="checkbox" id="backorder" className="w-5 h-5 accent-primary" />
        <label htmlFor="backorder" className="text-sm font-bold text-gray-700">Allow Backorders (স্টক শেষ হলেও কাস্টমাররা অর্ডার করতে পারবে)</label>
      </div>
    </div>
  );
}
