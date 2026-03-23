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
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
