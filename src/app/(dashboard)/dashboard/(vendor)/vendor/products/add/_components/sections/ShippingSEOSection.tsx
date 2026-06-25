import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Tag, Truck } from "lucide-react";
import { ProductFormData } from "@/types/product";

interface ShippingSEOSectionProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function ShippingSEOSection({
  register,
  errors,
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
              {...register("shipping.weight")}
              type="number"
              step="0.01"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1 sm:col-span-3 min-w-0">
              <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
                Dimensions (CM)
              </label>
              <p className="text-[11px] text-gray-400 mb-2 truncate">
                Length x Width x Height
              </p>
            </div>
            <input
              {...register("shipping.dimensions.length")}
              type="number"
              placeholder="L"
              className="w-full px-3 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            />
            <input
              {...register("shipping.dimensions.width")}
              type="number"
              placeholder="W"
              className="w-full px-3 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            />
            <input
              {...register("shipping.dimensions.height")}
              type="number"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="relative flex items-center justify-between p-6 bg-white border border-gray-200 rounded-[2rem] hover:border-orange-200 transition-all group cursor-pointer shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform">
                <Tag size={20} />
              </div>
              <div>
                <span className="text-sm font-black text-gray-800 block uppercase tracking-wider">
                  Featured Product
                </span>
                <p className="text-[11px] text-gray-500">
                  Display in premium showcase lists
                </p>
              </div>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                {...register("isFeatured")}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </div>
          </label>

          <label className="relative flex items-center justify-between p-6 bg-white border border-gray-200 rounded-[2rem] hover:border-red-200 transition-all group cursor-pointer shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-2xl text-red-500 group-hover:scale-110 transition-transform">
                <Truck size={20} />
              </div>
              <div>
                <span className="text-sm font-black text-gray-800 block uppercase tracking-wider">
                  Flash Sale
                </span>
                <p className="text-[11px] text-gray-500">
                  Include in limited-time events
                </p>
              </div>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                {...register("isFlashSale")}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </div>
          </label>
        </div>
      </section>
    </div>
  );
}
