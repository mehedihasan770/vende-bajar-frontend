import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface BasicInfoSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function BasicInfoSection({
  register,
  errors,
}: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="col-span-2 min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name", { required: "Product name is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-primary/10"} focus:outline-none focus:ring-4 transition-all`}
            placeholder="e.g. Premium Leather Watch"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {(errors.name as any).message}
            </p>
          )}
        </div>

        {/* Category - For now as ID input, ideally a dropdown */}
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            {...register("category", { required: "Category is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-xl border ${errors.category ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-primary/10"} focus:outline-none focus:ring-4 transition-all`}
            placeholder="Category ID"
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {(errors.category as any).message}
            </p>
          )}
        </div>

        {/* Brand */}
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
            Brand <span className="text-red-500">*</span>
          </label>
          <input
            {...register("brand", { required: "Brand is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-xl border ${errors.brand ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-primary/10"} focus:outline-none focus:ring-4 transition-all`}
            placeholder="e.g. Rolex"
          />
          {errors.brand && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {(errors.brand as any).message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-2 truncate">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border ${errors.description ? "border-red-300 focus:ring-red-500/10" : "border-gray-200 focus:ring-primary/10"} focus:outline-none focus:ring-4 transition-all resize-none`}
          placeholder="Describe your product in detail..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1 font-medium">
            {(errors.description as any).message}
          </p>
        )}
      </div>
    </div>
  );
}
