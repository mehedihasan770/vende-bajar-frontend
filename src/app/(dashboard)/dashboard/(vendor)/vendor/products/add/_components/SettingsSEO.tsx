import React from 'react';
import { Settings, Search } from 'lucide-react';
import { UseFormRegister, Control, Controller } from 'react-hook-form';
import { SectionCard, InputGroup, ToggleSwitch, inputClasses } from './FormHelpers';

interface SettingsSEOProps {
    register: UseFormRegister<any>;
    control: Control<any>;
}

export const SettingsSEO = ({ register, control }: SettingsSEOProps) => {
    return (
        <div className="space-y-6">
            <SectionCard title="Product Visibility" icon={<Settings size={18} />} color="accent">
                <div className="space-y-6">
                    <InputGroup label="Listing Status">
                        <select {...register("status")} className={`${inputClasses} appearance-none cursor-pointer`}>
                            <option value="pending">Pending Approval</option>
                            <option value="draft">Save as Draft</option>
                        </select>
                    </InputGroup>

                    <div className="space-y-3">
                        <Controller
                            name="isFeatured"
                            control={control}
                            render={({ field }) => (
                                <ToggleSwitch
                                    label="Featured Product"
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="isFlashSale"
                            control={control}
                            render={({ field }) => (
                                <ToggleSwitch
                                    label="Flash Sale Entry"
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="SEO Settings" icon={<Search size={18} />} color="primary">
                <div className="space-y-6">
                    <InputGroup label="Meta Title">
                        <input {...register("metaTitle")} type="text" placeholder="SEO optimized title..." className={inputClasses} />
                    </InputGroup>
                    <InputGroup label="Meta Description">
                        <textarea
                            {...register("metaDescription")}
                            rows={4}
                            placeholder="Brief description for search engines..."
                            className={`${inputClasses} resize-none`}
                        />
                    </InputGroup>
                </div>
            </SectionCard>
        </div>
    );
};
