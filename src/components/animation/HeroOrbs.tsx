"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroOrbs() {
  const first = useRef<HTMLDivElement>(null);
  const second = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!first.current || !second.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "sine.inOut" },
    });
    tl.to(first.current, { x: 30, y: -20, duration: 5 }).to(
      second.current,
      { x: -20, y: 30, duration: 5 },
      0,
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={first}
        className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-brand-500"
      />
      <div
        ref={second}
        className="absolute right-0 top-40 h-96 w-96 rounded-full bg-berry-500"
      />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sunrise-400" />
    </div>
  );
}
