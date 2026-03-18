"use client";

import { motion } from "framer-motion";
import Logo from "@/components/shared/Logo/Logo";
import RegisterRight from "@/components/auth/RegisterPage/RegisterRight";
import RegisterForm from "@/components/auth/RegisterPage/RegisterForm";

const RegisterPage = () => {
  


  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="min-h-screen w-full">
      <div className="min-h-screen py-5">
        <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center lg:justify-between">
          {/* Left Side - Form Section */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="w-fit lg:ml-5"
          >
            <div className="w-full">
              {/* Logo for mobile */}
              <motion.div
                variants={fadeInUp}
                className="mb-8 lg:hidden flex justify-center"
              >
                <Logo />
              </motion.div>

              {/* Header */}
              <motion.div
                variants={fadeInUp}
                className="mb-8 text-center lg:text-left"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  Create Account 🚀
                </h1>
                <p className="text-gray-600">
                  Join <span className="text-primary font-semibold">Vende</span>
                  <span className="text-secondary font-semibold">
                    Bajar
                  </span>{" "}
                  and start shopping
                </p>
              </motion.div>

              {/* Form */}
              <RegisterForm/>
            </div>
          </motion.div>

          {/* Right Side - Branding Section */}
          <RegisterRight />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
