import React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { ProductFormValues } from "@/types/product";
import DatePicker from "@/components/ui/DatePicker";

interface InventorySectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  isFlashSale?: boolean;
}

export default function InventorySection({
  register,
  errors,
  setValue,
  isFlashSale = false,
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
              min: {
                value: 0,
                message: "Base price cannot be negative",
              },
            })}
            type="number"
            min="0"
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
            Sale Price (Optional) (Flash)
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Discounted price if applicable
          </p>
          <input
            {...register("salePrice", {
              min: {
                value: 0,
                message: "Sale price cannot be negative",
              },
            })}
            type="number"
            min="0"
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
            {...register("costPrice", {
              min: {
                value: 0,
                message: "Cost price cannot be negative",
              },
            })}
            type="number"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Sale Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-200">
        {isFlashSale && (
          <div className="absolute left-6 -top-4 bg-red-50 text-red-600 px-3 py-1 rounded-xl text-xs font-bold">
            Flash Sale Dates
          </div>
        )}
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Flash Sale Start Date
          </label>
          <div className="relative">
            <DatePicker
              value={undefined}
              placeholder="Select start date"
              onChange={(iso) => setValue("saleStartDate", iso || "")}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6 2a1 1 0 000 2h1v1a1 1 0 102 0V4h2v1a1 1 0 102 0V4h1a1 1 0 100-2h-1V1a1 1 0 10-2 0v1H9V1a1 1 0 10-2 0v1H6z" />
                <path
                  fillRule="evenodd"
                  d="M3 8a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm2 1v6h10V9H5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {errors.saleStartDate && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.saleStartDate.message}
            </p>
          )}
        </div>
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Flash Sale End Date
          </label>
          <div className="relative">
            <DatePicker
              value={undefined}
              placeholder="Select end date"
              onChange={(iso) => setValue("saleEndDate", iso || "")}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M6 2a1 1 0 000 2h1v1a1 1 0 102 0V4h2v1a1 1 0 102 0V4h1a1 1 0 100-2h-1V1a1 1 0 10-2 0v1H9V1a1 1 0 10-2 0v1H6z" />
                <path
                  fillRule="evenodd"
                  d="M3 8a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm2 1v6h10V9H5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {errors.saleEndDate && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.saleEndDate.message}
            </p>
          )}
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
              min: {
                value: 0,
                message: "Stock cannot be negative",
              },
            })}
            type="number"
            min="0"
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
            {...register("inventory.lowStockThreshold", {
              min: {
                value: 0,
                message: "Low stock threshold cannot be negative",
              },
            })}
            type="number"
            min="0"
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
