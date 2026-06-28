"use client";

import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "@/lib/axios";
import FlashSale from "@/app/(home)/components/FlashSaleSection/FlashSale";
import ProductCard, { Product } from "@/components/shared/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const FlashSalePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["flashSaleProductsPage"],
    queryFn: async () => {
      const res = await publicAxios.get("/products/flash-sale");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const products: Product[] = data?.data || [];

  return (
    <section className="py-10 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] font-black text-primary mb-2">
              Flash Sale
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-accent tracking-tight">
              Active Deals
            </h1>
            <p className="mt-2 text-sm text-gray-500 max-w-2xl">
              Browse all currently active flash sale products and grab the
              limited-time discounts.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-3xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all"
          >
            <ChevronRight size={16} className="rotate-180" />
            Browse Products
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(10)].map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 p-16 text-center text-gray-500">
            <p className="text-lg font-semibold">
              No active flash sale products available.
            </p>
            <p className="mt-2 text-sm">
              Check back later for limited-time offers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((item, index) => (
              <ProductCard key={item._id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashSalePage;
