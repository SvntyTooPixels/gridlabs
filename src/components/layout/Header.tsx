"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/csr-services", label: "CSR Services" },
  { href: "/projects", label: "Programs / Projects" },
  { href: "/impact", label: "Impact" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container-padded flex h-20 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Gridlabs Research Foundation
        </Link>
        <button
          className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-lg px-3 py-2 text-sm transition",
                pathname === item.href
                  ? "bg-white text-slate-900"
                  : "text-slate-200 hover:bg-white/10",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {open && (
        <nav className="container-padded mb-4 grid gap-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "rounded-lg px-3 py-2 text-sm transition",
                pathname === item.href
                  ? "bg-white text-slate-900"
                  : "text-slate-200 hover:bg-white/10",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
