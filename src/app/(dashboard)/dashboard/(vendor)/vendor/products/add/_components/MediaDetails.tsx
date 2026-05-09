import React from 'react';
import { ImageIcon, Upload } from 'lucide-react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SectionCard, InputGroup, inputClasses } from './FormHelpers';

interface MediaDetailsProps {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
}

export const MediaDetails = ({ register, errors }: MediaDetailsProps) => {
    return (
        <SectionCard title="Media" icon={<ImageIcon size={16} />} color="primary">
            <div className="space-y-4">
                <InputGroup label="Thumbnail URL" required error={errors.thumbnail?.message as string}>
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
    );
};
