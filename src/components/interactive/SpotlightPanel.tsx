"use client";

import { type CSSProperties, type ReactNode, useMemo, useState } from "react";
import clsx from "clsx";

type SpotlightPanelProps = {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
};

export function SpotlightPanel({
  children,
  className,
  glowClassName,
}: SpotlightPanelProps) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const style = useMemo(
    () =>
      ({
        "--spotlight-x": `${spotlight.x}%`,
        "--spotlight-y": `${spotlight.y}%`,
      }) as CSSProperties,
    [spotlight.x, spotlight.y],
  );

  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-[32px] border-2 border-brand-700 bg-cream",
        className,
      )}
      style={style}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        setSpotlight({ x, y });
      }}
    >
      <div
        className={clsx(
          "pointer-events-none absolute h-24 w-24 rounded-full bg-sunrise-200 opacity-0 transition duration-300 group-hover:opacity-100",
          glowClassName,
        )}
        style={{
          left: `calc(${spotlight.x}% - 3rem)`,
          top: `calc(${spotlight.y}% - 3rem)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
