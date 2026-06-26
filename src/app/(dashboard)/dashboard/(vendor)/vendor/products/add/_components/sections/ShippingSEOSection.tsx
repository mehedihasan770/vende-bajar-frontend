import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Check, Tag, Truck } from "lucide-react";
import { ProductFormValues } from "@/types/product";

interface ShippingSEOSectionProps {
  register: UseFormRegister<ProductFormValues>;
  disabledFlash?: boolean;
}

export default function ShippingSEOSection({
  register,
  disabledFlash = false,
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

      {/* Marketing Flags */}
      <section className="border-t border-gray-100 pt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="relative w-full min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 bg-white border border-gray-200 rounded-4xl hover:border-orange-200 transition-all group cursor-pointer shadow-sm gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div className="p-3 bg-orange-50 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform shrink-0">
                <Tag size={20} />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black text-gray-800 block uppercase tracking-wider wrap-break-word">
                  Featured Product
                </span>
                <p className="text-[11px] text-gray-500 wrap-break-word">
                  Display in premium showcase lists
                </p>
              </div>
            </div>
            <div className="relative inline-flex items-center cursor-pointer justify-end w-full sm:w-auto">
              <input
                {...register("isFeatured")}
                type="checkbox"
                className="sr-only peer"
              />
              <span className="absolute inset-0 rounded-full bg-gray-200 transition-colors duration-200 peer-checked:bg-orange-500" />
              <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-5 flex items-center justify-center">
                <Check
                  className="text-orange-500 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                  size={12}
                />
              </span>
            </div>
          </label>

          <label className="relative w-full min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 bg-white border border-gray-200 rounded-4xl hover:border-red-200 transition-all group cursor-pointer shadow-sm gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div className="p-3 bg-red-50 rounded-2xl text-red-500 group-hover:scale-110 transition-transform shrink-0">
                <Truck size={20} />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black text-gray-800 block uppercase tracking-wider wrap-break-word">
                  Flash Sale
                </span>
                <p className="text-[11px] text-gray-500 wrap-break-word">
                  Include in limited-time events
                </p>
              </div>
            </div>
            <div className="relative inline-flex items-center cursor-pointer justify-end w-full sm:w-auto">
              <input
                {...register("isFlashSale")}
                type="checkbox"
                className="sr-only peer"
                disabled={disabledFlash}
                aria-disabled={disabledFlash}
              />
              <span className="absolute inset-0 rounded-full bg-gray-200 transition-colors duration-200 peer-checked:bg-red-500 peer-disabled:bg-gray-200" />
              <span className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-5 flex items-center justify-center">
                <Check
                  className="text-red-500 opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                  size={12}
                />
              </span>
            </div>
            {disabledFlash && (
              <p className="text-xs text-red-500 mt-2 sm:mt-0 wrap-break-word">
                Flash sale disabled: discount exceeds 35% or invalid prices.
              </p>
            )}
          </label>
        </div>
      </section>
    </div>
  );
}
