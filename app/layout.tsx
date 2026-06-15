import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WordPressStyles } from "@/components/gutenberg/WordPressStyles";
import { WordPressCustomStyles } from "@/components/gutenberg/WordPressCustomStyles";
import { buildDefaultMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/services/site-settings.service";
import { logger } from "@/lib/logger";
import "./globals.css";
import "@/styles/blocks.scss";
import "@/styles/wordpress.css";
import "@/styles/wordpress-override.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    return buildDefaultMetadata(settings);
  } catch (error) {
    logger.error(
      "Failed to generate metadata",
      error instanceof Error ? error : new Error(String(error))
    );
    return buildDefaultMetadata({});
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* WordPress Styles */}
        <WordPressStyles />
        <WordPressCustomStyles />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
