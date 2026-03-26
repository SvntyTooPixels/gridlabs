"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

  return (
    <>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 auto-rows-fr grid-flow-dense w-full h-[calc(100vh-10rem)] min-h-[400px]">
        {displayImages.map((img, i) => (
          <InstagramGridItem
            key={`${img.image}-${i}`}
            item={img}
            index={i}
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image wrapper itself
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
  onClick,
}: {
  item: ImageItem;
  index: number;
  onClick: () => void;
}) {
  // Pre-determine span based on index to create an explore-style grid
  const isLarge = index % 2 === 0;
  const spanClass = isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
  
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl bg-slate-100 transition-all duration-700 ease-out flex items-center justify-center cursor-pointer ${spanClass}`}
      style={{ opacity: loaded ? 1 : 0, filter: loaded ? "blur(0px)" : "blur(10px)" }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}
      <Image
        src={item.image}
        alt={item.alt || item.title || "Gallery image"}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
      {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none translate-y-4 group-hover:translate-y-0">
        <p className="text-white font-medium text-sm md:text-base drop-shadow-md">
          {item.title}
        </p>
      </div> */}
    </div>
  );
}
