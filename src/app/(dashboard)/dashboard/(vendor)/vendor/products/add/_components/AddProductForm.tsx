"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { privateAxios } from "@/lib/axios";
import toast from "react-hot-toast";
import { CheckCircle2, Save, PackagePlus } from "lucide-react";
import { ProductFormValues } from "@/types/product";

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
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      inventory: { lowStockThreshold: 5, allowBackorder: false },
      shipping: { weight: 0, dimensions: { length: 0, width: 0, height: 0 } },
      category: "",
      isFeatured: false,
      isFlashSale: false,
      tags: "",
      images: [{ url: "" }],
      specifications: [{ key: "", value: "" }],
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    // Client-side validations before submit
    // 1) sale dates
    if (data.saleStartDate && data.saleEndDate) {
      const start = new Date(data.saleStartDate);
      const end = new Date(data.saleEndDate);
      if (end <= start) {
        // require end > start (minimum 1 day difference)
        setError("saleEndDate", {
          type: "manual",
          message:
            "Sale end date must be after the start date (minimum 1 day).",
        });
        return;
      }
    }

    // 2) flash sale discount limit
    if (data.isFlashSale) {
      const base = Number(data.basePrice || 0);
      const sale = Number(data.salePrice || 0);
      if (!sale || base <= 0) {
        setError("isFlashSale", {
          type: "manual",
          message: "Flash sale requires a valid sale price and base price.",
        });
        return;
      }
      const discount = ((base - sale) / base) * 100;
      if (discount > 35) {
        setError("isFlashSale", {
          type: "manual",
          message: "Flash sale discount cannot exceed 35%.",
        });
        return;
      }
    }

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
          ? data.images
              .map((item) => item.url.trim())
              .filter((url) => url.length > 0)
          : [],
        specifications: data.specifications
          ? data.specifications.reduce<Record<string, string>>((acc, item) => {
              const key = item.key.trim();
              const value = item.value.trim();
              if (key && value) acc[key] = value;
              return acc;
            }, {})
          : {},
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

      const res = await privateAxios.post("/products/add", payload);

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

  // Watch price fields to disable flash sale toggle when discount > 35%
  const basePrice = watch("basePrice");
  const salePrice = watch("salePrice");
  const isFlashSale = watch("isFlashSale");
  const [flashDisabled, setFlashDisabled] = useState(false);

  useEffect(() => {
    const b = Number(basePrice || 0);
    const s = Number(salePrice || 0);
    if (b > 0 && s > 0) {
      const discount = ((b - s) / b) * 100;
      if (discount > 35) {
        setFlashDisabled(true);
        setValue("isFlashSale", false);
      } else {
        setFlashDisabled(false);
      }
    } else {
      setFlashDisabled(false);
    }
  }, [basePrice, salePrice, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto pb-20 px-0"
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
            <CheckCircle2
              className="w-8 h-8 text-primary animate-pulse"
              strokeWidth={2}
            />
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
            className="group inline-flex w-full md:w-auto justify-center items-center gap-2 px-5 py-3 bg-primary text-white rounded-3xl font-black shadow-lg shadow-primary/20 hover:bg-primary/95 active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            <span className="text-sm">post</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 01 */}
        <div className="bg-white rounded-4xl border-none sm:border sm:border-gray-200 px-0 py-0 sm:px-4 sm:py-8 lg:p-10 shadow-none sm:shadow-sm lg:shadow-md space-y-8">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2 px-0 sm:px-4 lg:px-0">
            01. General Information
          </h4>
          <div className="space-y-8 px-0 sm:px-4 lg:px-0">
            <GeneralSection
              register={register}
              errors={errors}
              setValue={setValue}
              disabledFlash={flashDisabled}
            />
          </div>
        </div>

        {/* Section 02 */}
        <div className="bg-white rounded-4xl border-none sm:border sm:border-gray-200 px-0 py-0 sm:px-4 sm:py-8 lg:p-10 shadow-none sm:shadow-sm lg:shadow-md space-y-8">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2 px-0 sm:px-4 lg:px-0">
            02. Pricing & Inventory
          </h4>
          <div className="space-y-8 px-0 sm:px-4 lg:px-0">
            <InventorySection
              register={register}
              errors={errors}
              setValue={setValue}
              isFlashSale={isFlashSale}
            />
          </div>
        </div>

        {/* Section 03 */}
        <div className="bg-white rounded-4xl border-none sm:border sm:border-gray-200 px-0 py-0 sm:px-4 sm:py-8 lg:p-10 shadow-none sm:shadow-sm lg:shadow-md space-y-8">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2 px-0 sm:px-4 lg:px-0">
            03. Media & Gallery
          </h4>
          <div className="space-y-8 px-0 sm:px-4 lg:px-0">
            <MediaSection
              register={register}
              errors={errors}
              control={control}
            />
          </div>
        </div>

        {/* Section 04 */}
        <div className="bg-white rounded-4xl border-none sm:border sm:border-gray-200 px-0 py-0 sm:px-4 sm:py-8 lg:p-10 shadow-none sm:shadow-sm lg:shadow-md space-y-8">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2 px-0 sm:px-4 lg:px-0">
            04. Shipping & SEO
          </h4>
          <div className="space-y-8 px-0 sm:px-4 lg:px-0">
            <ShippingSEOSection register={register} />
          </div>
        </div>
      </div>
    </form>
  );
}
