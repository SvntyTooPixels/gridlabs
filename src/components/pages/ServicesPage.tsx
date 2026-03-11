import { Reveal } from "@/components/animation/Reveal";
import services from "@/content/services.json";

export function ServicesPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <h1 className="section-title">CSR Services</h1>
      </Reveal>

      <Reveal className="glass-panel p-8">
        <h2 className="text-2xl font-semibold text-white">Overview</h2>
        <p className="mt-4 section-copy">{services.overview}</p>
        <p className="mt-4 section-copy">{services.overview2}</p>
        <p className="mt-4 section-copy">{services.overview3}</p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-white">CSR Strategy</h2>
          <p className="mt-3 section-copy">{services.strategy}</p>
          <p className="mt-3 section-copy">{services.strategy2}</p>
        </Reveal>
        <Reveal delay={0.08} className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-white">
            Program Implementation
          </h2>
          <p className="mt-3 section-copy">{services.implementation}</p>
          <p className="mt-3 section-copy">{services.implementation2}</p>
        </Reveal>
      </div>

      <Reveal className="glass-panel p-8">
        <h2 className="text-2xl font-semibold text-white">
          Impact Measurement
        </h2>
        <p className="mt-3 section-copy">{services.measurement}</p>
        <ul className="mt-4 grid gap-2 text-slate-300 md:grid-cols-2">
          {services.measurementPoints.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-white">
            Technical Expertise
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {services.technical.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-white">
            Compliance & Ethics
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {services.compliance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-200">{services.legal}</p>
        </Reveal>
      </div>
    </div>
  );
}
