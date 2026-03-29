'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  HiOutlineSparkles,
} from 'react-icons/hi'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [particles, setParticles] = useState<any[]>([])

  const slides = useMemo(() => [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "2024",
      description: "Discover the latest fashion trends with exclusive discounts. Shop now and elevate your style with premium quality products.",
      buttonText: "Shop Now",
      buttonLink: "/products",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop",
      badge: "🔥 Hot Deal",
      discount: "50% OFF",
      color: "primary"
    },
    {
      id: 2,
      title: "Tech Gadgets",
      subtitle: "2024",
      description: "Experience the future with cutting-edge technology. Discover smart devices that make life easier and more enjoyable.",
      buttonText: "Shop Now",
      buttonLink: "/products?category=electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e1234567?w=1920&h=1080&fit=crop",
      badge: "⚡ New Arrivals",
      discount: "30% OFF",
      color: "secondary"
    },
    {
      id: 3,
      title: "Premium Style",
      subtitle: "2024",
      description: "Complete your look with our premium accessories collection. Quality craftsmanship meets elegant design.",
      buttonText: "Shop Now",
      buttonLink: "/products?category=accessories",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop",
      badge: "✨ Exclusive",
      discount: "Free Shipping",
      color: "accent"
    }
  ], [])


  useEffect(() => {
    const generatedParticles = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5
    }))
    setParticles(generatedParticles)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const getColorClasses = (color: string, type: string) => {
    const colors = {
      primary: { bg: 'bg-primary', text: 'text-primary', hover: 'hover:bg-primary/90', border: 'border-primary/50', linear: 'from-primary via-primary/80 to-primary/60', bgLight: 'bg-primary/20' },
      secondary: { bg: 'bg-secondary', text: 'text-secondary', hover: 'hover:bg-secondary/90', border: 'border-secondary/50', linear: 'from-secondary via-secondary/80 to-secondary/60', bgLight: 'bg-secondary/20' },
      accent: { bg: 'bg-accent', text: 'text-accent', hover: 'hover:bg-accent/90', border: 'border-accent/50', linear: 'from-accent via-accent/80 to-accent/60', bgLight: 'bg-accent/20' }
    }
    return colors[color as keyof typeof colors]?.[type as keyof typeof colors.primary] || ''
  }

  return (
    <section className="relative w-full rounded-2xl overflow-hidden bg-black">
      <div className="relative h-[33vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-87.5 sm:min-h-100 md:min-h-112.5 lg:min-h-125 rounded-2xl overflow-hidden">
        
        {/* Background Slides - Pure Fade Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}  
            transition={{ duration: 1.2, ease: "easeInOut" }} 
            className="absolute inset-0 rounded-2xl"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/40 rounded-2xl" />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30 rounded-2xl" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Particles Section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block rounded-2xl">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-white/20 rounded-full"
              initial={{ y: -20 }}
              animate={{ y: 800 }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear"
              }}
              style={{ left: p.left, width: p.width, height: p.width }}
            />
          ))}
        </div>

        {/* Content Container (Keep your existing content here) */}
        <div className="relative h-full w-full rounded-2xl overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 h-full">
            <div className="flex flex-col justify-center h-full max-w-3xl">
              
              {/* Badge */}
              <motion.div
                key={`badge-${currentSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-5"
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-bold backdrop-blur-md border ${getColorClasses(slides[currentSlide].color, 'border')} ${getColorClasses(slides[currentSlide].color, 'text')} bg-white/5`}>
                  <HiOutlineSparkles className="animate-pulse" />
                  <span>{slides[currentSlide].badge}</span>
                </div>
              </motion.div>

              {/* Title & Description */}
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-4xl sm:text-7xl font-black text-white mb-4 leading-[1.1]"
              >
                {slides[currentSlide].title}<br/>
                <span className={`bg-linear-to-r ${getColorClasses(slides[currentSlide].color, 'linear')} bg-clip-text text-transparent`}>
                  {slides[currentSlide].subtitle}
                </span>
              </motion.h1>

              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-gray-400 text-sm sm:text-lg mb-8 max-w-lg"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex gap-4"
              >
                <Link href="/products" className="px-8 py-3 rounded-2xl text-white font-bold bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
                  Wishlist
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full h-1.5 ${
                currentSlide === index ? 'w-10 bg-white' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection