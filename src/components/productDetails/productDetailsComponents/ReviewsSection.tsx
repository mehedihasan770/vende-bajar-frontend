// components/product/ReviewsSection.tsx
import Link from 'next/link';
import { HiOutlineUser, HiOutlineThumbUp, HiOutlineFlag, HiOutlineChevronRight, HiOutlineStar } from 'react-icons/hi';

// এই কম্পোনেন্টের নিজস্ব টাইপ
interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

interface ReviewsSectionProps {
  productId: string;
  reviews: Review[];
  totalReviews: number;
}

export const ReviewsSection = ({ productId, reviews, totalReviews }: ReviewsSectionProps) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <HiOutlineStar
        key={i}
        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="mt-8 sm:mt-10 lg:mt-12">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4 sm:mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-accent">
          গ্রাহকদের রিভিউ ({totalReviews})
        </h2>
        <Link 
          href={`/products/${productId}/reviews`}
          className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 text-xs sm:text-sm"
        >
          সব রিভিউ দেখুন
          <HiOutlineChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <HiOutlineUser className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-accent text-sm sm:text-base">{review.user}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3">
              {review.comment}
            </p>
            <div className="flex items-center gap-3 sm:gap-4 pt-2 border-t border-gray-100">
              <button className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 hover:text-primary transition-colors">
                <HiOutlineThumbUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>সহায়ক ({review.helpful})</span>
              </button>
              <button className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 hover:text-primary transition-colors">
                <HiOutlineFlag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>রিপোর্ট</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5 sm:mt-6">
        <Link
          href={`/products/${productId}/reviews`}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2 sm:py-2.5 border-2 border-primary text-primary rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300"
        >
          <span>সব রিভিউ দেখুন</span>
          <HiOutlineChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>
    </div>
  );
};