"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
  
  // Light reflection effect
  const mouseX = useMotionValue(0);
  const [hasGyro, setHasGyro] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check initially
    window.addEventListener("resize", checkMobile);

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null) return;
      if (!hasGyro) setHasGyro(true);
      
      let xVal = e.gamma / 60;
      xVal = Math.min(Math.max(xVal, -0.5), 0.5);
      mouseX.set(xVal);
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [mouseX, hasGyro]);

  const smoothGyroX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  
  const textBackgroundPositionScroll = useTransform(scrollYProgress, [-1, 1], ["200% center", "-200% center"]);
  const textBackgroundPositionGyro = useTransform(smoothGyroX, [-1, 1], ["200% center", "-200% center"]);
  
  const textBackgroundPosition = hasGyro ? textBackgroundPositionGyro : textBackgroundPositionScroll;

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
      </motion.div>

      {/* Hero Content */}
      <div className="container-padded relative z-10 flex flex-col items-center text-center py-16">
        {/* <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md"
        >
          {data.badge}
        </motion.span> */}
        
        <MouseParallax offset={12} damping={50} stiffness={400}>
          <motion.h1 
            style={{ 
              backgroundSize: "200% auto",
              backgroundPosition: textBackgroundPosition,
              backgroundImage: isMobile ? 
                "linear-gradient(110deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,1) 80%, rgba(255,255,255,1) 100%)" : 
                "linear-gradient(110deg, rgba(255, 255, 255, 1) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0.5) 85%, rgba(255,255,255,1) 86%, rgba(255,255,255,1) 87%, rgba(255,255,255,0.5) 88%, rgba(255,255,255,0.5) 90%, rgba(255,255,255,1) 95%)"
            }}
            className="mx-auto max-w-7xl bg-clip-text text-6xl font-black leading-tight text-transparent tracking-tight md:text-7xl lg:text-8xl"
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
          className="mt-10 hidden flex-wrap items-center justify-center md:flex"
        >
          {data.metrics.map((metric, index) => (
            <div key={metric} className="flex items-center text-white">
              <span className="text-sm font-semibold tracking-wide uppercase">
                {metric}
              </span>
              {index < data.metrics.length - 1 && (
                <div className="mx-6 h-1 w-1 rounded-full bg-white/40" />
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
              className="rounded-full bg-[linear-gradient(135deg,#3194c1,#994cac,#9db33e)] px-8 py-4 font-semibold text-white transition hover:scale-[1.02] inline-block"
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
