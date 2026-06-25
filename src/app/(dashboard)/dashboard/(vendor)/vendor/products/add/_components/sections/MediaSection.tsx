import React from 'react';
import { UseFormRegister, FieldErrors, useWatch, Control } from 'react-hook-form';

interface MediaSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
}

export default function MediaSection({ register, errors, control }: MediaSectionProps) {
  const thumbnail = useWatch({ control, name: 'thumbnail' });

  return (
    <div className="space-y-6">
      {/* Thumbnail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail URL <span className="text-red-500">*</span></label>
            <input
              {...register('thumbnail', { required: 'Thumbnail is required' })}
              type="url"
              className={`w-full px-4 py-3 rounded-xl border ${errors.thumbnail ? 'border-red-300' : 'border-gray-200'} focus:ring-primary/10 focus:outline-none focus:ring-4 transition-all`}
              placeholder="https://..."
            />
          </div>
          <p className="text-xs text-gray-500 italic">Provide a direct link to the main product image.</p>
        </div>

        {/* Thumbnail Preview */}
        <div className="relative aspect-video rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center group">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              className="w-full h-full object-contain"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=Invalid+URL')}
            />
          ) : (
            <div className="text-center p-4">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">Image Preview</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
