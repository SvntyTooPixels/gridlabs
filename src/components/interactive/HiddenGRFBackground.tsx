"use client";

import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { MouseEvent } from "react";

export function HiddenGRFBackground({ children, className }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative overflow-hidden group rounded-[36px] border border-white/40 bg-white/55 shadow-[0_24px_80px_rgba(34,35,95,0.12)] backdrop-blur-xl ${className || ""}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 text-center flex items-center justify-center select-none opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] ease-out"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      >
        <div 
          className="font-black text-transparent tracking-tighter opacity-80" 
          style={{ 
            fontSize: "clamp(8rem, 20vw, 24rem)", 
            lineHeight: 1,
            WebkitTextStroke: "3px #94a3b8"
          }}
        >
          GRF
        </div>
      </motion.div>
      <div className="relative z-10 p-8 md:p-14">
        {children}
      </div>
    </div>
  );
}
