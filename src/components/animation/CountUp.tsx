"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export function CountUp({ to }: { to: number }) {
  const value = useMotionValue(0);
  const rounded = useTransform(() => Math.round(value.get()));

  useEffect(() => {
    const controls = animate(value, to, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [to, value]);

  return <motion.span>{rounded}</motion.span>;
}
