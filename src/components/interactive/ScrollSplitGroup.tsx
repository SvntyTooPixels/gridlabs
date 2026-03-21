"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { SiblingDimGroup } from "./SiblingDimGroup";

export function ScrollSplitGroup({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const containerCenter = rect.top + rect.height / 2;
      
      // Attach if the mid-edge is anywhere in the upper half of the screen
      setIsScrolled(containerCenter < viewportCenter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="group/split">
      <SiblingDimGroup
        className={`grid transition-all duration-[800ms] md:duration-200 ease-out md:grid-cols-2 md:gap-0 hover:md:gap-6
        ${isScrolled ? "gap-y-0" : "gap-y-6"}
        max-md:[&>*:first-child>div]:transition-all max-md:[&>*:first-child>div]:duration-[800ms]
        max-md:[&>*:last-child>div]:transition-all max-md:[&>*:last-child>div]:duration-[800ms]
        ${isScrolled 
          ? "max-md:[&>*:first-child>div]:rounded-b-none max-md:[&>*:last-child>div]:rounded-t-none"
          : "max-md:[&>*:first-child>div]:rounded-[36px] max-md:[&>*:last-child>div]:rounded-[36px]"}
        `}
      >
        {children}
      </SiblingDimGroup>
    </div>
  );
}
