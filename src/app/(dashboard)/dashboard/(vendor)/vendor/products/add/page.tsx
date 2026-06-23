'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { getBrowserUser } from '@/utils/getBrowserUser';
import { publicAxios } from '@/lib/axios';

// Import Modular Components
import { BasicDetails } from './_components/BasicDetails';
import { CommerceDetails } from './_components/CommerceDetails';
import { DescriptionDetails } from './_components/DescriptionDetails';
import { TechnicalSpecs } from './_components/TechnicalSpecs';
import { MediaDetails } from './_components/MediaDetails';
import { SettingsDetails } from './_components/SettingsDetails';
import { SEODetails } from './_components/SEODetails';

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

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Vendor Module</span>
                    </div>
                    <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">Add Product</h2>
                    <p className="text-[12px] md:text-[13px] text-gray-500 mt-2 font-medium flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        Path: <code className="bg-gray-50 text-primary border border-gray-100 px-1.5 py-0.5 rounded font-mono text-[11px]">vendor/products/add</code>
                    </p>
                </motion.div>
                
                <div className="flex gap-2">
                    <button type="button" className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 text-xs hover:border-primary/30 transition-all shadow-sm">
                        Draft
                    </button>
                    <button 
                        onClick={handleSubmit(onSubmit)}
                        disabled={isLoading}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-gray-900 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Wait...' : 'Publish'}
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left Side (Main Content) */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <BasicDetails register={register} errors={errors} />
                        <CommerceDetails register={register} errors={errors} />
                    </div>
                    <DescriptionDetails register={register} errors={errors} />
                    <TechnicalSpecs register={register} fields={fields} append={append} remove={remove} />
                    <SEODetails register={register} errors={errors} />
                </div>

                {/* Right Side (Sidebar) */}
                <div className="space-y-6">
                    <MediaDetails register={register} errors={errors} />
                    <SettingsDetails register={register} control={control} />
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;
