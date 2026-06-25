import React from 'react';
import { Truck, Box } from 'lucide-react';
import { UseFormRegister, Control, Controller } from 'react-hook-form';
import { SectionCard, InputGroup, ToggleSwitch, inputClasses } from './FormHelpers';

interface InventoryShippingProps {
    register: UseFormRegister<any>;
    control: Control<any>;
}

export const InventoryShipping = ({ register, control }: InventoryShippingProps) => {
    return (
        <SectionCard title="Inventory & Logistics" icon={<Truck size={18} />} color="secondary">
            <div className="space-y-8">
                {/* Inventory Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Low Stock Threshold">
                        <input {...register("lowStockThreshold")} type="number" placeholder="5" className={inputClasses} />
                    </InputGroup>
                    <div className="pt-6">
                        <Controller
                            name="allowBackorder"
                            control={control}
                            render={({ field }) => (
                                <ToggleSwitch
                                    label="Allow Backorders"
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Shipping Details */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Weight (kg)">
                            <input {...register("weight")} type="number" step="0.01" placeholder="0.00" className={inputClasses} />
                        </InputGroup>
                        <InputGroup label="Shipping Class">
                            <input {...register("shippingClass")} type="text" placeholder="e.g. Standard, Heavy" className={inputClasses} />
                        </InputGroup>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Box size={14} /> Dimensions (cm)
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <input {...register("length")} type="number" placeholder="Length" className={`${inputClasses} text-center px-2`} />
                            <input {...register("width")} type="number" placeholder="Width" className={`${inputClasses} text-center px-2`} />
                            <input {...register("height")} type="number" placeholder="Height" className={`${inputClasses} text-center px-2`} />
                        </div>
                    </div>
                </div>
            </div>
        </SectionCard>
    );
};
