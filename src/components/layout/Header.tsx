"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { DonateModal } from "@/components/forms/DonateModal";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/csr-services", label: "CSR Services" },
  { href: "/projects", label: "Projects" },
  { href: "/impact", label: "Impact" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-2xl">
        <div className="container-padded flex h-20 items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex items-center lg:w-[20%] shrink-0">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-slate-950"
            >
              <span className="text-gradient">Gridlabs</span> Research Foundation
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-xl px-2 xl:px-3 py-2 text-sm font-medium transition whitespace-nowrap",
                  pathname === item.href
                    ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(244,114,182,0.18),rgba(59,130,246,0.16))] text-slate-950 shadow-soft"
                    : "text-slate-700 hover:bg-white/75 hover:text-slate-950",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3 lg:w-[20%] shrink-0">
            <div className="hidden lg:block">
              <MagneticButton strength={15}>
                <button
                  onClick={() => setIsDonateOpen(true)}
                  className="rounded-xl bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] px-5 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] whitespace-nowrap"
                >
                  Donate now
                </button>
              </MagneticButton>
            </div>
            <button
              className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-900 shadow-soft lg:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <nav className="container-padded mb-4 grid gap-2 lg:hidden">
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
            <button
              onClick={() => {
                setOpen(false);
                setIsDonateOpen(true);
              }}
              className="mt-2 rounded-xl bg-[linear-gradient(135deg,#2563eb,#ec4899,#14b8a6)] px-3 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] text-center"
            >
              Donate now
            </button>
          </nav>
        )}
      </header>

      {/* Donate Modal */}
      <DonateModal 
        isOpen={isDonateOpen} 
        onClose={() => setIsDonateOpen(false)} 
      />
    </>
  );
}
