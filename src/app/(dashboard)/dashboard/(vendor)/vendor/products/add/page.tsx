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

            const response = await publicAxios.post('/products', finalData);
            
            if (response.data.success) {
                toast.success('Product added successfully!');
            }
        } catch (error: any) {
            console.error('Add Product Error:', error);
            toast.error(error?.response?.data?.message || 'Failed to add product');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-[20px] px-5 py-4 text-sm font-bold text-accent dark:text-white outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all duration-300 shadow-sm placeholder:text-gray-300 placeholder:font-medium";

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 lg:p-12 min-h-screen bg-gray-50/50 dark:bg-gray-950">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
                        <div className="w-8 h-px bg-primary/30" />
                        Inventory System
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-accent dark:text-white tracking-tight leading-none">
                        New <span className="text-primary">Master</span> Listing
                    </h1>
                    <p className="text-gray-500 mt-4 max-w-md font-medium">Create a high-converting product listing with our intelligent dashboard.</p>
                </motion.div>
                
                <div className="flex gap-3">
                    <button className="px-6 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-accent dark:text-white text-sm hover:border-primary/30 transition-all shadow-sm">
                        Save Draft
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 hover:bg-accent transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Publishing...' : 'Publish Product'}
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Basic Info Card */}
                    <SectionCard title="Product Essence" icon={<Info size={18} />} color="primary">
                        <div className="space-y-6">
                            <InputGroup label="Official Product Title" required>
                                <IconInput icon={<Package size={18} />}>
                                    <input 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        type="text" 
                                        placeholder="e.g. MacBook Pro M3 Max" 
                                        className={`${inputClasses} pl-12`}
                                    />
                                </IconInput>
                            </InputGroup>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Brand Name" required>
                                    <IconInput icon={<Tag size={18} />}>
                                        <input 
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleInputChange}
                                            type="text" 
                                            placeholder="e.g. Apple" 
                                            className={`${inputClasses} pl-12`}
                                        />
                                    </IconInput>
                                </InputGroup>
                                <InputGroup label="Universal SKU">
                                    <IconInput icon={<BarChart size={18} />}>
                                        <input 
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleInputChange}
                                            type="text" 
                                            placeholder="e.g. LAP-MBP-2024" 
                                            className={`${inputClasses} pl-12`}
                                        />
                                    </IconInput>
                                </InputGroup>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Primary Category" required>
                                    <IconInput icon={<ChevronDown size={18} />}>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className={`${inputClasses} pl-12 appearance-none`}>
                                            <option value="">Select Category</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Computers">Computers</option>
                                            <option value="Accessories">Accessories</option>
                                        </select>
                                    </IconInput>
                                </InputGroup>
                                <InputGroup label="Sub-Category">
                                    <IconInput icon={<ChevronDown size={18} />}>
                                        <input 
                                            name="subCategory"
                                            value={formData.subCategory}
                                            onChange={handleInputChange}
                                            type="text" 
                                            placeholder="e.g. Laptops" 
                                            className={`${inputClasses} pl-12`}
                                        />
                                    </IconInput>
                                </InputGroup>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Description Card */}
                    <SectionCard title="Product Narrative" icon={<FileText size={18} />} color="secondary">
                        <div className="space-y-6">
                            <InputGroup label="Highlight Summary">
                                <textarea 
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleInputChange}
                                    rows={3} 
                                    placeholder="Quick overview for customers..." 
                                    className={`${inputClasses} resize-none`}
                                />
                            </InputGroup>
                            <InputGroup label="Full Product Story" required>
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={8} 
                                    placeholder="Tell the full story behind your product..." 
                                    className={`${inputClasses} resize-none`}
                                />
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Specifications Card */}
                    <SectionCard title="Technical DNA" icon={<Settings size={18} />} color="accent">
                        <div className="space-y-4">
                            {formData.specifications.map((spec, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <input 
                                        placeholder="Attribute" 
                                        value={spec.key}
                                        onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                                        className={inputClasses}
                                    />
                                    <input 
                                        placeholder="Detail" 
                                        value={spec.value}
                                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                        className={inputClasses}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeSpecification(index)}
                                        className="p-4 text-red-500 hover:bg-red-500 hover:text-white rounded-[20px] transition-all border border-red-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}
                            <button 
                                type="button"
                                onClick={addSpecification}
                                className="w-full py-4 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[24px] text-gray-500 font-bold text-sm hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={18} />
                                Add Technical Spec
                            </button>
                        </div>
                    </SectionCard>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    
                    {/* Media Card */}
                    <SectionCard title="Visual Identity" icon={<ImageIcon size={18} />} color="primary">
                        <div className="space-y-6">
                            <InputGroup label="Main Thumbnail Link" required>
                                <IconInput icon={<ImageIcon size={18} />}>
                                    <input 
                                        name="thumbnail"
                                        value={formData.thumbnail}
                                        onChange={handleInputChange}
                                        type="text" 
                                        placeholder="Image URL" 
                                        className={`${inputClasses} pl-12`}
                                    />
                                </IconInput>
                            </InputGroup>
                            
                            <div className="p-10 rounded-[32px] bg-linear-to-br from-primary/5 to-secondary/5 border-2 border-dashed border-primary/30 flex flex-col items-center text-center group hover:border-primary transition-all cursor-pointer">
                                <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-[20px] shadow-lg flex items-center justify-center text-primary group-hover:scale-110 transition-all mb-4">
                                    <Upload size={24} />
                                </div>
                                <p className="text-sm font-black text-accent dark:text-white mb-1">Gallery Upload</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Supports PNG, JPG</p>
                            </div>

                            <InputGroup label="Product Video URL">
                                <IconInput icon={<Video size={18} />}>
                                    <input 
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleInputChange}
                                        type="text" 
                                        placeholder="Youtube Link" 
                                        className={`${inputClasses} pl-12`}
                                    />
                                </IconInput>
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Pricing & Stock */}
                    <SectionCard title="Commerce" icon={<DollarSign size={18} />} color="secondary">
                        <div className="space-y-6">
                            <InputGroup label="Listing Price" required>
                                <IconInput icon={<span className="font-black text-lg">৳</span>}>
                                    <input 
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        type="number" 
                                        placeholder="0.00" 
                                        className={`${inputClasses} pl-12 font-black text-xl text-primary`}
                                    />
                                </IconInput>
                            </InputGroup>
                            <div className="grid grid-cols-1 gap-4">
                                <InputGroup label="Regular Price (Compare)">
                                    <input 
                                        name="oldPrice"
                                        value={formData.oldPrice}
                                        onChange={handleInputChange}
                                        type="number" 
                                        placeholder="৳ 0.00" 
                                        className={inputClasses}
                                    />
                                </InputGroup>
                                <InputGroup label="Available Stock" required>
                                    <IconInput icon={<Package size={18} />}>
                                        <input 
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            type="number" 
                                            placeholder="Quantity" 
                                            className={`${inputClasses} pl-12`}
                                        />
                                    </IconInput>
                                </InputGroup>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Marketing Flags */}
                    <SectionCard title="Growth & Visibility" icon={<BarChart size={18} />} color="primary">
                        <div className="space-y-4">
                             <InputGroup label="Listing Status">
                                <select name="status" value={formData.status} onChange={handleInputChange} className={`${inputClasses} font-bold bg-gray-50`}>
                                    <option value="active">🟢 Active Now</option>
                                    <option value="inactive">🔴 Inactive</option>
                                    <option value="draft">🟡 Draft</option>
                                </select>
                            </InputGroup>

                            <div className="pt-4 space-y-3">
                                <ToggleSwitch 
                                    label="Featured Product" 
                                    checked={formData.isFeatured} 
                                    onChange={() => setFormData(p => ({...p, isFeatured: !p.isFeatured}))} 
                                    color="orange"
                                />
                                <ToggleSwitch 
                                    label="Flash Sale" 
                                    checked={formData.isFlashSale} 
                                    onChange={() => setFormData(p => ({...p, isFlashSale: !p.isFlashSale}))} 
                                    color="red"
                                />
                                <ToggleSwitch 
                                    label="Best Seller Tag" 
                                    checked={formData.isBestSeller} 
                                    onChange={() => setFormData(p => ({...p, isBestSeller: !p.isBestSeller}))} 
                                    color="blue"
                                />
                            </div>
                        </div>
                    </SectionCard>
                </div>
            </form>
        </div>
    );
};

// --- Helper Components ---

const IconInput = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="relative flex items-center group w-full">
        <div className="absolute left-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10">
            {icon}
        </div>
        {children}
    </div>
);

const SectionCard = ({ title, icon, children, color = 'primary' }: { title: string, icon: React.ReactNode, children: React.ReactNode, color?: string }) => {
    const colorClass = color === 'primary' ? 'bg-primary/10 text-primary' : color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent';
    const borderClass = color === 'primary' ? 'border-primary/10' : color === 'secondary' ? 'border-secondary/10' : 'border-accent/10';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-white dark:bg-gray-900 rounded-[40px] p-8 sm:p-10 border ${borderClass} shadow-[0_30px_70px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all duration-500`}
        >
            <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 ${colorClass} rounded-2xl flex items-center justify-center`}>
                    {icon}
                </div>
                <h2 className="text-2xl font-black text-accent dark:text-white tracking-tight">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
};

const InputGroup = ({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) => (
    <div className="space-y-3 w-full">
        <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
            {label} {required && <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(252,99,42,0.5)]" />}
        </label>
        {children}
    </div>
);

const ToggleSwitch = ({ label, checked, onChange, color = 'orange' }: { label: string, checked: boolean, onChange: () => void, color?: string }) => {
    const activeColor = color === 'orange' ? 'bg-[#FC632A]' : color === 'red' ? 'bg-red-500' : 'bg-[#1460A9]';
    
    return (
        <div 
            onClick={onChange}
            className={`flex items-center justify-between p-5 rounded-[24px] cursor-pointer transition-all border ${checked ? 'bg-white dark:bg-gray-800 shadow-lg border-gray-100 dark:border-gray-700' : 'bg-gray-100/50 dark:bg-gray-900/50 border-transparent hover:bg-gray-100 dark:hover:bg-gray-900'}`}
        >
            <span className={`text-sm font-black ${checked ? 'text-accent dark:text-white' : 'text-gray-400'}`}>{label}</span>
            <div className={`w-14 h-7 rounded-full transition-all relative ${checked ? activeColor : 'bg-gray-300 dark:bg-gray-700'}`}>
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${checked ? 'left-8' : 'left-1'}`} />
            </div>
        </div>
    );
};

const TrendingUp = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

export default AddProductPage;