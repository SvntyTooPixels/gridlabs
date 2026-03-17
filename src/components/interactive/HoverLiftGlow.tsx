"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function HoverLiftGlow({
  children,
  className,
  glowColor = "rgba(45, 212, 191, 0.4)", // Teal-400 by default
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      className={clsx("relative w-full h-full", className)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-500 blur-xl"
        whileHover={{ opacity: 1 }}
        style={{ backgroundColor: glowColor }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
