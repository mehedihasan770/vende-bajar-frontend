'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { privateAxios } from '@/lib/axios';
import toast from 'react-hot-toast';
import { Save, Info, Tag, Image as ImageIcon, Truck } from 'lucide-react';

import BasicInfoSection from './sections/BasicInfoSection';
import PricingInventorySection from './sections/PricingInventorySection';
import MediaSection from './sections/MediaSection';

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inventory: { lowStockThreshold: 5, allowBackorder: false },
      shipping: { weight: 0 },
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Basic formatting
      const payload = {
        ...data,
        basePrice: Number(data.basePrice),
        salePrice: data.salePrice ? Number(data.salePrice) : undefined,
        stock: Number(data.stock),
      };

      const res = await privateAxios.post('/products', payload);

      if (res.status === 201 || res.status === 200) {
        toast.success('Product created successfully!');
        router.push('/dashboard/vendor/products');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* 1. Basic Information */}
      <section className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Info size={20} />
          </div>
          <h3 className="text-lg font-black text-gray-900 tracking-tight">Basic Information</h3>
        </div>
        <BasicInfoSection register={register} errors={errors} />
      </section>

      {/* 2. Pricing & Inventory */}
      <section className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Tag size={20} />
          </div>
          <h3 className="text-lg font-black text-gray-900 tracking-tight">Pricing & Inventory</h3>
        </div>
        <PricingInventorySection register={register} errors={errors} />
      </section>

      {/* 3. Media */}
      <section className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
            <ImageIcon size={20} />
          </div>
          <h3 className="text-lg font-black text-gray-900 tracking-tight">Product Media</h3>
        </div>
        <MediaSection register={register} errors={errors} control={control} />
      </section>

      {/* Submit Button */}
      <div className="flex justify-end sticky bottom-6 z-50">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={20} />
          )}
          <span>Create Product Listing</span>
        </button>
      </div>
    </form>
  );
}
