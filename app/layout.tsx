import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WordPressStyles } from "@/components/gutenberg/WordPressStyles";
import { buildDefaultMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/services/site-settings.service";
import "@/styles/blocks.scss";
import "@/styles/wordpress.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    return buildDefaultMetadata(settings);
  } catch {
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
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground antialiased">
        <WordPressStyles />
        {children}
      </body>
    </html>
  );
}
