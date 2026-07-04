"use client";

import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "@/lib/axios";
import ProductCard, { Product } from "@/components/shared/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

interface RelatedProductsProps {
  productId: string;
}

export const RelatedProducts = ({ productId }: RelatedProductsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["relatedProducts", productId],
    queryFn: async () => {
      const res = await publicAxios.get(`/products/related/${productId}`);
      return res.data;
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  const products: Product[] = data?.data || [];

  if (!isLoading && products.length === 0) return null;

  return (
    <div className="mt-8 sm:mt-12 lg:mt-16 border-t border-gray-100 pt-8 sm:pt-12">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-[9px] sm:text-[10px] mb-1 block">
            Recommendations
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-950 tracking-tight">
            Related <span className="text-primary/90">Products</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        {isLoading
          ? [...Array(5)].map((_, i) => <ProductSkeleton key={i} />)
          : products.map((item, index) => (
              <ProductCard key={item._id} item={item} index={index} />
            ))}
      </div>
    </div>
  );
};
