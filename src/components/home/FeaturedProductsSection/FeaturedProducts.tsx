'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronRight, ShoppingCart, Eye, Heart } from 'lucide-react'
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {products.map((item) => (
              <motion.div key={item._id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative">
                <div className="relative aspect-square w-full overflow-hidden bg-[#fbfbfb]">
                  <Image src={item.thumbnail} alt={item.name} fill className="object-cover p-3 sm:p-5 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 left-2 bg-primary/90 text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">{item.category}</div>
                  <button className="absolute top-2 right-2 p-1.5 bg-white/90 text-gray-400 hover:text-red-500 rounded-lg shadow-sm border border-gray-50 active:scale-90 transition-all"><Heart size={14} /></button>
                </div>

                <div className="p-3 sm:p-4 flex flex-col grow">
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star size={10} className="fill-primary text-primary" />
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">({item.numReviews || 0})</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1.5 text-xs sm:text-sm line-clamp-2 leading-tight min-h-[2.4rem] sm:min-h-10">{item.name}</h3>
                  <div className="flex items-center gap-1.5 mb-3 mt-auto">
                    <span className="text-sm sm:text-lg font-black text-gray-900 tracking-tight">৳{item.price}</span>
                    {item.oldPrice > item.price && <span className="text-[10px] text-gray-400 line-through">৳{item.oldPrice}</span>}
                  </div>
                  <div className="flex gap-1.5 mt-auto">
                    <Link href={`/product/${item._id}`} className="flex-1 py-1.5 sm:py-2 bg-secondary/10 text-secondary border border-secondary/10 rounded-lg font-bold text-[9px] sm:text-[11px] uppercase tracking-tighter hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-1 active:scale-95"><Eye size={12} className="hidden sm:block" />View</Link>
                    <button className="p-1.5 sm:p-2 bg-primary text-white rounded-lg font-bold hover:bg-gray-900 transition-all active:scale-95 shadow-sm"><ShoppingCart size={14} /></button>
                  </div>
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