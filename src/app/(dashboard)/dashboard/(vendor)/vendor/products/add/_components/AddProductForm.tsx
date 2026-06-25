"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { privateAxios } from "@/lib/axios";
import toast from "react-hot-toast";
import { Save, PackagePlus } from "lucide-react";
import { ProductFormData } from "@/types/product";

import GeneralSection from "./sections/GeneralSection";
import InventorySection from "./sections/InventorySection";
import MediaSection from "./sections/MediaSection";
import ShippingSEOSection from "./sections/ShippingSEOSection";

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      inventory: { lowStockThreshold: 5, allowBackorder: false },
      shipping: { weight: 0, dimensions: { length: 0, width: 0, height: 0 } },
      isFeatured: false,
      isFlashSale: false,
      tags: "",
      images: "",
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setIsLoading(true);
    try {
      // Data Pre-processing
      const payload = {
        ...data,
        basePrice: Number(data.basePrice),
        salePrice: data.salePrice ? Number(data.salePrice) : undefined,
        costPrice: data.costPrice ? Number(data.costPrice) : undefined,
        stock: Number(data.stock),
        tags: data.tags
          ? data.tags.split(",").map((t: string) => t.trim())
          : [],
        images: data.images
          ? data.images.split(",").map((i: string) => i.trim())
          : [],
        shipping: {
          ...data.shipping,
          weight: Number(data.shipping.weight),
          dimensions: {
            length: Number(data.shipping.dimensions.length),
            width: Number(data.shipping.dimensions.width),
            height: Number(data.shipping.dimensions.height),
          },
        },
      };

      const res = await privateAxios.post("/products", payload);

      if (res.status === 201 || res.status === 200) {
        toast.success("Product created successfully!");
        router.push("/dashboard/vendor/products");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto pb-20 px-4 sm:px-6 lg:px-0"
    >
      {/* Header with Publish Button */}
      <div className="flex flex-col gap-5 mb-10 pb-6 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
              Vendor Module
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex flex-wrap items-center gap-3">
            <PackagePlus className="w-8 h-8 text-primary" strokeWidth={2.5} />
            Add New Product
          </h2>
          <p className="text-[12px] md:text-[13px] text-gray-500 mt-2 font-medium flex flex-wrap items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            Path:{" "}
            <code className="bg-gray-50 text-primary border border-gray-100 px-1.5 py-0.5 rounded font-mono text-[11px]">
              vendor/products/add
            </code>
          </p>
        </div>
        <div className="w-full md:w-auto">
          <button
            type="submit"
            disabled={isLoading}
            className="group inline-flex w-full md:w-auto justify-center items-center gap-3 px-7 py-3.5 bg-primary text-white rounded-3xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            <span className="text-sm">Publish Product Listing</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 01 */}
        <div className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-sm space-y-8">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">
            01. General Information
          </h4>
          <GeneralSection register={register} errors={errors} />
        </div>

        {/* Section 02 */}
        <div className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-sm space-y-8">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">
            02. Pricing & Inventory
          </h4>
          <InventorySection register={register} errors={errors} />
        </div>

        {/* Section 03 */}
        <div className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-sm space-y-8">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">
            03. Media & Gallery
          </h4>
          <MediaSection register={register} errors={errors} control={control} />
        </div>

        {/* Section 04 */}
        <div className="bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 shadow-sm space-y-8">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">
            04. Shipping & SEO
          </h4>
          <ShippingSEOSection register={register} errors={errors} />
        </div>
      </div>
    </form>
  );
}
