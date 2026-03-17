"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function StaggerHoverGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.ul
      className={clsx("group/stagger", className)}
      whileHover="hover"
      initial="rest"
      variants={{
        rest: {},
        hover: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerHoverItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.li
      className={className}
      variants={{
        rest: { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.7)" },
        hover: {
          scale: 1.05,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          color: "#0f172a", // slate-900
          transition: { type: "spring", stiffness: 300, damping: 20 },
        },
      }}
    >
      {children}
    </motion.li>
  );
}
