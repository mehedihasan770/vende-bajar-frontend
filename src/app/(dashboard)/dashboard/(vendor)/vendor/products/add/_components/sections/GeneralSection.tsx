import React, { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
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
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Technology");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Simple static category list — replace with API-driven list if available
  const categories = [
    "Technology",
    "Home Appliances",
    "Fashion",
    "Health",
    "Sports",
    "Books",
    "Toys",
    "Beauty",
  ];

  const [allCategories, setAllCategories] = useState<string[]>(categories);
  const [categoryInput, setCategoryInput] = useState<string>(selectedCategory);
  const [isCatOpen, setIsCatOpen] = useState(false);

  const suggestedTags = [
    "#smartphone",
    "#laptop",
    "#accessory",
    "#android",
    "#ios",
  ];

  useEffect(() => {
    // Keep react-hook-form value in sync: store as comma separated list without spaces
    setValue("tags", tags.join(","));
  }, [tags, setValue]);

  useEffect(() => {
    // initialize category field in form state from the selected category
    setValue("category", selectedCategory);
  }, [selectedCategory, setValue]);

  function validateTag(raw: string) {
    if (!raw.startsWith("#")) return false;
    if (raw.includes(" ")) return false;
    const withoutHash = raw.slice(1);
    if (withoutHash.length === 0 || withoutHash.length > 10) return false; // max 10 chars after '#'
    return true;
  }

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!validateTag(tag)) return false;
    if (tags.length >= 25) return false; // max 25 tags
    if (tags.includes(tag)) return false;
    setTags((s) => [...s, tag]);
    return true;
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (addTag(tagInput)) setTagInput("");
    }
  }

  function removeTag(idx: number) {
    setTags((s) => s.filter((_, i) => i !== idx));
  }
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Name */}
        <div className="md:col-span-2 min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Product Name <span className="text-red-500">*</span>
          </label>
          <p className="text-[11px] text-gray-400 mb-3 truncate">
            Give your product an attractive and descriptive name
          </p>
          <input
            {...register("name", { required: "Product name is required" })}
            type="text"
            className={`w-full px-4 py-3 rounded-2xl border ${errors.name ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Category & SubCategory */}
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Category <span className="text-red-500">*</span>
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Select the primary category for this product
          </p>
          <div className="relative">
            <div
              className={`w-full rounded-2xl border ${errors.category ? "border-red-300" : "border-gray-200"} bg-white flex items-center`}
            >
              <input
                value={categoryInput}
                onChange={(e) => {
                  setCategoryInput(e.target.value);
                  setIsCatOpen(true);
                  // don't immediately set form value until selection
                }}
                onFocus={() => setIsCatOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = categoryInput.trim();
                    if (!val) return;
                    const existing = allCategories.find(
                      (c) => c.toLowerCase() === val.toLowerCase(),
                    );
                    if (existing) {
                      setSelectedCategory(existing);
                      setValue("category", existing as any);
                      setIsCatOpen(false);
                    } else if (allCategories.length < 100) {
                      setAllCategories((s) => [...s, val]);
                      setSelectedCategory(val);
                      setValue("category", val as any);
                      setIsCatOpen(false);
                    }
                  }
                }}
                type="text"
                className="w-full px-4 py-3 rounded-2xl bg-transparent focus:outline-none"
                placeholder="Select or type to search/add category"
                aria-expanded={isCatOpen}
              />
              <button
                type="button"
                onClick={() => setIsCatOpen((s) => !s)}
                aria-label="Toggle categories"
                className="px-3 py-2 text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform duration-200 ${isCatOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.936a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`absolute z-20 mt-2 w-full rounded-2xl shadow-lg max-h-60 overflow-auto transition-all duration-200 ${isCatOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"} bg-white/70 backdrop-blur-sm border border-gray-200`}
            >
              {/* dropdown content animated with blur */}
              {allCategories
                .filter((c) =>
                  c.toLowerCase().includes(categoryInput.toLowerCase()),
                )
                .slice(0, 100)
                .map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(c);
                      setCategoryInput(c);
                      setValue("category", c as any);
                      setIsCatOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  >
                    {c}
                  </button>
                ))}

              {/* option to add new category when not found */}
              {categoryInput.trim() &&
                !allCategories.some(
                  (x) => x.toLowerCase() === categoryInput.trim().toLowerCase(),
                ) &&
                allCategories.length < 100 && (
                  <div className="border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        const val = categoryInput.trim();
                        if (!val) return;
                        setAllCategories((s) => [...s, val]);
                        setSelectedCategory(val);
                        setValue("category", val as any);
                        setIsCatOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-primary font-medium hover:bg-gray-50"
                    >
                      Add "{categoryInput.trim()}" as category
                    </button>
                  </div>
                )}
            </div>
          </div>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="min-w-0">
          <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
            Sub-Category (Optional)
          </label>
          <p className="text-[11px] text-gray-400 mb-2 truncate">
            Specify a sub-category if applicable
          </p>
          <input
            {...register("subCategory")}
            type="text"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
            placeholder="e.g. Wireless"
          />
        </div>

        {/* Brand & Tags (stacked: Tags below Brand) */}
        <div className="md:col-span-2 flex flex-col gap-4 items-start">
          <div className="min-w-0 w-full">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Brand <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-gray-400 mb-2 truncate">
              The manufacturer or brand name
            </p>
            <input
              {...register("brand", { required: "Brand is required" })}
              type="text"
              className={`w-full px-4 py-3 rounded-2xl border ${errors.brand ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
              placeholder="e.g. Sony"
            />
            {errors.brand && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div className="min-w-0 w-full">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Tags (Optional)
            </label>
            <p className="text-[11px] text-gray-400 mb-2 truncate">
              Use hashtags. Click suggestions to add. Max 25 tags. Each tag must
              start with '#', no spaces, max 10 chars after '#'.
            </p>

            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  <span className="font-mono text-xs">{t}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                type="text"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
                placeholder="#example (press Enter to add)"
              />
              <button
                type="button"
                onClick={() => {
                  if (addTag(tagInput)) setTagInput("");
                }}
                className="px-4 py-3 rounded-2xl bg-primary text-white"
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedTags.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addTag(s)}
                  className="text-[12px] px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-gray-700"
                >
                  {s}
                </button>
              ))}
            </div>
            {/* Hidden registered input value will be kept in sync via setValue */}
            <input {...register("tags")} type="hidden" />
          </div>
        </div>
      </div>

      {/* Short Description */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
          Short Description (Optional)
        </label>
        <p className="text-[11px] text-gray-400 mb-2 truncate">
          A brief 1-2 line summary of the product
        </p>
        <textarea
          {...register("shortDescription")}
          rows={2}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all resize-none"
          placeholder="Brief summary of the product..."
        />
      </div>

      {/* Full Description */}
      <div className="min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
          Full Description <span className="text-red-500">*</span>
        </label>
        <p className="text-[11px] text-gray-400 mb-2 truncate">
          Provide detailed information about the product
        </p>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={5}
          className={`w-full px-4 py-3 rounded-2xl border ${errors.description ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all resize-none`}
          placeholder="Detailed product features, specs, and info..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1 font-medium">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
}
