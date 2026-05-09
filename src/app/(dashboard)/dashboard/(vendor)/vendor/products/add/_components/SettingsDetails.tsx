import React from 'react';
import { BarChart } from 'lucide-react';
import { UseFormRegister, Control, Controller } from 'react-hook-form';
import { SectionCard, InputGroup, ToggleSwitch, inputClasses } from './FormHelpers';

interface SettingsDetailsProps {
    register: UseFormRegister<any>;
    control: Control<any>;
}

export const SettingsDetails = ({ register, control }: SettingsDetailsProps) => {
    return (
        <SectionCard title="Settings" icon={<BarChart size={16} />} color="secondary">
            <div className="space-y-4">
                <InputGroup label="Listing Status">
                    <select {...register("status")} className={`${inputClasses} py-2`}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                    </select>
                </InputGroup>
                <div className="grid grid-cols-1 gap-2">
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
            </div>
        </SectionCard>
    );
};
