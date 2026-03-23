"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { MouseParallax } from "@/components/interactive/MouseParallax";
import { HeroOrbs } from "@/components/animation/HeroOrbs";

interface HeroSectionProps {
  data: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    badge: string;
    image: string;
    alt: string;
    metrics: string[];
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[95vh] items-center justify-center overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 opacity-100">
        <HeroOrbs />
      </div>

      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0 h-[140%] w-full"
        style={{ y: backgroundY }}
      >
        <Image
          src={data.image}
          alt={data.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/70" />
      </motion.div>

      {/* Hero Content */}
      <div className="container-padded relative z-10 flex flex-col items-center text-center py-16">
        <MouseParallax offset={12} damping={50} stiffness={400}>
          <motion.h1 className="mx-auto max-w-7xl text-6xl font-black leading-tight text-cream tracking-tight md:text-7xl lg:text-8xl">
            {data.title}
          </motion.h1>
        </MouseParallax>

        <MouseParallax offset={6} damping={40} stiffness={300}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-4xl text-lg text-cream md:text-xl lg:text-2xl"
          >
            {data.description}
          </motion.p>
        </MouseParallax>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 hidden flex-wrap items-center justify-center md:flex"
        >
          {data.metrics.map((metric, index) => (
            <div key={metric} className="flex items-center text-white">
              <span className="text-sm font-semibold tracking-wide uppercase">
                {metric}
              </span>
              {index < data.metrics.length - 1 && (
                <div className="mx-6 h-1 w-1 rounded-full bg-sunrise-400" />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <MagneticButton strength={20}>
            <Link
              href="/projects"
              className="rounded-full border-2 border-sunrise-500 bg-sunrise-400 px-8 py-4 font-semibold text-brand-950 transition hover:bg-sunrise-300 inline-block"
            >
              {data.primaryCta}
            </Link>
          </MagneticButton>
          <MagneticButton strength={15}>
            <Link
              href="/contact"
              className="rounded-full border-2 border-cream bg-brand-800 px-8 py-4 font-semibold text-cream transition hover:bg-brand-700 inline-block"
            >
              {data.secondaryCta}
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
