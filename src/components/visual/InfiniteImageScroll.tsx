"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface JournalImage {
  image: string;
  alt?: string;
  title?: string;
}

interface InfiniteImageScrollProps {
  images: JournalImage[];
}

export function InfiniteImageScroll({ images }: InfiniteImageScrollProps) {
  const [expandedImage, setExpandedImage] = useState<JournalImage | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Triple the array for seamlessness
  const list = [...images, ...images, ...images];

  // Scroll tracking for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map vertical scroll to horizontal offset
  // When scrolling down, it moves left; when scrolling up, it moves right.
  const xOffsetTrigger = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const xSpring = useSpring(xOffsetTrigger, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setExpandedImage(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-infinite {
          animation: marquee 30s linear infinite;
        }
      `}} />

      <div ref={containerRef} className="relative w-full overflow-hidden py-12">
        <motion.div style={{ x: xSpring }} className="w-full">
          <div className="flex gap-6 md:gap-8 w-fit animate-marquee-infinite">
            {list.map((item, idx) => (
              <div
                key={`${item.image}-${idx}`}
                onClick={() => setExpandedImage(item)}
                className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-slate-100 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group
                  w-[40vw] md:w-[22.22vw] aspect-[1/1.414]"
              >
                <Image
                  src={item.image}
                  alt={item.alt || "Journal image"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 40vw, 22vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                  <p className="text-white text-xs md:text-sm font-medium">
                    {item.title || "View details"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full screen overlay */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-8 right-8 z-[110] rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-all hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={expandedImage.image}
              alt={expandedImage.alt || "Journal expanded"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
