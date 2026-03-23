"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

type BorderTraceProps = {
  children: ReactNode;
  className?: string;
  color?: string;
};

export function BorderTrace({
  children,
  className,
  color = "#694cd0",
}: BorderTraceProps) {
  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-[32px]",
        className,
      )}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] w-full origin-left opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ scaleX: 0, translateX: "-100%" }}
        whileHover={{
          scaleX: 1,
          translateX: "100%",
          transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
        }}
        style={{ backgroundColor: color }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-[2px] h-full origin-top opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ scaleY: 0, translateY: "-100%" }}
        whileHover={{
          scaleY: 1,
          translateY: "100%",
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          },
        }}
        style={{ backgroundColor: color }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] w-full origin-right opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ scaleX: 0, translateX: "100%" }}
        whileHover={{
          scaleX: 1,
          translateX: "-100%",
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0,
          },
        }}
        style={{ backgroundColor: color }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 w-[2px] h-full origin-bottom opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ scaleY: 0, translateY: "100%" }}
        whileHover={{
          scaleY: 1,
          translateY: "-100%",
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          },
        }}
        style={{ backgroundColor: color }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
