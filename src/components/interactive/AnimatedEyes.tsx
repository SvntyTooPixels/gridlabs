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
    let gyroActive = false;

    const updatePupils = (clientX: number, clientY: number) => {
      if (!eyeRef.current || !pupilRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
      
      const maxDistX = (rect.width - pupilRef.current.offsetWidth) / 2 - 2;
      const maxDistY = (rect.height - pupilRef.current.offsetHeight) / 2 - 2;
      
      const distToMouse = Math.hypot(clientX - eyeCenterX, clientY - eyeCenterY);
      const distanceRatio = Math.min(1, distToMouse / 250);

      targetX = Math.cos(angle) * maxDistX * distanceRatio;
      targetY = Math.sin(angle) * maxDistY * distanceRatio;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (gyroActive) return;
      updatePupils(e.clientX, e.clientY);
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      gyroActive = true;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const normalizedGamma = Math.min(Math.max(e.gamma, -45), 45);
      const clientX = ((normalizedGamma + 45) / 90) * width;
      
      const normalizedBeta = Math.min(Math.max(e.beta - 45, -45), 45); 
      const clientY = ((normalizedBeta + 45) / 90) * height;

      updatePupils(clientX, clientY);
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
    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    
    animate();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={eyeRef}
      className="relative flex h-10 w-7 items-center justify-center rounded-[50%] bg-white shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] border-2 border-slate-200"
    >
      <div
        ref={pupilRef}
        className="relative h-4 w-4 rounded-full bg-slate-900 shadow-sm"
      >
        <div className="absolute top-[20%] right-[25%] h-1.5 w-1.5 rounded-full bg-white opacity-90" />
      </div>
    </div>
  );
}

export function AnimatedEyes() {
  return (
    <div className="inline-flex gap-2 mx-3 align-middle transition-opacity duration-700 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
      <Eye />
      <Eye />
    </div>
  );
}
