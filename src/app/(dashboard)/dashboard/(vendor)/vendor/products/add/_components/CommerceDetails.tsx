import React from 'react';
import { DollarSign } from 'lucide-react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SectionCard, InputGroup, inputClasses } from './FormHelpers';

interface CommerceDetailsProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

export const CommerceDetails = ({ register, errors }: CommerceDetailsProps) => {
    return (
        <SectionCard title="Commerce" icon={<DollarSign size={16} />} color="secondary">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Price (৳)" required error={errors.price?.message as string}>
                        <input {...register("price", { required: "Price is required" })} type="number" placeholder="0.00" className={`${inputClasses} text-primary`} />
                    </InputGroup>
                    <InputGroup label="Old Price" required error={errors.oldPrice?.message as string}>
                        <input {...register("oldPrice", { required: "Old Price is required" })} type="number" placeholder="0.00" className={inputClasses} />
                    </InputGroup>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Cost Price" required error={errors.costPrice?.message as string}>
                        <input {...register("costPrice", { required: "Cost Price is required" })} type="number" placeholder="0.00" className={inputClasses} />
                    </InputGroup>
                    <InputGroup label="Stock" required error={errors.stock?.message as string}>
                        <input {...register("stock", { required: "Stock is required" })} type="number" placeholder="0" className={inputClasses} />
                    </InputGroup>
                </div>
                <InputGroup label="SKU" required error={errors.sku?.message as string}>
                    <input {...register("sku", { required: "SKU is required" })} type="text" placeholder="Unique SKU" className={inputClasses} />
                </InputGroup>
            </div>
        </SectionCard>
    );
};
