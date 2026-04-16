// components/product/ImageGallery.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

// এই কম্পোনেন্টের নিজস্ব টাইপ
interface ImageGalleryProps {
  images: string[];
  productName: string;
  oldPrice: number;
  price: number;
  isNewArrival: boolean;
  selectedImage: number;
  setSelectedImage: (index: number | ((prev: number) => number)) => void;
}

export const ImageGallery = ({ 
  images, 
  productName, 
  oldPrice, 
  price,
  isNewArrival,
  selectedImage,
  setSelectedImage
}: ImageGalleryProps) => {
  
  const discountPercent = oldPrice > price 
    ? Math.round(((oldPrice - price) / oldPrice) * 100) 
    : 0;

  const nextImage = () => {
    setSelectedImage((prev: number) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev: number) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3 sm:space-y-4">

      <div className="relative aspect-square bg-white rounded-2xl sm:rounded-2xl overflow-hidden shadow-md border border-gray-100 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[selectedImage]}
              alt={productName}
              fill
              className="object-contain p-4 sm:p-6"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-all duration-300 z-10"
            >
              <HiOutlineArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-all duration-300 z-10"
            >
              <HiOutlineArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            </button>
          </>
        )}
        
        {oldPrice > price && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold shadow-lg z-10">
            -{discountPercent}%
          </div>
        )}
        
        {isNewArrival && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-secondary text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold shadow-lg z-10">
            New
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === idx 
                  ? 'border-primary shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};