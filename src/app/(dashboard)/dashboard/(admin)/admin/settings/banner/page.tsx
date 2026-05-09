"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { privateAxios } from "@/lib/axios";
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Upload, X, Save, Image as ImageIcon, Layers } from 'lucide-react';

type BannerFormData = {
  badge: string;
  titleFirst: string;
  titleHighlight: string;
  titleLast: string;
  descHeader: string;
  descBody: string;
  image: string;
};

export default function BannerSettingsPage() {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<BannerFormData>();
  const formValues = watch();
  const currentImage = formValues.image;

  // React Query দিয়ে ডেটা ফেচ করা
  const { data: queryData, isLoading: isFetching } = useQuery({
    queryKey: ['adminSliders'],
    queryFn: async () => {
      const res = await privateAxios.get('/sliders');
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // ৫ মিনিট ক্যাশ থাকবে
  });

  const slidersData = queryData?.data || [];

  // যখন ট্যাব পরিবর্তন হবে বা ডেটা ফেচ হবে, তখন ফর্মটি রিসেট করা
  useEffect(() => {
    // বর্তমান স্লাইডের ডেটা ফিল্টার করা
    const currentSlideData = slidersData.find((s: any) => s.slideNumber === activeSlide);
    
    if (currentSlideData) {
      reset({
        badge: currentSlideData.badge || "",
        titleFirst: currentSlideData.title?.first || "",
        titleHighlight: currentSlideData.title?.highlight || "",
        titleLast: currentSlideData.title?.last || "",
        descHeader: currentSlideData.descHeader || "",
        descBody: currentSlideData.descBody || "",
        image: currentSlideData.image || ""
      });
    } else {
      // ডেটা না থাকলে ফর্ম খালি করে দেওয়া
      reset({
        badge: "",
        titleFirst: "",
        titleHighlight: "",
        titleLast: "",
        descHeader: "",
        descBody: "",
        image: ""
      });
    }
  }, [activeSlide, slidersData, reset]);

  const onSubmit = async (data: BannerFormData) => {
    setIsLoading(true);
    try {
      // Data Formatting Logic
      const formattedBadge = data.badge ? data.badge.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : "";
      const formattedDescHeader = data.descHeader ? data.descHeader.trim().charAt(0).toUpperCase() + data.descHeader.trim().slice(1) : "";

      const payload = {
        badge: formattedBadge,
        title: {
          first: data.titleFirst?.trim().toUpperCase(),
          highlight: data.titleHighlight?.trim().toUpperCase(),
          last: data.titleLast?.trim().toUpperCase()
        },
        descHeader: formattedDescHeader,
        descBody: data.descBody?.trim(),
        image: data.image?.trim()
      };

      // API তে slideNumber প্যারামিটার হিসেবে পাঠানো হচ্ছে (req.params)
      const res = await privateAxios.put(`/sliders/${activeSlide}`, payload);
      
      if (res.data) {
        toast.success(`Slide ${activeSlide} updated successfully!`);
        // ডেটা আপডেট হওয়ার পর ক্যাশ ইনভ্যালিডেট করে নতুন ডেটা লোড করা
        queryClient.invalidateQueries({ queryKey: ['adminSliders'] });
      }
    } catch (error: unknown) {
      let message = `Failed to update Slide ${activeSlide}.`;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 md:mb-8 border-b border-gray-100 pb-4 md:pb-5 flex items-start md:items-center gap-3 md:gap-4">
        <div className="p-2 md:p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
          <Layers className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Slider Settings</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Manage all 3 slides of your homepage banner from here.</p>
        </div>
      </div>

      {/* Tabs for Slides */}
      <div className="flex gap-2 mb-6 md:mb-8 bg-gray-50/50 p-1.5 rounded-xl md:rounded-2xl w-full md:w-fit overflow-x-auto border border-gray-100 custom-scrollbar">
        {[1, 2, 3].map((slideNum) => (
          <button
            key={slideNum}
            onClick={() => setActiveSlide(slideNum)}
            className={`relative cursor-pointer px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-2xl font-bold transition-all duration-300 flex-shrink-0 whitespace-nowrap flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base group z-10 ${
              activeSlide === slideNum
                ? 'text-white shadow-lg shadow-orange-200/50'
                : 'text-gray-500 hover:text-primary hover:bg-orange-50'
            }`}
          >
            {activeSlide === slideNum && (
              <motion.div 
                layoutId="slide-tab-active-pill"
                className="absolute inset-0 bg-primary rounded-lg md:rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <ImageIcon className={`w-4 h-4 md:w-[18px] md:h-[18px] ${activeSlide === slideNum ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} strokeWidth={activeSlide === slideNum ? 2.5 : 2} />
            Slide {slideNum}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 p-4 md:p-6 shadow-sm">
        <div className="mb-5 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Editing Slide {activeSlide}</h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100/50">
            Active Tab: {activeSlide}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6 max-w-3xl">
          <div className="grid grid-cols-1 gap-5 md:gap-6">
            {/* Badge Field */}
            <div className="col-span-1">
              <div className="flex justify-between items-center mb-1.5 md:mb-2">
                <label className="block text-xs md:text-sm font-medium text-gray-700">Badge Text</label>
                <span className={`text-[10px] md:text-xs font-medium ${(formValues.badge?.length || 0) > 25 ? 'text-red-500' : 'text-gray-400'}`}>{formValues.badge?.length || 0}/25</span>
              </div>
              <input
                type="text"
                {...register("badge", { maxLength: { value: 25, message: "Max 25 chars allowed" } })}
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border ${errors.badge ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all`}
                placeholder="e.g. New Collection"
              />
              {errors.badge && <span className="text-red-500 text-xs mt-1 block">{errors.badge.message}</span>}
            </div>

            {/* Title Fields (3 Parts) */}
            <div className="col-span-1">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Slide Title Parts <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] md:text-xs text-gray-500">First Part</span>
                    <span className={`text-[10px] md:text-xs font-medium ${(formValues.titleFirst?.length || 0) > 12 ? 'text-red-500' : 'text-gray-400'}`}>{formValues.titleFirst?.length || 0}/12</span>
                  </div>
                  <input
                    type="text"
                    {...register("titleFirst", { required: "Required", maxLength: { value: 12, message: "Max 12 chars" } })}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border ${errors.titleFirst ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all`}
                    placeholder="e.g. CRAFTING THE"
                  />
                  {errors.titleFirst && <span className="text-red-500 text-xs mt-1 block">{errors.titleFirst.message}</span>}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] md:text-xs text-indigo-600 font-medium">Highlight</span>
                    <span className={`text-[10px] md:text-xs font-medium ${(formValues.titleHighlight?.length || 0) > 10 ? 'text-red-500' : 'text-indigo-400'}`}>{formValues.titleHighlight?.length || 0}/10</span>
                  </div>
                  <input
                    type="text"
                    {...register("titleHighlight", { required: "Required", maxLength: { value: 10, message: "Max 10 chars" } })}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border ${errors.titleHighlight ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-indigo-200 bg-indigo-50/30 focus:ring-indigo-500/20 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all`}
                    placeholder="e.g. FUTURE"
                  />
                  {errors.titleHighlight && <span className="text-red-500 text-xs mt-1 block">{errors.titleHighlight.message}</span>}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] md:text-xs text-gray-500">Last Part</span>
                    <span className={`text-[10px] md:text-xs font-medium ${(formValues.titleLast?.length || 0) > 12 ? 'text-red-500' : 'text-gray-400'}`}>{formValues.titleLast?.length || 0}/12</span>
                  </div>
                  <input
                    type="text"
                    {...register("titleLast", { required: "Required", maxLength: { value: 12, message: "Max 12 chars" } })}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border ${errors.titleLast ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all`}
                    placeholder="e.g. OF VISION"
                  />
                  {errors.titleLast && <span className="text-red-500 text-xs mt-1 block">{errors.titleLast.message}</span>}
                </div>
              </div>
            </div>

            {/* Description Header */}
            <div className="col-span-1">
              <div className="flex justify-between items-center mb-1.5 md:mb-2">
                <label className="block text-xs md:text-sm font-medium text-gray-700">Description Header <span className="text-red-500">*</span></label>
                <span className={`text-[10px] md:text-xs font-medium ${(formValues.descHeader?.length || 0) > 25 ? 'text-red-500' : 'text-gray-400'}`}>{formValues.descHeader?.length || 0}/25</span>
              </div>
              <input
                type="text"
                {...register("descHeader", { required: "Description header is required", maxLength: { value: 25, message: "Max 25 chars allowed" } })}
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border ${errors.descHeader ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all`}
                placeholder="e.g. Elevate Your Perspective."
              />
              {errors.descHeader && <span className="text-red-500 text-xs mt-1 block">{errors.descHeader.message}</span>}
            </div>

            {/* Description Body */}
            <div className="col-span-1">
              <div className="flex justify-between items-center mb-1.5 md:mb-2">
                <label className="block text-xs md:text-sm font-medium text-gray-700">Description Body <span className="text-red-500">*</span></label>
                <span className={`text-[10px] md:text-xs font-medium ${(formValues.descBody?.length || 0) > 150 ? 'text-red-500' : 'text-gray-400'}`}>{formValues.descBody?.length || 0}/150</span>
              </div>
              <textarea
                {...register("descBody", { required: "Description body is required", maxLength: { value: 150, message: "Max 150 chars allowed" } })}
                rows={3}
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border ${errors.descBody ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all resize-none`}
                placeholder="Write the detailed description..."
              />
              {errors.descBody && <span className="text-red-500 text-xs mt-1 block">{errors.descBody.message}</span>}
            </div>

            {/* Image URL Field */}
            <div className="col-span-1">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Image URL <span className="text-red-500">*</span></label>
              
              <div className="flex flex-col gap-4">
                <input
                  type="url"
                  {...register("image", { required: "Image URL is required" })}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none focus:ring-4 transition-all"
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                />
                {errors.image && <span className="text-red-500 text-xs mt-1 block">{errors.image.message}</span>}

                {/* Live Image Preview */}
                {currentImage && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-500 mb-2">Image Preview:</p>
                    <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 shadow-sm group bg-gray-50">
                      <img 
                        src={currentImage} 
                        alt={`Preview Slide ${activeSlide}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/1920x1080/e2e8f0/64748b?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-5 md:pt-6 mt-5 md:mt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto cursor-pointer px-6 md:px-8 py-2.5 md:py-3 bg-indigo-600 text-white font-medium rounded-lg md:rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 text-sm md:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 md:w-5 md:h-5" />
                  Save Slide {activeSlide}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
