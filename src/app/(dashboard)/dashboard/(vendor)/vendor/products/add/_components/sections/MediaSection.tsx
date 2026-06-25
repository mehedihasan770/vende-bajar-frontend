import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  useWatch,
  Control,
} from "react-hook-form";
import { ImageIcon, Video } from "lucide-react";
import { ProductFormData } from "@/types/product";

interface MediaSectionProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  control: Control<ProductFormData>;
}

export default function MediaSection({
  register,
  errors,
  control,
}: MediaSectionProps) {
  const thumbnail = useWatch({ control, name: "thumbnail" });
  const videoUrl = useWatch({ control, name: "videoUrl" });

  return (
    <div className="space-y-10">
      {/* Thumbnail and Video Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
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
                {(errors.thumbnail as any).message}
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
        <div className="flex flex-col items-center bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
          <div className="w-full aspect-video rounded-3xl border-2 border-dashed border-gray-200 bg-white overflow-hidden flex items-center justify-center relative group shadow-inner">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Preview"
                className="w-full h-full object-contain p-2"
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

      {/* Gallery Placeholder (Simplified for single input array) */}
      <div className="border-t border-gray-100 pt-6 min-w-0">
        <label className="block text-sm font-bold text-gray-700 mb-1 truncate">
          Gallery Image URL (Optional)
        </label>
        <p className="text-[11px] text-gray-400 mb-3 truncate">
          Add links for additional product images. Separate multiple links with
          commas (,).
        </p>
        <textarea
          {...register("images")}
          rows={2}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-primary/10 focus:border-primary focus:outline-none focus:ring-4 transition-all resize-none"
          placeholder="https://link1.jpg, https://link2.jpg..."
        />
      </div>
    </div>
  );
}
