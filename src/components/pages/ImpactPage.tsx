import { Reveal } from "@/components/animation/Reveal";
import { CountUp } from "@/components/animation/CountUp";
import impact from "@/content/impact.json";
import { getJournalPosts } from "@/lib/journal";

export async function ImpactPage() {
  const posts = await getJournalPosts();

  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <h1 className="section-title">{impact.introTitle}</h1>
        <p className="mt-3 text-xl text-slate-200">{impact.introTagline}</p>
      </Reveal>

      <Reveal className="glass-panel p-8">
        <p className="section-copy">{impact.intro}</p>
        <p className="mt-4 section-copy">{impact.intro2}</p>
        <p className="mt-4 section-copy">{impact.intro3}</p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {impact.highlights.map((item, index) => (
          <Reveal
            key={item}
            delay={index * 0.06}
            className="glass-panel p-5 transition hover:-translate-y-1 hover:border-white/30"
          >
            <p className="text-3xl font-semibold text-white">
              <CountUp to={index + 1} />
            </p>
            <p className="text-sm text-slate-200">{item}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="glass-panel p-8">
        <h2 className="text-2xl font-semibold text-white">Program Outcomes</h2>
        <p className="mt-3 section-copy">
          Driving sustainable outcomes through structured CSR programs.
        </p>
        <ul className="mt-4 grid gap-2 text-slate-300 md:grid-cols-2">
          {impact.outcomes.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="glass-panel p-8">
        <h2 className="text-2xl font-semibold text-white">Case Study</h2>
        <h3 className="mt-3 text-xl font-medium text-slate-100">
          {impact.caseStudyTitle}
        </h3>
        <p className="mt-3 section-copy">{impact.caseStudy}</p>
        <p className="mt-3 section-copy">{impact.caseStudy2}</p>
        <p className="mt-3 section-copy">{impact.caseStudy3}</p>
      </Reveal>

      <Reveal>
        <h2 className="text-2xl font-semibold text-white">Gallery</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {impact.gallery.map((item, index) => (
          <Reveal
            key={item}
            delay={index * 0.04}
            className="glass-panel p-5 text-sm text-slate-200"
          >
            {item}
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h2 className="text-2xl font-semibold text-white">Journal</h2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Reveal key={post.slug} className="glass-panel p-6">
            <p className="text-xs uppercase tracking-wide text-brand-200">
              {post.date}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {post.title}
            </h3>
            <p className="mt-3 text-sm text-slate-300">{post.excerpt}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
