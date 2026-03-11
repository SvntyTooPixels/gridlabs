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
        "group relative overflow-hidden rounded-[32px] border border-white/40 bg-white/65 shadow-[0_24px_80px_rgba(34,35,95,0.16)] backdrop-blur-xl",
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
          "pointer-events-none absolute inset-0 opacity-80 transition duration-500 group-hover:opacity-100",
          "bg-[radial-gradient(circle_at_var(--spotlight-x)_var(--spotlight-y),rgba(255,255,255,0.92),transparent_34%),radial-gradient(circle_at_top_left,rgba(96,165,250,0.28),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(251,113,133,0.22),transparent_36%)]",
          glowClassName,
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
