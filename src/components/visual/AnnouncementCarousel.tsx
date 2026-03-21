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
      className="section-shell gradient-mesh relative flex flex-col justify-center py-8 md:py-10 w-full max-w-7xl mx-auto my-10"
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <span className="section-kicker">Announcement</span>
        <div className="flex items-center gap-4 text-slate-500">

          <div className="flex gap-2 items-center mx-2 hidden md:flex">
            {items.map((_, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.button
                  layout
                  key={index}
                  onClick={() => isActive ? setIsManuallyPaused(!isManuallyPaused) : setActiveIndex(index)}
                  className={
                    isActive
                      ? "border border-slate-200 bg-white/50 hover:bg-white hover:text-slate-900 flex items-center justify-center overflow-hidden"
                      : "bg-purple-400 hover:bg-purple-600"
                  }
                  animate={{
                    width: isActive ? 44 : 16,
                    height: 32,
                    borderRadius: isActive ? 10 : 16,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  aria-label={isActive ? (isManuallyPaused ? "Play" : "Pause") : `Go to announcement ${index + 1}`}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isActive && (
                      <motion.div
                        key={isManuallyPaused ? "play" : "pause"}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                      >
                        {isManuallyPaused ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
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
        {items.map((_, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.button
              layout
              key={index}
              onClick={() => isActive ? setIsManuallyPaused(!isManuallyPaused) : setActiveIndex(index)}
              className={
                isActive
                  ? "border border-slate-200 bg-white/50 hover:bg-white hover:text-slate-900 flex items-center justify-center overflow-hidden"
                  : "bg-purple-400 hover:bg-purple-600"
              }
              animate={{
                width: isActive ? 44 : 16,
                height: 32,
                borderRadius: isActive ? 10 : 16,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              aria-label={isActive ? (isManuallyPaused ? "Play" : "Pause") : `Go to announcement ${index + 1}`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {isActive && (
                  <motion.div
                    key={isManuallyPaused ? "play" : "pause"}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isManuallyPaused ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
