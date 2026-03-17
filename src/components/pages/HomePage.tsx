import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { HeroOrbs } from "@/components/animation/HeroOrbs";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { FeatureCarousel } from "@/components/visual/FeatureCarousel";
import { ImageCard } from "@/components/visual/ImageCard";
import { MouseParallax } from "@/components/interactive/MouseParallax";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { BorderTrace } from "@/components/interactive/BorderTrace";
import { SiblingDimGroup } from "@/components/interactive/SiblingDimGroup";
import { HoverLiftGlow } from "@/components/interactive/HoverLiftGlow";
import home from "@/content/home.json";

export function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      <section className="container-padded relative pt-10">
        <HeroOrbs />
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SpotlightPanel className="section-shell gradient-mesh p-8 md:p-10">
              <span className="section-kicker">{home.hero.badge}</span>
              <MouseParallax offset={8} damping={50} stiffness={400}>
                <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
                  {home.hero.title}
                </h1>
              </MouseParallax>
              <MouseParallax offset={4} damping={40} stiffness={300}>
                <p className="mt-6 max-w-3xl text-lg text-slate-600">
                  {home.hero.description}
                </p>
              </MouseParallax>
              <div className="mt-6 flex flex-wrap gap-3">
                {home.hero.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-white/50 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-soft"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton strength={20}>
                  <Link
                    href="/projects"
                    className="rounded-2xl bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] px-5 py-3 font-semibold text-white transition hover:scale-[1.02] inline-block"
                  >
                    {home.hero.primaryCta}
                  </Link>
                </MagneticButton>
                <MagneticButton strength={15}>
                  <Link
                    href="/contact"
                    className="rounded-2xl border border-white/50 bg-white/70 px-5 py-3 font-semibold text-slate-900 transition hover:bg-white inline-block"
                  >
                    {home.hero.secondaryCta}
                  </Link>
                </MagneticButton>
              </div>
            </SpotlightPanel>
          </Reveal>

          <Reveal delay={0.08}>
            <ImageCard
              src={home.hero.image}
              alt={home.hero.alt}
              priority
              badge="Impact in motion"
              className="lg:ml-auto"
            >
              <p className="max-w-sm text-sm text-slate-100">
                Colorful, community-centered programs across education,
                healthcare, sustainability, and social welfare.
              </p>
            </ImageCard>
          </Reveal>
        </div>
      </section>

      <section className="container-padded">
        <Reveal>
          <BorderTrace color="rgba(147, 51, 234, 0.6)">
            <SpotlightPanel className="p-4 md:p-5">
              <div className="grid h-full gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <ImageCard
                src={home.announcement.image}
                alt={home.announcement.alt}
                badge={home.announcement.tag}
                className="h-full"
              />
              <div className="section-shell gradient-mesh flex flex-col justify-center p-8">
                <span className="section-kicker">Announcement</span>
                <h2 className="mt-5 text-3xl font-semibold text-slate-950">
                  Education momentum in Pune
                </h2>
                <p className="mt-4 text-lg text-slate-700">
                  {home.announcement.title}
                </p>
                <p className="mt-4 section-copy">
                  {home.announcement.description}
                </p>
              </div>
            </div>
            </SpotlightPanel>
          </BorderTrace>
        </Reveal>
      </section>

      <section className="container-padded">
        <SiblingDimGroup className="grid gap-6 md:grid-cols-2">
          <Reveal className="w-full">
            <SpotlightPanel className="section-shell gradient-mesh p-4 h-full">
              <ImageCard
                src={home.aboutSnapshot.image}
                alt={home.aboutSnapshot.alt}
                badge={home.aboutSnapshot.tag}
              />
              <div className="px-2 pb-2 pt-6">
                <h2 className="section-title">{home.aboutSnapshot.title}</h2>
                <p className="mt-4 section-copy">
                  {home.aboutSnapshot.description}
                </p>
                <p className="mt-4 section-copy">{home.aboutSnapshot.extra}</p>
              </div>
            </SpotlightPanel>
          </Reveal>
          <Reveal delay={0.1} className="w-full">
            <SpotlightPanel className="section-shell gradient-mesh p-4 h-full">
              <ImageCard
                src={home.vision.image}
                alt={home.vision.alt}
                badge={home.vision.tag}
              />
              <div className="px-2 pb-2 pt-6">
                <h2 className="section-title">{home.vision.title}</h2>
                <p className="mt-4 section-copy">{home.vision.text}</p>
                <p className="mt-4 section-copy">{home.vision.structuring}</p>
              </div>
            </SpotlightPanel>
          </Reveal>
        </SiblingDimGroup>
      </section>

      <section className="container-padded">
        <Reveal>
          <span className="section-kicker">Where we create change</span>
          <h2 className="mt-5 section-title">Impact Areas</h2>
          <p className="mt-3 text-slate-600">
            Let us be together to "create a space for a better place"!
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {home.impactAreas.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="h-full">
              <HoverLiftGlow>
                <SpotlightPanel className="h-full p-4">
                <div className="relative h-full overflow-hidden rounded-[24px] border border-white/35">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.accent}`}
                  />
                  <div className="relative grid min-h-[280px] grid-rows-[180px_auto]">
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="relative p-5">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="font-semibold text-slate-950">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
                </SpotlightPanel>
              </HoverLiftGlow>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-padded">
        <Reveal>
          <span className="section-kicker">Interactive project stories</span>
          <h2 className="mt-5 section-title">Featured Projects</h2>
        </Reveal>
        <Reveal className="mt-6">
          <FeatureCarousel slides={home.featuredProjects} />
        </Reveal>
      </section>

      <section className="container-padded">
        <Reveal>
          <SpotlightPanel className="p-4 md:p-5">
            <div className="grid h-full gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="section-shell gradient-mesh flex flex-col justify-center p-8 text-center lg:text-left">
                <span className="section-kicker mx-auto lg:mx-0">
                  Partner with purpose
                </span>
                <h2 className="mt-5 section-title">{home.cta.title}</h2>
                <p className="mx-auto mt-4 max-w-3xl section-copy lg:mx-0">
                  {home.cta.description}
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/csr-services"
                    className="rounded-2xl bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
                  >
                    {home.cta.primary}
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-2xl border border-white/50 bg-white/75 px-5 py-3 font-semibold text-slate-900 transition hover:bg-white"
                  >
                    {home.cta.secondary}
                  </Link>
                </div>
              </div>
              <ImageCard
                src={home.cta.image}
                alt={home.cta.alt}
                badge="Let’s collaborate"
              />
            </div>
          </SpotlightPanel>
        </Reveal>
      </section>
    </div>
  );
}
