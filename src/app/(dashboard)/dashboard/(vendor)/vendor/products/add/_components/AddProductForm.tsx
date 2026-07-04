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
import VariantSection from "./sections/VariantSection";

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
    clearErrors,
    formState: { errors },
  } = useForm<ProductFormValues>({
    mode: "onChange",
    defaultValues: {
      pricing: {
        basePrice: 0,
        saleType: "regular",
        regularPrice: undefined,
        costPrice: undefined,
      },
      inventory: {
        stock: 0,
        lowStockThreshold: 5,
        allowBackorder: false
      },
      shippingClass: "standard",
      directPayment: false,
      category: "",
      isFeatured: false,
      isFlashSale: false,
      tags: "",
      images: [{ url: "" }],
      specifications: [{ key: "", value: "" }],
      variants: [],
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    // 1. Validation Logic
    if (data.pricing.saleType === "flash") {
      const start = data.pricing.saleStartDate ? new Date(data.pricing.saleStartDate) : null;
      const end = data.pricing.saleEndDate ? new Date(data.pricing.saleEndDate) : null;

      if (!start || isNaN(start.getTime()) || !end || isNaN(end.getTime()) || end <= start) {
        setError("pricing.saleEndDate", {
          type: "manual",
          message: "Flash sale requires valid dates, and end date must be after start date.",
        });
        return;
      }

      const base = Number(data.pricing.basePrice || 0);
      const sale = Number(data.pricing.salePrice || 0);
      if (base <= 0) {
        setError("pricing.basePrice", { type: "manual", message: "Base price required" });
        return;
      }
      const discount = ((base - sale) / base) * 100;

      if (discount < 15 || discount > 75) {
        setError("pricing.salePrice", {
          type: "manual",
          message: `Flash discount (${Math.round(discount)}%) must be 15-75%.`,
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      // Data Processing for Backend Schema
      const payload = {
        ...data,
        subCategory: data.subCategory || undefined,
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        images: data.images.map((img) => img.url).filter((url) => url !== ""),
        specifications: data.specifications.reduce((acc, spec) => {
          if (spec.key && spec.value) acc[spec.key] = spec.value;
          return acc;
        }, {} as Record<string, string>),
        pricing: {
          ...data.pricing,
          basePrice: Number(data.pricing.basePrice),
          salePrice: data.pricing.salePrice ? Number(data.pricing.salePrice) : undefined,
          regularPrice: data.pricing.regularPrice ? Number(data.pricing.regularPrice) : undefined,
          costPrice: data.pricing.costPrice ? Number(data.pricing.costPrice) : undefined,
        },
        inventory: {
          ...data.inventory,
          stock: Number(data.inventory.stock),
          lowStockThreshold: Number(data.inventory.lowStockThreshold),
        },
        variants: data.variants.map(v => ({
          ...v,
          stock: Number(v.stock),
          priceOverride: Number(v.priceOverride),
          images: [] // Currently keeping empty or map if added
        })),
        status: "pending"
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

  const basePrice = watch("pricing.basePrice");
  const salePrice = watch("pricing.salePrice");
  const saleType = watch("pricing.saleType");
  const isFlashSale = watch("isFlashSale");
  const [flashDisabled, setFlashDisabled] = useState(false);

  useEffect(() => {
    const b = Number(basePrice || 0);
    const s = Number(salePrice || 0);
    if (saleType === "flash" && b > 0 && s > 0) {
      const discount = ((b - s) / b) * 100;
      if (discount < 15 || discount > 75) {
        setFlashDisabled(true);
        setError("pricing.salePrice", {
          type: "manual",
          message: `Flash discount (${Math.round(discount)}%) must be 15-75%.`,
        });
      } else {
        setFlashDisabled(false);
        clearErrors("pricing.salePrice");
      }
    } else {
      setFlashDisabled(false);
      clearErrors("pricing.salePrice");
    }
  }, [basePrice, salePrice, saleType, setError, clearErrors]);

  useEffect(() => {
    if (saleType === "flash" && !isFlashSale) setValue("isFlashSale", true);
    if (saleType !== "flash" && isFlashSale) setValue("isFlashSale", false);

    if (saleType !== "flash") {
      clearErrors(["pricing.saleStartDate", "pricing.saleEndDate", "pricing.salePrice"]);
    }
  }, [saleType, isFlashSale, setValue, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto pb-20 px-0">
      <div className="flex flex-col gap-5 mb-10 pb-6 border-b border-gray-200 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-primary" />
            Add New Product
          </h2>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center items-center gap-2 px-8 py-3 bg-primary text-white rounded-3xl font-black shadow-lg hover:bg-primary/95 transition-all disabled:opacity-70"
        >
          {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
          <span>Post Product</span>
        </button>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-4xl sm:border border-gray-200 p-6 lg:p-10 space-y-8 shadow-sm">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">01. General Information</h4>
          <GeneralSection register={register} errors={errors} setValue={setValue} />
        </div>

        <div className="bg-white rounded-4xl sm:border border-gray-200 p-6 lg:p-10 space-y-8 shadow-sm">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">02. Pricing & Inventory</h4>
          <InventorySection register={register} errors={errors} setValue={setValue} saleType={saleType} watch={watch} />
        </div>

        {/* Section 2.5: Variants */}
        <div className="bg-white rounded-4xl sm:border border-gray-200 p-6 lg:p-10 space-y-8 shadow-sm">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">02.5. Product Variants (Color/Size)</h4>
          <VariantSection register={register} errors={errors} control={control} />
        </div>

        <div className="bg-white rounded-4xl sm:border border-gray-200 p-6 lg:p-10 space-y-8 shadow-sm">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">03. Media & Gallery</h4>
          <MediaSection register={register} errors={errors} control={control} />
        </div>

        <div className="bg-white rounded-4xl sm:border border-gray-200 p-6 lg:p-10 space-y-8 shadow-sm">
          <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-primary/10 pb-2">04. Shipping & SEO</h4>
          <ShippingSEOSection register={register} setValue={setValue} watch={watch} />
        </div>
      </div>
    </form>
  );
}
