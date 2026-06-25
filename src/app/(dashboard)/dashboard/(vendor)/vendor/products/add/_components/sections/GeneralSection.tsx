import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface GeneralSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function GeneralSection({ register, errors }: GeneralSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
          <p className="text-[11px] text-gray-400 mb-2">প্রোডাক্টের একটি আকর্ষণীয় নাম দিন (যেমন: Sony WH-1000XM5 Wireless Headphones)</p>
          <input
            {...register('name', { required: 'Product name is required' })}
            type="text"
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300 focus:ring-red-500/10' : 'border-gray-200 focus:ring-primary/10'} focus:outline-none focus:ring-4 transition-all`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{(errors.name as any).message}</p>}
        </div>

        {/* Category & SubCategory */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
          <p className="text-[11px] text-gray-400 mb-2">প্রোডাক্টের মেইন ক্যাটাগরি আইডি দিন</p>
          <input
            {...register('category', { required: 'Category is required' })}
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="e.g. 64b1f8e9..."
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Sub-Category (Optional)</label>
          <p className="text-[11px] text-gray-400 mb-2">নির্দিষ্ট সাব-ক্যাটাগরি থাকলে দিন</p>
          <input
            {...register('subCategory')}
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="e.g. Wireless"
          />
        </div>

        {/* Brand & Tags */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Brand <span className="text-red-500">*</span></label>
          <p className="text-[11px] text-gray-400 mb-2">ব্র্যান্ডের নাম (যেমন: Apple, Samsung)</p>
          <input
            {...register('brand', { required: 'Brand is required' })}
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="e.g. Sony"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Tags (Optional)</label>
          <p className="text-[11px] text-gray-400 mb-2">সার্চের জন্য কমা দিয়ে ট্যাগ লিখুন (e.g. tech, music, gear)</p>
          <input
            {...register('tags')}
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
            placeholder="tech, gadgets, new"
          />
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Short Description (Optional)</label>
        <p className="text-[11px] text-gray-400 mb-2">প্রোডাক্টের ২-১ লাইনের ছোট সারসংক্ষেপ</p>
        <textarea
          {...register('shortDescription')}
          rows={2}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all resize-none"
          placeholder="Brief summary of the product..."
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Full Description <span className="text-red-500">*</span></label>
        <p className="text-[11px] text-gray-400 mb-2">প্রোডাক্টের বিস্তারিত তথ্য ও বৈশিষ্ট্য এখানে লিখুন</p>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all resize-none"
          placeholder="Detailed product features, specs, and info..."
        />
      </div>
    </div>
  );
}
