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
      className={clsx(
        "relative overflow-hidden rounded-[32px] border-2 border-brand-700 bg-cream",
        className,
      )}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="absolute inset-0 -z-10 bg-sunrise-100 opacity-0"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10 h-full w-full rounded-[31px] bg-cream">
        {children}
      </div>
    </motion.div>
  );
}
