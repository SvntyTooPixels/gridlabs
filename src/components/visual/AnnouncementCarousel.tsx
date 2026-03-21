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
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || isHoverPaused || isManuallyPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length, isHoverPaused, isManuallyPaused]);

  if (!items || items.length === 0) return null;

  return (
    <div
      className="section-shell gradient-mesh relative flex flex-col justify-center p-8 md:p-10 w-full max-w-7xl mx-auto"
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <span className="section-kicker">Announcement</span>
        <div className="flex items-center gap-4 text-slate-500">

          <div className="flex gap-2 items-center mx-2 hidden md:flex">
            {items.map((_, index) => (
              activeIndex === index ?


                <button
                  onClick={() => setIsManuallyPaused(!isManuallyPaused)}
                  className="p-2 rounded-[10px] border border-slate-200 bg-white/50 hover:bg-white hover:text-slate-900 transition shadow-sm"
                  aria-label={isManuallyPaused ? "Play" : "Pause"}
                >
                  {isManuallyPaused ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                  )}
                </button>
                :
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-8 transition-all duration-300 rounded-full w-4 bg-purple-400 hover:bg-purple-600`}
                  aria-label={`Go to announcement ${index + 1}`}
                />
            ))}
          </div>

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

      {/* Mobile dots indicator */}
      <div className="flex gap-2 items-center mx-auto mt-6 md:hidden">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 transition-all duration-300 rounded-full ${activeIndex === index ? "w-8 bg-purple-500" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            aria-label={`Go to announcement ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
