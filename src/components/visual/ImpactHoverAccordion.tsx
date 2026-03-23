"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";

type ImpactArea = {
  title: string;
  description: string;
  icon: string;
  accent: string;
  image: string;
};

export function ImpactHoverAccordion({ items }: { items: ImpactArea[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="container-padded my-20">
      <Reveal>
        <div className="mb-8">
          <h2 className="section-title">Where we create change</h2>
          <p className="mt-3 text-brand-800 max-w-2xl">
            Let us be together to "create a space for a better place"!
          </p>
        </div>
      </Reveal>

      {/* Desktop View: Horizontal Hover Accordion */}
      <div className="hidden lg:flex h-[60vh] w-full gap-4">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div
              layout
              key={`desktop-${item.title}`}
              onMouseEnter={() => setActiveIndex(index)}
              className="group relative h-full overflow-hidden rounded-[24px] border-2 border-brand-700 flex-shrink-0 cursor-default"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                flex: isActive ? "5 1 0%" : "1 1 0%",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.0,
                ease: [0.32, 0.72, 0, 1],
                y: { delay: index * 0.1 },
                opacity: { delay: index * 0.1 },
              }}
            >
              <div className="absolute inset-0 bg-brand-800 z-10 pointer-events-none" />

              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover z-0 transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Overlay for inactive cards */}
              <motion.div
                className="absolute inset-0 bg-brand-900 z-20 pointer-events-none"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 1.0 }}
              />

              {/* Gradient for text readability */}
              <motion.div
                className="absolute inset-0 bg-brand-800 z-20 pointer-events-none"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.1 }}
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
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl">{item.icon}</span>
                      <h3 className="font-bold text-cream text-3xl min-w-[40vw] w-[85%]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-cream bg-brand-900 p-5 rounded-2xl border-2 border-brand-700 min-w-[40vw] w-[85%]">
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
                      className="font-bold text-cream tracking-widest text-xl mb-6 whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <span className="text-3xl bg-sunrise-400 p-3 rounded-full border-2 border-sunrise-500 text-brand-950">
                      {item.icon}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile View: Vertical Click Accordion */}
      <div className="flex lg:hidden flex-col h-[70vh] w-full gap-2">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div
              layout
              key={`mobile-${item.title}`}
              onClick={() => setActiveIndex(index)}
              className="group relative w-full overflow-hidden rounded-[20px] border-2 border-brand-700 flex-shrink-0 cursor-pointer"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                flex: isActive ? "5 1 0%" : "1 1 0%",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.0,
                ease: [0.32, 0.72, 0, 1],
                y: { delay: index * 0.1 },
                opacity: { delay: index * 0.1 },
              }}
            >
              <div className="absolute inset-0 bg-brand-800 z-10 pointer-events-none" />

              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="100vw"
                className="object-cover z-0 transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Overlay for inactive cards */}
              <motion.div
                className="absolute inset-0 bg-brand-900 z-20 pointer-events-none"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 1.0 }}
              />

              {/* Gradient for text readability */}
              <motion.div
                className="absolute inset-0 bg-brand-800 z-20 pointer-events-none"
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
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{item.icon}</span>
                      <h3 className="font-bold text-cream text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-cream bg-brand-900 p-3 rounded-xl border-2 border-brand-700 overflow-hidden line-clamp-3">
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
                    <span className="flex items-center gap-3">
                      <span className="text-xl bg-sunrise-400 p-1.5 rounded-full border-2 border-sunrise-500 text-brand-950">
                        {item.icon}
                      </span>
                      <h3 className="font-semibold text-cream tracking-wider text-sm truncate max-w-[200px]">
                        {item.title}
                      </h3>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
