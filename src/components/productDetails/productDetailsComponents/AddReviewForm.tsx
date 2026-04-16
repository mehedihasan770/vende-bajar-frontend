"use client";

import { useUser } from "@/hooks/useUser";
import { privateAxios } from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface ReviewFormValues {
  rating: number;
  comment: string;
}

const AddReviewForm = ({ productId }: { productId: string }) => {
  const [hover, setHover] = useState(0);
  const { data: user } = useUser();
  const { fullName, email, profileImage, _id } = user || {};

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    mode: "onBlur",
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = async (formData: ReviewFormValues) => {
    try {
      const reviewPayload = {
        ...formData,
        productId,
        userName: fullName,
        userEmail: email,
        userProfileImage: profileImage,
        userId: _id,
      };

      await privateAxios.post("/review/add", reviewPayload);

      reset();
      toast.success("Review posted successfully");

    } catch (error: unknown) {
      let message = "Failed to post review. Please try again.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setError("root", {
        type: "manual",
        message: message,
      });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="max-w-4xl border-y border-gray-100 py-12 my-10 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Rating Section */}
          <div className="flex flex-col gap-2 min-w-35">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors 
              ${errors.rating ? "text-red-500" : "text-gray-400"}`}>
              Rating
            </span>
            
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setValue("rating", star, { shouldValidate: true })}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90 outline-none disabled:opacity-50"
                >
                  {(hover || rating) >= star ? (
                    <HiStar className="w-6 h-6 text-black" />
                  ) : (
                    <HiOutlineStar className="w-6 h-6 text-gray-200" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Rating Error Message */}
            <AnimatePresence mode="wait">
              {errors.rating && (
                <motion.p {...fadeInUp} className="text-[9px] text-red-500 font-bold uppercase tracking-tight">
                  ● {errors.rating.message || "Select Stars"}
                </motion.p>
              )}
            </AnimatePresence>

            <input 
              type="hidden" 
              {...register("rating", { 
                required: "Select Stars", 
                min: { value: 1, message: "Select Stars" } 
              })} 
            />
          </div>

          {/* Comment Input Section */}
          <div className="flex-1 w-full space-y-2">
            <div className="relative h-14"> 
              <input
                {...register("comment", { 
                  required: "Review cannot be empty",
                  minLength: { value: 10, message: "Minimum 10 characters" } 
                })}
                type="text"
                autoComplete="off"
                disabled={isSubmitting}
                placeholder="Share your experience..."
                className={`w-full h-full rounded-xl px-6 pr-36 text-sm font-medium transition-all outline-none border 
                  ${errors.comment || errors.root
                    ? "bg-red-50 border-red-500 focus:border-red-500 placeholder:text-red-300" 
                    : "bg-gray-100 border-transparent focus:bg-white focus:border-black placeholder:text-gray-400"
                  }`}
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-black text-white px-8 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all active:scale-95 disabled:bg-gray-800 shadow-sm flex items-center justify-center min-w-25"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Post"
                )}
              </button>
            </div>

            {/* Comment Error Message */}
            <AnimatePresence mode="wait">
              {errors.comment && (
                <motion.p {...fadeInUp} className="text-[9px] text-red-500 font-bold uppercase tracking-tight pl-2">
                  ● {errors.comment.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Server/Root Error Message */}
        <AnimatePresence mode="wait">
          {errors.root && (
            <motion.div 
              {...fadeInUp}
              className="p-3 rounded-xl bg-red-50 border border-red-200 text-center"
            >
              <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">
                ⚠️ {errors.root.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </form>
    </div>
  );
};

export default AddReviewForm;