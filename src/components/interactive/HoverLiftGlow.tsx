"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function HoverLiftGlow({
  children,
  className,
  glowColor = "#f4ce45",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      className={clsx("relative w-full h-full", className)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-[32px] border-2 opacity-0 transition-opacity duration-300"
        whileHover={{ opacity: 1 }}
        style={{ borderColor: glowColor }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
