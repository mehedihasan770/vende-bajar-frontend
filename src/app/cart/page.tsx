"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTrash, HiMinus, HiPlus, HiArrowRight, HiShoppingBag } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';

// Demo Data
const initialCartItems = [
  {
    id: 1,
    name: "Aura Edge AR Glasses",
    category: "Smart Vision",
    price: 1299.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=500",
    color: "Stealth Black"
  },
  {
    id: 2,
    name: "Origin X Pro Frame",
    category: "Premium Series",
    price: 850.00,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=500",
    color: "Silver Frost"
  }
];

const CartPage = () => {
  const [items, setItems] = useState(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 25.00;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 font-outfit">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/50 backdrop-blur-xl p-12 rounded-[40px] border border-gray-100 shadow-2xl flex flex-col items-center text-center max-w-lg"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <HiShoppingBag className="text-4xl text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 font-syne uppercase tracking-tight">Your cart is empty</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven't added any luxury vision pieces yet. Explore our latest collections to find your perfect pair.
          </p>
          <Link href="/products">
            <button className="px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-[0_10px_25px_rgba(252,99,42,0.3)] hover:bg-secondary hover:shadow-[0_10px_25px_rgba(20,96,169,0.3)] transition-all hover:-translate-y-1 flex items-center gap-3">
              Browse Collection <HiArrowRight className="text-xl" />
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 font-outfit">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 font-syne uppercase tracking-tighter mb-2">Shopping Bag</h1>
        <p className="text-gray-500 font-medium">Review your luxury selections before checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Item List */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/60 backdrop-blur-md border border-gray-100 rounded-[32px] hover:bg-white/80 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-40 h-40 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1 block">{item.category}</span>
                    <h3 className="text-xl font-extrabold text-gray-900 font-syne mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 font-medium mb-4">{item.color}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 bg-gray-50/50 w-fit p-1 rounded-xl border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white hover:text-primary rounded-lg transition-all text-gray-400"
                      >
                        <HiMinus />
                      </button>
                      <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white hover:text-primary rounded-lg transition-all text-gray-400"
                      >
                        <HiPlus />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <p className="text-2xl font-black text-gray-900 font-syne">${item.price.toLocaleString()}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group/trash"
                    >
                      <HiOutlineTrash className="text-xl group-hover/trash:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[40px] p-8 shadow-2xl shadow-black/5 sticky top-24">
            <h2 className="text-2xl font-black text-gray-900 font-syne uppercase tracking-tight mb-8">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span className="text-gray-900 font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Shipping</span>
                <span className="text-gray-900 font-bold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Tax (5%)</span>
                <span className="text-gray-900 font-bold">${tax.toLocaleString()}</span>
              </div>
              <div className="h-px bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 my-4"></div>
              <div className="flex justify-between text-gray-900">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black font-syne">${total.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full py-5 bg-secondary text-white rounded-2xl font-bold text-lg shadow-[0_15px_30px_rgba(20,96,169,0.2)] hover:bg-primary hover:shadow-[0_15px_30px_rgba(252,99,42,0.2)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 group">
              Checkout <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-10 h-6 bg-gray-100 rounded-md"></div>
              <div className="w-10 h-6 bg-gray-100 rounded-md"></div>
              <div className="w-10 h-6 bg-gray-100 rounded-md"></div>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-widest font-bold">Secure SSL Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
