import React from "react";
import Image from "next/image";
import {
  UseFormRegister,
  FieldErrors,
  useWatch,
  Control,
  useFieldArray,
} from "react-hook-form";
import { ImageIcon, Video, Plus, Trash2 } from "lucide-react";
import { ProductFormData } from "@/types/product";

type ProductFormValues = Omit<ProductFormData, "images" | "specifications"> & {
  images: { url: string }[];
  specifications: { key: string; value: string }[];
};

interface MediaSectionProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  control: Control<ProductFormValues>;
}

export default function MediaSection({
  register,
  errors,
  control,
}: MediaSectionProps) {
  const thumbnail = useWatch({ control, name: "thumbnail" });
  const { fields, append, remove } = useFieldArray<ProductFormValues, "images">(
    {
      control,
      name: "images",
    },
  );
  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray<ProductFormValues, "specifications">({
    control,
    name: "specifications",
  });

  return (
    <div className="space-y-10">
      {/* Thumbnail and Video Inputs */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10 items-start">
        <div className="space-y-8">
          <div className="min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Main Thumbnail URL <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-gray-400 mb-3 truncate">
              This will be shown as the primary image on listings.
            </p>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                {...register("thumbnail", {
                  required: "Thumbnail URL is required",
                })}
                type="url"
                className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${errors.thumbnail ? "border-red-300" : "border-gray-200"} focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all`}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {errors.thumbnail && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.thumbnail.message as string}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-gray-50 min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Video URL (Optional)
            </label>
            <p className="text-[11px] text-gray-400 mb-3 truncate">
              Provide a link from YouTube or a direct video URL.
            </p>
            <div className="relative">
              <Video className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                {...register("videoUrl")}
                type="url"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Area */}
        <div className="flex flex-col items-center bg-gray-50/50 p-6 rounded-4xl border border-gray-100">
          <div className="relative w-full aspect-video rounded-3xl border-2 border-dashed border-gray-200 bg-white overflow-hidden group shadow-inner">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="Preview"
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-300">
                <ImageIcon size={48} strokeWidth={1} />
                <span className="text-xs font-black uppercase tracking-widest">
                  Main Preview
                </span>
              </div>
            )}
          </div>
          <p className="text-[10px] text-gray-400 mt-4 font-medium uppercase tracking-widest">
            Live Image Preview
          </p>
        </div>
      </div>

      {/* Gallery Fields */}
      <div className="border-t border-gray-100 pt-6 min-w-0">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 mb-3">
          <div className="min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Gallery Images (Optional)
            </label>
            <p className="text-[11px] text-gray-400 truncate">
              Add up to 10 gallery image URLs. Use the + button to add fields
              and the trash icon to remove.
            </p>
          </div>
          <button
            type="button"
            onClick={() => append({ url: "" })}
            disabled={fields.length >= 10}
            className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-secondary/20 bg-secondary/10 text-secondary transition hover:bg-secondary/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="grid gap-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_auto] gap-3 items-start"
            >
              <input
                {...register(`images.${index}.url` as const)}
                type="url"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder={`https://example.com/gallery-${index + 1}.jpg`}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {fields.length >= 10 && (
          <p className="text-xs text-red-500 mt-2">
            Maximum 10 gallery images allowed.
          </p>
        )}
      </div>

      {/* Specifications Fields */}
      <div className="border-t border-gray-100 pt-6 min-w-0">
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 mb-3">
          <div className="min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
              Specifications (Optional)
            </label>
            <p className="text-[11px] text-gray-400 truncate">
              Add key/value specifications. Use the + button to add entries and
              the trash icon to remove.
            </p>
          </div>
          <button
            type="button"
            onClick={() => appendSpec({ key: "", value: "" })}
            className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-secondary/20 bg-secondary/10 text-secondary transition hover:bg-secondary/20"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="grid gap-3">
          {specFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[0.9fr_0.9fr_auto] gap-3 items-start"
            >
              <input
                {...register(`specifications.${index}.key` as const)}
                type="text"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="Key (e.g. RAM)"
              />
              <input
                {...register(`specifications.${index}.value` as const)}
                type="text"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                placeholder="Value (e.g. 8GB)"
              />
              <button
                type="button"
                onClick={() => removeSpec(index)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
