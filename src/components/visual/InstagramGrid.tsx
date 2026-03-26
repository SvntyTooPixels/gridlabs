"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";

interface ImageItem {
  image: string;
  alt?: string;
  title?: string;
}

interface InstagramGridProps {
  images: ImageItem[];
}

export function InstagramGrid({ images }: InstagramGridProps) {
  const [expandedImage, setExpandedImage] = useState<ImageItem | null>(null);
  const [displayImages, setDisplayImages] = useState<ImageItem[]>(images);
  
  // Global mouse coordinates for all items to share
  const mouseX = useMotionValue(-1000); // Start off-screen
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    // Shuffle images on the client to avoid SSR hydration mismatch
    setDisplayImages([...images].sort(() => Math.random() - 0.5));
  }, [images]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setExpandedImage(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <>
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 auto-rows-fr grid-flow-dense w-full h-[calc(100vh-10rem)] min-h-[400px]"
      >
        {displayImages.map((img, i) => (
          <InstagramGridItem
            key={`${img.image}-${i}`}
            item={img}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            onClick={() => setExpandedImage(img)}
          />
        ))}
      </div>

      {/* Full screen overlay */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }}
            aria-label="Close fullscreen image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div
            className="relative w-full h-full max-w-6xl max-h-screen"
            onClick={(e) => e.stopPropagation()} 
          >
            <Image
              src={expandedImage.image}
              alt={expandedImage.alt || expandedImage.title || "Gallery image expanded"}
              fill
              className="object-contain"
              sizes="100vw"
            />
            {expandedImage.title && (
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="inline-block bg-black/60 px-4 py-2 rounded-full text-white text-sm md:text-base backdrop-blur-md">
                  {expandedImage.title}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function InstagramGridItem({
  item,
  index,
  mouseX,
  mouseY,
  onClick,
}: {
  item: ImageItem;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onClick: () => void;
}) {
  const isLarge = index % 2 === 0;
  const spanClass = isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
  
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Local repulsion spring values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Efficiently update repulsion based on proximity to the global mouse
  const updateRepulsion = () => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = mouseX.get() - centerX;
    const deltaY = mouseY.get() - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const radius = 300; // Increased radius for better "nearby" effect
    
    if (distance < radius) {
      // Stronger repulsion logic
      const power = (1 - distance / radius) * 25; 
      const angle = Math.atan2(deltaY, deltaX);
      x.set(-Math.cos(angle) * power);
      y.set(-Math.sin(angle) * power);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  // Sync with global mouse motion
  useMotionValueEvent(mouseX, "change", updateRepulsion);
  useMotionValueEvent(mouseY, "change", updateRepulsion);

  return (
    <div
      ref={containerRef}
      className={`relative z-10 transition-opacity duration-700 ease-out ${spanClass}`}
      style={{ opacity: loaded ? 1 : 0 }}
    >
      <motion.div
        onClick={onClick}
        style={{ x: springX, y: springY }}
        className="relative w-full h-full overflow-hidden rounded-xl bg-slate-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 transform-gpu"
      >
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        )}
        <Image
          src={item.image}
          alt={item.alt || item.title || "Gallery image"}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-transform duration-700 hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
    </div>
  );
}
