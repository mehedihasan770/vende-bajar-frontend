"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingCart } from "lucide-react";

export interface Product {
  _id: string;
  name: string;
  brand?: string;
  shortDescription?: string;
  category: any;
  basePrice: number;
  salePrice?: number;
  finalPrice?: number;
  saleType?: string;
  saleStartDate?: string;
  saleEndDate?: string;
  isSaleActive?: boolean;
  isFlashSale?: boolean;
  thumbnail: string;
  rating: number;
  numReviews: number;
  discountPercentage?: number;
}

interface ProductCardProps {
  item: Product;
  index?: number;
}

const ProductCard = ({ item, index = 0 }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [flashCountdown, setFlashCountdown] = useState<string | null>(null);

  const displayPrice = item.finalPrice ?? item.salePrice ?? item.basePrice;
  const hasDiscount =
    (item.discountPercentage ?? 0) > 0 || displayPrice < item.basePrice;

  const flashSaleActive =
    (item.saleType === "flash" || item.saleType == null) &&
    item.isSaleActive === true &&
    item.isFlashSale === true;

  useEffect(() => {
    if (!flashSaleActive || !item.saleEndDate || !item.saleStartDate) {
      setFlashCountdown(null);
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const start = new Date(item.saleStartDate as string);
      const end = new Date(item.saleEndDate as string);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setFlashCountdown(null);
        return;
      }
      if (now < start || now >= end) {
        setFlashCountdown(null);
        return;
      }

      const diff = end.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      const dayLabel = days > 0 ? `${days}d ` : "";
      setFlashCountdown(
        `${dayLabel}${String(hours).padStart(2, "0")}h ${String(
          minutes,
        ).padStart(2, "0")}m`,
      );
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [flashSaleActive, item.saleEndDate, item.saleStartDate]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const categoryName =
    typeof item.category === "object" ? item.category.name : item.category;

  const isValidUrl = (url: string) => {
    try {
      return (
        url &&
        (url.startsWith("http") ||
          url.startsWith("/") ||
          url.startsWith("data:"))
      );
    } catch {
      return false;
    }
  };

  const imageSrc = isValidUrl(item.thumbnail)
    ? item.thumbnail
    : "https://placehold.co/600x400?text=No+Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-[24px] p-[3px] transition-all duration-300 flex flex-col relative h-full shadow-sm hover:shadow-xl border border-gray-100"
    >
      <Link
        href={`/products/${item._id}`}
        className="flex flex-col grow relative"
      >
        {/* Top Section */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-[20px] p-[1px]">
          <div className="relative w-full h-full bg-[#F4F5F7] rounded-[19px] overflow-hidden isolate transform-gpu">
            {/* Top Left: Category Badge */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 h-5 flex items-center justify-center shadow-sm border border-gray-50">
                <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-accent uppercase leading-none mt-[1px]">
                  {categoryName}
                </span>
              </div>
            </div>

            {/* Top Right: Favorite Button */}
            <div className="absolute top-3 right-3 z-20">
              <button
                onClick={handleFavoriteClick}
                className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-50 flex items-center justify-center transition-all active:scale-90 hover:bg-white"
              >
                <Heart
                  size={14}
                  className={`transition-colors duration-300 ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </button>
            </div>

            <Image
              src={imageSrc}
              alt={item.name}
              fill
              className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-[-4deg] z-10"
              unoptimized={!isValidUrl(item.thumbnail)}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-[3px] bg-gray-100 rounded-[20px] p-[1px] flex flex-col grow">
          <div className="bg-white rounded-[19px] p-3 sm:p-4 flex flex-col grow">
            <div className="flex items-center justify-between mb-1 min-h-[16px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {item.brand || "Vende Bajar"}
              </span>
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-bold text-accent">
                  {item.rating || 0}
                </span>
              </div>
            </div>

            <h3 className="font-bold text-accent text-xs sm:text-sm leading-tight mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {item.name}
            </h3>

            {item.shortDescription && (
              <p className="text-[11px] sm:text-xs text-gray-400 line-clamp-2 mb-3 leading-normal min-h-[32px]">
                {item.shortDescription}
              </p>
            )}

            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-black text-primary tracking-tighter">
                  ৳{displayPrice.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 line-through">
                    ৳{item.basePrice.toLocaleString()}
                  </span>
                )}
                {flashCountdown && (
                  <span className="text-[9px] sm:text-[10px] font-semibold text-secondary mt-1">
                    Sale ends in {flashCountdown}
                  </span>
                )}
              </div>

              <button
                className="bg-accent hover:bg-primary text-white px-3 sm:px-4 py-1.5 rounded-full font-bold text-[9px] sm:text-[10px] uppercase tracking-wide transition-all active:scale-95 shadow-sm flex items-center justify-center gap-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ShoppingCart size={12} /> Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
