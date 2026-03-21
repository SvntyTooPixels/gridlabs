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
    offset: ["start start", "end start"]
  });

  // Parallax effect for the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  
  // Light reflection effect mapped to scroll
  // Background gradient will sweep across the text
  const textBackgroundPosition = useTransform(scrollYProgress, [0, 0.5], ["200% center", "-200% center"]);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-[95vh] items-center justify-center overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <HeroOrbs />
      </div>

      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 -z-10 h-[140%] w-full"
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
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
      </motion.div>

      {/* Hero Content */}
      <div className="container-padded relative z-10 flex flex-col items-center text-center pt-24 pb-16">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md shadow-lg"
        >
          {data.badge}
        </motion.span>
        
        <MouseParallax offset={12} damping={50} stiffness={400}>
          <motion.h1 
            style={{ 
              backgroundSize: "200% auto",
              backgroundPosition: textBackgroundPosition,
              backgroundImage: "linear-gradient(110deg, rgba(255, 255, 255, 0.2) 0%, rgba(255,255,255,1) 45%, rgba(255,255,255,1) 55%, rgba(255,255,255,0.2) 100%)"
            }}
            className="mx-auto max-w-7xl bg-clip-text text-6xl font-bold leading-tight text-transparent tracking-tight md:text-7xl lg:text-8xl"
          >
            {data.title}
          </motion.h1>
        </MouseParallax>

        <MouseParallax offset={6} damping={40} stiffness={300}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-4xl text-lg text-slate-200 md:text-xl lg:text-2xl"
          >
            {data.description}
          </motion.p>
        </MouseParallax>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-wrap justify-center gap-4 hidden md:flex"
        >
          {data.metrics.map((metric) => (
            <span
              key={metric}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-md"
            >
              {metric}
            </span>
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
              className="rounded-full bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02] inline-block"
            >
              {data.primaryCta}
            </Link>
          </MagneticButton>
          <MagneticButton strength={15}>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20 inline-block"
            >
              {data.secondaryCta}
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
