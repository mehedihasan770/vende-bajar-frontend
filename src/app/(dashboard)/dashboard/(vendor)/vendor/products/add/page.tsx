'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, Package, DollarSign, Tag, FileText, Info } from 'lucide-react';

const AddProductPage = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-accent tracking-tight">Add New <span className="text-primary">Product</span></h1>
                <p className="text-gray-500 mt-2">Fill in the details below to list your premium product on Vende Bajar.</p>
            </div>

            <form className="space-y-8">
                {/* Image Upload Section */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <label className="block text-sm font-bold text-accent dark:text-white mb-4 flex items-center gap-2">
                        <Upload size={18} className="text-primary" />
                        Product Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                            <Plus size={24} className="text-gray-400 group-hover:text-primary transition-colors" />
                            <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest group-hover:text-primary">Add Main</span>
                        </div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="aspect-square rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-center cursor-pointer">
                                <Plus size={20} className="text-gray-300" />
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest flex items-center gap-1.5">
                        <Info size={12} />
                        Recommended size: 1000x1000px. Max file size: 2MB.
                    </p>
                </div>

                {/* Basic Information */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-accent dark:text-white flex items-center gap-2">
                                <Package size={16} className="text-primary" />
                                Product Name
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g. Sony WH-1000XM5" 
                                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-accent dark:text-white flex items-center gap-2">
                                <Tag size={16} className="text-primary" />
                                Category
                            </label>
                            <select className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all">
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="computers">Computers</option>
                                <option value="accessories">Accessories</option>
                                <option value="fashion">Fashion</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-accent dark:text-white flex items-center gap-2">
                                <DollarSign size={16} className="text-primary" />
                                Price (৳)
                            </label>
                            <input 
                                type="number" 
                                placeholder="0.00" 
                                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-accent dark:text-white flex items-center gap-2">
                                <span className="text-gray-400 line-through text-[10px]">৳</span>
                                Regular Price (Optional)
                            </label>
                            <input 
                                type="number" 
                                placeholder="0.00" 
                                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-accent dark:text-white flex items-center gap-2">
                            <FileText size={16} className="text-primary" />
                            Product Description
                        </label>
                        <textarea 
                            rows={5} 
                            placeholder="Tell your customers about the features and benefits..." 
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <button 
                        type="submit"
                        className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-accent transition-all active:scale-95"
                    >
                        Publish Product
                    </button>
                    <button 
                        type="button"
                        className="w-full sm:w-auto px-10 py-4 bg-gray-100 dark:bg-gray-800 text-accent dark:text-white rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all"
                    >
                        Save Draft
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;