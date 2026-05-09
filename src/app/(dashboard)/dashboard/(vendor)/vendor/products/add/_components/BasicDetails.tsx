import React from 'react';
import { Info, Package } from 'lucide-react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SectionCard, InputGroup, IconInput, inputClasses } from './FormHelpers';

interface BasicDetailsProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

export const BasicDetails = ({ register, errors }: BasicDetailsProps) => {
    return (
        <SectionCard title="Basic Details" icon={<Info size={16} />} color="primary">
            <div className="space-y-4">
                <InputGroup label="Product Name" required error={errors.name?.message as string}>
                    <IconInput icon={<Package size={16} />}>
                        <input 
                            {...register("name", { required: "Product name is required" })}
                            type="text" 
                            placeholder="Product Name" 
                            className={`${inputClasses} pl-10`} 
                        />
                    </IconInput>
                </InputGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Slug" required error={errors.slug?.message as string}>
                        <input {...register("slug", { required: "Slug is required" })} type="text" placeholder="slug-path" className={inputClasses} />
                    </InputGroup>
                    <InputGroup label="Brand" required error={errors.brand?.message as string}>
                        <input {...register("brand", { required: "Brand is required" })} type="text" placeholder="Brand" className={inputClasses} />
                    </InputGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Category" required error={errors.category?.message as string}>
                        <select {...register("category", { required: "Category is required" })} className={`${inputClasses} appearance-none`}>
                            <option value="">Select</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Home">Home</option>
                        </select>
                    </InputGroup>
                    <InputGroup label="Sub-Category" required error={errors.subCategory?.message as string}>
                        <input {...register("subCategory", { required: "Sub-Category is required" })} type="text" placeholder="Sub Category" className={inputClasses} />
                    </InputGroup>
                </div>
            </div>
        </SectionCard>
    );
};
