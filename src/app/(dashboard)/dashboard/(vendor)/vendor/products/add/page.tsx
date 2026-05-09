'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Upload, Plus, Package, DollarSign, Tag, FileText, 
    Info, Image as ImageIcon, Video, Settings, BarChart, 
    ChevronDown, Trash2, Check, AlertCircle, X
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { publicAxios } from '@/lib/axios';
import { getBrowserUser } from '@/utils/getBrowserUser';

const AddProductPage = () => {
    const user = getBrowserUser();
    const [isLoading, setIsLoading] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        vendorEmail: user?.email || '',
        name: '',
        slug: '',
        description: '',
        shortDescription: '',
        category: '',
        subCategory: '',
        brand: '',
        price: '',
        oldPrice: '',
        costPrice: '',
        stock: '0',
        sku: '',
        thumbnail: '',
        images: [] as string[],
        videoUrl: '',
        specifications: [] as { key: string, value: string }[],
        isFeatured: false,
        isFlashSale: false,
        isNewArrival: true,
        isBestSeller: false,
        status: 'active',
        metaTitle: '',
        metaDescription: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const addSpecification = () => {
        setFormData(prev => ({
            ...prev,
            specifications: [...prev.specifications, { key: '', value: '' }]
        }));
    };

    const removeSpecification = (index: number) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index)
        }));
    };

    const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index][field] = value;
        setFormData(prev => ({ ...prev, specifications: newSpecs }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Transform specifications array to Map-like object for API
            const specsObject = formData.specifications.reduce((acc, spec) => {
                if (spec.key && spec.value) acc[spec.key] = spec.value;
                return acc;
            }, {} as Record<string, string>);

            const finalData = {
                ...formData,
                specifications: specsObject,
                price: Number(formData.price),
                oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
                costPrice: formData.costPrice ? Number(formData.costPrice) : undefined,
                stock: Number(formData.stock),
            };

            // Demo API Call
            const response = await publicAxios.post('/products', finalData);
            
            if (response.data.success) {
                toast.success('Product added successfully!');
                // Reset form or redirect
            }
        } catch (error: any) {
            console.error('Add Product Error:', error);
            toast.error(error?.response?.data?.message || 'Failed to add product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-12 min-h-screen bg-[#FBFBFB] dark:bg-gray-950">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                        <Package size={14} />
                        Inventory Management
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-accent dark:text-white tracking-tight">
                        Create <span className="text-primary">Pro</span> Product
                    </h1>
                    <p className="text-gray-500 mt-2 max-w-md">Design and launch your premium products with our state-of-the-art listing tool.</p>
                </div>
                
                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-accent dark:text-white text-sm hover:bg-gray-50 transition-all shadow-sm">
                        Save as Draft
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-8 py-3 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {isLoading ? 'Publishing...' : 'Publish Now'}
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Basic Info Card */}
                    <SectionCard title="Basic Information" icon={<Info size={18} />}>
                        <div className="space-y-6">
                            <InputGroup label="Product Name" required>
                                <input 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    type="text" 
                                    placeholder="e.g. iPhone 15 Pro Max - Titanium" 
                                    className="pro-input"
                                />
                            </InputGroup>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Brand" required>
                                    <input 
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        type="text" 
                                        placeholder="Apple" 
                                        className="pro-input"
                                    />
                                </InputGroup>
                                <InputGroup label="SKU (Stock Keeping Unit)">
                                    <input 
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleInputChange}
                                        type="text" 
                                        placeholder="IPH-15-PRO-TITAN" 
                                        className="pro-input"
                                    />
                                </InputGroup>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Category" required>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className="pro-input">
                                        <option value="">Select Category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Computers">Computers</option>
                                        <option value="Fashion">Fashion</option>
                                    </select>
                                </InputGroup>
                                <InputGroup label="Sub-Category">
                                    <input 
                                        name="subCategory"
                                        value={formData.subCategory}
                                        onChange={handleInputChange}
                                        type="text" 
                                        placeholder="Smartphones" 
                                        className="pro-input"
                                    />
                                </InputGroup>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Description Card */}
                    <SectionCard title="Description & Details" icon={<FileText size={18} />}>
                        <div className="space-y-6">
                            <InputGroup label="Short Description">
                                <textarea 
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleInputChange}
                                    rows={3} 
                                    placeholder="A brief summary of the product..." 
                                    className="pro-input resize-none"
                                />
                            </InputGroup>
                            <InputGroup label="Full Description" required>
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={8} 
                                    placeholder="Detailed product information, features, and benefits..." 
                                    className="pro-input resize-none"
                                />
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Specifications Card */}
                    <SectionCard title="Specifications" icon={<Settings size={18} />}>
                        <div className="space-y-4">
                            {formData.specifications.map((spec, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-4"
                                >
                                    <input 
                                        placeholder="Key (e.g. Battery)" 
                                        value={spec.key}
                                        onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                                        className="pro-input flex-1"
                                    />
                                    <input 
                                        placeholder="Value (e.g. 5000mAh)" 
                                        value={spec.value}
                                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                        className="pro-input flex-1"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeSpecification(index)}
                                        className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}
                            <button 
                                type="button"
                                onClick={addSpecification}
                                className="w-full py-3 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl text-gray-400 font-bold text-sm hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={16} />
                                Add Specification
                            </button>
                        </div>
                    </SectionCard>

                    {/* SEO Card */}
                    <SectionCard title="SEO Meta Data" icon={<TrendingUp size={18} />}>
                         <div className="space-y-6">
                            <InputGroup label="Meta Title">
                                <input 
                                    name="metaTitle"
                                    value={formData.metaTitle}
                                    onChange={handleInputChange}
                                    type="text" 
                                    placeholder="SEO Optimized Title" 
                                    className="pro-input"
                                />
                            </InputGroup>
                            <InputGroup label="Meta Description">
                                <textarea 
                                    name="metaDescription"
                                    value={formData.metaDescription}
                                    onChange={handleInputChange}
                                    rows={3} 
                                    placeholder="Search engine description..." 
                                    className="pro-input resize-none"
                                />
                            </InputGroup>
                        </div>
                    </SectionCard>
                </div>

                {/* Right Column - Media & Settings */}
                <div className="space-y-8">
                    
                    {/* Media Card */}
                    <SectionCard title="Media & Visuals" icon={<ImageIcon size={18} />}>
                        <div className="space-y-6">
                            <InputGroup label="Thumbnail URL" required>
                                <input 
                                    name="thumbnail"
                                    value={formData.thumbnail}
                                    onChange={handleInputChange}
                                    type="text" 
                                    placeholder="https://example.com/image.jpg" 
                                    className="pro-input"
                                />
                            </InputGroup>
                            
                            <div className="p-8 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group hover:border-primary/30 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-all mb-4">
                                    <Upload size={24} />
                                </div>
                                <p className="text-sm font-bold text-accent dark:text-white mb-1">Click to upload images</p>
                                <p className="text-xs text-gray-400">PNG, JPG or WebP (Max 2MB)</p>
                            </div>

                            <InputGroup label="Video URL (Optional)">
                                <input 
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleInputChange}
                                    type="text" 
                                    placeholder="YouTube or Vimeo link" 
                                    className="pro-input"
                                />
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Pricing & Stock Card */}
                    <SectionCard title="Pricing & Stock" icon={<DollarSign size={18} />}>
                        <div className="space-y-6">
                            <InputGroup label="Sales Price (৳)" required>
                                <input 
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    type="number" 
                                    placeholder="0.00" 
                                    className="pro-input font-black text-lg"
                                />
                            </InputGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Old Price">
                                    <input 
                                        name="oldPrice"
                                        value={formData.oldPrice}
                                        onChange={handleInputChange}
                                        type="number" 
                                        placeholder="0.00" 
                                        className="pro-input text-gray-400"
                                    />
                                </InputGroup>
                                <InputGroup label="Stock" required>
                                    <input 
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        type="number" 
                                        placeholder="0" 
                                        className="pro-input"
                                    />
                                </InputGroup>
                            </div>
                            <InputGroup label="Cost Price (Internal Only)">
                                <input 
                                    name="costPrice"
                                    value={formData.costPrice}
                                    onChange={handleInputChange}
                                    type="number" 
                                    placeholder="Your buying price" 
                                    className="pro-input text-xs"
                                />
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Flags & Status */}
                    <SectionCard title="Status & Tags" icon={<BarChart size={18} />}>
                        <div className="space-y-4">
                             <InputGroup label="Product Status">
                                <select name="status" value={formData.status} onChange={handleInputChange} className="pro-input font-bold">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </InputGroup>

                            <div className="pt-4 grid grid-cols-1 gap-3">
                                <ToggleSwitch 
                                    label="Featured Product" 
                                    checked={formData.isFeatured} 
                                    onChange={() => setFormData(p => ({...p, isFeatured: !p.isFeatured}))} 
                                />
                                <ToggleSwitch 
                                    label="Flash Sale" 
                                    checked={formData.isFlashSale} 
                                    onChange={() => setFormData(p => ({...p, isFlashSale: !p.isFlashSale}))} 
                                />
                                <ToggleSwitch 
                                    label="New Arrival" 
                                    checked={formData.isNewArrival} 
                                    onChange={() => setFormData(p => ({...p, isNewArrival: !p.isNewArrival}))} 
                                />
                                <ToggleSwitch 
                                    label="Best Seller" 
                                    checked={formData.isBestSeller} 
                                    onChange={() => setFormData(p => ({...p, isBestSeller: !p.isBestSeller}))} 
                                />
                            </div>
                        </div>
                    </SectionCard>
                </div>
            </form>

            <style jsx global>{`
                .pro-input {
                    @apply w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-3.5 text-sm font-semibold text-accent dark:text-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all duration-300;
                }
            `}</style>
        </div>
    );
};

// --- Helper Components ---

const SectionCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 sm:p-8 border border-gray-100/50 dark:border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                {icon}
            </div>
            <h2 className="text-xl font-black text-accent dark:text-white tracking-tight">{title}</h2>
        </div>
        {children}
    </div>
);

const InputGroup = ({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) => (
    <div className="space-y-2.5">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            {label} {required && <span className="text-primary">*</span>}
        </label>
        {children}
    </div>
);

const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div 
        onClick={onChange}
        className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 cursor-pointer hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
    >
        <span className="text-sm font-bold text-accent dark:text-gray-300">{label}</span>
        <div className={`w-12 h-6 rounded-full transition-all relative ${checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-7' : 'left-1'}`} />
        </div>
    </div>
);

const TrendingUp = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

export default AddProductPage;