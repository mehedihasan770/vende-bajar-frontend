import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 flex flex-col h-full animate-pulse overflow-hidden shadow-sm">
      {/* Image Container Skeleton */}
      <div className="relative aspect-square w-full bg-gray-200/60" />

      {/* Content Section Skeleton */}
      <div className="p-3 sm:p-4 flex flex-col grow">
        <div className="h-2 w-16 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded mb-1.5" />
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-4" />

        <div className="flex items-center gap-2 mt-auto mb-3">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-12 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="px-3 pb-3">
        <div className="w-full h-9 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
