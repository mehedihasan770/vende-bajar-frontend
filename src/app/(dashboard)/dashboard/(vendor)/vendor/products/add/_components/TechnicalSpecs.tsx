import React from 'react';
import { Settings, Trash2, Plus } from 'lucide-react';
import { UseFormRegister, FieldArrayWithId } from 'react-hook-form';
import { SectionCard, inputClasses } from './FormHelpers';

interface TechnicalSpecsProps {
    register: UseFormRegister<any>;
    fields: FieldArrayWithId<any, "specifications", "id">[];
    append: (value: any) => void;
    remove: (index: number) => void;
}

export const TechnicalSpecs = ({ register, fields, append, remove }: TechnicalSpecsProps) => {
    return (
        <SectionCard title="Technical Specs" icon={<Settings size={16} />} color="primary">
            <div className="grid grid-cols-1 gap-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="flex-1 flex flex-col sm:flex-row gap-2">
                            <input 
                                {...register(`specifications.${index}.key` as const)}
                                placeholder="Key (e.g. Material)" 
                                className={`${inputClasses} py-2 px-3`} 
                            />
                            <input 
                                {...register(`specifications.${index}.value` as const)}
                                placeholder="Value (e.g. Leather)" 
                                className={`${inputClasses} py-2 px-3`} 
                            />
                        </div>
                        <button type="button" onClick={() => remove(index)} className="self-end sm:self-auto p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ key: '', value: '' })} className="py-2 border border-dashed border-gray-300 rounded-xl text-gray-400 text-xs font-bold hover:text-primary flex items-center justify-center gap-1">
                    <Plus size={14} /> Add Spec
                </button>
            </div>
        </SectionCard>
    );
};
