"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { privateAxios } from "@/lib/axios";

import BannerHeader from './components/BannerHeader';
import BannerTabs from './components/BannerTabs';
import BannerForm from './components/BannerForm';

export default function BannerSettingsPage() {
  const [activeSlide, setActiveSlide] = useState<number>(1);

  // React Query Ã Â¦Â¦Ã Â¦Â¿Ã Â§Å¸Ã Â§â€¡ Ã Â¦Â¡Ã Â§â€¡Ã Â¦Å¸Ã Â¦Â¾ Ã Â¦Â«Ã Â§â€¡Ã Â¦Å¡ Ã Â¦â€¢Ã Â¦Â°Ã Â¦Â¾
  const { data: queryData, isLoading: isFetching } = useQuery({
    queryKey: ['adminSliders'],
    queryFn: async () => {
      const res = await privateAxios.get('/sliders');
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // Ã Â§Â« Ã Â¦Â®Ã Â¦Â¿Ã Â¦Â¨Ã Â¦Â¿Ã Â¦Å¸ Ã Â¦â€¢Ã Â§ÂÃ Â¦Â¯Ã Â¦Â¾Ã Â¦Â¶ Ã Â¦Â¥Ã Â¦Â¾Ã Â¦â€¢Ã Â¦Â¬Ã Â§â€¡
  });

  const slidersData = queryData?.data || [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <BannerHeader />
      
      <BannerTabs activeSlide={activeSlide} setActiveSlide={setActiveSlide} />

      <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 p-4 md:p-6 shadow-sm">
        <div className="mb-5 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Editing Slide {activeSlide}</h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100/50">
            Active Tab: {activeSlide}
          </span>
        </div>

        {/* Ã Â¦Â«Ã Â¦Â°Ã Â§ÂÃ Â¦Â® Ã Â¦â€¦Ã Â¦â€šÃ Â¦Â¶ */}
        <BannerForm activeSlide={activeSlide} slidersData={slidersData} />
      </div>
    </div>
  );
}

