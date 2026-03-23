import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { FeatureCarousel } from "@/components/visual/FeatureCarousel";
import { ImageCard } from "@/components/visual/ImageCard";
import { Reveal } from "@/components/animation/Reveal";
import { CountUp } from "@/components/animation/CountUp";
import { MouseParallax } from "@/components/interactive/MouseParallax";
import { StatHoverCard } from "@/components/interactive/StatHoverCard";
import { SiblingDimGroup } from "@/components/interactive/SiblingDimGroup";
import { StaggerHoverItem } from "@/components/interactive/StaggerHoverGroup";
import { RevealImageCard } from "@/components/interactive/RevealImageCard";
import { BorderTrace } from "@/components/interactive/BorderTrace";
import impact from "@/content/impact.json";
import { getJournalPosts } from "@/lib/journal";

export async function ImpactPage() {
  const posts = await getJournalPosts();

  return (
    <div className="container-padded space-y-10 pb-16">
      <Reveal>
        <span className="section-kicker">Stories with proof</span>
        <h1 className="mt-5 section-title">{impact.introTitle}</h1>
        <p className="mt-3 text-xl text-brand-800">{impact.introTagline}</p>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="section-shell gradient-mesh p-8">
              <MouseParallax offset={8} damping={50} stiffness={400}>
                <p className="section-copy">{impact.intro}</p>
              </MouseParallax>
              <MouseParallax offset={4} damping={60} stiffness={300}>
                <p className="mt-4 section-copy">{impact.intro2}</p>
              </MouseParallax>
              <MouseParallax offset={12} damping={40} stiffness={200}>
                <p className="mt-4 section-copy">{impact.intro3}</p>
              </MouseParallax>
            </div>
            <ImageCard
              src={impact.introImage}
              alt={impact.introAlt}
              badge="Across India"
            />
          </div>
        </SpotlightPanel>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {impact.highlights.map((item, index) => (
          <Reveal
            key={item.label}
            delay={index * 0.06}
            className="h-full w-full"
          >
            <SpotlightPanel className="h-full w-full">
              <StatHoverCard
                className="p-5 flex flex-col justify-center"
                color={["#f4ce45", "#694cd0", "#e1c3ff", "#573ab6"][index % 4]}
                valueNodes={
                  <p className="text-4xl font-semibold text-brand-900">
                    <CountUp to={item.value} />
                    {item.suffix}
                  </p>
                }
                labelNodes={
                  <p className="mt-3 text-sm leading-6 text-brand-900">
                    {item.label}
                  </p>
                }
              />
            </SpotlightPanel>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <SpotlightPanel className="section-shell gradient-mesh p-8">
          <h2 className="text-2xl font-semibold text-brand-900">
            Program Outcomes
          </h2>
          <p className="mt-3 section-copy">
            Driving sustainable outcomes through structured CSR programs.
          </p>
          <SiblingDimGroup className="mt-4 grid gap-2 text-brand-900 md:grid-cols-2">
            {impact.outcomes.map((item) => (
              <StaggerHoverItem
                key={item}
                className="rounded-2xl border-2 border-brand-700 bg-cream px-4 py-3 text-sm text-brand-900 font-medium"
              >
                {item}
              </StaggerHoverItem>
            ))}
          </SiblingDimGroup>
        </SpotlightPanel>
      </Reveal>

      <Reveal>
        <SpotlightPanel className="p-4">
          <div className="grid h-full gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <RevealImageCard
              src={impact.caseStudyImage}
              alt={impact.caseStudyTitle}
              badge="Case study"
            />
            <div className="section-shell gradient-mesh p-8">
              <h2 className="text-2xl font-semibold text-brand-900">
                Case Study
              </h2>
              <h3 className="mt-3 text-xl font-medium text-brand-900">
                {impact.caseStudyTitle}
              </h3>
              <p className="mt-3 section-copy">{impact.caseStudy}</p>
              <p className="mt-3 section-copy">{impact.caseStudy2}</p>
              <p className="mt-3 section-copy">{impact.caseStudy3}</p>
            </div>
          </div>
        </SpotlightPanel>
      </Reveal>

      <Reveal>
        <span className="section-kicker">Interactive gallery</span>
        <h2 className="mt-5 text-2xl font-semibold text-brand-900">Gallery</h2>
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
        <h2 className="mt-5 text-2xl font-semibold text-brand-900">Journal</h2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Reveal key={post.slug} className="h-full">
            <BorderTrace color="#f4ce45">
              <SpotlightPanel className="h-full p-6">
                <p className="text-xs uppercase tracking-wide text-brand-700">
                  {post.date}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-brand-900">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-brand-800">{post.excerpt}</p>
              </SpotlightPanel>
            </BorderTrace>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
