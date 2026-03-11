import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import about from "@/content/about.json";

export function AboutPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <span className="section-kicker">Our story</span>
        <h1 className="mt-5 section-title">About Gridlabs</h1>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="grid gap-5 p-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="section-shell gradient-mesh p-8">
            <p className="section-copy">{about.about}</p>
            <p className="mt-4 section-copy">{about.about2}</p>
            <p className="mt-4 section-copy">{about.about3}</p>
            <p className="mt-4 section-copy">{about.about4}</p>
          </div>
          <ImageCard
            src={about.introImage}
            alt={about.introAlt}
            badge="People-centered partnerships"
          />
        </SpotlightPanel>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <SpotlightPanel className="section-shell gradient-mesh p-4">
            <ImageCard
              src={about.missionImage}
              alt="Mission-led community action"
              badge="Mission"
            />
            <div className="px-2 pb-2 pt-6">
              <h2 className="text-2xl font-semibold text-slate-950">Mission</h2>
              <p className="mt-3 section-copy">{about.mission}</p>
            </div>
          </SpotlightPanel>
        </Reveal>
        <Reveal delay={0.08}>
          <SpotlightPanel className="section-shell gradient-mesh p-4">
            <ImageCard
              src={about.visionImage}
              alt="Vision for future community growth"
              badge="Vision"
            />
            <div className="px-2 pb-2 pt-6">
              <h2 className="text-2xl font-semibold text-slate-950">Vision</h2>
              <p className="mt-3 section-copy">{about.vision}</p>
            </div>
          </SpotlightPanel>
        </Reveal>
      </div>

      <Reveal>
        <SpotlightPanel className="grid gap-5 p-4 lg:grid-cols-[0.85fr_1.15fr]">
          <ImageCard
            src={about.founder.image}
            alt={about.founder.alt}
            badge="Founder spotlight"
          />
          <div className="section-shell gradient-mesh p-8">
            <h2 className="section-title">Founder</h2>
            <p className="mt-2 text-lg font-medium text-slate-950">
              {about.founder.name}
            </p>
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-700">
              {about.founder.role}
            </p>
            <p className="mt-4 section-copy">{about.founder.bio}</p>
            <p className="mt-4 section-copy">{about.founder.bio2}</p>
          </div>
        </SpotlightPanel>
      </Reveal>

      <Reveal>
        <span className="section-kicker">Leadership strengths</span>
        <h2 className="mt-5 section-title">Founder Achievements</h2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {about.achievements.map((item, index) => (
          <Reveal key={item} delay={index * 0.04}>
            <SpotlightPanel className="h-full p-5">
              <p className="text-sm leading-6 text-slate-700">{item}</p>
            </SpotlightPanel>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <SpotlightPanel className="section-shell gradient-mesh p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-950">
            Founder Quote
          </h3>
          <p className="mt-4 text-2xl italic text-slate-900">
            “{about.founder.quote}”
          </p>
          <p className="mt-2 text-slate-600">— {about.founder.quoteBy}</p>
        </SpotlightPanel>
      </Reveal>
    </div>
  );
}
