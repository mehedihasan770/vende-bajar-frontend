import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface PricingInventorySectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function PricingInventorySection({
  register,
  errors,
}: PricingInventorySectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Base Price */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
          Base Price ($) <span className="text-red-500">*</span>
        </label>
        <input
          {...register("basePrice", { required: "Required", min: 0 })}
          type="number"
          step="0.01"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
          placeholder="0.00"
        />
      </div>

      {/* Sale Price */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
          Sale Price ($)
        </label>
        <input
          {...register("salePrice")}
          type="number"
          step="0.01"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
          placeholder="0.00"
        />
      </div>

      {/* Stock */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          {...register("stock", { required: "Required", min: 0 })}
          type="number"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
          placeholder="0"
        />
      </div>

      {/* SKU */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
          SKU (Unique)
        </label>
        <input
          {...register("sku")}
          type="text"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
          placeholder="e.g. WATCH-001"
        />
      </div>

      {/* Low Stock Threshold */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
          Low Stock Alert
        </label>
        <input
          {...register("inventory.lowStockThreshold")}
          type="number"
          defaultValue={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
        />
      </div>
    </div>
  );
}
