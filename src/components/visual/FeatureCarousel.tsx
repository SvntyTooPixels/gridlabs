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
        "rounded-[32px] border border-white/40 bg-white/65 p-4 shadow-[0_24px_80px_rgba(34,35,95,0.16)] backdrop-blur-xl",
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
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.75))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                {activeSlide.tag ? (
                  <span className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] backdrop-blur-md">
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
                    ? "border-fuchsia-300/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(244,114,182,0.18),rgba(34,197,94,0.12))] shadow-[0_16px_40px_rgba(168,85,247,0.18)]"
                    : "border-white/30 bg-white/50 hover:border-sky-300/60 hover:bg-white/70",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {slide.title}
                    </p>
                    <p className="mt-2 max-h-10 overflow-hidden text-sm text-slate-600">
                      {slide.description}
                    </p>
                  </div>
                  <span
                    className={clsx(
                      "h-3 w-3 rounded-full",
                      active ? "bg-fuchsia-500" : "bg-slate-300",
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
