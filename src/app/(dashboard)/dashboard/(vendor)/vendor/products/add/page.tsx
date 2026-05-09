'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Upload, Plus, Package, DollarSign, Tag, FileText, 
    Info, Image as ImageIcon, Video, Settings, BarChart, 
    Trash2, ChevronDown 
} from 'lucide-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { getBrowserUser } from '@/utils/getBrowserUser';
import { publicAxios } from '@/lib/axios';

interface ProductFormValues {
    vendorEmail: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    category: string;
    subCategory: string;
    brand: string;
    price: number;
    oldPrice?: number;
    costPrice?: number;
    stock: number;
    sku: string;
    thumbnail: string;
    images: string[];
    videoUrl: string;
    specifications: { key: string; value: string }[];
    isFeatured: boolean;
    isFlashSale: boolean;
    isNewArrival: boolean;
    isBestSeller: boolean;
    status: string;
    metaTitle: string;
    metaDescription: string;
}

const AddProductPage = () => {
    const user = getBrowserUser();
    const [isLoading, setIsLoading] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
        defaultValues: {
            vendorEmail: user?.email || '',
            name: '',
            slug: '',
            description: '',
            shortDescription: '',
            category: '',
            subCategory: '',
            brand: '',
            price: 0,
            stock: 0,
            specifications: [{ key: '', value: '' }],
            isFeatured: false,
            isFlashSale: false,
            isNewArrival: true,
            isBestSeller: false,
            status: 'active',
            metaTitle: '',
            metaDescription: '',
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "specifications"
    });

    const onSubmit = async (data: ProductFormValues) => {
        setIsLoading(true);
        try {
            const specsObject = data.specifications.reduce((acc, spec) => {
                if (spec.key && spec.value) acc[spec.key] = spec.value;
                return acc;
            }, {} as Record<string, string>);

            const finalData = {
                ...data,
                specifications: specsObject,
                price: Number(data.price),
                oldPrice: data.oldPrice ? Number(data.oldPrice) : undefined,
                costPrice: data.costPrice ? Number(data.costPrice) : undefined,
                stock: Number(data.stock),
            };

            const response = await publicAxios.post('/products', finalData);
            if (response.data.success) {
                toast.success('Product published successfully!');
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to publish product');
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
                    <p className="text-gray-500 text-xs mt-1 font-medium italic">Configure your premium listing with React Hook Form.</p>
                </motion.div>
                
                <div className="flex gap-2">
                    <button type="button" className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-accent dark:text-white text-xs hover:border-primary/30 transition-all shadow-sm">
                        Draft
                    </button>
                    <button 
                        onClick={handleSubmit(onSubmit)}
                        disabled={isLoading}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-accent transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Wait...' : 'Publish'}
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                
                {/* Left Side */}
                <div className="xl:col-span-3 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <SectionCard title="Basic Details" icon={<Info size={16} />} color="primary">
                            <div className="space-y-4">
                                <InputGroup label="Product Name" required error={errors.name?.message}>
                                    <IconInput icon={<Package size={16} />}>
                                        <input 
                                            {...register("name", { required: "Product name is required" })}
                                            type="text" 
                                            placeholder="Product Name" 
                                            className={`${inputClasses} pl-10`} 
                                        />
                                    </IconInput>
                                </InputGroup>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Slug">
                                        <input {...register("slug")} type="text" placeholder="slug-path" className={inputClasses} />
                                    </InputGroup>
                                    <InputGroup label="Brand" required error={errors.brand?.message}>
                                        <input {...register("brand", { required: "Brand is required" })} type="text" placeholder="Brand" className={inputClasses} />
                                    </InputGroup>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Category" required error={errors.category?.message}>
                                        <select {...register("category", { required: "Category is required" })} className={`${inputClasses} appearance-none`}>
                                            <option value="">Select</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Home">Home</option>
                                        </select>
                                    </InputGroup>
                                    <InputGroup label="Sub-Category">
                                        <input {...register("subCategory")} type="text" placeholder="Sub Category" className={inputClasses} />
                                    </InputGroup>
                                </div>
                            </div>
                        </SectionCard>

                        {/* Inventory & Pricing */}
                        <SectionCard title="Commerce" icon={<DollarSign size={16} />} color="secondary">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Price (৳)" required error={errors.price?.message}>
                                        <input {...register("price", { required: "Price is required" })} type="number" placeholder="0.00" className={`${inputClasses} text-primary`} />
                                    </InputGroup>
                                    <InputGroup label="Old Price">
                                        <input {...register("oldPrice")} type="number" placeholder="0.00" className={inputClasses} />
                                    </InputGroup>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup label="Cost Price">
                                        <input {...register("costPrice")} type="number" placeholder="0.00" className={inputClasses} />
                                    </InputGroup>
                                    <InputGroup label="Stock" required error={errors.stock?.message}>
                                        <input {...register("stock", { required: "Stock is required" })} type="number" placeholder="0" className={inputClasses} />
                                    </InputGroup>
                                </div>
                                <InputGroup label="SKU">
                                    <input {...register("sku")} type="text" placeholder="Unique SKU" className={inputClasses} />
                                </InputGroup>
                            </div>
                        </SectionCard>
                    </div>

                    {/* Narrative */}
                    <SectionCard title="Description" icon={<FileText size={16} />} color="accent">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Short Description">
                                <textarea {...register("shortDescription")} rows={4} placeholder="Brief summary..." className={`${inputClasses} resize-none`} />
                            </InputGroup>
                            <InputGroup label="Full Description" required error={errors.description?.message}>
                                <textarea {...register("description", { required: "Description is required" })} rows={4} placeholder="Full product details..." className={`${inputClasses} resize-none`} />
                            </InputGroup>
                        </div>
                    </SectionCard>

                    {/* Specifications */}
                    <SectionCard title="Technical Specs" icon={<Settings size={16} />} color="primary">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <input 
                                        {...register(`specifications.${index}.key` as const)}
                                        placeholder="Key" 
                                        className={`${inputClasses} py-2 px-3`} 
                                    />
                                    <input 
                                        {...register(`specifications.${index}.value` as const)}
                                        placeholder="Value" 
                                        className={`${inputClasses} py-2 px-3`} 
                                    />
                                    <button type="button" onClick={() => remove(index)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => append({ key: '', value: '' })} className="py-2 border border-dashed border-gray-300 rounded-xl text-gray-400 text-xs font-bold hover:text-primary flex items-center justify-center gap-1">
                                <Plus size={14} /> Add Spec
                            </button>
                        </div>
                    </SectionCard>
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                    {/* Media */}
                    <SectionCard title="Media" icon={<ImageIcon size={16} />} color="primary">
                        <div className="space-y-4">
                            <InputGroup label="Thumbnail URL" required error={errors.thumbnail?.message}>
                                <input {...register("thumbnail", { required: "Thumbnail is required" })} type="text" placeholder="URL" className={inputClasses} />
                            </InputGroup>
                            <InputGroup label="Video URL">
                                <input {...register("videoUrl")} type="text" placeholder="URL" className={inputClasses} />
                            </InputGroup>
                            <div className="p-6 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center text-center bg-primary/5">
                                <Upload size={20} className="text-primary mb-2" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image Gallery</span>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Settings */}
                    <SectionCard title="Settings & SEO" icon={<BarChart size={16} />} color="secondary">
                        <div className="space-y-4">
                            <InputGroup label="Listing Status">
                                <select {...register("status")} className={`${inputClasses} py-2`}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </InputGroup>
                            <div className="grid grid-cols-2 gap-2">
                                <Controller
                                    name="isFeatured"
                                    control={control}
                                    render={({ field }) => (
                                        <ToggleSwitch label="Featured" checked={field.value} onChange={() => field.onChange(!field.value)} />
                                    )}
                                />
                                <Controller
                                    name="isFlashSale"
                                    control={control}
                                    render={({ field }) => (
                                        <ToggleSwitch label="Flash Sale" checked={field.value} onChange={() => field.onChange(!field.value)} />
                                    )}
                                />
                                <Controller
                                    name="isNewArrival"
                                    control={control}
                                    render={({ field }) => (
                                        <ToggleSwitch label="New" checked={field.value} onChange={() => field.onChange(!field.value)} />
                                    )}
                                />
                                <Controller
                                    name="isBestSeller"
                                    control={control}
                                    render={({ field }) => (
                                        <ToggleSwitch label="Best" checked={field.value} onChange={() => field.onChange(!field.value)} />
                                    )}
                                />
                            </div>
                            <InputGroup label="Meta Title">
                                <input {...register("metaTitle")} type="text" className={inputClasses} />
                            </InputGroup>
                            <InputGroup label="Meta Description">
                                <textarea {...register("metaDescription")} rows={2} className={`${inputClasses} resize-none`} />
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

const InputGroup = ({ label, required, error, children }: { label: string, required?: boolean, error?: string, children: React.ReactNode }) => (
    <div className="space-y-1.5 w-full">
        <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {label} {required && <span className="text-primary">*</span>}
            </label>
            {error && <span className="text-[9px] font-bold text-red-500 italic">{error}</span>}
        </div>
        {children}
    </div>
);

const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div onClick={onChange} className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${checked ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 dark:bg-gray-800 border-transparent'}`}>
        <span className={`text-[10px] font-bold ${checked ? 'text-primary' : 'text-gray-400'}`}>{label}</span>
        <div className={`w-8 h-4 rounded-full transition-all relative ${checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${checked ? 'left-4.5' : 'left-0.5'}`} />
        </div>
    </div>
);

export default AddProductPage;