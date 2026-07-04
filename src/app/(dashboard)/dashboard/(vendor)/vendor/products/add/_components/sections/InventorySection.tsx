import React, { useRef, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "@/types/product";
import DatePicker from "@/components/ui/DatePicker";
import { DollarSign, Package, AlertTriangle, RefreshCcw } from "lucide-react";

interface InventorySectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  saleType?: "flash" | "regular";
  watch: UseFormWatch<ProductFormValues>;
}

export default function InventorySection({
  register,
  errors,
  setValue,
  saleType = "regular",
  watch,
}: InventorySectionProps) {
  const dateContainerRef = useRef<HTMLDivElement>(null);
  const [saleModeOpen, setSaleModeOpen] = useState(false);
  const saleModeOptions = [
    { label: "Flash Sale", value: "flash" },
    { label: "Regular / No Sale", value: "regular" },
  ];

  const basePrice = watch("pricing.basePrice");

  return (
    <div className="space-y-12">
      {/* 01. Pricing Section */}
      <section>
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
           <DollarSign className="text-primary" size={18} />
           <h5 className="text-sm font-black text-gray-800 uppercase tracking-widest">Pricing & Deals</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Base Price */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Base Price ($) <span className="text-red-500">*</span></label>
            <input
              {...register("pricing.basePrice", { required: "Required", min: { value: 0.01, message: "Min 0.01" } })}
              type="number" step="0.01"
              className={`w-full px-4 py-3 rounded-2xl border ${errors.pricing?.basePrice ? "border-red-300" : "border-gray-200"} focus:outline-none focus:ring-4 focus:ring-primary/10`}
              placeholder="100.00"
            />
            {errors.pricing?.basePrice && <p className="text-red-500 text-xs mt-1">{errors.pricing.basePrice.message}</p>}
          </div>

          {/* Sale Mode Dropdown */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-1">Sale Mode</label>
            <div
              onClick={() => setSaleModeOpen(!saleModeOpen)}
              className="w-full rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm flex items-center cursor-pointer overflow-hidden transition-all hover:border-primary/30"
            >
              <input
                readOnly
                value={saleModeOptions.find(o => o.value === saleType)?.label || "Select Mode"}
                className="w-full px-4 py-3 rounded-2xl bg-transparent focus:outline-none cursor-pointer text-sm font-medium"
              />
              <input type="hidden" {...register("pricing.saleType")} />
              <div className="px-3 text-gray-500">
                <svg className={`h-5 w-5 transform transition-transform ${saleModeOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.936a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div
              className={`absolute z-30 mt-2 w-full rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-sm overflow-hidden transition-all duration-300 origin-top ${saleModeOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
            >
              {saleModeOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setValue("pricing.saleType", opt.value as any);
                    setSaleModeOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors text-sm font-medium border-b border-gray-100 last:border-0"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cost Price */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cost Price (Optional)</label>
            <input {...register("pricing.costPrice")} type="number" step="0.01" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10" placeholder="0.00" />
          </div>
        </div>

        {/* Conditional Pricing Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
           {/* Regular Price (Fallback) */}
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Standard Discount Price (Regular)
              </label>
              <input
                {...register("pricing.regularPrice", {
                  min: { value: 0.01, message: "Must be at least 0.01" },
                  validate: (val) => {
                    const base = Number(basePrice || 0);
                    if (val && base && Number(val) >= base) return "Must be lower than Base Price";
                    return true;
                  }
                })}
                type="number" step="0.01"
                className={`w-full px-4 py-3 rounded-2xl border ${errors.pricing?.regularPrice ? "border-red-300" : "border-gray-200"} focus:outline-none focus:ring-4 focus:ring-primary/10`}
                placeholder="80.00"
              />
              <p className="text-[10px] text-gray-400 mt-1">Fallback price or regular discount (Optional).</p>
              {errors.pricing?.regularPrice && <p className="text-red-500 text-xs mt-1 font-medium">{errors.pricing.regularPrice.message}</p>}
           </div>

           {/* Flash Price */}
           {saleType === "flash" && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-bold text-red-600 mb-1">Flash Sale Price <span className="text-red-500">*</span></label>
                <input
                  {...register("pricing.salePrice", {
                    required: saleType === "flash" ? "Flash price is required" : false,
                    min: { value: 0.01, message: "Must be at least 0.01" },
                    validate: (val) => {
                      const base = Number(basePrice || 0);
                      if (val && base && Number(val) >= base) return "Must be lower than Base Price";
                      return true;
                    }
                  })}
                  type="number" step="0.01"
                  className={`w-full px-4 py-3 rounded-2xl border ${errors.pricing?.salePrice ? "border-red-300" : "border-red-200"} bg-red-50/10 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:outline-none`}
                  placeholder="40.00"
                />
                {errors.pricing?.salePrice && <p className="text-red-500 text-xs mt-1 font-medium">{errors.pricing.salePrice.message}</p>}
             </div>
           )}
        </div>

        {/* Flash Sale Schedule */}
        {saleType === "flash" && (
          <div ref={dateContainerRef} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-red-50/30 rounded-3xl border border-red-100 relative animate-in zoom-in-95 duration-300">
             <div className="absolute -top-3 left-6 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Schedule</div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                <input type="hidden" {...register("pricing.saleStartDate", { required: saleType === "flash" ? "Start date is required" : false })} />
                <DatePicker
                  containerRef={dateContainerRef}
                  value={watch("pricing.saleStartDate")}
                  placeholder="Pick Start"
                  onChange={(iso) => setValue("pricing.saleStartDate", iso || "", { shouldValidate: true })}
                />
                {errors.pricing?.saleStartDate && <p className="text-red-500 text-xs mt-1 font-medium">{errors.pricing.saleStartDate.message}</p>}
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                <input type="hidden" {...register("pricing.saleEndDate", { required: saleType === "flash" ? "End date is required" : false })} />
                <DatePicker
                  containerRef={dateContainerRef}
                  value={watch("pricing.saleEndDate")}
                  placeholder="Pick End"
                  onChange={(iso) => setValue("pricing.saleEndDate", iso || "", { shouldValidate: true })}
                />
                {errors.pricing?.saleEndDate && <p className="text-red-500 text-xs mt-1 font-medium">{errors.pricing.saleEndDate.message}</p>}
             </div>
          </div>
        )}
      </section>

      {/* 02. Inventory Section */}
      <section>
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
           <Package className="text-primary" size={18} />
           <h5 className="text-sm font-black text-gray-800 uppercase tracking-widest">Inventory & Stock</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Stock Amount <span className="text-red-500">*</span></label>
            <input {...register("inventory.stock", { required: "Required", min: { value: 0, message: "Min 0" } })} type="number" className={`w-full px-4 py-3 rounded-2xl border ${errors.inventory?.stock ? "border-red-300" : "border-gray-200"} focus:outline-none focus:ring-4 focus:ring-primary/10`} placeholder="0" />
            {errors.inventory?.stock && <p className="text-red-500 text-xs mt-1 font-medium">{errors.inventory.stock.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">SKU Code</label>
            <input {...register("sku")} type="text" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10" placeholder="e.g. SKU-123" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Low Stock Alert</label>
            <div className="relative">
               <AlertTriangle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
               <input {...register("inventory.lowStockThreshold")} type="number" className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10" placeholder="10" />
            </div>
          </div>
        </div>

        {/* Backorder Toggle */}
        <div className="mt-8 flex items-center justify-between p-5 bg-primary/5 rounded-3xl border border-primary/10 group hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => {
             const checkbox = document.getElementById("backorder-checkbox") as HTMLInputElement;
             if (checkbox) setValue("inventory.allowBackorder", !checkbox.checked);
        }}>
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-primary shadow-sm group-hover:scale-110 transition-transform"><RefreshCcw size={20} /></div>
              <div>
                 <p className="text-sm font-bold text-gray-800">Allow Backorders</p>
                 <p className="text-[11px] text-gray-500">Enable orders even when stock reaches zero</p>
              </div>
           </div>
           <div className="relative inline-flex h-6 w-11 items-center">
              <input {...register("inventory.allowBackorder")} id="backorder-checkbox" type="checkbox" className="peer sr-only" />
              <span className="absolute inset-0 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary" />
              <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5 shadow-sm" />
           </div>
        </div>
      </section>
    </div>
  );
}
