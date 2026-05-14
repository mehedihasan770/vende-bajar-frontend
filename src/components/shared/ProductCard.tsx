'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingCart } from 'lucide-react';

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  thumbnail: string;
  rating: number;
  numReviews: number;
}

interface ProductCardProps {
  item: Product; // Switched back to strictly using real API data
  index?: number;
}

const ProductCard = ({ item, index = 0 }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = item.oldPrice > item.price 
    ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100) 
    : 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // TODO: In the future, call your API here to add/remove from favorites
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      // Main card with exactly 3px padding
      className="group bg-white rounded-[24px] p-[3px] transition-all duration-300 flex flex-col relative h-full shadow-sm hover:shadow-xl border border-gray-100"
    >
      <Link href={`/products/${item._id}`} className="flex flex-col grow relative">
        
        {/* Top Section: Image Container Wrapper with 1px padding */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-[20px] p-[1px]">
          <div className="relative w-full h-full bg-[#F4F5F7] rounded-[19px] overflow-hidden">
            
            {/* Top Left: Category (Acting as Brand) */}
            <div className="absolute top-3 left-3 z-20">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm border border-gray-50">
                <span className="text-[8px] sm:text-[9px] font-bold tracking-wider text-accent uppercase">{item.category}</span>
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
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`} 
                />
              </button>
            </div>

            {/* Drop shadow effect for the shoe/product */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-black/15 blur-xl rounded-[100%] z-10"></div>
            
            {/* Image bounded strictly with absolute positioning so sizes never break the card */}
            <Image 
              src={item.thumbnail} 
              alt={item.name}
              fill
              className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-[-4deg] z-10" 
            />
          </div>
        </div>

        {/* Bottom Section: Details Wrapper with identical 1px padding to match the top section */}
        <div className="mt-[3px] bg-gray-100 rounded-[20px] p-[1px] flex flex-col grow">
          <div className="bg-white rounded-[19px] p-3 sm:p-4 flex flex-col grow">
            
            {/* Badges and Rating Row */}
            <div className="flex items-center justify-between mb-2 min-h-[20px]">
              <div className="flex items-center gap-1.5">
                {discount > 0 && (
                  <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-[8px] sm:text-[9px] font-black uppercase tracking-wider rounded-full">
                    -{discount}%
                  </span>
                )}
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-bold text-accent">{item.rating || 0}</span>
                <span className="text-[9px] font-medium text-gray-400">({item.numReviews || 0})</span>
              </div>
            </div>

            {/* Title (min-h added so 1-line and 2-line titles take up equal space) */}
            <h3 className="font-bold text-accent text-xs sm:text-sm leading-tight mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
              {item.name}
            </h3>

            {/* Price and Button Row */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-black text-primary tracking-tighter">
                  ৳{item.price.toLocaleString()}
                </span>
                {item.oldPrice > item.price && (
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 line-through">
                    ৳{item.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <button 
                className="bg-accent hover:bg-primary text-white px-3 sm:px-4 py-1.5 rounded-full font-bold text-[9px] sm:text-[10px] uppercase tracking-wide transition-all active:scale-95 shadow-sm flex items-center justify-center gap-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // TODO: Add to cart logic
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
