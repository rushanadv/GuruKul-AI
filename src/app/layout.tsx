import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GuruKul AI — The Knowledge Constellation",
  description:
    "Transform static, flat syllabi into living, glowing knowledge constellations. Every answer is traceable. Every bit of progress is visible.",
  keywords: [
    "GuruKul AI",
    "Knowledge Constellation",
    "AI study tool",
    "Syllabus to Knowledge Graph",
    "Grounded AI",
    "Verifiable citations",
  ],
  authors: [{ name: "GuruKul AI Team" }],
  openGraph: {
    title: "GuruKul AI — The Knowledge Constellation",
    description:
      "Transform static, flat syllabi into living, glowing knowledge constellations. Every answer is traceable. Every bit of progress is visible.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable} dark`}>
      <body className="bg-[#050706] text-[#F4F7F5] font-sans selection:bg-[#39F5B5]/30 selection:text-[#F4F7F5] min-h-screen">
        <div className="cosmic-noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

