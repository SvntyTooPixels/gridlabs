import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { HeroOrbs } from "@/components/animation/HeroOrbs";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { FeatureCarousel } from "@/components/visual/FeatureCarousel";
import { ImageCard } from "@/components/visual/ImageCard";
import { AnnouncementCarousel } from "@/components/visual/AnnouncementCarousel";
import { MouseParallax } from "@/components/interactive/MouseParallax";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { BorderTrace } from "@/components/interactive/BorderTrace";
import { SiblingDimGroup } from "@/components/interactive/SiblingDimGroup";
import { HoverLiftGlow } from "@/components/interactive/HoverLiftGlow";
import { HeroSection } from "@/components/layout/HeroSection";
import home from "@/content/home.json";

export function HomePage() {
  return (
    <div className="pb-16">
      <HeroSection data={home.hero} />

        <Reveal>
            <SpotlightPanel className="p-4 md:p-5 rounded-none">
              <AnnouncementCarousel items={home.announcements} />
            </SpotlightPanel>
        </Reveal>

      <section className="container-padded my-20">
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

      <section className="container-padded my-20">
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
