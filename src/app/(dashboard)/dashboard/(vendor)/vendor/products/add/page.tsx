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
        <div className="w-full p-4 sm:p-6 min-h-screen bg-gray-50/30 dark:bg-gray-950">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-2xl sm:text-3xl font-black text-accent dark:text-white tracking-tight">
                        Add New <span className="text-primary">Product</span>
                    </h1>
                    <p className="text-gray-500 text-xs mt-1 font-medium italic">Configure your premium listing with Modular Components.</p>
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