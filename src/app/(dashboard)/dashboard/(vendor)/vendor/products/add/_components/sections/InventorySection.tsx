import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductFormData } from "@/types/product";

interface InventorySectionProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function InventorySection({
  register,
  errors,
}: InventorySectionProps) {
  return (
    <div className="space-y-8">
      {/* Pricing Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Base Price ($) <span className="text-red-500">*</span>
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Standard retail price
          </p>
          <input
            {...register("basePrice", {
              required: "Base price is required",
              min: 0,
            })}
            type="number"
            step="0.01"
            className={`w-full px-4 py-3 rounded-2xl border ${errors.basePrice ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
            placeholder="0.00"
          />
          {errors.basePrice && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.basePrice.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Sale Price (Optional)
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Discounted price if applicable
          </p>
          <input
            {...register("salePrice")}
            type="number"
            step="0.01"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            placeholder="0.00"
          />
        </div>

        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Cost Price (Optional)
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Internal cost for profit calculation
          </p>
          <input
            {...register("costPrice")}
            type="number"
            step="0.01"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Sale Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-200">
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Sale Start Date
          </label>
          <input
            {...register("saleStartDate")}
            type="date"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
          />
        </div>
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Sale End Date
          </label>
          <input
            {...register("saleEndDate")}
            type="date"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
          />
        </div>
      </div>

      {/* Stock & SKU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Initial Stock <span className="text-red-500">*</span>
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Number of units currently available
          </p>
          <input
            {...register("stock", {
              required: "Stock count is required",
              min: 0,
            })}
            type="number"
            className={`w-full px-4 py-3 rounded-2xl border ${errors.stock ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
            placeholder="0"
          />
          {errors.stock && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.stock.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            SKU (Stock Keeping Unit)
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Unique identifier code (e.g. SNY-HDP-01)
          </p>
          <input
            {...register("sku")}
            type="text"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            placeholder="Unique SKU code"
          />
        </div>

        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Low Stock Alert
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Notify when stock falls below this level
          </p>
          <input
            {...register("inventory.lowStockThreshold")}
            type="number"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
          />
        </div>
      </div>

      {/* Backorder Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 p-5 bg-primary/5 rounded-2xl border border-primary/10">
        <input
          {...register("inventory.allowBackorder")}
          type="checkbox"
          id="backorder"
          className="w-5 h-5 accent-primary shrink-0 mt-1 sm:mt-0"
        />
        <label
          htmlFor="backorder"
          className="text-sm font-bold text-gray-700 leading-snug"
        >
          Allow Backorders (Allow customers to order when out of stock)
        </label>
      </div>
    </div>
  );
}
