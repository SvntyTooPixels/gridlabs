import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import services from "@/content/services.json";

export function ServicesPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <span className="section-kicker">How we help</span>
        <h1 className="mt-5 section-title">CSR Services</h1>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="section-shell gradient-mesh p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Overview</h2>
              <p className="mt-4 section-copy">{services.overview}</p>
              <p className="mt-4 section-copy">{services.overview2}</p>
              <p className="mt-4 section-copy">{services.overview3}</p>
            </div>
            <ImageCard
              src={services.heroImage}
              alt={services.heroAlt}
              badge="Strategy to delivery"
            />
          </div>
        </SpotlightPanel>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <SpotlightPanel className="section-shell gradient-mesh p-4">
            <ImageCard
              src={services.strategyImage}
              alt="Strategy workshop and planning"
              badge="Strategy"
            />
            <div className="px-2 pb-2 pt-6">
              <h2 className="text-2xl font-semibold text-slate-950">
                CSR Strategy
              </h2>
              <p className="mt-3 section-copy">{services.strategy}</p>
              <p className="mt-3 section-copy">{services.strategy2}</p>
            </div>
          </SpotlightPanel>
        </Reveal>
        <Reveal delay={0.08}>
          <SpotlightPanel className="section-shell gradient-mesh p-4">
            <ImageCard
              src={services.implementationImage}
              alt="Program implementation and delivery"
              badge="Implementation"
            />
            <div className="px-2 pb-2 pt-6">
              <h2 className="text-2xl font-semibold text-slate-950">
                Program Implementation
              </h2>
              <p className="mt-3 section-copy">{services.implementation}</p>
              <p className="mt-3 section-copy">{services.implementation2}</p>
            </div>
          </SpotlightPanel>
        </Reveal>
      </div>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <ImageCard
              src={services.measurementImage}
              alt="Data dashboards and impact measurement"
              badge="Measurement"
            />
            <div className="section-shell gradient-mesh p-8">
              <h2 className="text-2xl font-semibold text-slate-950">
                Impact Measurement
              </h2>
              <p className="mt-3 section-copy">{services.measurement}</p>
              <ul className="mt-4 grid gap-2 text-slate-300 md:grid-cols-2">
                {services.measurementPoints.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/50 bg-white/70 px-3 py-3 text-sm text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SpotlightPanel>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <SpotlightPanel className="section-shell gradient-mesh p-4">
            <ImageCard
              src={services.technicalImage}
              alt="Technical project planning conversation"
              badge="Technical expertise"
            />
            <div className="px-2 pb-2 pt-6">
              <h2 className="text-2xl font-semibold text-slate-950">
                Technical Expertise
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {services.technical.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </SpotlightPanel>
        </Reveal>

        <Reveal delay={0.08}>
          <SpotlightPanel className="section-shell gradient-mesh p-4">
            <ImageCard
              src={services.complianceImage}
              alt="Compliance and legal review in progress"
              badge="Compliance"
            />
            <div className="px-2 pb-2 pt-6">
              <h2 className="text-2xl font-semibold text-slate-950">
                Compliance & Ethics
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {services.compliance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">{services.legal}</p>
            </div>
          </SpotlightPanel>
        </Reveal>
      </div>
    </div>
  );
}
