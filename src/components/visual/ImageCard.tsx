"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { ReactNode } from "react";

type ImageCardProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  badge?: string;
  accentClassName?: string;
  children?: ReactNode;
};

export function ImageCard({
  src,
  alt,
  className,
  imageClassName,
  priority,
  badge,
  accentClassName,
  children,
}: ImageCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={clsx(
        "group relative overflow-hidden rounded-[30px]",
        className,
      )}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -8, rotateX: 2, rotateY: -2, transition: { duration: 0.3 } }
      }
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.26),rgba(251,113,133,0.2),rgba(45,212,191,0.18))]" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-white/35 bg-slate-200/70 shadow-[0_22px_60px_rgba(43,47,119,0.2)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={clsx(
            "object-cover transition duration-700 group-hover:scale-110",
            imageClassName,
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/10 to-white/10" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          {badge ? (
            <span
              className={clsx(
                "inline-flex rounded-full border border-white/40 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] backdrop-blur-md",
                accentClassName,
              )}
            >
              {badge}
            </span>
          ) : null}
          {children ? <div className="mt-3">{children}</div> : null}
        </div>
      </div>
    </motion.div>
  );
}
