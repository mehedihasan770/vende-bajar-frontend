// components/product/RelatedProducts.tsx
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineStar } from 'react-icons/hi';

// এই কম্পোনেন্টের নিজস্ব টাইপ
interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  rating: number;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
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
      <h2 className="text-lg sm:text-xl font-bold text-accent mb-4 sm:mb-5">
        আপনার পছন্দ হতে পারে
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <Link href={`/products/${item.id}`} className="block">
              <div className="relative aspect-square bg-gray-50 p-3 sm:p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {item.oldPrice > item.price && (
                  <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-primary text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full">
                    -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-3">
                <h3 className="font-semibold text-accent text-xs sm:text-sm line-clamp-1">{item.name}</h3>
                <div className="flex items-center gap-0.5 mt-1">
                  {renderStars(item.rating)}
                  <span className="text-[10px] sm:text-xs text-gray-500 ml-1">{item.rating}</span>
                </div>
                <div className="flex items-baseline gap-1 sm:gap-2 mt-1.5">
                  <span className="font-bold text-primary text-xs sm:text-sm">৳{item.price.toLocaleString()}</span>
                  {item.oldPrice > item.price && (
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">৳{item.oldPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};