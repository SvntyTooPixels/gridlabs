"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

export function StatHoverCard({
  valueNodes,
  labelNodes,
  className,
  color = "rgba(236, 72, 153, 0.4)", // Pink-500
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
        className="absolute inset-0 -z-10 rounded-[32px] opacity-0 blur-xl transition-opacity duration-300"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        style={{ backgroundColor: color }}
      />
      <motion.div
        variants={{
          rest: { scale: 1, y: 0 },
          hover: { scale: 1.15, y: -5, textShadow: "0px 8px 24px rgba(236,72,153,0.3)" },
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
