import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "@/types/product";

interface ShippingSEOSectionProps {
  register: UseFormRegister<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
}

const shippingClasses = [
  { label: "Standard (Small items)", value: "standard" },
  { label: "Heavy (Large/Bulk items)", value: "heavy" },
  { label: "Digital (No shipping)", value: "digital" },
];

export default function ShippingSEOSection({
  register,
  setValue,
  watch,
}: ShippingSEOSectionProps) {
  const [isShipOpen, setIsShipOpen] = useState(false);
  const selectedClass = watch("shippingClass");

  const displayValue = shippingClasses.find(c => c.value === selectedClass)?.label || "Select Shipping Class";

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
          {/* Shipping Class Dropdown */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Shipping Class <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-gray-400 mb-2 truncate">
              Choose the size/weight category for shipping
            </p>

            <div
              onClick={() => setIsShipOpen(!isShipOpen)}
              className="w-full rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm flex items-center cursor-pointer overflow-hidden"
            >
              <input
                readOnly
                value={displayValue}
                className="w-full px-4 py-3 rounded-2xl bg-transparent focus:outline-none cursor-pointer text-sm font-medium"
                placeholder="Select Shipping Class"
              />
              <input type="hidden" {...register("shippingClass", { required: "Shipping class is required" })} />
              <div className="px-3 text-gray-500">
                <svg className={`h-5 w-5 transform transition-transform ${isShipOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.936a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Custom Dropdown List */}
            <div
              className={`absolute z-30 mt-2 w-full rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-sm max-h-60 overflow-auto transition-all duration-300 origin-top ${isShipOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
            >
              {shippingClasses.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    setValue("shippingClass", c.value as any);
                    setIsShipOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors text-sm font-medium border-b border-gray-100 last:border-0"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Direct Payment Only
            </label>
            <p className="text-[11px] text-gray-400 mb-2 truncate">
              Force bKash payment (Disable COD)
            </p>
            <div className="flex items-center mt-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("directPayment")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm font-medium text-gray-600">Force bKash</span>
              </label>
            </div>
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
