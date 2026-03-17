"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect } from "react";
import clsx from "clsx";

type MouseParallaxProps = {
  children: ReactNode;
  className?: string;
  offset?: number;
  damping?: number;
  stiffness?: number;
};

export function MouseParallax({
  children,
  className,
  offset = 20,
  damping = 30,
  stiffness = 200,
}: MouseParallaxProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping, stiffness };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const x = useTransform(smoothX, [-0.5, 0.5], [-offset, offset]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-offset, offset]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xVal = e.clientX / innerWidth - 0.5;
      const yVal = e.clientY / innerHeight - 0.5;
      mouseX.set(xVal);
      mouseY.set(yVal);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div style={{ x, y }} className={clsx("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
