import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import { TextHighlightReveal } from "@/components/interactive/TextHighlightReveal";
import { FoldUpCard } from "@/components/interactive/FoldUpCard";
import { TiltPanel } from "@/components/interactive/TiltPanel";
import { MouseParallax } from "@/components/interactive/MouseParallax";
import { SiblingDimGroup } from "@/components/interactive/SiblingDimGroup";
import about from "@/content/about.json";

export function AboutPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <span className="section-kicker">Our story</span>
        <h1 className="mt-5 section-title">About Gridlabs</h1>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="section-shell gradient-mesh p-8">
              <p className="section-copy">
                {about.about.split(" ").map((word, i) => (
                  <TextHighlightReveal key={i} className="mr-1">
                    {word}
                  </TextHighlightReveal>
                ))}
              </p>
              <p className="mt-4 section-copy">{about.about2}</p>
              <p className="mt-4 section-copy">{about.about3}</p>
              <p className="mt-4 section-copy">{about.about4}</p>
            </div>
            <ImageCard
              src={about.introImage}
              alt={about.introAlt}
              badge="People-centered partnerships"
            />
          </div>
        </SpotlightPanel>
      </Reveal>

      <SiblingDimGroup className="grid gap-6 md:grid-cols-2">
        <Reveal className="w-full">
          <FoldUpCard>
            <SpotlightPanel className="section-shell gradient-mesh p-4 h-full">
              <ImageCard
                src={about.missionImage}
                alt="Mission-led community action"
                badge="Mission"
              />
              <div className="px-2 pb-2 pt-6">
                <h2 className="text-2xl font-semibold text-brand-900">
                  Mission
                </h2>
                <p className="mt-3 section-copy">{about.mission}</p>
              </div>
            </SpotlightPanel>
          </FoldUpCard>
        </Reveal>
        <Reveal delay={0.08} className="w-full">
          <FoldUpCard>
            <SpotlightPanel className="section-shell gradient-mesh p-4 h-full">
              <ImageCard
                src={about.visionImage}
                alt="Vision for future community growth"
                badge="Vision"
              />
              <div className="px-2 pb-2 pt-6">
                <h2 className="text-2xl font-semibold text-brand-900">
                  Vision
                </h2>
                <p className="mt-3 section-copy">{about.vision}</p>
              </div>
            </SpotlightPanel>
          </FoldUpCard>
        </Reveal>
      </SiblingDimGroup>

      <Reveal>
        <SpotlightPanel className="p-4 group/founder">
          <div className="grid h-full gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <ImageCard
              src={about.founder.image}
              alt={about.founder.alt}
              badge="Founder spotlight"
              imageClassName="grayscale group-hover/founder:grayscale-0 transition-all duration-700"
            />
            <MouseParallax offset={10} damping={60} stiffness={300}>
              <div className="section-shell gradient-mesh p-8 h-full">
                <h2 className="section-title">Founder</h2>
                <p className="mt-2 text-lg font-medium text-brand-900">
                  {about.founder.name}
                </p>
                <p className="text-sm uppercase tracking-[0.25em] text-sunrise-600">
                  {about.founder.role}
                </p>
                <p className="mt-4 section-copy">{about.founder.bio}</p>
                <p className="mt-4 section-copy">{about.founder.bio2}</p>
              </div>
            </MouseParallax>
          </div>
        </SpotlightPanel>
      </Reveal>

      <Reveal>
        <span className="section-kicker">Leadership strengths</span>
        <h2 className="mt-5 section-title">Founder Achievements</h2>
      </Reveal>
      <SiblingDimGroup className="grid gap-4 md:grid-cols-2">
        {about.achievements.map((item, index) => (
          <Reveal key={item} delay={index * 0.04}>
            <SpotlightPanel className="h-full p-5 transition-transform duration-500 hover:-translate-y-2">
              <p className="text-sm leading-6 text-brand-900">{item}</p>
            </SpotlightPanel>
          </Reveal>
        ))}
      </SiblingDimGroup>

      <Reveal>
        <TiltPanel maxTilt={5}>
          <SpotlightPanel className="section-shell gradient-mesh p-8 text-center">
            <h3 className="text-xl font-semibold text-brand-900">
              Founder Quote
            </h3>
            <p className="mt-4 text-2xl italic text-brand-900">
              “{about.founder.quote}”
            </p>
            <p className="mt-2 text-brand-800">— {about.founder.quoteBy}</p>
          </SpotlightPanel>
        </TiltPanel>
      </Reveal>
    </div>
  );
}
