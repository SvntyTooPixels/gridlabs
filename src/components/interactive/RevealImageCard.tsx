"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

export function RevealImageCard({
  src,
  alt,
  badge,
  className,
}: {
  src: string;
  alt: string;
  badge?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={clsx(
        "group relative overflow-hidden rounded-[30px]",
        className,
      )}
      whileHover="hover"
      initial="rest"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border-2 border-brand-700">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <motion.div
          className="absolute inset-0 bg-slate-900"
          variants={{
            rest: { x: "0%", opacity: 0.8 },
            hover: { x: "100%", opacity: 0 },
          }}
          transition={{ duration: 0.6, ease: "anticipate" }}
        />
        {badge ? (
          <motion.div
            className="absolute bottom-5 left-5 z-10"
            variants={{
              rest: { opacity: 1, x: 0 },
              hover: { opacity: 0, x: -20 },
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex rounded-full border-2 border-sunrise-500 bg-sunrise-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-950">
              {badge}
            </span>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
