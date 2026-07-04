import React from "react";
import { UseFormRegister, FieldErrors, Control, useFieldArray } from "react-hook-form";
import { ProductFormValues } from "@/types/product";
import { Layers, Plus, Trash2 } from "lucide-react";

interface VariantSectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  control: Control<ProductFormValues>;
}

export default function VariantSection({
  register,
  errors,
  control,
}: VariantSectionProps) {
  const { fields, append, remove } = useFieldArray<ProductFormValues, "variants">({
    control,
    name: "variants",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <Layers className="text-primary" size={20} />
          <h5 className="text-sm font-black text-gray-800 uppercase tracking-widest">Product Variants</h5>
        </div>
        <button
          type="button"
          onClick={() => append({
            sku: "",
            attributes: { color: "", size: "" },
            stock: 0,
            priceOverride: 0,
            images: [],
            isDefault: false
          })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-xl text-xs font-bold hover:bg-secondary/20 transition-colors"
        >
          <Plus size={14} /> Add Variant
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-sm font-medium">No variants added yet. (e.g. Color, Size)</p>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-end relative group">
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-red-50"
              >
                <Trash2 size={14} />
              </button>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Color</label>
                <input {...register(`variants.${index}.attributes.color` as const)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="e.g. Red" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Size</label>
                <input {...register(`variants.${index}.attributes.size` as const)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="e.g. XL" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Stock</label>
                <input {...register(`variants.${index}.stock` as const)} type="number" className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="0" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Price Override</label>
                <input {...register(`variants.${index}.priceOverride` as const)} type="number" step="0.01" className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">SKU</label>
                <input {...register(`variants.${index}.sku` as const)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" placeholder="V-SKU-1" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
