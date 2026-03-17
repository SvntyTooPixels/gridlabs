"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function TextHighlightReveal({
  children,
  className,
  highlightColor = "rgba(147, 51, 234, 0.2)", // Purple-600 with low opacity
}: {
  children: ReactNode;
  className?: string;
  highlightColor?: string;
}) {
  return (
    <motion.span
      className={clsx("relative inline-block transition-colors duration-300", className)}
      whileHover="hover"
      initial="rest"
    >
      <motion.span
        className="absolute inset-0 -z-10 rounded-md"
        variants={{
          rest: { scaleX: 0, opacity: 0, originX: 0 },
          hover: { scaleX: 1, opacity: 1, originX: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ backgroundColor: highlightColor }}
      />
      {children}
    </motion.span>
  );
}
