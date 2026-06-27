import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ProductFormValues } from "@/types/product";

interface ShippingSEOSectionProps {
  register: UseFormRegister<ProductFormValues>;
}

export default function ShippingSEOSection({
  register,
}: ShippingSEOSectionProps) {
  return (
    <div className="space-y-10">
      {/* Shipping Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-4 bg-primary rounded-full"></div>
          <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">
            Shipping & Logistics
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Weight (KG)
            </label>
            <p className="text-[11px] text-gray-400 mb-2 truncate">
              Product weight for shipping cost calculation
            </p>
            <input
              {...register("shipping.weight", {
                min: {
                  value: 0,
                  message: "Weight cannot be negative",
                },
              })}
              type="number"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2">
            <div className="col-span-1 sm:col-span-3 min-w-0">
              <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
                Dimensions (CM)
              </label>
              <p className="text-[11px] text-gray-400 mb-2 truncate">
                Length x Width x Height
              </p>
            </div>
            <input
              {...register("shipping.dimensions.length", {
                min: {
                  value: 0,
                  message: "Length cannot be negative",
                },
              })}
              type="number"
              min="0"
              placeholder="L"
              className="w-full px-3 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            />
            <input
              {...register("shipping.dimensions.width", {
                min: {
                  value: 0,
                  message: "Width cannot be negative",
                },
              })}
              type="number"
              min="0"
              placeholder="W"
              className="w-full px-3 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            />
            <input
              {...register("shipping.dimensions.height", {
                min: {
                  value: 0,
                  message: "Height cannot be negative",
                },
              })}
              type="number"
              min="0"
              placeholder="H"
              className="w-full px-3 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            />
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <section className="border-t border-gray-100 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-4 bg-primary rounded-full"></div>
          <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">
            SEO (Search Engine Optimization)
          </h4>
        </div>

        <div className="space-y-4">
          <div className="min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Meta Title (Optional)
            </label>
            <p className="text-[11px] text-gray-400 mb-2 truncate">
              The title shown in search engine results
            </p>
            <input
              {...register("metaTitle")}
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
              placeholder="SEO friendly title"
            />
          </div>
          <div className="min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Meta Description (Optional)
            </label>
            <p className="text-[11px] text-gray-400 mb-2 truncate">
              Brief SEO-friendly description of the product
            </p>
            <textarea
              {...register("metaDescription")}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all resize-none"
              placeholder="SEO meta description..."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
