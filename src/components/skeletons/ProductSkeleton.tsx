import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-[24px] p-[3px] flex flex-col relative h-full shadow-sm border border-gray-100">
      <div className="flex flex-col grow relative">
        
        {/* Top Section: Image Container Skeleton */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-[20px] p-[1px]">
          <div className="relative w-full h-full bg-gray-200 animate-pulse rounded-[19px]">
            {/* Category Badge Skeleton */}
            <div className="absolute top-3 left-3">
              <div className="h-5 w-12 bg-gray-300 rounded-full"></div>
            </div>
            {/* Favorite Button Skeleton */}
            <div className="absolute top-3 right-3">
              <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Details Wrapper Skeleton */}
        <div className="mt-[3px] bg-gray-100 rounded-[20px] p-[1px] flex flex-col grow">
          <div className="bg-white rounded-[19px] p-3 sm:p-4 flex flex-col grow">
            
            {/* Badges and Rating Row */}
            <div className="flex items-center justify-between mb-2 min-h-[20px]">
              <div className="h-3 sm:h-4 w-10 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-3 sm:h-4 w-12 bg-gray-200 animate-pulse rounded-full"></div>
            </div>

            {/* Title Skeleton */}
            <div className="mb-3">
              <div className="h-3 sm:h-4 w-full bg-gray-200 animate-pulse rounded mb-1.5"></div>
              <div className="h-3 sm:h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
            </div>

            {/* Price and Button Row */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col gap-1">
                <div className="h-4 sm:h-5 w-16 sm:w-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-2.5 sm:h-3 w-10 sm:w-12 bg-gray-100 animate-pulse rounded"></div>
              </div>
              
              <div className="h-7 sm:h-8 w-16 sm:w-20 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductSkeleton;
