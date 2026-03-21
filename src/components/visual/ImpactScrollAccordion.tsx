"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { HoverLiftGlow } from "@/components/interactive/HoverLiftGlow";
import { Reveal } from "@/components/animation/Reveal";

type ImpactArea = {
  title: string;
  description: string;
  icon: string;
  accent: string;
  image: string;
};

export function ImpactScrollAccordion({ items }: { items: ImpactArea[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 1) {
      setActiveIndex(items.length - 1);
      return;
    }
    const index = Math.max(0, Math.floor(latest * items.length));
    setActiveIndex(index);
  });

  return (
    <>
      {/* Desktop View: Sticky Horizontal Scroll Accordion */}
      <div ref={containerRef} className="relative hidden md:block" style={{ height: `${items.length * 75}vh` }}>
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-10">
          <div className="container-padded mb-8">
            <h2 className="section-title">Where we create change</h2>
            <p className="mt-3 text-slate-600">
              Let us be together to "create a space for a better place"!
            </p>
          </div>
          
          <div className="flex h-[60vh] w-full container-padded gap-4">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  layout
                  key={item.title}
                  className="relative h-full overflow-hidden rounded-[24px] border border-white/35 flex-shrink-0 shadow-xl overflow-hidden"
                  animate={{ flex: isActive ? "5 1 0%" : "1 1 0%" }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} mix-blend-multiply opacity-50 z-10 pointer-events-none`} />
                  
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover z-0"
                  />
                  
                  {/* Overlay for inactive cards */}
                  <motion.div 
                    className="absolute inset-0 bg-slate-900/40 z-20 pointer-events-none"
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Gradient to make text readable on active card */}
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
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-4xl drop-shadow-sm">{item.icon}</span>
                          <h3 className="font-bold text-white text-3xl drop-shadow-md">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-base md:text-lg leading-relaxed text-slate-100 bg-black/30 p-5 rounded-2xl backdrop-blur-md border border-white/10 w-[85%]">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Vertical text & icon for Inactive State */}
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
                        <span className="text-3xl bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/20">
                          {item.icon}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile View: Render Original Grid */}
      <section className="container-padded md:hidden my-16">
        <Reveal>
          <h2 className="section-title">Where we create change</h2>
          <p className="mt-3 text-slate-600 mb-8">
            Let us be together to "create a space for a better place"!
          </p>
        </Reveal>
        <div className="grid gap-4">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="h-full">
              <HoverLiftGlow>
                <SpotlightPanel className="h-full p-4">
                  <div className="relative h-full overflow-hidden rounded-[24px] border border-white/35">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
                    <div className="relative grid min-h-[280px] grid-rows-[180px_auto]">
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="100vw"
                          className="object-cover mix-blend-multiply"
                        />
                      </div>
                      <div className="relative p-5 bg-white/40 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <h3 className="font-semibold text-slate-950">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-700">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </SpotlightPanel>
              </HoverLiftGlow>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
