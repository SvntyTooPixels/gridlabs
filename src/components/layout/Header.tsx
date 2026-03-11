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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-2xl">
      <div className="container-padded flex h-20 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-950"
        >
          <span className="text-gradient">Gridlabs</span> Research Foundation
        </Link>
        <button
          className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-900 shadow-soft md:hidden"
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
                "rounded-xl px-3 py-2 text-sm font-medium transition",
                pathname === item.href
                  ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(244,114,182,0.18),rgba(59,130,246,0.16))] text-slate-950 shadow-soft"
                  : "text-slate-700 hover:bg-white/75 hover:text-slate-950",
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
                "rounded-xl px-3 py-2 text-sm font-medium transition",
                pathname === item.href
                  ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(244,114,182,0.18),rgba(59,130,246,0.16))] text-slate-950 shadow-soft"
                  : "text-slate-700 hover:bg-white/75 hover:text-slate-950",
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
