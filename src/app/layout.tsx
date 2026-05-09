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
  title: "Free AI Detector & AI Humanizer Tool | Detect and Humanize AI Text",
  description: "Detect AI-generated content instantly and humanize AI text naturally. Free AI detector and AI humanizer tool for students, bloggers, marketers, and SEO writers.",
  keywords: ["AI detector", "AI humanizer", "free AI detector", "humanize AI text", "bypass AI detector naturally", "best AI humanizer tool", "SEO AI humanizer", "ChatGPT detector"],
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
