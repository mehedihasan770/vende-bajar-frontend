import React, { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Tag } from "lucide-react";
import { ProductFormValues } from "@/types/product";

interface GeneralSectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
}

export default function GeneralSection({
  register,
  errors,
  setValue,
}: GeneralSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const categories = [
    "Technology", "Home Appliances", "Fashion", "Health", "Sports", "Books", "Toys", "Beauty"
  ];

  const [allCategories, setAllCategories] = useState<string[]>(categories);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [isCatOpen, setIsCatOpen] = useState(false);

  const suggestedTags = ["#smartphone", "#laptop", "#accessory", "#android", "#ios"];

  useEffect(() => {
    setValue("tags", tags.join(","));
  }, [tags, setValue]);

  useEffect(() => {
    if (selectedCategory) setValue("category", selectedCategory as any);
  }, [selectedCategory, setValue]);

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag.startsWith("#") || tag.includes(" ") || tags.length >= 25 || tags.includes(tag)) return false;
    setTags((s) => [...s, tag]);
    return true;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
          <input
            {...register("name", { required: "Product name is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-2xl border ${errors.name ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
          <div className={`w-full rounded-2xl border ${errors.category ? "border-red-300" : "border-gray-200"} bg-white flex items-center`}>
            <input
              value={categoryInput}
              onChange={(e) => { setCategoryInput(e.target.value); setIsCatOpen(true); }}
              onFocus={() => setIsCatOpen(true)}
              className="w-full px-4 py-3 rounded-2xl bg-transparent focus:outline-none"
              placeholder="Select Category"
            />
            <button type="button" onClick={() => setIsCatOpen(!isCatOpen)} className="px-3 text-gray-500">
               <svg className={`h-5 w-5 transform transition-transform ${isCatOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.936a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
               </svg>
            </button>
          </div>

          <div className={`absolute z-30 mt-2 w-full rounded-2xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur-md max-h-60 overflow-auto transition-all duration-300 origin-top ${isCatOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
              {allCategories.filter(c => c.toLowerCase().includes(categoryInput.toLowerCase())).map(c => (
                <button key={c} type="button" onClick={() => { setSelectedCategory(c); setCategoryInput(c); setIsCatOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors text-sm font-medium">{c}</button>
              ))}
          </div>

          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Brand <span className="text-red-500">*</span></label>
          <input
            {...register("brand", { required: "Brand is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-2xl border ${errors.brand ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
            placeholder="e.g. Sony"
          />
        </div>
      </div>

      {/* Featured Toggle & Tags */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-1">
            <label className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 h-full">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-100 p-2 text-orange-500"><Tag size={16} /></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Featured</p>
                  <p className="text-[10px] text-gray-500">Highlight this product</p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center">
                <input {...register("isFeatured")} type="checkbox" className="peer sr-only" />
                <span className="absolute inset-0 rounded-full bg-gray-200 transition-colors peer-checked:bg-orange-500" />
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
              </div>
            </label>
         </div>

         <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Tags (Max 25)</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((t, i) => (
                <span key={t} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  {t} <button type="button" onClick={() => setTags(tags.filter((_, idx) => idx !== i))} className="hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === "Enter") { e.preventDefault(); if(addTag(tagInput)) setTagInput(""); } }}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="#tag"
              />
              <button type="button" onClick={() => { if(addTag(tagInput)) setTagInput(""); }} className="bg-primary text-white px-4 py-2 rounded-xl">Add</button>
            </div>
         </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
          <textarea {...register("shortDescription")} rows={2} className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 resize-none" placeholder="A quick summary..." />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Full Description <span className="text-red-500">*</span></label>
          <textarea {...register("description", { required: "Description is required" })} rows={5} className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 resize-none" placeholder="Detailed product info..." />
        </div>
      </div>
    </div>
  );
}
