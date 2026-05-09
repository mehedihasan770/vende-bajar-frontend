'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';

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
  item: Product;
  index?: number;
}

const ProductCard = ({ item, index = 0 }: ProductCardProps) => {
  const discount = item.oldPrice > item.price 
    ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-primary/20 transition-all duration-300 flex flex-col relative overflow-hidden h-full shadow-sm hover:shadow-xl"
    >
      {/* Persistent Wishlist Button */}
      <button 
        className="absolute top-2 right-2 z-20 p-2 bg-white/80 backdrop-blur-md text-gray-400 hover:text-primary rounded-full shadow-sm border border-gray-50 transition-all active:scale-90"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Wishlist logic here
        }}
      >
        <Heart size={16} />
      </button>

      <Link href={`/products/${item._id}`} className="flex flex-col grow">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50/50">
          {discount > 0 && (
            <div className="absolute top-2 left-2 z-10 bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm">
              -{discount}%
            </div>
          )}
          <Image 
            src={item.thumbnail} 
            alt={item.name} 
            fill 
            className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105" 
          />
        </div>

        {/* Content Section */}
        <div className="p-3 sm:p-4 flex flex-col grow">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.category}</span>
          <h3 className="font-bold text-accent text-xs sm:text-sm line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors min-h-[2.4rem]">
            {item.name}
          </h3>

          <div className="flex items-center gap-2 mb-3 mt-auto">
            <span className="text-sm sm:text-lg font-black text-accent tracking-tighter">৳{item.price.toLocaleString()}</span>
            {item.oldPrice > item.price && (
              <span className="text-[10px] text-gray-400 line-through">৳{item.oldPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Persistent Add to Cart Button at Bottom */}
      <div className="px-3 pb-3">
        <button 
          className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-primary text-white py-2 rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Cart logic here
          }}
        >
          <ShoppingCart size={14} />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
