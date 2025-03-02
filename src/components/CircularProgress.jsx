"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CircularProgress({ value }) {
  const [progress, setProgress] = useState(0);
  const circumference = 2 * Math.PI * 60; // radius = 60

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 140 140">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="none"
          r="60"
          cx="70"
          cy="70"
        />
        <motion.circle
          className="text-blue-500"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          r="60"
          cx="70"
          cy="70"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference - (progress / 100) * circumference,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {progress}%
      </motion.div>
    </div>
  );
}
