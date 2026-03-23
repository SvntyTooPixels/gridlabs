"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import { HoverLiftGlow } from "@/components/interactive/HoverLiftGlow";
import programs from "@/content/programs.json";

function getItemId(item: string) {
  return 'item-' + item.substring(0, 30).replace(/\W+/g, '-').toLowerCase();
}

function getSectionId(title: string) {
  return 'section-' + title.replace(/\W+/g, '-').toLowerCase();
}

function CategoryNav() {
  const [isStuck, setIsStuck] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setIsStuck(navRef.current.getBoundingClientRect().top <= 65);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={navRef}
      className={clsx(
        "sticky top-16 z-40 relative backdrop-blur-xl mb-8 transition-all duration-300 ease-in-out",
        isStuck
          ? "bg-white/95 border-b border-slate-200 py-3 shadow-md rounded-none"
          : "bg-white/80 border border-slate-200 py-4 shadow-sm rounded-2xl"
      )}
      style={{
        width: isStuck ? '100vw' : '100%',
        marginLeft: isStuck ? 'calc(50% - 50vw)' : '0px',
        marginRight: isStuck ? 'calc(50% - 50vw)' : '0px'
      }}
    >
      <div className="container-padded px-2 md:px-4">
        <ul className="flex flex-wrap justify-center gap-x-2 md:gap-x-6 gap-y-2 items-start">
          {programs.sections.map((section) => (
            <li key={section.title} className="group flex flex-col items-center flex-1 min-w-[120px] max-w-[200px]">
              <button
                className="px-3 py-2 text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap"
                onClick={() => {
                  const el = document.getElementById(getSectionId(section.title));
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 130;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                {section.title}
              </button>

              <div className="w-full overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0 group-hover:max-h-[600px] group-hover:opacity-100">
                <ul className="pt-2 pb-4 flex flex-col gap-1 w-full mt-1 border-t border-slate-200/50">
                  {section.items.map((item) => {
                    const itemName = item.split(" — ")[0].split(" – ")[0];
                    return (
                      <li key={item} className="w-full">
                        <button
                          className="w-full text-center px-1 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors rounded-md"
                          onClick={() => {
                            const el = document.getElementById(getItemId(item));
                            if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 160;
                              window.scrollTo({ top: y, behavior: "smooth" });
                            }
                          }}
                        >
                          {itemName}
                        </button>
                      </li>
                    )
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
        <HoverLiftGlow glowColor="rgba(59, 130, 246, 0.3)">
          <SpotlightPanel className="p-4">
            <div className="grid h-full gap-5 lg:grid-cols-[0.92fr_1.08fr]">
              <ImageCard src={image} alt={alt} badge={eyebrow} />
              <div className="section-shell gradient-mesh p-8">
                <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
                <ul className="mt-4 grid gap-3 text-sm text-slate-700">
                  {items.map((item) => (
                    <li
                      id={getItemId(item)}
                      key={item}
                      className="rounded-2xl border border-white/50 bg-white/70 px-4 py-3 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white hover:text-blue-900 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] scroll-mt-32"
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
