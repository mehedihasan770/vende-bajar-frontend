'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, ChevronRight } from 'lucide-react'

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date("2026-07-31T00:00:00").getTime() 
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now
      if (distance < 0) clearInterval(interval)
      else setTimeLeft({
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
    { id: 5, name: "Ultra HD Action Camera", price: 150, oldPrice: 200, discount: 25, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop" },
  ]

  return (
    <section className="py-10 sm:py-16 bg-white px-3 sm:px-6">
      <div>
        
        {/* 🎯 Header Section: Always Left Title | Right Button */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
          <div className="text-left">
            <h2 className="text-xl sm:text-3xl font-black text-gray-950 tracking-tight mb-2">
              Flash <span className="text-secondary">Sale</span>
            </h2>
            {/* ⏰ Timer Under Title */}
            <div className="flex gap-1.5 sm:gap-2">
              {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
                <div key={i} className="bg-gray-950 text-white rounded-lg w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center flex-col shadow-md">
                  <span className="text-xs sm:text-sm font-black leading-none">{val < 10 ? `0${val}` : val}</span>
                  <span className="text-[6px] sm:text-[7px] uppercase font-bold text-gray-500 mt-0.5">{['D','H','M','S'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Link href="/flash-sale" className="shrink-0 flex items-center gap-1.5 bg-gray-50 text-gray-500 hover:text-secondary px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-100 transition-all font-bold text-[10px] sm:text-xs shadow-sm group">
            <span>All Sale</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
          {products.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative">
              <div className="relative aspect-square w-full overflow-hidden bg-[#fbfbfb]">
                <Image src={item.image} alt={item.name} fill className="object-cover p-3 sm:p-5 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 left-2 bg-secondary text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">{item.discount}% OFF</div>
                <button className="absolute top-2 right-2 p-1.5 bg-white/90 text-gray-400 hover:text-red-500 rounded-lg shadow-sm border border-gray-50 active:scale-90 transition-all"><Heart size={14} /></button>
              </div>

              <div className="p-3 sm:p-4 flex flex-col grow">
                <h3 className="font-bold text-gray-800 mb-1.5 text-xs sm:text-sm line-clamp-2 leading-tight min-h-[2.4rem] sm:min-h-10">{item.name}</h3>
                <div className="flex items-center gap-1.5 mb-3 mt-auto">
                  <span className="text-sm sm:text-lg font-black text-gray-900 tracking-tight">৳{item.price}</span>
                  <span className="text-[10px] text-gray-400 line-through">৳{item.oldPrice}</span>
                </div>
                <div className="flex gap-1.5 mt-auto">
                  <Link href={`/products/${item.id}`} className="flex-1 py-1.5 sm:py-2 bg-secondary/5 text-secondary border border-secondary/10 rounded-lg font-bold text-[9px] sm:text-[11px] uppercase tracking-tighter hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-1 active:scale-95">View</Link>
                  <button className="p-1.5 sm:p-2 bg-primary text-white rounded-lg font-bold hover:bg-gray-950 transition-all active:scale-95 shadow-sm"><ShoppingCart size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FlashSale