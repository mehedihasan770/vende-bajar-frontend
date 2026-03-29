'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Monitor, Smartphone, Watch, Camera, Music, Lightbulb, ChevronRight } from 'lucide-react'

const CategorySection = () => {
  const categories = useMemo(() => [
    { id: 1, name: 'Computers', icon: Monitor, count: '120+', color: 'primary' },
    { id: 2, name: 'Phones', icon: Smartphone, count: '85+', color: 'secondary' },
    { id: 3, name: 'Watch', icon: Watch, count: '40+', color: 'primary' },
    { id: 4, name: 'Cameras', icon: Camera, count: '30+', color: 'secondary' },
    { id: 5, name: 'Audio', icon: Music, count: '65+', color: 'primary' },
    { id: 6, name: 'Smart Home', icon: Lightbulb, count: '50+', color: 'secondary' },
  ], [])

  return (
    <section className="py-10 sm:py-16 bg-white px-3 sm:px-6">
      <div>
        
        {/* 🎯 Header: Title Left | Button Right */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
          <div className="text-left">
            <span className="text-primary font-bold tracking-[3px] uppercase text-[9px] sm:text-[10px] mb-1 block">Collections</span>
            <h2 className="text-xl sm:text-3xl font-black text-gray-950 tracking-tight">
              Shop by <span className="text-primary/90">Category</span>
            </h2>
          </div>
          
          <Link href="/categories" className="shrink-0 flex items-center gap-1.5 bg-gray-50 text-gray-500 hover:text-primary px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-100 transition-all font-bold text-[10px] sm:text-xs shadow-sm group">
            <span>All Categories</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {categories.map((cat, index) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} viewport={{ once: true }}>
              <Link href={`/products?category=${cat.name.toLowerCase()}`} className="group flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center h-full relative overflow-hidden">
                <div className={`mb-4 p-4 rounded-xl transition-all duration-300 group-hover:scale-110 ${cat.color === 'primary' ? 'bg-primary/5 text-primary' : 'bg-secondary/5 text-secondary'}`}>
                  <cat.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-gray-800 text-xs sm:text-sm mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-tighter">{cat.count} Items</p>
                <div className={`absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${cat.color === 'primary' ? 'bg-primary' : 'bg-secondary'}`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection;