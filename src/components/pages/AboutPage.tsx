import { Reveal } from "@/components/animation/Reveal";
import about from "@/content/about.json";

export function AboutPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <h1 className="section-title">About Gridlabs</h1>
      </Reveal>
      <Reveal className="glass-panel p-8">
        <p className="section-copy">{about.about}</p>
        <p className="mt-4 section-copy">{about.about2}</p>
        <p className="mt-4 section-copy">{about.about3}</p>
        <p className="mt-4 section-copy">{about.about4}</p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        <Reveal className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-white">Mission</h2>
          <p className="mt-3 section-copy">{about.mission}</p>
        </Reveal>
        <Reveal delay={0.08} className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-white">Vision</h2>
          <p className="mt-3 section-copy">{about.vision}</p>
        </Reveal>
      </div>

      <Reveal className="glass-panel p-8">
        <h2 className="section-title">Founder</h2>
        <p className="mt-2 text-lg font-medium text-white">
          {about.founder.name}
        </p>
        <p className="text-sm text-slate-300">{about.founder.role}</p>
        <p className="mt-4 section-copy">{about.founder.bio}</p>
        <p className="mt-4 section-copy">{about.founder.bio2}</p>
      </Reveal>

      <Reveal>
        <h2 className="section-title">Founder Achievements</h2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {about.achievements.map((item, index) => (
          <Reveal key={item} delay={index * 0.04} className="glass-panel p-5">
            <p className="text-sm text-slate-200">{item}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="glass-panel p-8 text-center">
        <h3 className="text-xl font-semibold text-white">Founder Quote</h3>
        <p className="mt-4 text-2xl italic text-slate-100">
          “{about.founder.quote}”
        </p>
        <p className="mt-2 text-slate-300">— {about.founder.quoteBy}</p>
      </Reveal>
    </div>
  );
}
