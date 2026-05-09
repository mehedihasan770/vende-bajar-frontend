import React from 'react';
import { BarChart } from 'lucide-react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SectionCard, InputGroup, inputClasses } from './FormHelpers';

interface SEODetailsProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

export const SEODetails = ({ register, errors }: SEODetailsProps) => {
    return (
        <SectionCard title="Search Engine Optimization (SEO)" icon={<BarChart size={16} />} color="secondary">
            <div className="space-y-6">
                <InputGroup label="Meta Title" required error={errors.metaTitle?.message as string}>
                    <input 
                        {...register("metaTitle", { required: "Meta Title is required" })} 
                        type="text" 
                        placeholder="Enter premium meta title..." 
                        className={`${inputClasses} text-sm py-3`} 
                    />
                </InputGroup>
                <InputGroup label="Meta Description" required error={errors.metaDescription?.message as string}>
                    <textarea 
                        {...register("metaDescription", { required: "Meta Description is required" })} 
                        rows={5} 
                        placeholder="Enter high-converting meta description..." 
                        className={`${inputClasses} text-sm resize-none`} 
                    />
                </InputGroup>
            </div>
        </SectionCard>
    );
};
