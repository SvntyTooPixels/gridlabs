import { Reveal } from "@/components/animation/Reveal";
import programs from "@/content/programs.json";

function ProgramBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal className="glass-panel p-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Reveal>
  );
}

export function ProjectsPage() {
  return (
    <div className="container-padded space-y-8 pb-16">
      <Reveal>
        <h1 className="section-title">Programs / Projects</h1>
        <p className="mt-3 text-slate-300">
          Program Categories: {programs.categories.join(" • ")}
        </p>
      </Reveal>

      <ProgramBlock title="Healthcare Programs" items={programs.healthcare} />
      <ProgramBlock title="Education Programs" items={programs.education} />
      <ProgramBlock title="Women & Welfare" items={programs.welfare} />
      <ProgramBlock title="Community Development" items={programs.community} />
      <ProgramBlock title="Environment" items={programs.environment} />
    </div>
  );
}
