import React from 'react';
import { motion } from "framer-motion";

type passwordType = {
  password: string;
};

const PasswordStrengthIndicator = ({password} : passwordType) => {

    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm"
        >
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width:
                  password.length < 6
                    ? "33%"
                    : password.match(/^(?=.*[A-Za-z])(?=.*\d)/)
                      ? "100%"
                      : "66%",
              }}
              className={`h-full ${
                password.length < 6
                  ? "bg-red-500"
                  : password.match(/^(?=.*[A-Za-z])(?=.*\d)/)
                    ? "bg-green-500"
                    : "bg-yellow-500"
              }`}
            />
          </div>
          <span
            className={
              password.length < 6
                ? "text-red-600"
                : password.match(/^(?=.*[A-Za-z])(?=.*\d)/)
                  ? "text-green-600"
                  : "text-yellow-600"
            }
          >
            {password.length < 6
              ? "Weak"
              : password.match(/^(?=.*[A-Za-z])(?=.*\d)/)
                ? "Strong"
                : "Medium"}
          </span>
        </motion.div>
    );
};

export default PasswordStrengthIndicator;