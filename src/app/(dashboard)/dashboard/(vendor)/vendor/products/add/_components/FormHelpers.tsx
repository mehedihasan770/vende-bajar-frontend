import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SectionCard = ({ title, icon, children, color = 'primary' }: { title: string, icon: React.ReactNode, children: React.ReactNode, color?: string }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color === 'primary' ? 'bg-primary/10 text-primary' : color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'}`}>
                {icon}
            </div>
            <h2 className="text-sm font-black text-accent dark:text-white uppercase tracking-wider">{title}</h2>
        </div>
        {children}
    </motion.div>
);

export const InputGroup = ({ label, required, error, children }: { label: string, required?: boolean, error?: string, children: React.ReactNode }) => (
    <div className="space-y-1.5 w-full">
        <div className="relative flex justify-between items-center px-1 h-4">
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest truncate mr-2">
                {label} {required && <span className="text-primary">*</span>}
            </label>
            <AnimatePresence mode="wait">
                {error && (
                    <motion.span 
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        className="absolute right-1 text-[9px] font-bold text-red-500 italic whitespace-nowrap bg-white dark:bg-gray-900 pl-2"
                    >
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
        {children}
    </div>
);

export const IconInput = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="relative flex items-center w-full">
        <div className="absolute left-4 text-gray-400 z-10">{icon}</div>
        {children}
    </div>
);

export const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div onClick={onChange} className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${checked ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 dark:bg-gray-800 border-transparent'}`}>
        <span className={`text-[10px] font-bold ${checked ? 'text-primary' : 'text-gray-400'}`}>{label}</span>
        <div className={`w-8 h-4 rounded-full transition-all relative ${checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${checked ? 'left-4.5' : 'left-0.5'}`} />
        </div>
    </div>
);

export const inputClasses = "w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-[13px] font-bold text-accent dark:text-white outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/50 transition-all shadow-sm placeholder:text-gray-300 placeholder:font-medium";
