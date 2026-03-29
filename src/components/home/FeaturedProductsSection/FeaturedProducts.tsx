'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronRight, ShoppingCart, Eye } from 'lucide-react'
import { publicAxios } from '@/lib/axios'

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  thumbnail: string;
  rating: number;
  numReviews: number;
}

const FeaturedProducts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const res = await publicAxios.get('/products/featured')
      return res.data
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false, 
    refetchOnMount: false,
  })

  const products: Product[] = data?.data || []

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div>
        
        {/* 🎯 Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-100 pb-8">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[4px] uppercase text-xs mb-3 block"
            >
              Premium Selection
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-black text-gray-950 leading-tight"
            >
              Featured <span className="text-primary">Products</span>
            </motion.h2>
          </div>
          
          <Link href="/products" className="text-gray-500 hover:text-primary transition-all font-semibold flex items-center gap-2 group bg-gray-50 px-5 py-3 rounded-full border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20">
            View All Products
            <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* ⏳ Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-50 rounded-3xl h-112.5"></div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-24 bg-red-50 rounded-[40px] border border-dashed border-red-200">
            <p className="text-red-500 font-bold text-lg">Failed to load featured products.</p>
          </div>
        ) : (
          /* ✅ Flash Sale Card Style Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((item) => (
              <motion.div 
                key={item._id} 
                whileHover={{ y: -8 }} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                {/* Image Container (Flash Sale Style) */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-50">
                  <Image 
                    src={item.thumbnail} 
                    alt={item.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    {item.category}
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                     <button className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary hover:text-white transition-all transform translate-y-10 group-hover:translate-y-0 shadow-lg">
                       <Eye size={18}/>
                     </button>
                     <button className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary hover:text-white transition-all transform translate-y-10 group-hover:translate-y-0 delay-75 shadow-lg">
                       <ShoppingCart size={18}/>
                     </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < (item.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} 
                      />
                    ))}
                    <span className="text-[11px] text-gray-400 font-bold ml-1">({item.numReviews || 0})</span>
                  </div>

                  <h3 className="font-bold text-gray-950 mb-2 truncate group-hover:text-primary transition-colors text-lg">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-5 mt-auto">
                    <span className="text-2xl font-black text-primary">৳{item.price}</span>
                    {item.oldPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through font-bold">৳{item.oldPrice}</span>
                    )}
                  </div>

                  {/* Button (Flash Sale Style) */}
                  <button className="w-full py-3.5 bg-gray-950 text-white rounded-2xl font-bold hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-95">
                    Grab It Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts