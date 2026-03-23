"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function StatHoverCard({
  valueNodes,
  labelNodes,
  className,
  color = "#f4ce45",
}: {
  valueNodes: ReactNode;
  labelNodes: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      className={clsx("relative h-full w-full", className)}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="absolute inset-0 -z-10 rounded-[32px] border-2 opacity-0 transition-opacity duration-300"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        style={{ borderColor: color }}
      />
      <motion.div
        variants={{
          rest: { scale: 1, y: 0 },
          hover: { scale: 1.1, y: -4 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {valueNodes}
      </motion.div>
      <motion.div
        variants={{
          rest: { opacity: 1 },
          hover: { opacity: 0.8 },
        }}
      >
        {labelNodes}
      </motion.div>
    </motion.div>
  );
}
