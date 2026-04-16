// components/product/ProductInfo.tsx
'use client';

import Link from 'next/link';
import { 
  HiOutlineShoppingBag, 
  HiOutlineHeart, 
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineClock,
  HiOutlineMinus,
  HiOutlinePlus
} from 'react-icons/hi';
import ProductRating from './ProductRating';

interface ProductInfoProps {
  product: {
    _id: string;
    name: string;
    brand: string;
    shortDescription: string;
    rating: number;
    numReviews: number;
    isBestSeller: boolean;
    price: number;
    oldPrice: number;
    stock: number;
  };
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

  const discountAmount = product.oldPrice - product.price;

  return (
    <div className="space-y-4 sm:space-y-5">

      <div>
        {product.brand && (
          <Link 
            href={`/products}`}
            className="text-secondary hover:text-primary font-medium text-xs sm:text-sm uppercase tracking-wide transition-colors inline-block"
          >
            {product.brand}
          </Link>
        )}
        <h1 className="text-lg sm:text-xl xl:text-2xl font-bold text-accent mt-1 leading-tight">
          {product.name}
        </h1>
        <p className="text-gray-500 text-xs mt-1">{product.shortDescription}</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <ProductRating rating={product.rating} totalReviews={product.numReviews} />

        {product.isBestSeller && (
          <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-accent/10 text-accent text-[10px] sm:text-xs rounded-full font-medium">
            estseller
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
          ৳{product.price.toLocaleString()}
        </span>
        {product.oldPrice > product.price && (
          <>
            <span className="text-sm sm:text-base text-gray-400 line-through">
              ৳{product.oldPrice.toLocaleString()}
            </span>
            <span className="text-xs sm:text-sm text-green-600 font-medium">
              Save ৳{discountAmount.toLocaleString()}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={`text-xs sm:text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `In Stock (${product.stock} items left)` : 'Out of Stock'}
        </span>
      </div>

      <div>
        <h3 className="text-xs sm:text-sm font-medium text-accent mb-1.5 sm:mb-2">Quantity</h3>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors"
          >
            <HiOutlineMinus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <span className="w-8 sm:w-10 text-center font-medium text-accent text-sm sm:text-base">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors"
          >
            <HiOutlinePlus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <span className="text-xs text-gray-500">Stocks: {product.stock}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 pt-1">
        <button
          disabled={product.stock === 0}
          className="flex-1 bg-primary text-white py-2.5 lg:py-3 border border-primary rounded-2xl font-semibold text-sm sm:text-base hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiOutlineShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          Add to Cart
        </button>
        
        <button
          className="py-2.5 lg:py-3 px-2 border-2 border-primary text-primary rounded-2xl font-semibold text-sm sm:text-base hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
        >
          <HiOutlineHeart className="w-4 h-4 sm:w-5 sm:h-5" />
          Wishlist
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