import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://hummanize.ai'),
  title: "Free AI Detector & AI Humanizer Tool | Detect and Humanize AI Text",
  description: "Detect AI-generated content instantly and humanize AI text naturally. Free AI detector and AI humanizer tool for students, bloggers, marketers, and SEO writers.",
  keywords: ["AI detector", "AI humanizer", "free AI detector", "humanize AI text", "bypass AI detector naturally", "best AI humanizer tool", "SEO AI humanizer", "ChatGPT detector"],
  openGraph: {
    title: "Hummanize | Best AI Detector & Text Humanizer",
    description: "Detect AI-generated content instantly and humanize AI text naturally to bypass detectors like Turnitin and GPTZero.",
    url: 'https://hummanize.ai',
    siteName: 'Hummanize',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: 'Hummanize AI Text Humanizer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hummanize | Best AI Detector & Text Humanizer",
    description: "Detect AI-generated content instantly and humanize AI text naturally.",
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
