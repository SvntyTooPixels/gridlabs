import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { FeatureCarousel } from "@/components/visual/FeatureCarousel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import { CountUp } from "@/components/animation/CountUp";
import impact from "@/content/impact.json";
import { getJournalPosts } from "@/lib/journal";

export async function ImpactPage() {
  const posts = await getJournalPosts();

  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <span className="section-kicker">Stories with proof</span>
        <h1 className="mt-5 section-title">{impact.introTitle}</h1>
        <p className="mt-3 text-xl text-slate-600">{impact.introTagline}</p>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="grid gap-5 p-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="section-shell gradient-mesh p-8">
            <p className="section-copy">{impact.intro}</p>
            <p className="mt-4 section-copy">{impact.intro2}</p>
            <p className="mt-4 section-copy">{impact.intro3}</p>
          </div>
          <ImageCard
            src={impact.introImage}
            alt={impact.introAlt}
            badge="Across India"
          />
        </SpotlightPanel>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {impact.highlights.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.06} className="h-full">
            <SpotlightPanel className="h-full p-5">
              <p className="text-4xl font-semibold text-slate-950">
                <CountUp to={item.value} />
                {item.suffix}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {item.label}
              </p>
            </SpotlightPanel>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <SpotlightPanel className="section-shell gradient-mesh p-8">
          <h2 className="text-2xl font-semibold text-slate-950">
            Program Outcomes
          </h2>
          <p className="mt-3 section-copy">
            Driving sustainable outcomes through structured CSR programs.
          </p>
          <ul className="mt-4 grid gap-2 text-slate-300 md:grid-cols-2">
            {impact.outcomes.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/50 bg-white/70 px-3 py-3 text-sm text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </SpotlightPanel>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="grid gap-5 p-4 lg:grid-cols-[0.95fr_1.05fr]">
          <ImageCard
            src={impact.caseStudyImage}
            alt={impact.caseStudyTitle}
            badge="Case study"
          />
          <div className="section-shell gradient-mesh p-8">
            <h2 className="text-2xl font-semibold text-slate-950">
              Case Study
            </h2>
            <h3 className="mt-3 text-xl font-medium text-slate-900">
              {impact.caseStudyTitle}
            </h3>
            <p className="mt-3 section-copy">{impact.caseStudy}</p>
            <p className="mt-3 section-copy">{impact.caseStudy2}</p>
            <p className="mt-3 section-copy">{impact.caseStudy3}</p>
          </div>
        </SpotlightPanel>
      </Reveal>

      <Reveal>
        <span className="section-kicker">Interactive gallery</span>
        <h2 className="mt-5 text-2xl font-semibold text-slate-950">Gallery</h2>
      </Reveal>
      <Reveal>
        <FeatureCarousel
          slides={impact.gallery.map((item) => ({
            title: item.title,
            description: item.title,
            image: item.image,
            alt: item.alt,
            tag: "Field moment",
          }))}
        />
      </Reveal>

      <Reveal>
        <span className="section-kicker">Notes from the field</span>
        <h2 className="mt-5 text-2xl font-semibold text-slate-950">Journal</h2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Reveal key={post.slug}>
            <SpotlightPanel className="h-full p-6">
              <p className="text-xs uppercase tracking-wide text-brand-700">
                {post.date}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
            </SpotlightPanel>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
