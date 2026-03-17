"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function SlideRightItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.li
      className={clsx("relative flex items-center gap-3 overflow-hidden cursor-default", className)}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-fuchsia-500 rounded-full"
        variants={{
          rest: { scaleY: 0, opacity: 0 },
          hover: { scaleY: 1, opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        variants={{
          rest: { x: 0, color: "inherit" },
          hover: { x: 12, color: "#1e293b" }, // slate-800
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.li>
  );
}
