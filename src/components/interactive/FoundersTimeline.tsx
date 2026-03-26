"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import clsx from "clsx";

export function FoundersTimeline({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for the main line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full py-10 max-w-5xl mx-auto">
      {/* Central continuous track */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200/50 -translate-x-1/2 rounded-full overflow-hidden">
        {/* The animated gradient stroke */}
        <motion.div
          className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-fuchsia-500 origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="relative z-10 space-y-12 md:-space-y-4 py-10">
        {items.map((item, index) => {
          // Determine alternating side for desktop
          const isEven = index % 2 === 0;
          
          // Split into Title and Description based on the separator used in about.json
          const parts = item.split(" — ");
          const title = parts.length > 1 ? parts[0] : `Achievement 0${index + 1}`;
          const description = parts.length > 1 ? parts[1] : parts[0];

          return (
            <div
              key={index}
              className={clsx(
                "relative flex items-center md:justify-between group",
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              )}
            >
              {/* The Timeline Node / Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-150px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute left-2 md:left-[calc(50%-8px)] w-4 h-4 bg-white border-4 border-slate-300 group-hover:border-fuchsia-500 rounded-full transition-colors duration-500 -translate-x-1/2 z-20"
              >
                {/* Glow effect that appears on hover/in view */}
                <div className="absolute inset-0 bg-fuchsia-500/50 rounded-full blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block md:w-[45%]" />

              {/* The Content Card */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full pl-12 md:pl-0 md:w-[45%]"
              >
                <SpotlightPanel className="p-6 md:p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 h-full bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4">
                    <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase flex-shrink-0">
                      /{String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 leading-tight">
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                    {description}
                  </p>
                </SpotlightPanel>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
