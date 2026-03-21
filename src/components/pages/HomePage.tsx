import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { HeroOrbs } from "@/components/animation/HeroOrbs";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ProjectHoverAccordion } from "@/components/visual/ProjectHoverAccordion";
import { ImageCard } from "@/components/visual/ImageCard";
import { AnnouncementCarousel } from "@/components/visual/AnnouncementCarousel";
import { ImpactScrollAccordion } from "@/components/visual/ImpactScrollAccordion";
import { MouseParallax } from "@/components/interactive/MouseParallax";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { BorderTrace } from "@/components/interactive/BorderTrace";
import { SiblingDimGroup } from "@/components/interactive/SiblingDimGroup";
import { HoverLiftGlow } from "@/components/interactive/HoverLiftGlow";
import { HeroSection } from "@/components/layout/HeroSection";
import { HiddenGRFBackground } from "@/components/interactive/HiddenGRFBackground";
import { GRFWithEyesBackground } from "@/components/interactive/GRFWithEyesBackground";
import { AnimatedEyes } from "@/components/interactive/AnimatedEyes";
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
        <SiblingDimGroup className="grid group/split gap-y-6 md:gap-0 hover:md:gap-6 transition-all duration-700 ease-out md:grid-cols-2">
          <Reveal className="w-full h-full">
            <HiddenGRFBackground className="h-full flex flex-col justify-center md:rounded-r-none group-hover/split:md:rounded-r-[36px]">
              <div className="mx-auto text-center">
                <h2 className="section-title">
                  About{" "}
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-brand-700 via-berry-600 to-sunrise-500 bg-clip-text text-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true">
                      {home.aboutSnapshot.title.replace("About ", "")}
                    </span>
                    <span className="transition-opacity duration-700 group-hover:opacity-0">
                      {home.aboutSnapshot.title.replace("About ", "")}
                    </span>
                  </span>
                </h2>
                <p className="mt-4 section-copy text-lg">
                  {home.aboutSnapshot.description}
                </p>
                <p className="mt-4 section-copy text-lg">{home.aboutSnapshot.extra}</p>
              </div>
            </HiddenGRFBackground>
          </Reveal>
          <Reveal delay={0.1} className="w-full h-full">
            <GRFWithEyesBackground className="h-full flex flex-col justify-center md:rounded-l-none group-hover/split:md:rounded-l-[36px]">
              <div className="mx-auto text-center flex flex-col items-center">
                <h2 className="section-title flex items-center justify-center">
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-brand-700 via-berry-600 to-sunrise-500 bg-clip-text text-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true">
                      {home.vision.title}
                    </span>
                    <span className="transition-opacity duration-700 group-hover:opacity-0">
                      {home.vision.title}
                    </span>
                  </span>
                  <AnimatedEyes />
                </h2>
                <p className="mt-4 section-copy text-lg">{home.vision.text}</p>
                <p className="mt-4 section-copy text-lg">{home.vision.structuring}</p>
              </div>
            </GRFWithEyesBackground>
          </Reveal>
        </SiblingDimGroup>
      </section>

      <ImpactScrollAccordion items={home.impactAreas} />

      <section className="container-padded my-20">
        <Reveal>
          <h2 className="mt-5 section-title">Featured Projects</h2>
        </Reveal>
        <Reveal className="mt-6">
          <ProjectHoverAccordion items={home.featuredProjects} />
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
                    className="rounded-2xl bg-[linear-gradient(135deg,#3194c1,#994cac,#9db33e)] px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
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
