"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function FoldUpCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={clsx("relative w-full h-full perspective-1000", className)}
      whileHover={{ y: -12, rotateX: 4, rotateY: -2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute -inset-2 -z-10 rounded-[36px] bg-slate-900/5 blur-2xl transition-opacity duration-500 opacity-0"
        whileHover={{ opacity: 1, y: 12 }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
