"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { Reveal } from "@/components/animation/Reveal";
import { HoverLiftGlow } from "@/components/interactive/HoverLiftGlow";
import programs from "@/content/programs.json";

function getItemId(item: string) {
  return "item-" + item.substring(0, 30).replace(/\W+/g, "-").toLowerCase();
}

function getSectionId(title: string) {
  return "section-" + title.replace(/\W+/g, "-").toLowerCase();
}

function CategoryNav() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: expandRatio } = useScroll({
    target: wrapperRef,
    // Mirror previous behavior: animate over the final 120px before sticky lock at top-16.
    offset: ["start 184px", "start 64px"],
  });

  const marginCalc = useMotionTemplate`calc(${expandRatio} * (50% - 50vw))`;
  const widthCalc = useMotionTemplate`calc(100% + ${expandRatio} * (100vw - 100%))`;
  const borderRadiusCalc = useMotionTemplate`${useTransform(expandRatio, [0, 1], [16, 0])}px`;
  const bg = useTransform(
    expandRatio,
    [0, 1],
    ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.95)"],
  );

  return (
    <div ref={wrapperRef} className="sticky top-16 z-40 mb-8 w-full group/nav">
      {/* Background Layer isolated absolutely guarantees zero layout-reflow choppiness */}
      <motion.div
        className="absolute inset-y-0 z-[-1] border border-slate-200 backdrop-blur-xl"
        style={{
          width: widthCalc,
          marginLeft: marginCalc,
          marginRight: marginCalc,
          borderRadius: borderRadiusCalc,
          backgroundColor: bg,
        }}
      />

      <div className="px-2 md:px-4 py-3">
        <ul className="flex flex-wrap justify-center gap-x-2 md:gap-x-6 gap-y-2 items-start">
          {programs.sections.map((section) => (
            <li
              key={section.title}
              className="group flex flex-col items-center relative flex-1 min-w-[120px] max-w-[200px]"
            >
              <button
                className="px-3 py-2 text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap"
                onClick={() => {
                  const el = document.getElementById(
                    getSectionId(section.title),
                  );
                  if (el) {
                    const y =
                      el.getBoundingClientRect().top + window.scrollY - 130;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                {section.title}
              </button>

              {/* <div className="absolute top-full left-1/2 -translate-x-1/2 w-[260px] pt-2 overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0 group-hover:max-h-[600px] group-hover:opacity-100 z-50">
                <ul className="p-2 flex flex-col gap-1.5 w-full bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl">
                  {section.items.map((item) => {
                    const itemName = item.split(" — ")[0].split(" – ")[0];
                    return (
                      <li key={item} className="w-full">
                        <button
                          className="w-full text-center px-1 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors rounded-md"
                          onClick={() => {
                            const el = document.getElementById(getItemId(item));
                            if (el) {
                              const y =
                                el.getBoundingClientRect().top +
                                window.scrollY -
                                160;
                              window.scrollTo({ top: y, behavior: "smooth" });
                            }
                          }}
                        >
                          {itemName}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectFan({ screen }: { screen: any }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const total = screen.items.length;

  return (
    <div className="relative w-full h-[450px] md:h-[500px] flex justify-center items-center mt-12 mb-8 perspective-1000">
      {screen.items.map((item: string, i: number) => {
        const itemName = item.split(" — ")[0].split(" – ")[0];
        let itemDesc = "";
        if (item.includes(" — ")) {
          itemDesc = item.split(" — ")[1];
        } else if (item.includes(" – ")) {
          itemDesc = item.split(" – ")[1];
        } else {
          itemDesc = item.substring(itemName.length + 3);
        }

        const center = (total - 1) / 2;
        const diff = i - center;
        const rot = diff * 8; // degrees
        const yOffset = Math.abs(diff) * 12; // px

        // Base X translation
        const baseXCalc = `calc(${diff} * clamp(30px, 4vw, 70px))`;

        let pushedX = baseXCalc;
        let pushedRot = rot;
        if (selectedIndex !== null && selectedIndex !== i) {
          const pushAmount = i < selectedIndex ? -90 : 90;
          pushedX = `calc(${baseXCalc} + ${pushAmount}px)`;
          pushedRot = rot + (i < selectedIndex ? -6 : 6);
        }

        const isSelected = selectedIndex === i;

        return (
          <motion.div
            key={item}
            className="absolute top-0 cursor-pointer"
            style={{ 
              originX: 0.5, 
              originY: 1.5,
              zIndex: isSelected ? 50 : total - i 
            }}
            initial={false}
            animate={{
              x: isSelected ? baseXCalc : pushedX,
              y: yOffset, // straighten in its own place
              rotate: isSelected ? 0 : pushedRot,
              scale: isSelected ? 1.15 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8
            }}
            onClick={() => setSelectedIndex(isSelected ? null : i)}
          >
            <HoverLiftGlow glowColor="rgba(59, 130, 246, 0.4)">
              <SpotlightPanel className="w-[260px] md:w-[300px] h-[380px] md:h-[420px] bg-white/95 backdrop-blur-xl rounded-[2rem] p-5 shadow-xl border border-white/60 flex flex-col items-center">
                <div className="w-full flex-shrink-0 h-[140px] md:h-[160px] mb-5 rounded-2xl overflow-hidden shadow-sm relative border border-slate-100">
                  <img
                    src={screen.image}
                    alt={screen.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-center text-lg md:text-xl text-slate-900 leading-tight mb-3">
                  {itemName}
                </h3>
                <div className="w-8 h-1 bg-blue-500 rounded-full mb-4 opacity-80 flex-shrink-0" />
                <p className="text-sm text-slate-600 text-center line-clamp-4 leading-relaxed px-2">
                  {itemDesc}
                </p>
              </SpotlightPanel>
            </HoverLiftGlow>
          </motion.div>
        );
      })}
    </div>
  );
}

function HorizontalProjectScroll() {
  const screens = programs.sections.map((sec) => ({
    id: getSectionId(sec.title),
    title: sec.title,
    eyebrow: sec.eyebrow,
    image: sec.image,
    alt: sec.alt,
    items: sec.items,
    isContinued: false,
  }));

  const numScreens = screens.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${100 * ((numScreens - 1) / numScreens)}%`]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${numScreens * 100}vh` }}
    >
      {/* Absolute markers for native navigation and vertical scroll snapping */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: `${numScreens * 100}vh` }}
      >
        {screens.map((screen, i) => (
          <div
            key={`marker-${i}`}
            id={screen.id}
            className="absolute w-full snap-start scroll-mt-32"
            style={{ top: `${i * 100}vh`, height: "100vh" }}
          >
            {screen.items.map((item) => (
              <div
                key={item}
                id={getItemId(item)}
                className="absolute w-full scroll-mt-32"
                style={{ top: "30%" }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Pinned horizontal scrolling block */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center border-y border-slate-200/50">
        <motion.div
          className="flex h-full will-change-transform items-center"
          style={{ x, width: `${numScreens * 100}vw` }}
        >
          {screens.map((screen, idx) => (
            <div
              key={idx}
              className="w-screen h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 flex-shrink-0 pt-24 pb-12"
            >
              <div className="max-w-7xl w-full mx-auto">
                <div className="mb-8 lg:mb-12">
                  <Reveal>
                    <p className="section-kicker mb-2">{screen.eyebrow}</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 flex items-baseline gap-4">
                      {screen.title}
                    </h2>
                  </Reveal>
                </div>

                <ProjectFan screen={screen} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function ProjectsPage() {
  return (
    <div className="w-full pb-0 pt-16 relative">
      <div className="container-padded space-y-8 mb-8">
        <Reveal>
          <span className="section-kicker">Programs with personality</span>
          <h1 className="mt-5 section-title">Programs / Projects</h1>
          <p className="mt-4 max-w-3xl section-copy">{programs.intro}</p>
        </Reveal>
      </div>

      <div className="container-padded sticky top-16 z-50 mb-8 pointer-events-none">
        <div className="pointer-events-auto">
          <CategoryNav />
        </div>
      </div>

      <HorizontalProjectScroll />
    </div>
  );
}
