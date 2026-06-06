import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/custom-cursor";
import { ThemeProvider } from "@/components/system/theme-provider";
import { SoundProvider } from "@/components/system/sound-provider";
import { LoadingProvider } from "@/components/system/loading-provider";
import { LenisProvider } from "@/components/system/lenis-provider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Bhawrasa | Frontend Developer & UI/UX Designer",
  description:
    "Ahmed Bhawrasa — Frontend Developer & UI/UX Designer from Indore. Building responsive web experiences with React, Next.js, and Python.",
  openGraph: {
    title: "Ahmed Bhawrasa | Frontend Developer & UI/UX Designer",
    description:
      "Ahmed Bhawrasa — Frontend Developer & UI/UX Designer from Indore. Building responsive web experiences with React, Next.js, and Python.",
    url: "https://ahmedbhawrasa.vercel.app",
    siteName: "Ahmed Bhawrasa Portfolio",
    images: [
      {
        url: "https://ahmedbhawrasa.vercel.app/ahmed-portrait.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Bhawrasa Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Bhawrasa | Frontend Developer & UI/UX Designer",
    description:
      "Ahmed Bhawrasa — Frontend Developer & UI/UX Designer from Indore. Building responsive web experiences with React, Next.js, and Python.",
    images: ["https://ahmedbhawrasa.vercel.app/ahmed-portrait.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#020407",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 dark:bg-[#020407] dark:text-[#f7f7fb] transition-colors duration-300">
        <ThemeProvider>
          <SoundProvider>
            <LoadingProvider>
              <LenisProvider>
                <CustomCursor />
                {children}
              </LenisProvider>
            </LoadingProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
