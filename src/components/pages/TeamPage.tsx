import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import team from "@/content/team.json";

export function TeamPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <span className="section-kicker">Expertise behind the work</span>
        <h1 className="mt-5 section-title">Team</h1>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[1.05fr_0.95fr]">
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
        </SpotlightPanel>
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
              <ul className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                {team.certifications.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/50 bg-white/70 px-3 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SpotlightPanel>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="section-shell gradient-mesh p-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                Experience
              </h2>
              <p className="mt-4 section-copy">{team.experience}</p>
              <p className="mt-4 section-copy">{team.experience2}</p>
            </div>
            <ImageCard
              src={team.experienceImage}
              alt="Experienced team members collaborating"
              badge="40+ years combined"
            />
          </div>
        </SpotlightPanel>
      </Reveal>
    </div>
  );
}
