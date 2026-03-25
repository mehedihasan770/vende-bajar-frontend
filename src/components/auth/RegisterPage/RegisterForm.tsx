"use client"

import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineArrowRight,
  HiOutlinePhone,
} from "react-icons/hi";
import Link from "next/link";
import GoogleButton from "@/components/shared/auth/GoogleButton";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { privateAxios } from "@/lib/axios";
import axios from "axios";
import { setAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type RegisterFormData = {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { refreshUser } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterFormData>({
        mode: "onBlur",
    });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {

      const res = await privateAxios.post('/auth/register', data);
      if (res.data?.token) {
        setAuthToken(res.data.token);
        console.log("Token saved to cookies successfully! ✅");
        refreshUser();
        router.push("/");
      }

    } catch (error: unknown) {

      let message = "Registration failed. Please try again.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setError("root", {
        type: "manual",
        message: message,
      });

    } finally {

      setIsLoading(false);

    }
  };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    return (
        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Full Name & Email - 2 in 1 row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-accent"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <HiOutlineUser
                    className={`h-5 w-5 ${
                      errors.fullName ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Min 3 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters",
                    },
                  })}
                  type="text"
                  id="fullName"
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none text-base
                    ${
                      errors.fullName
                        ? "border-red-500 bg-red-50/50 focus:border-red-500"
                        : "border-gray-200 bg-white/80 focus:border-primary hover:border-primary/50"
                    }`}
                />
              </div>
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-1"
                >
                  {errors.fullName.message}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-accent"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <HiOutlineMail
                    className={`h-5 w-5 ${
                      errors.email ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none text-base
                    ${
                      errors.email
                        ? "border-red-500 bg-red-50/50 focus:border-red-500"
                        : "border-gray-200 bg-white/80 focus:border-primary hover:border-primary/50"
                    }`}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-accent"
            >
              Phone Number{" "}
              <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <HiOutlinePhone
                  className={`h-5 w-5 ${
                    errors.phone ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </div>
              <input
                {...register("phone", {
                  pattern: {
                    value: /^[0-9+\-\s]+$/,
                    message: "Invalid phone number",
                  },
                })}
                type="tel"
                id="phone"
                placeholder="+880 1XXX-XXXXXX"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none text-base
                  ${
                    errors.phone
                      ? "border-red-500 bg-red-50/50 focus:border-red-500"
                      : "border-gray-200 bg-white/80 focus:border-primary hover:border-primary/50"
                  }`}
              />
            </div>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 mt-1"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </div>
          {/* Password & Confirm Password */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-accent"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <HiOutlineLockClosed
                    className={`h-5 w-5 ${
                      errors.password ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Min 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)/,
                      message: "Letter & number",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-200 outline-none text-base
                    ${
                      errors.password
                        ? "border-red-500 bg-red-50/50 focus:border-red-500"
                        : "border-gray-200 bg-white/80 focus:border-primary hover:border-primary/50"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-primary transition-colors duration-200" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-primary transition-colors duration-200" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-1"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>
            {/* Confirm Password Field */}

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-accent"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <HiOutlineLockClosed
                    className={`h-5 w-5 ${
                      errors.confirmPassword
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  {...register("confirmPassword", {
                    required: "Confirm password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="••••••"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-200 outline-none text-base
                    ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-50/50 focus:border-red-500"
                        : "border-gray-200 bg-white/80 focus:border-primary hover:border-primary/50"
                    }`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                >
                  {showConfirmPassword ? (
                    <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-primary transition-colors duration-200" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-primary transition-colors duration-200" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 mt-1"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && password.length > 0 && (
            <PasswordStrengthIndicator password={password}/>
          )}
          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2 mt-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-secondary hover:text-primary transition-colors duration-200"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-secondary hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Root error */}
          {errors.root && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-xl bg-red-50 border border-red-200"
            >
              <p className="text-sm text-red-600 text-center">
                {errors.root.message}
              </p>
            </motion.div>
          )}
          
          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full cursor-pointer bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading || isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </motion.button>
          {/* Google Register */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>
          <GoogleButton/>
          {/* Sign in link */}
          <p className="text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-secondary hover:text-primary font-semibold transition-colors duration-200"
            >
              Sign in now
            </Link>
          </p>
        </motion.form>
    );
};

export default RegisterForm;