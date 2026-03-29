'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Monitor, 
  Smartphone, 
  Watch, 
  Camera, 
  Music, 
  Lightbulb,
  ChevronRight
} from 'lucide-react'

const CategorySection = () => {
  const categories = useMemo(() => [
    { id: 1, name: 'Computers', icon: Monitor, count: '120+', color: 'primary' },
    { id: 2, name: 'Phones', icon: Smartphone, count: '85+', color: 'secondary' },
    { id: 3, name: 'Watch', icon: Watch, count: '40+', color: 'accent' },
    { id: 4, name: 'Cameras', icon: Camera, count: '30+', color: 'primary' },
    { id: 5, name: 'Audio', icon: Music, count: '65+', color: 'secondary' },
    { id: 6, name: 'Smart Home', icon: Lightbulb, count: '50+', color: 'accent' },
  ], [])

  const getDynamicClasses = (color: string) => {
    const themes: any = {
      primary: {
        text: 'text-primary',
        bgLight: 'bg-primary/5',
        borderHover: 'group-hover:border-primary/30',
        iconHover: 'group-hover:text-primary',
        bgHover: 'group-hover:bg-primary/10'
      },
      secondary: {
        text: 'text-secondary',
        bgLight: 'bg-secondary/5',
        borderHover: 'group-hover:border-secondary/30',
        iconHover: 'group-hover:text-secondary',
        bgHover: 'group-hover:bg-secondary/10'
      },
      accent: {
        text: 'text-accent',
        bgLight: 'bg-accent/5',
        borderHover: 'group-hover:border-accent/30',
        iconHover: 'group-hover:text-accent',
        bgHover: 'group-hover:bg-accent/10'
      }
    }
    return themes[color] || themes.primary
  }

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-100 pb-8">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[4px] uppercase text-xs mb-3 block"
            >
              Our Collections
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-black text-gray-950 leading-tight"
            >
              Shop by <span className="text-primary">Category</span>
            </motion.h2>
          </div>
          
          <Link href="/products" className="text-gray-500 hover:text-primary transition-all font-semibold flex items-center gap-2 group bg-gray-50 px-5 py-3 rounded-full border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20">
            View All Categories
            <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat, index) => {
            const theme = getDynamicClasses(cat.color);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Link 
                  href={`/products?category=${cat.name.toLowerCase()}`}
                  className={`group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-gray-100 ${theme.borderHover} ${theme.bgHover} transition-all duration-500 overflow-hidden text-center h-full hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-1`}
                >
                  
                  {/* Icon Container */}
                  <div className={`relative z-10 mb-6 p-5 rounded-2xl ${theme.bgLight} border border-gray-100/50 group-hover:border-transparent transition-all duration-500 group-hover:scale-110`}>
                    <cat.icon size={35} strokeWidth={1.5} className={`text-gray-500 ${theme.iconHover}`} />
                  </div>

                  {/* Text Info */}
                  <h3 className="relative z-10 text-gray-900 font-bold text-lg mb-1.5 transition-colors group-hover:text-gray-950">
                    {cat.name}
                  </h3>
                  <p className={`relative z-10 text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${theme.bgLight} ${theme.text}`}>
                    {cat.count} Items
                  </p>

                  {/* Bottom Line Decor */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ${cat.color === 'primary' ? 'bg-primary' : cat.color === 'secondary' ? 'bg-secondary' : 'bg-accent'}`} />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategorySection;