"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type Slide = {
  title: string;
  description: string;
  image: string;
  alt: string;
  tag?: string;
};

type FeatureCarouselProps = {
  slides: Slide[];
  className?: string;
  autoPlay?: boolean;
};

export function FeatureCarousel({
  slides,
  className,
  autoPlay = true,
}: FeatureCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!autoPlay || reduceMotion || slides.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [autoPlay, reduceMotion, slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div
      className={clsx(
        "rounded-[32px] border-2 border-brand-700 bg-cream p-4",
        className,
      )}
    >
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-[26px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.image}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-900" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                {activeSlide.tag ? (
                  <span className="inline-flex rounded-full border-2 border-sunrise-500 bg-sunrise-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-950">
                    {activeSlide.tag}
                  </span>
                ) : null}
                <h3 className="mt-3 text-2xl font-semibold md:text-3xl">
                  {activeSlide.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm text-slate-100 md:text-base">
                  {activeSlide.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid gap-3">
          {slides.map((slide, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={`${slide.title}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={clsx(
                  "rounded-[22px] border p-4 text-left transition",
                  active
                    ? "border-2 border-brand-700 bg-sunrise-100"
                    : "border-2 border-brand-700 bg-cream hover:border-sunrise-500 hover:bg-sunrise-100",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-900">
                      {slide.title}
                    </p>
                    <p className="mt-2 max-h-10 overflow-hidden text-sm text-brand-800">
                      {slide.description}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      "h-3 w-3 rounded-full",
                      active ? "bg-brand-700" : "bg-brand-300",
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
