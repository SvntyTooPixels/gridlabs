import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import { HoverLiftGlow } from "@/components/interactive/HoverLiftGlow";
import programs from "@/content/programs.json";

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
      <HoverLiftGlow glowColor="rgba(59, 130, 246, 0.3)">
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <ImageCard src={image} alt={alt} badge={eyebrow} />
            <div className="section-shell gradient-mesh p-8">
              <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
              <ul className="mt-4 grid gap-3 text-sm text-slate-700">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/50 bg-white/70 px-4 py-3 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white hover:text-blue-900 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SpotlightPanel>
      </HoverLiftGlow>
    </Reveal>
  );
}

export function ProjectsPage() {
  return (
    <div className="container-padded space-y-8 pb-16">
      <Reveal>
        <span className="section-kicker">Programs with personality</span>
        <h1 className="mt-5 section-title">Programs / Projects</h1>
        <p className="mt-3 text-slate-600">
          Program Categories: {programs.categories.join(" • ")}
        </p>
        <p className="mt-4 max-w-3xl section-copy">{programs.intro}</p>
      </Reveal>

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
