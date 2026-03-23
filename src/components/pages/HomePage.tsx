import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { HeroOrbs } from "@/components/animation/HeroOrbs";
import { SpotlightPanel } from "@/components/interactive/SpotlightPanel";
import { ProjectScrollAccordion } from "@/components/visual/ProjectScrollAccordion";
import { ImageCard } from "@/components/visual/ImageCard";
import { AnnouncementCarousel } from "@/components/visual/AnnouncementCarousel";
import { ImpactHoverAccordion } from "@/components/visual/ImpactHoverAccordion";
import { MouseParallax } from "@/components/interactive/MouseParallax";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { BorderTrace } from "@/components/interactive/BorderTrace";
import { SiblingDimGroup } from "@/components/interactive/SiblingDimGroup";
import { ScrollSplitGroup } from "@/components/interactive/ScrollSplitGroup";
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

      <section className="container-padded mt-20">
        <ScrollSplitGroup>
          <Reveal className="w-full h-full">
            <HiddenGRFBackground className="h-full flex flex-col justify-center md:rounded-r-none group-hover/split:md:rounded-r-[36px]">
              <div className="mx-auto text-center">
                <h2 className="section-title">
                  <span className="inline-block text-brand-900 transition-colors duration-700 group-hover:text-sunrise-500">
                    {home.aboutSnapshot.title}
                  </span>
                </h2>
                <p className="mt-4 section-copy text-lg">
                  {home.aboutSnapshot.description}
                </p>
                <p className="mt-4 section-copy text-lg">
                  {home.aboutSnapshot.extra}
                </p>
              </div>
            </HiddenGRFBackground>
          </Reveal>
          <Reveal delay={0.1} className="w-full h-full">
            <GRFWithEyesBackground className="h-full flex flex-col justify-center md:rounded-l-none group-hover/split:md:rounded-l-[36px]">
              <div className="mx-auto text-center flex flex-col items-center">
                <h2 className="section-title flex items-center justify-center">
                  <span className="inline-block text-brand-900 transition-colors duration-700 group-hover:text-sunrise-500">
                    {home.vision.title}
                  </span>
                  <AnimatedEyes />
                </h2>
                <p className="mt-4 section-copy text-lg">{home.vision.text}</p>
                <p className="mt-4 section-copy text-lg">
                  {home.vision.structuring}
                </p>
              </div>
            </GRFWithEyesBackground>
          </Reveal>
        </ScrollSplitGroup>
      </section>

      <ProjectScrollAccordion items={home.featuredProjects} />

      <ImpactHoverAccordion items={home.impactAreas} />

      <section className="container-padded">
        <Reveal>
          <SpotlightPanel className="p-4 md:p-5 max-w-7xl mx-auto">
            <div className="p-4 md:p-5">
              <span className="section-kicker w-fit mx-auto lg:mx-0 ">
                Partner with purpose
              </span>
              <h2 className="mt-5 section-title">{home.cta.title}</h2>
              <p className="mx-auto mt-4 max-w-3xl section-copy lg:mx-0">
                {home.cta.description}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/csr-services"
                  className="rounded-2xl border-2 border-sunrise-500 bg-sunrise-400 px-5 py-3 font-semibold text-brand-950 transition hover:bg-sunrise-300"
                >
                  {home.cta.primary}
                </Link>
                <Link
                  href="/contact"
                  className="rounded-2xl border-2 border-brand-700 bg-cream px-5 py-3 font-semibold text-brand-900 transition hover:bg-sunrise-100"
                >
                  {home.cta.secondary}
                </Link>
              </div>
            </div>
          </SpotlightPanel>
        </Reveal>
      </section>
    </div>
  );
}
