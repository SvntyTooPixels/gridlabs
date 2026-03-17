import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import { ActiveGradientPanel } from "@/components/interactive/ActiveGradientPanel";
import { StaggerHoverGroup, StaggerHoverItem } from "@/components/interactive/StaggerHoverGroup";
import { MouseParallax } from "@/components/interactive/MouseParallax";
import { HoverLiftGlow } from "@/components/interactive/HoverLiftGlow";
import team from "@/content/team.json";

export function TeamPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <span className="section-kicker">Expertise behind the work</span>
        <h1 className="mt-5 section-title">Team</h1>
      </Reveal>

      <Reveal>
        <ActiveGradientPanel className="p-4 shadow-[0_24px_80px_rgba(34,35,95,0.16)] backdrop-blur-xl border border-white/40">
          <div className="grid h-full gap-5 lg:grid-cols-[1.05fr_0.95fr] p-2">
            <div className="section-shell gradient-mesh p-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                CSR Expertise
              </h2>
              <p className="mt-2 text-lg text-slate-800">{team.section1Title}</p>
              <p className="mt-3 section-copy">{team.section1}</p>
              <p className="mt-3 section-copy">{team.section1b}</p>
              <p className="mt-3 section-copy">{team.section1c}</p>
              <p className="mt-3 section-copy">{team.section1d}</p>
            </div>
            <ImageCard
              src={team.heroImage}
              alt={team.heroAlt}
              badge="Collaborative leadership"
            />
          </div>
        </ActiveGradientPanel>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <ImageCard
              src={team.certificationImage}
              alt="Team workshop and certifications"
              badge="Certified expertise"
            />
            <div className="section-shell gradient-mesh p-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                Certified Expertise
              </h2>
              <StaggerHoverGroup className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                {team.certifications.map((item) => (
                  <StaggerHoverItem
                    key={item}
                    className="rounded-2xl border border-white/50 px-3 py-3"
                  >
                    {item}
                  </StaggerHoverItem>
                ))}
              </StaggerHoverGroup>
            </div>
          </div>
        </SpotlightPanel>
      </Reveal>

      <Reveal>
        <HoverLiftGlow glowColor="rgba(147, 51, 234, 0.2)">
          <SpotlightPanel className="p-4">
            <div className="grid h-full gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="section-shell gradient-mesh p-8 relative overflow-hidden">
                <MouseParallax offset={8} damping={50} stiffness={300}>
                  <h2 className="text-2xl font-semibold text-slate-950">
                    Experience
                  </h2>
                </MouseParallax>
                <MouseParallax offset={4} damping={40} stiffness={200}>
                  <p className="mt-4 section-copy">{team.experience}</p>
                  <p className="mt-4 section-copy">{team.experience2}</p>
                </MouseParallax>
              </div>
              <ImageCard
                src={team.experienceImage}
                alt="Experienced team members collaborating"
                badge="40+ years combined"
              />
            </div>
          </SpotlightPanel>
        </HoverLiftGlow>
      </Reveal>
    </div>
  );
}
