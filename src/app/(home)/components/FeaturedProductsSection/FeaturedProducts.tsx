'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { publicAxios } from '@/lib/axios'
import ProductCard, { Product } from '@/components/shared/ProductCard'

const FeaturedProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const res = await publicAxios.get('/products/featured')
      return res.data
    },
    staleTime: 1000 * 60 * 10,
  })

  const products: Product[] = data?.data || []

  return (
    <section className="py-10 sm:py-16 bg-white px-3 sm:px-6">
      <div>
        
        {/* 🎯 Fixed Header: Left Title | Right Button */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
          <div className="text-left">
            <span className="text-primary font-bold tracking-widest uppercase text-[9px] sm:text-[10px] mb-1 block">Selection</span>
            <h2 className="text-xl sm:text-3xl font-black text-gray-950 tracking-tight">
              Featured <span className="text-primary/90">Products</span>
            </h2>
          </div>
          
          <Link href="/products" className="shrink-0 flex items-center gap-1.5 bg-gray-50 text-gray-500 hover:text-primary px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-100 transition-all font-bold text-[10px] sm:text-xs shadow-sm group">
            <span>View All</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-50 rounded-2xl h-64 sm:h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {products.map((item, index) => (
              <ProductCard key={item._id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts