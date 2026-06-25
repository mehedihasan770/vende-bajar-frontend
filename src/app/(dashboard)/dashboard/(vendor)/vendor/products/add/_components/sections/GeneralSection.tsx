import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductFormData } from "@/types/product";

interface GeneralSectionProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export default function GeneralSection({
  register,
  errors,
}: GeneralSectionProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Name */}
        <div className="col-span-2 min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Product Name <span className="text-red-500">*</span>
          </label>
          <p className="text-[11px] text-gray-400 mb-3 truncate">
            Give your product an attractive and descriptive name
          </p>
          <input
            {...register("name", { required: "Product name is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-2xl border ${errors.name ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Category & SubCategory */}
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Category <span className="text-red-500">*</span>
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Select the primary category for this product
          </p>
          <input
            {...register("category", { required: "Category is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-2xl border ${errors.category ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
            placeholder="e.g. 64b1f8e9..."
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Sub-Category (Optional)
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Specify a sub-category if applicable
          </p>
          <input
            {...register("subCategory")}
            type="text"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            placeholder="e.g. Wireless"
          />
        </div>

        {/* Brand & Tags */}
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Brand <span className="text-red-500">*</span>
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            The manufacturer or brand name
          </p>
          <input
            {...register("brand", { required: "Brand is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-2xl border ${errors.brand ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
            placeholder="e.g. Sony"
          />
          {errors.brand && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.brand.message}
            </p>
          )}
        </div>
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Tags (Optional)
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Enter keywords separated by commas for better search
          </p>
          <input
            {...register("tags")}
            type="text"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            placeholder="tech, gadgets, new"
          />
        </div>
      </div>

      {/* Short Description */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
          Short Description (Optional)
        </label>
        <p className="text-[11px] text-gray-400 mb-2 truncate">
          A brief 1-2 line summary of the product
        </p>
        <textarea
          {...register("shortDescription")}
          rows={2}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all resize-none"
          placeholder="Brief summary of the product..."
        />
      </div>

      {/* Full Description */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
          Full Description <span className="text-red-500">*</span>
        </label>
        <p className="text-[11px] text-gray-400 mb-2 truncate">
          Provide detailed information about the product
        </p>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={5}
          className={`w-full px-4 py-3 rounded-2xl border ${errors.description ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all resize-none`}
          placeholder="Detailed product features, specs, and info..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1 font-medium">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
}
