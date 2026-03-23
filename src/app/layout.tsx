import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/animation/PageTransition";
import { DeviceOrientationPrompt } from "@/components/interactive/DeviceOrientationPrompt";
import { SmoothScroll } from "@/components/interactive/SmoothScroll";

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
        <SmoothScroll />
        <div className="relative min-h-screen">
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
