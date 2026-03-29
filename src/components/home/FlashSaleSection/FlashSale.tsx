'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingCart, Eye, } from 'lucide-react'

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date("2026-07-31T00:00:00").getTime() // আপনার জন্মদিন বা টার্গেট ডেট
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const products = [
    { id: 1, name: "Premium Wireless Headphones", price: 120, oldPrice: 180, discount: 35, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop" },
    { id: 2, name: "Smart Fitness Watch S2", price: 85, oldPrice: 110, discount: 20, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop" },
    { id: 3, name: "Mechanical Gaming Keyboard", price: 65, oldPrice: 95, discount: 30, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&h=500&fit=crop" },
    { id: 4, name: "Ultra HD Action Camera", price: 150, oldPrice: 200, discount: 25, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop" },
  ]

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div>
        
        {/* 🎯 Header Section (Category Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-100 pb-8">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-secondary font-bold tracking-[4px] uppercase text-xs mb-3 block"
            >
              Limited Time Offer
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-black text-gray-950 leading-tight"
            >
              Flash <span className="text-secondary">Sale</span>
            </motion.h2>
          </div>
          
          {/* ⏰ Timer Display */}
          <div className="flex gap-3">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Sec', value: timeLeft.seconds }
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center bg-gray-50 border border-gray-100 shadow-sm rounded-2xl px-5 py-3 min-w-17.5">
                <span className="text-2xl font-black text-secondary">{t.value < 10 ? `0${t.value}` : t.value}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🛒 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <motion.div 
              key={item.id} 
              whileHover={{ y: -8 }} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-50">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                  -{item.discount}% OFF
                </div>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                   <button className="p-3 bg-white rounded-full text-gray-900 hover:bg-secondary hover:text-white transition-all transform translate-y-10 group-hover:translate-y-0 shadow-lg">
                     <Eye size={20}/>
                   </button>
                   <button className="p-3 bg-white rounded-full text-gray-900 hover:bg-secondary hover:text-white transition-all transform translate-y-10 group-hover:translate-y-0 delay-75 shadow-lg">
                     <ShoppingCart size={20}/>
                   </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col grow">
                <h3 className="font-bold text-gray-900 mb-2 truncate text-lg group-hover:text-secondary transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-3 mb-6 mt-auto">
                  <span className="text-2xl font-black text-primary">${item.price}</span>
                  <span className="text-sm text-gray-400 line-through font-bold">${item.oldPrice}</span>
                </div>
                <button className="w-full py-3.5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-md">
                  Grab It Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FlashSale