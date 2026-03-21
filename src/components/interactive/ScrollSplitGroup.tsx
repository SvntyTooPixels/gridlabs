"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { SiblingDimGroup } from "./SiblingDimGroup";

export function ScrollSplitGroup({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only detach when the card is well-centered in view
        setIsScrolled(entry.intersectionRatio > 0.6);
      },
      { threshold: [0.6] }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="group/split">
      <SiblingDimGroup
        className={`grid transition-all duration-[1200ms] md:duration-200 ease-out md:grid-cols-2 md:gap-0 hover:md:gap-6
        ${isScrolled ? "gap-y-0" : "gap-y-6"}
        max-md:[&>*:first-child>div]:transition-all max-md:[&>*:first-child>div]:duration-[1200ms]
        max-md:[&>*:last-child>div]:transition-all max-md:[&>*:last-child>div]:duration-[1200ms]
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
