'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicAxios } from '@/lib/axios';
import ProductCard, { Product } from '@/components/shared/ProductCard';
import ProductSkeleton from '@/components/skeletons/ProductSkeleton';

const ProductsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      // Using featured products data as requested for now
      const res = await publicAxios.get('/products/featured');
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const products: Product[] = data?.data || [];

  return (
    <section className="py-8 min-h-screen">
      {/* Promotional banner */}
      <div className="bg-primary text-white p-4 rounded-2xl mb-8 text-center shadow-lg shadow-primary/20 font-bold">
        🎉 Free shipping on orders over $100! 🎉
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-accent dark:text-white tracking-tight">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Explore our collection of premium quality items.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="flex-1 md:w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm font-semibold text-accent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
            <option value="popularity">Sort by Popularity</option>
            <option value="priceLowHigh">Price: Low → High</option>
            <option value="priceHighLow">Price: High → Low</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {[...Array(10)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((item, index) => (
              <ProductCard key={item._id} item={item} index={index} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-gray-400">No products found.</h3>
            </div>
          )}

          {/* Simple Pagination Placeholder */}
          {products.length > 0 && (
            <nav className="flex justify-center items-center space-x-2 mt-12">
              <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold shadow-md">1</button>
              <button className="px-4 py-2 bg-gray-100 text-accent hover:bg-gray-200 rounded-xl font-bold transition-all">2</button>
              <button className="px-4 py-2 bg-gray-100 text-accent hover:bg-gray-200 rounded-xl font-bold transition-all">Next</button>
            </nav>
          )}
        </>
      )}
    </section>
  );
};

export default ProductsPage;