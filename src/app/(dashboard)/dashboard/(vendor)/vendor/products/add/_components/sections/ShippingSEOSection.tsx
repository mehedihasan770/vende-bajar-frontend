import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface ShippingSEOSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function ShippingSEOSection({ register, errors }: ShippingSEOSectionProps) {
  return (
    <div className="space-y-10">
      {/* Shipping Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-4 bg-primary rounded-full"></div>
          <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Shipping & Logistics</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Weight (KG)</label>
            <p className="text-[11px] text-gray-400 mb-2">প্রোডাক্টের ওজন (শিপিং চার্জ হিসাবের জন্য)</p>
            <input
              {...register('shipping.weight')}
              type="number"
              step="0.01"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3">
              <label className="block text-sm font-bold text-gray-700 mb-1">Dimensions (CM)</label>
              <p className="text-[11px] text-gray-400 mb-2">দৈর্ঘ্য x প্রস্থ x উচ্চতা</p>
            </div>
            <input {...register('shipping.dimensions.length')} type="number" placeholder="L" className="px-3 py-3 rounded-xl border border-gray-200" />
            <input {...register('shipping.dimensions.width')} type="number" placeholder="W" className="px-3 py-3 rounded-xl border border-gray-200" />
            <input {...register('shipping.dimensions.height')} type="number" placeholder="H" className="px-3 py-3 rounded-xl border border-gray-200" />
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <section className="border-t border-gray-100 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-4 bg-primary rounded-full"></div>
          <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">SEO (Search Engine Optimization)</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Meta Title (Optional)</label>
            <p className="text-[11px] text-gray-400 mb-2">গুগল সার্চে যে টাইটেলটি দেখাবে</p>
            <input
              {...register('metaTitle')}
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all"
              placeholder="SEO friendly title"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Meta Description (Optional)</label>
            <p className="text-[11px] text-gray-400 mb-2">প্রোডাক্টের সম্পর্কে ছোট এসইও বর্ণনা</p>
            <textarea
              {...register('metaDescription')}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all resize-none"
              placeholder="SEO meta description..."
            />
          </div>
        </div>
      </section>

      {/* Marketing Flags */}
      <section className="border-t border-gray-100 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <input {...register('isFeatured')} type="checkbox" id="featured" className="w-5 h-5 accent-orange-500" />
            <div>
              <label htmlFor="featured" className="text-sm font-bold text-gray-800 block">Featured Product</label>
              <p className="text-[10px] text-orange-600">হোমপেজে স্পেশাল লিস্টে দেখাবে</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
            <input {...register('isFlashSale')} type="checkbox" id="flashsale" className="w-5 h-5 accent-red-500" />
            <div>
              <label htmlFor="flashsale" className="text-sm font-bold text-gray-800 block">Flash Sale</label>
              <p className="text-[10px] text-red-600">লিমিটেড টাইম সেলে যুক্ত করুন</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
