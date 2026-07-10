import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StarField from "@/components/effects/StarField";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Nexus Gaming — Play, Compete, Conquer",
  description:
    "The ultimate browser-based gaming platform. Play classic mini-games, compete on global leaderboards, earn XP, and unlock achievements — all for free.",
  keywords: ["gaming", "browser games", "leaderboard", "snake", "2048", "arcade"],
  openGraph: {
    title: "Nexus Gaming — Play, Compete, Conquer",
    description: "Free browser-based mini-games with global leaderboards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark`}>
      <body className="flex flex-col min-h-screen pt-16 overflow-x-hidden">
        <StarField />
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10">{children}</main>
        <Footer />

        {/* Ambient glow orbs */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-30%] left-[-15%] w-[60%] h-[60%] rounded-full bg-neon-purple/[0.03] blur-[180px]" />
          <div className="absolute bottom-[-30%] right-[-15%] w-[60%] h-[60%] rounded-full bg-neon-blue/[0.03] blur-[180px]" />
          <div className="absolute top-[40%] left-[50%] w-[40%] h-[40%] rounded-full bg-neon-pink/[0.02] blur-[200px]" />
        </div>
      </body>
    </html>
  );
}
