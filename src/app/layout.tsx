import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SP LABS | Premium Web & App Development",
    template: "%s | SP LABS",
  },
  description: "Freelance agency providing top-tier web development, app development, AI automation, and custom business software for modern companies.",
  keywords: ["web development", "app development", "AI automation", "SaaS", "freelance agency", "custom software"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://splabs.com",
    title: "SP LABS",
    description: "Premium Web & App Development, AI Automation, and Custom Software.",
    siteName: "SP LABS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://splabs.com/#website",
                  "url": "https://splabs.com",
                  "name": "SP LABS",
                  "description": "Premium Web & App Development, AI Automation, and Custom Software."
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://splabs.com/#organization",
                  "name": "SP LABS",
                  "url": "https://splabs.com",
                  "logo": "https://splabs.com/logo.png",
                  "description": "Independent Developer specializing in custom web applications, billing software, and n8n automation."
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
