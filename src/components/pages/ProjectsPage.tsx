"use client";

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
  return (
    <div className="sticky top-20 z-40 w-full bg-white/80 backdrop-blur-md border border-slate-200 py-3 shadow-sm rounded-2xl mb-8">
      <ul className="flex flex-wrap justify-center gap-2 md:gap-6 px-4">
        {programs.sections.map((section) => (
          <li key={section.title} className="group relative">
            <button
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
              onClick={() => {
                const el = document.getElementById(getSectionId(section.title));
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              {section.title}
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto origin-top scale-95 group-hover:scale-100 z-50">
              <ul className="py-2 max-h-80 overflow-y-auto">
                {section.items.map((item) => {
                  const itemName = item.split(" — ")[0].split(" – ")[0];
                  return (
                    <li key={item}>
                      <button
                        className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        onClick={() => {
                          const el = document.getElementById(getItemId(item));
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 120;
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
