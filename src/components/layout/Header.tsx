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
        <div className="container-padded flex h-16 items-center justify-between">

          {/* Left: Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-slate-950 flex items-center gap-2"
            >
              <img src="/images/Logo.jpg" alt="Gridlabs Logo" className="h-10 w-auto rounded-md object-contain" />
              <span className="text-gradient hidden sm:inline-block whitespace-nowrap">Gridlabs Research Foundation</span>
            </Link>
          </div>

          <div></div>
          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-xl px-2 xl:px-3 py-2 text-sm font-medium transition whitespace-nowrap",
                  pathname === item.href
                    ? "bg-white border-2 border-slate-200"
                    : "text-slate-700 hover:bg-slate-200/75 hover:text-slate-950",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div></div>
          <div></div>
          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3">
            <div className="hidden lg:block">
              <MagneticButton strength={15}>
                <button
                  onClick={() => setIsDonateOpen(true)}
                  className="rounded-xl bg-[linear-gradient(135deg,#3194c1,#994cac,#9db33e)] px-5 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] whitespace-nowrap"
                >
                  Donate now
                </button>
              </MagneticButton>
            </div>
            <button
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-900 shadow-soft lg:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
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
                    ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(153,76,172,0.18),rgba(49,148,193,0.16))] text-slate-950 shadow-soft"
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
              className="mt-2 rounded-xl bg-[linear-gradient(135deg,#3194c1,#994cac,#9db33e)] px-3 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] text-center"
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
