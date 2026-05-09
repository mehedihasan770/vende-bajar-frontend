"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Upload, X, Save, Image as ImageIcon, Layers } from 'lucide-react';

type BannerFormData = {
  title: string;
  description: string;
};

export default function BannerSettingsPage() {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for images of each slide
  const [slideImages, setSlideImages] = useState<{
    [key: number]: { preview: string | null; file: File | null }
  }>({
    1: { preview: null, file: null },
    2: { preview: null, file: null },
    3: { preview: null, file: null }
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<BannerFormData>();

  // যখন ট্যাব পরিবর্তন হবে, তখন ফর্মটি রিসেট করতে পারেন বা পূর্বের ডেটা লোড করতে পারেন
  // (বর্তমানে API থেকে ডেটা আনার কোড নেই, তাই শুধু ইমেজ স্টেট দেখানো হলো)
  useEffect(() => {
    // এখানে আপনি API থেকে নির্দিষ্ট স্লাইডের (activeSlide) ডেটা ফেচ করে ফর্মে সেট করতে পারেন
    // setValue('title', fetch করা টাইটেল)
    reset({ title: '', description: '' }); 
  }, [activeSlide, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlideImages(prev => ({
          ...prev,
          [activeSlide]: { preview: reader.result as string, file: file }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSlideImages(prev => ({
      ...prev,
      [activeSlide]: { preview: null, file: null }
    }));
  };

  const onSubmit = async (data: BannerFormData) => {
    const currentSlideImage = slideImages[activeSlide].file;
    
    if (!currentSlideImage && !slideImages[activeSlide].preview) {
      toast.error("Please select an image for Slide " + activeSlide);
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('slideNumber', activeSlide.toString()); // API কে বোঝানোর জন্য যে এটি কোন স্লাইড
      formData.append('title', data.title);
      formData.append('description', data.description);
      
      if (currentSlideImage) {
        formData.append('image', currentSlideImage);
      }

      // আপনার API এর আসল এন্ডপয়েন্টটি এখানে বসাতে হবে। 
      // const response = await axios.post('https://your-api-domain.com/api/v1/banner/update', formData);
      
      // সিমুলেশন
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(`Slide ${activeSlide} updated successfully!`);
    } catch (error) {
      toast.error(`Failed to update Slide ${activeSlide}.`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPreview = slideImages[activeSlide].preview;

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
            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-all duration-300 flex-shrink-0 flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base flex-1 md:flex-none ${
              activeSlide === slideNum
                ? 'bg-white text-indigo-600 shadow-sm border border-gray-200/50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            <ImageIcon className={`w-4 h-4 md:w-[18px] md:h-[18px] ${activeSlide === slideNum ? 'text-indigo-500' : 'text-gray-400'}`} />
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
            {/* Title Field */}
            <div className="col-span-1">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Slide {activeSlide} Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border ${errors.title ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all`}
                placeholder={`e.g. Special Offer on Slide ${activeSlide}`}
              />
              {errors.title && <span className="text-red-500 text-xs mt-1.5 block">{errors.title.message}</span>}
            </div>

            {/* Description Field */}
            <div className="col-span-1">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Slide {activeSlide} Description <span className="text-red-500">*</span></label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows={4}
                className={`w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border ${errors.description ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500'} focus:outline-none focus:ring-4 transition-all resize-none`}
                placeholder="Write a short description..."
              />
              {errors.description && <span className="text-red-500 text-xs mt-1.5 block">{errors.description.message}</span>}
            </div>

            {/* Image Upload Field */}
            <div className="col-span-1">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Slide {activeSlide} Image <span className="text-red-500">*</span></label>
              
              {!currentPreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 md:h-56 border-2 border-dashed border-gray-300 rounded-xl md:rounded-2xl cursor-pointer bg-gray-50/50 hover:bg-indigo-50/50 hover:border-indigo-400 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <div className="p-3 md:p-4 bg-white rounded-full shadow-sm mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
                    </div>
                    <p className="mb-1 md:mb-2 text-xs md:text-sm text-gray-600"><span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop</p>
                    <p className="text-[10px] md:text-xs text-gray-400">Recommended: 1920x1080px (PNG, JPG, WEBP)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              ) : (
                <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 group shadow-sm">
                  <img src={currentPreview} alt={`Preview Slide ${activeSlide}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center gap-1.5 md:gap-2 bg-red-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl hover:bg-red-600 transition-colors shadow-lg transform hover:scale-105 text-sm md:text-base"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Remove Image</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-5 md:pt-6 mt-5 md:mt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-indigo-600 text-white font-medium rounded-lg md:rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 text-sm md:text-base"
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
