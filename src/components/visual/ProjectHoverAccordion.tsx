"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Project = {
  title: string;
  description: string;
  tag: string;
  image: string;
  alt: string;
};

export function ProjectHoverAccordion({ items }: { items: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Desktop View: Horizontal Hover Accordion */}
      <div className="hidden md:flex h-[60vh] w-full gap-4">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div
              layout
              key={`desktop-${item.title}`}
              onMouseEnter={() => setActiveIndex(index)}
              className="group relative h-full overflow-hidden rounded-[24px] border border-white/35 flex-shrink-0 cursor-default"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, flex: isActive ? "5 1 0%" : "1 1 0%" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
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
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Overlay for inactive cards */}
              <motion.div 
                className="absolute inset-0 bg-slate-900/50 z-20 pointer-events-none"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Gradient for text readability */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />

              {/* Content for Active State */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 p-8 flex flex-col justify-end z-30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <span className="mb-4 inline-flex w-fit rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      {item.tag}
                    </span>
                    <h3 className="font-bold text-white text-3xl mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-slate-100 bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/10 w-[85%]">
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
                    transition={{ duration: 0.3 }}
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

      {/* Mobile View: Vertical Click Accordion */}
      <div className="flex md:hidden flex-col h-[70vh] w-full gap-2">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div
              layout
              key={`mobile-${item.title}`}
              onClick={() => setActiveIndex(index)}
              className="group relative w-full overflow-hidden rounded-[20px] border border-white/35 flex-shrink-0 cursor-pointer"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, flex: isActive ? "5 1 0%" : "1 1 0%" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
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
                className="object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Overlay for inactive cards */}
              <motion.div 
                className="absolute inset-0 bg-slate-900/50 z-20 pointer-events-none"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Gradient for text readability */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />

              {/* Content for Active State */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 px-5 pb-5 pt-8 flex flex-col justify-end z-30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
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
                    transition={{ duration: 0.3 }}
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
  );
}
