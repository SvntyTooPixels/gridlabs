"use client";

import { useRef } from "react";
import clsx from "clsx";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
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
  const bg = useTransform(expandRatio, [0, 1], ["#fff9ef", "#fff9ef"]);

  return (
    <div ref={wrapperRef} className="sticky top-16 z-40 mb-8 w-full group/nav">
      {/* Background Layer isolated absolutely guarantees zero layout-reflow choppiness */}
      <motion.div
        className="absolute inset-y-0 z-[-1] border-2 border-brand-700"
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
                className="px-3 py-2 text-sm font-semibold text-brand-900 group-hover:text-brand-700 transition-colors whitespace-nowrap"
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

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[260px] pt-2 overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0 group-hover:max-h-[600px] group-hover:opacity-100 z-50">
                <ul className="p-2 flex flex-col gap-1.5 w-full bg-cream border-2 border-brand-700 rounded-2xl">
                  {section.items.map((item) => {
                    const itemName = item.split(" — ")[0].split(" – ")[0];
                    return (
                      <li key={item} className="w-full">
                        <button
                          className="w-full text-center px-1 py-1.5 text-xs text-brand-900 hover:bg-sunrise-100 hover:text-brand-900 transition-colors rounded-md"
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProgramBlock({
  title,
  items,
  image,
  alt,
  eyebrow,
}: {
  title: string;
  items: string[];
  image: string;
  alt: string;
  eyebrow: string;
}) {
  return (
    <Reveal>
      <div id={getSectionId(title)} className="scroll-mt-32">
        <HoverLiftGlow glowColor="#f4ce45">
          <SpotlightPanel className="p-4">
            <div className="grid h-full gap-5 lg:grid-cols-[0.92fr_1.08fr]">
              <ImageCard src={image} alt={alt} badge={eyebrow} />
              <div className="section-shell gradient-mesh p-8">
                <h2 className="text-2xl font-semibold text-brand-900">
                  {title}
                </h2>
                <ul className="mt-4 grid gap-3 text-sm text-brand-900">
                  {items.map((item) => (
                    <li
                      id={getItemId(item)}
                      key={item}
                      className="rounded-2xl border-2 border-brand-700 bg-cream px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:bg-sunrise-100 hover:text-brand-900 scroll-mt-32"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SpotlightPanel>
        </HoverLiftGlow>
      </div>
    </Reveal>
  );
}

export function ProjectsPage() {
  return (
    <div className="container-padded space-y-8 pb-16">
      <Reveal>
        <span className="section-kicker">Programs with personality</span>
        <h1 className="mt-5 section-title">Programs / Projects</h1>
        <p className="mt-4 max-w-3xl section-copy">{programs.intro}</p>
      </Reveal>

      <CategoryNav />

      {programs.sections.map((section) => (
        <ProgramBlock
          key={section.title}
          title={section.title}
          items={section.items}
          image={section.image}
          alt={section.alt}
          eyebrow={section.eyebrow}
        />
      ))}
    </div>
  );
}
