"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Announcement = {
  headline: string;
  title: string;
  description: string;
  tag: string;
};

export function AnnouncementCarousel({ items }: { items: Announcement[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  if (!items || items.length === 0) return null;

  return (
    <div 
      className="section-shell gradient-mesh relative flex flex-col justify-center p-8 md:p-10 w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <span className="section-kicker">Announcement</span>
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 transition-all duration-300 rounded-full ${
                activeIndex === index ? "w-16 bg-purple-500" : "w-8 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="relative mt-8 min-h-[180px] md:min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-semibold text-slate-950">
              {items[activeIndex].headline}
            </h2>
            <p className="mt-4 text-lg text-slate-700 max-w-4xl">
              {items[activeIndex].title}
            </p>
            <p className="mt-4 section-copy max-w-4xl">
              {items[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
