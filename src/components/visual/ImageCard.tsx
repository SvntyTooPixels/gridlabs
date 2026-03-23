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
      <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border-2 border-brand-700 bg-brand-900">
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
        <div className="absolute inset-x-0 bottom-0 bg-brand-900 p-5 text-cream">
          {badge ? (
            <span
              className={clsx(
                "inline-flex rounded-full border-2 border-sunrise-500 bg-sunrise-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-950",
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
