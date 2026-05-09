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
            if (response.data.success) toast.success('Product added successfully!');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to add product');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-[13px] font-bold text-accent dark:text-white outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all shadow-sm placeholder:text-gray-300 placeholder:font-medium";

    return (
        <div className="w-full p-4 sm:p-6 min-h-screen bg-gray-50/30 dark:bg-gray-950">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-2xl sm:text-3xl font-black text-accent dark:text-white tracking-tight">
                        Add New <span className="text-primary">Product</span>
                    </h1>
                    <p className="text-gray-500 text-xs mt-1 font-medium italic">Configure your premium listing according to standard specifications.</p>
                </motion.div>
                
                <div className="flex gap-2">
                    <button className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-accent dark:text-white text-xs hover:border-primary/30 transition-all shadow-sm">
                        Draft
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-accent transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Wait...' : 'Publish'}
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                
                {/* Left Side - 3 Columns on Large screens */}
                <div className="xl:col-span-3 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <SectionCard title="Basic Details" icon={<Info size={16} />} color="primary">
                            <div className="space-y-4">
                                <InputGroup label="Product Name" required>
                                    <IconInput icon={<Package size={16} />}>
                                        <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Product Name" className={`${inputClasses} pl-10`} />
                                    </IconInput>
                                </InputGroup>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Slug">
                                        <input name="slug" value={formData.slug} onChange={handleInputChange} type="text" placeholder="slug-path" className={inputClasses} />
                                    </InputGroup>
                                    <InputGroup label="Brand" required>
                                        <input name="brand" value={formData.brand} onChange={handleInputChange} type="text" placeholder="Brand" className={inputClasses} />
                                    </InputGroup>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Category" required>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className={`${inputClasses} appearance-none`}>
                                            <option value="">Select</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Fashion">Fashion</option>
                                        </select>
                                    </InputGroup>
                                    <InputGroup label="Sub-Category">
                                        <input name="subCategory" value={formData.subCategory} onChange={handleInputChange} type="text" placeholder="Sub Category" className={inputClasses} />
                                    </InputGroup>
                                </div>
                            </div>
                        </SectionCard>

                        {/* Inventory & Pricing */}
                        <SectionCard title="Commerce" icon={<DollarSign size={16} />} color="secondary">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Price (৳)" required>
                                        <input name="price" value={formData.price} onChange={handleInputChange} type="number" placeholder="0.00" className={`${inputClasses} text-primary`} />
                                    </InputGroup>
                                    <InputGroup label="Old Price">
                                        <input name="oldPrice" value={formData.oldPrice} onChange={handleInputChange} type="number" placeholder="0.00" className={inputClasses} />
                                    </InputGroup>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Cost Price">
                                        <input name="costPrice" value={formData.costPrice} onChange={handleInputChange} type="number" placeholder="0.00" className={inputClasses} />
                                    </InputGroup>
                                    <InputGroup label="Stock" required>
                                        <input name="stock" value={formData.stock} onChange={handleInputChange} type="number" placeholder="0" className={inputClasses} />
                                    </InputGroup>
                                </div>
                                <InputGroup label="SKU">
                                    <input name="sku" value={formData.sku} onChange={handleInputChange} type="text" placeholder="Unique SKU" className={inputClasses} />
                                </InputGroup>
                            </div>
                        </SectionCard>
                    </div>

                    {/* Narrative */}
                    <SectionCard title="Description" icon={<FileText size={16} />} color="accent">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Short Description">
                                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} rows={4} placeholder="Brief summary..." className={`${inputClasses} resize-none`} />
                            </InputGroup>
                            <InputGroup label="Full Description" required>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Full product details..." className={`${inputClasses} resize-none`} />
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Specifications */}
                    <SectionCard title="Technical Specs" icon={<Settings size={16} />} color="primary">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {formData.specifications.map((spec, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input placeholder="Key" value={spec.key} onChange={(e) => handleSpecChange(index, 'key', e.target.value)} className={`${inputClasses} py-2 px-3`} />
                                    <input placeholder="Value" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} className={`${inputClasses} py-2 px-3`} />
                                    <button type="button" onClick={() => removeSpecification(index)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addSpecification} className="py-2 border border-dashed border-gray-300 rounded-xl text-gray-400 text-xs font-bold hover:text-primary flex items-center justify-center gap-1">
                                <Plus size={14} /> Add Spec
                            </button>
                        </div>
                    </SectionCard>
                </div>

                {/* Right Side - 1 Column */}
                <div className="space-y-6">
                    {/* Media */}
                    <SectionCard title="Media" icon={<ImageIcon size={16} />} color="primary">
                        <div className="space-y-4">
                            <InputGroup label="Thumbnail URL" required>
                                <input name="thumbnail" value={formData.thumbnail} onChange={handleInputChange} type="text" placeholder="URL" className={inputClasses} />
                            </InputGroup>
                            <InputGroup label="Video URL">
                                <input name="videoUrl" value={formData.videoUrl} onChange={handleInputChange} type="text" placeholder="URL" className={inputClasses} />
                            </InputGroup>
                            <div className="p-6 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center text-center bg-primary/5">
                                <Upload size={20} className="text-primary mb-2" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image Gallery</span>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Status & SEO */}
                    <SectionCard title="Settings & SEO" icon={<BarChart size={16} />} color="secondary">
                        <div className="space-y-4">
                            <InputGroup label="Listing Status">
                                <select name="status" value={formData.status} onChange={handleInputChange} className={`${inputClasses} py-2`}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </InputGroup>
                            <div className="grid grid-cols-2 gap-2">
                                <ToggleSwitch label="Featured" checked={formData.isFeatured} onChange={() => setFormData(p => ({...p, isFeatured: !p.isFeatured}))} />
                                <ToggleSwitch label="Flash Sale" checked={formData.isFlashSale} onChange={() => setFormData(p => ({...p, isFlashSale: !p.isFlashSale}))} />
                                <ToggleSwitch label="New" checked={formData.isNewArrival} onChange={() => setFormData(p => ({...p, isNewArrival: !p.isNewArrival}))} />
                                <ToggleSwitch label="Best" checked={formData.isBestSeller} onChange={() => setFormData(p => ({...p, isBestSeller: !p.isBestSeller}))} />
                            </div>
                            <InputGroup label="Meta Title">
                                <input name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} type="text" className={inputClasses} />
                            </InputGroup>
                        </div>
                    </SectionCard>
                </div>
            </form>
        </div>
    );
};

// --- Helper Components ---
const IconInput = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="relative flex items-center w-full">
        <div className="absolute left-4 text-gray-400 z-10">{icon}</div>
        {children}
    </div>
);

const SectionCard = ({ title, icon, children, color = 'primary' }: { title: string, icon: React.ReactNode, children: React.ReactNode, color?: string }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color === 'primary' ? 'bg-primary/10 text-primary' : color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'}`}>
                {icon}
            </div>
            <h2 className="text-sm font-black text-accent dark:text-white uppercase tracking-wider">{title}</h2>
        </div>
        {children}
    </motion.div>
);

const InputGroup = ({ label, required, children }: { label: string, required?: boolean, children: React.ReactNode }) => (
    <div className="space-y-1.5 w-full">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            {label} {required && <span className="text-primary">*</span>}
        </label>
        {children}
    </div>
);

const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div onClick={onChange} className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${checked ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 border-transparent'}`}>
        <span className={`text-[10px] font-bold ${checked ? 'text-primary' : 'text-gray-400'}`}>{label}</span>
        <div className={`w-8 h-4 rounded-full transition-all relative ${checked ? 'bg-primary' : 'bg-gray-200'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${checked ? 'left-4.5' : 'left-0.5'}`} />
        </div>
    </div>
);

const TrendingUp = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

export default AddProductPage;