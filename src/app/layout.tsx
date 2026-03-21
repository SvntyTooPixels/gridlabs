import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/animation/PageTransition";
import { DeviceOrientationPrompt } from "@/components/interactive/DeviceOrientationPrompt";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gridlabs Research Foundation",
  description:
    "Gridlabs Research Foundation designs and implements impactful CSR initiatives across education, healthcare, sustainability, and community development.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_22%),radial-gradient(circle_at_85%_10%,rgba(244,114,182,0.18),transparent_18%),radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.16),transparent_20%)]" />
          <Header />
          <main className="pt-16">    
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <DeviceOrientationPrompt />
        </div>
      </body>
    </html>
  );
}
