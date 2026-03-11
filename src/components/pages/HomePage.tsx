import Link from "next/link";
import { Reveal } from "@/components/animation/Reveal";
import { HeroOrbs } from "@/components/animation/HeroOrbs";
import home from "@/content/home.json";

export function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      <section className="container-padded relative pt-10">
        <HeroOrbs />
        <Reveal>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {home.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            {home.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.02]"
            >
              {home.hero.primaryCta}
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {home.hero.secondaryCta}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="container-padded">
        <Reveal className="glass-panel p-8">
          <h2 className="text-xl font-semibold text-white">Announcement</h2>
          <p className="mt-3 text-slate-300">{home.announcement.title}</p>
          <p className="mt-3 text-slate-300">{home.announcement.description}</p>
        </Reveal>
      </section>

      <section className="container-padded grid gap-6 md:grid-cols-2">
        <Reveal className="glass-panel p-8">
          <h2 className="section-title">{home.aboutSnapshot.title}</h2>
          <p className="mt-4 section-copy">{home.aboutSnapshot.description}</p>
          <p className="mt-4 section-copy">{home.aboutSnapshot.extra}</p>
        </Reveal>
        <Reveal delay={0.1} className="glass-panel p-8">
          <h2 className="section-title">{home.vision.title}</h2>
          <p className="mt-4 section-copy">{home.vision.text}</p>
          <p className="mt-4 section-copy">{home.vision.structuring}</p>
        </Reveal>
      </section>

      <section className="container-padded">
        <Reveal>
          <h2 className="section-title">Impact Areas</h2>
          <p className="mt-3 text-slate-300">
            Let us be together to "create a space for a better place"!
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {home.impactAreas.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.05}
              className="glass-panel p-5 transition hover:-translate-y-1 hover:border-white/30"
            >
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-padded">
        <Reveal>
          <h2 className="section-title">Featured Projects</h2>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {home.featuredProjects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 0.08}
              className="glass-panel p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <h3 className="text-lg font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                {project.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-padded">
        <Reveal className="glass-panel p-8 text-center">
          <h2 className="section-title">{home.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl section-copy">
            {home.cta.description}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/csr-services"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.02]"
            >
              {home.cta.primary}
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {home.cta.secondary}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
