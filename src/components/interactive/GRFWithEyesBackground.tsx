"use client";

import { useRef, useEffect } from "react";

function Eye() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current || !pupilRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      
      const maxDistX = (rect.width - pupilRef.current.offsetWidth) / 2 - 6;
      const maxDistY = (rect.height - pupilRef.current.offsetHeight) / 2 - 6;
      
      // Calculate how far the mouse is
      const distToMouse = Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY);
      // Map distance ratio so it caps out smoothly without jerking
      const distanceRatio = Math.min(1, distToMouse / 350);

      targetX = Math.cos(angle) * maxDistX * distanceRatio;
      targetY = Math.sin(angle) * maxDistY * distanceRatio;
    };

    const animate = () => {
      if (pupilRef.current) {
        currentX += (targetX - currentX) * 0.2;
        currentY += (targetY - currentY) * 0.2;
        pupilRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={eyeRef}
      className="relative flex h-[18vw] max-h-48 min-h-24 w-[12vw] max-w-32 min-w-16 items-center justify-center rounded-[50%] bg-white border-[3px] border-slate-200"
    >
      <div
        ref={pupilRef}
        className="relative h-[5vw] max-h-14 min-h-8 w-[5vw] max-w-14 min-w-8 rounded-full bg-gray-400"
      >
        <div className="absolute top-[18%] right-[25%] h-[1.5vw] max-h-4 min-h-2 w-[1.5vw] max-w-4 min-w-2 rounded-full bg-white opacity-90" />
      </div>
    </div>
  );
}

export function GRFWithEyesBackground({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative overflow-hidden group rounded-[36px] border border-white/40 bg-white/55 backdrop-blur-xl transition-all duration-500 lg:hover:-translate-y-2 lg:hover:bg-white/65 lg:hover:border-white/50 ${className || ""}`}>
      <div className="relative z-10 p-8 md:p-14">
        {children}
      </div>
    </div>
  );
}
