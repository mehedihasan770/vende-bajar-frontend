import React from "react";
import { Star, StarHalf } from "lucide-react";

interface PlayStoreRatingProps {
  rating: number;
  totalReviews: number;
}

const ProductRating = ({ rating, totalReviews }: PlayStoreRatingProps) => {
  
  const calculateAverage = () => {
    if (!totalReviews || totalReviews === 0) return 0;
    
    const avg = rating / totalReviews;
    
    return Math.min(Math.max(avg, 0), 5);
  };

  const averageRating = calculateAverage();

  const renderStars = (avg: number) => {
    return [...Array(5)].map((_, i) => {
      const starNumber = i + 1;
      const starColor = "text-[#FFB400] fill-[#FFB400]";

      if (avg >= starNumber) {
        return <Star key={i} size={14} className={starColor} />;
      } else if (avg >= starNumber - 0.5) {
        return <StarHalf key={i} size={14} className={starColor} />;
      } else {
        return <Star key={i} size={14} className="text-gray-300" />;
      }
    });
  };

  const formatCount = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  return (
    <div className="flex items-center gap-1.5 font-sans select-none">
      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
        {totalReviews === 0 ? "0.0" : averageRating.toFixed(1)}
      </span>

      <div className="flex items-center gap-0.5">
        {renderStars(averageRating)}
      </div>

      {totalReviews > 0 && (
        <span className="text-[11px] font-medium text-gray-500 ml-0.5">
          ({formatCount(totalReviews)})
        </span>
      )}
    </div>
  );
};

export default ProductRating;