"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function ActiveGradientPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={clsx("relative overflow-hidden rounded-[32px] p-0.5", className)}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="absolute inset-[-50%] -z-10 rounded-full blur-[40px] opacity-0 mix-blend-multiply"
        variants={{
          rest: { opacity: 0, scale: 0.8 },
          hover: { opacity: 0.5, scale: 1 },
        }}
        transition={{ duration: 0.7 }}
        style={{
          background: "conic-gradient(from 90deg at 50% 50%, #3b82f6, #ec4899, #14b8a6, #3b82f6)",
        }}
      />
      <motion.div
        className="absolute inset-[-50%] -z-10 animate-[spin_5s_linear_infinite]"
        style={{
          background: "conic-gradient(from 90deg at 50% 50%, #3b82f6, #ec4899, #14b8a6, #3b82f6)",
        }}
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.2 },
        }}
        transition={{ duration: 0.5 }}
      />
      <div className="relative z-10 h-full w-full bg-slate-50/90 rounded-[31px]">
        {children}
      </div>
    </motion.div>
  );
}
