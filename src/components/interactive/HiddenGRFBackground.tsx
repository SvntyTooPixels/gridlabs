"use client";

import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { MouseEvent, useRef, useEffect } from "react";

export function HiddenGRFBackground({ children, className }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null || !containerRef.current) return;
      
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      
      // Normalize gamma (-45 to 45) -> 0 to width
      const normalizedGamma = Math.min(Math.max(e.gamma, -45), 45);
      const x = ((normalizedGamma + 45) / 90) * width;
      
      // Normalize beta (typical holding tilt is ~45deg)
      const normalizedBeta = Math.min(Math.max(e.beta - 45, -45), 45); 
      const y = ((normalizedBeta + 45) / 90) * height;
      
      // Smooth movement (optional, but framer-motion useSpring is better. Direct set works fine for gyro streams)
      mouseX.set(x);
      mouseY.set(y);
    };

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    }
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group rounded-[36px] border border-white/40 bg-white/55 backdrop-blur-xl transition-all duration-500 lg:hover:-translate-y-2 lg:hover:bg-white/65 lg:hover:border-white/50 ${className || ""}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 text-center flex items-center justify-center select-none opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-[1500ms] ease-out"
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
            fontSize: "clamp(12rem, 20vw, 24rem)", 
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
