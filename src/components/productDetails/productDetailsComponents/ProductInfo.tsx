// components/product/ProductInfo.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineClock,
  HiOutlineMinus,
  HiOutlinePlus,
} from "react-icons/hi";
import ProductRating from "./ProductRating";

interface VendorInfo {
  _id: string;
  fullName: string;
  email: string;
  profileImage?: string;
}

interface ProductInfoData {
  _id: string;
  vendor?: VendorInfo;
  vendorEmail?: string;
  createdBy?: string;
  name: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  category?: any;
  subCategory?: string;
  brand?: string;
  tags?: string[];
  pricing: {
    basePrice: number;
    salePrice?: number;
    saleType?: string;
    regularPrice?: number;
    saleStartDate?: string;
    saleEndDate?: string;
    costPrice?: number;
  };
  finalPrice: number;
  discountPercentage: number;
  isFlashSaleActive: boolean;
  isSaleActive: boolean;
  stock?: number;
  sku?: string;
  thumbnail?: string;
  images?: string[];
  videoUrl?: string;
  specifications?: Record<string, string | string[] | number | undefined>;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  status?: string;
  rating: number;
  numReviews: number;
  totalSales?: number;
  viewCount?: number;
  metaTitle?: string;
  metaDescription?: string;
  inventory?: {
    stock: number;
    lowStockThreshold?: number;
    allowBackorder?: boolean;
    isOutOfStock?: boolean;
  };
  shipping?: {
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
  };
  relatedProducts?: string[];
  hasVariants?: boolean;
  variants?: unknown[];
  createdAt?: string;
  updatedAt?: string;
}

interface ProductInfoProps {
  product: ProductInfoData;
  quantity: number;
  setQuantity: (qty: number) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

export const ProductInfo = ({
  product,
  quantity,
  setQuantity,
}: ProductInfoProps) => {
  const stockAmount = product.inventory?.stock ?? product.stock ?? 0;
  const isOutOfStock = product.inventory?.isOutOfStock ?? stockAmount <= 0;
  const displayPrice = product.finalPrice;
  const hasDiscount = (product.discountPercentage ?? 0) > 0;
  const discountAmount = (product.pricing?.basePrice || 0) - displayPrice;

  const isFlashSaleActive = product.isFlashSaleActive;

  const [flashCountdown, setFlashCountdown] = useState<string | null>(null);

  useEffect(() => {
    if (!isFlashSaleActive || !product.pricing?.saleEndDate || !product.pricing?.saleStartDate) {
      setFlashCountdown(null);
      return;
    }

    const start = new Date(product.pricing.saleStartDate as string);
    const end = new Date(product.pricing.saleEndDate as string);
    const update = () => {
      const now = new Date();
      if (
        isNaN(start.getTime()) ||
        isNaN(end.getTime()) ||
        now < start ||
        now >= end
      ) {
        setFlashCountdown(null);
        return;
      }

      const diff = end.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const dayLabel = days > 0 ? `${days}d ` : "";
      setFlashCountdown(
        `${dayLabel}${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`,
      );
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [isFlashSaleActive, product.saleEndDate, product.saleStartDate]);

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <div className="flex items-center justify-between">
          {product.brand && (
            <Link
              href={`/products`}
              className="text-secondary hover:text-primary font-medium text-xs sm:text-sm uppercase tracking-wide transition-colors inline-block"
            >
              {product.brand}
            </Link>
          )}

          {/* Vendor Info Badge */}
          {product.vendor && (
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
              <span className="text-[10px] text-gray-500 font-medium">
                Sold by:
              </span>
              <span className="text-[10px] text-primary font-bold">
                {product.vendor.fullName}
              </span>
            </div>
          )}
        </div>

        <h1 className="text-lg sm:text-xl xl:text-2xl font-bold text-accent mt-1 leading-tight">
          {product.name}
        </h1>
        <p className="text-gray-500 text-xs mt-1">{product.shortDescription}</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <ProductRating
          rating={product.rating}
          totalReviews={product.numReviews}
        />

        {product.isBestSeller && (
          <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-accent/10 text-accent text-[10px] sm:text-xs rounded-full font-medium">
            Bestseller
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
          ৳{(displayPrice || 0).toLocaleString()}
        </span>
        {hasDiscount && (
          <>
            <span className="text-sm sm:text-base text-gray-400 line-through">
              ৳{(product.pricing?.basePrice || 0).toLocaleString()}
            </span>
            <span className="text-xs sm:text-sm text-green-600 font-medium">
              Save ৳{discountAmount.toLocaleString()}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${!isOutOfStock ? "bg-green-500" : "bg-red-500"}`}
        />
        <span
          className={`text-xs sm:text-sm font-medium ${!isOutOfStock ? "text-green-600" : "text-red-600"}`}
        >
          {!isOutOfStock
            ? `In Stock (${stockAmount} items left)`
            : "Out of Stock"}
        </span>
      </div>

      {flashCountdown && (
        <div className="rounded-3xl bg-secondary/10 border border-secondary/20 px-4 py-3 text-sm text-secondary font-semibold mt-4 w-fit">
          Flash sale ends in {flashCountdown}
        </div>
      )}

      <div>
        <h3 className="text-xs sm:text-sm font-medium text-accent mb-1.5 sm:mb-2">
          Quantity
        </h3>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors"
          >
            <HiOutlineMinus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <span className="w-8 sm:w-10 text-center font-medium text-accent text-sm sm:text-base">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(stockAmount, quantity + 1))}
            className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors"
          >
            <HiOutlinePlus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <span className="text-xs text-gray-500">Stocks: {stockAmount}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">

      <button
         disabled={stockAmount === 0}
         className="flex-[1.5] bg-primary text-white py-2.5 lg:py-3 border border-primary rounded-2xl font-semibold text-sm sm:text-base hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
          Buy Now
       </button>

        <button
          disabled={stockAmount === 0}
          className="flex-1 border-2 border-primary text-primary py-2.5 lg:py-3 rounded-2xl font-semibold text-sm sm:text-base hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiOutlineShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          Cart
        </button>

        <button className="p-2.5 lg:p-3 border-2 border-gray-200 text-gray-400 rounded-2xl hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center">
          <HiOutlineHeart className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 border-t border-gray-100">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <HiOutlineTruck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
          <span>ফ্রি ডেলিভারি</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <HiOutlineRefresh className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
          <span>৩০ দিন রিটার্ন</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <HiOutlineShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
          <span>ওয়ারেন্টি</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <HiOutlineClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
          <span>২-৩ দিনে ডেলিভারি</span>
        </div>
      </div>
    </div>
  );
};
