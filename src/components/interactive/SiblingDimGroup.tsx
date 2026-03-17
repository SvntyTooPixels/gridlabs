"use client";

import { ReactNode } from "react";
import clsx from "clsx";

export function SiblingDimGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("group/dim flex w-full [&>*:hover]:opacity-100 [&>*:not(:hover)]:opacity-70 [&>*]:transition-opacity [&>*]:duration-500", className)}>
      {children}
    </div>
  );
}
