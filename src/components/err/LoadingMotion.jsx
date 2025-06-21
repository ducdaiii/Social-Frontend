import React from "react";
import { motion } from "framer-motion";

const LoadingMotion = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          borderRadius: ["20%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 bg-blue-500"
      />
      <p className="mt-4 text-lg font-semibold">Loading, please wait...</p>
    </div>
  );
};

export default LoadingMotion;