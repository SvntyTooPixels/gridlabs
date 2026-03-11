import { Reveal } from "@/components/animation/Reveal";
import team from "@/content/team.json";

export function TeamPage() {
  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <h1 className="section-title">Team</h1>
      </Reveal>

      <Reveal className="glass-panel p-8">
        <h2 className="text-2xl font-semibold text-white">CSR Expertise</h2>
        <p className="mt-2 text-lg text-slate-200">{team.section1Title}</p>
        <p className="mt-3 section-copy">{team.section1}</p>
        <p className="mt-3 section-copy">{team.section1b}</p>
        <p className="mt-3 section-copy">{team.section1c}</p>
        <p className="mt-3 section-copy">{team.section1d}</p>
      </Reveal>

      <Reveal className="glass-panel p-8">
        <h2 className="text-2xl font-semibold text-white">
          Certified Expertise
        </h2>
        <ul className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
          {team.certifications.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="glass-panel p-8">
        <h2 className="text-2xl font-semibold text-white">Experience</h2>
        <p className="mt-4 section-copy">{team.experience}</p>
        <p className="mt-4 section-copy">{team.experience2}</p>
      </Reveal>
    </div>
  );
}
