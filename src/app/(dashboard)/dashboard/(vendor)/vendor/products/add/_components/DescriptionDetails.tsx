import React from 'react';
import { FileText } from 'lucide-react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SectionCard, InputGroup, inputClasses } from './FormHelpers';

interface DescriptionDetailsProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

export const DescriptionDetails = ({ register, errors }: DescriptionDetailsProps) => {
    return (
        <SectionCard title="Description" icon={<FileText size={16} />} color="accent">
            <div className="grid grid-cols-1 gap-6">
                <InputGroup label="Short Description" required error={errors.shortDescription?.message as string}>
                    <textarea {...register("shortDescription", { required: "Short Description is required" })} rows={5} placeholder="Brief summary..." className={`${inputClasses} text-sm resize-none`} />
                </InputGroup>
                <InputGroup label="Full Description" required error={errors.description?.message as string}>
                    <textarea {...register("description", { required: "Description is required" })} rows={8} placeholder="Full product details..." className={`${inputClasses} text-sm resize-none`} />
                </InputGroup>
            </div>
        </SectionCard>
    );
};
