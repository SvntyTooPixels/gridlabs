"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";

type Project = {
  title: string;
  description: string;
  tag: string;
  image: string;
  alt: string;
};

export function ProjectScrollAccordion({ items }: { items: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  
  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const progress = (index + 0.5) / items.length;
    const targetScroll = absoluteTop + progress * (rect.height - window.innerHeight);
    
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 1) {
      setActiveIndex(items.length - 1);
      return;
    }
    const index = Math.max(0, Math.floor(latest * items.length));
    setActiveIndex(index);
  });

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${items.length * 75}vh` }}>
      {/* Desktop View: Sticky Horizontal Scroll Accordion */}
      <div className="sticky top-0 h-screen w-full hidden md:flex flex-col justify-center overflow-hidden">
        <div className="container-padded mb-8">
          <h2 className="section-title">Featured Projects</h2>
          <p className="mt-3 text-slate-600">
            Showcasing our recent work and community impact.
          </p>
        </div>
        
        <div className="flex h-[60vh] w-full container-padded gap-4">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                layout
                key={`desktop-${item.title}`}
                onClick={() => scrollToIndex(index)}
                className="group relative h-full overflow-hidden rounded-[24px] border border-white/35 flex-shrink-0 cursor-pointer"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1, flex: isActive ? "5 1 0%" : "1 1 0%" }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.0, 
                  ease: [0.32, 0.72, 0, 1],
                  y: { delay: index * 0.1 },
                  opacity: { delay: index * 0.1 }
                }}
              >
                <div className="absolute inset-0 bg-fuchsia-900 mix-blend-overlay opacity-30 z-10 pointer-events-none" />
                
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover z-0 transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                
                {/* Overlay for inactive cards */}
                <motion.div 
                  className="absolute inset-0 bg-slate-900/40 z-20 pointer-events-none"
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 1.0 }}
                />

                {/* Gradient for text readability */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 1.0 }}
                />

                {/* Content for Active State */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 p-8 flex flex-col justify-end z-30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="mb-4 inline-flex w-fit rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {item.tag}
                      </span>
                      <h3 className="font-bold text-white text-3xl mb-3 min-w-[50vw] w-[85%]">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg leading-relaxed text-slate-100 bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/10 min-w-[51vw] w-[85%]">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Vertical text for Inactive State */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-end py-10 z-30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 
                        className="font-bold text-white tracking-widest text-xl mb-6 whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {item.title}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile View: Sticky Vertical Scroll Accordion */}
      <div className="sticky top-0 h-screen w-full flex md:hidden flex-col justify-center overflow-hidden">
        <div className="container-padded mb-4">
          <h2 className="section-title text-2xl">Featured Projects</h2>
        </div>
        
        <div className="flex flex-col h-[70vh] w-full container-padded gap-2">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                layout
                key={`mobile-${item.title}`}
                onClick={() => scrollToIndex(index)}
                className="group relative w-full overflow-hidden rounded-[20px] border border-white/35 flex-shrink-0 cursor-pointer"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1, flex: isActive ? "5 1 0%" : "1 1 0%" }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.0, 
                  ease: [0.32, 0.72, 0, 1],
                  y: { delay: index * 0.1 },
                  opacity: { delay: index * 0.1 }
                }}
              >
                <div className="absolute inset-0 bg-fuchsia-900 mix-blend-overlay opacity-30 z-10 pointer-events-none" />
                
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  className="object-cover z-0 transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                
                {/* Overlay for inactive cards */}
                <motion.div 
                  className="absolute inset-0 bg-slate-900/50 z-20 pointer-events-none"
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 1.0 }}
                />

                {/* Gradient for text readability */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 1.0 }}
                />

                {/* Content for Active State */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 px-5 pb-5 pt-8 flex flex-col justify-end z-30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 1.0, delay: 0.2 }}
                    >
                      <span className="mb-2 inline-flex w-fit rounded-full border border-white/35 bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {item.tag}
                      </span>
                      <h3 className="font-bold text-white text-2xl mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-100 bg-black/40 p-3 rounded-xl backdrop-blur-md border border-white/10 overflow-hidden line-clamp-3">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Horizontal text for Inactive State */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-start px-4 z-30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.0 }}
                    >
                      <h3 className="font-semibold text-white tracking-wider text-sm truncate max-w-[250px]">
                        {item.title}
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
