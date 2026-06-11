import type { GetServerSideProps } from "next";
import { env } from "@/lib/env";
import { getAllContentUris } from "@/services/content.service";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = env.siteUrl.replace(/\/$/, "");
  const now = new Date().toISOString();

  let entries: Array<{ uri: string; modified?: string | null }> = [];
  try {
    entries = await getAllContentUris();
  } catch {
    entries = [];
  }

  const urls = [
    `<url><loc>${baseUrl}</loc><lastmod>${now}</lastmod></url>`,
    `<url><loc>${baseUrl}/eventos</loc><lastmod>${now}</lastmod></url>`,
    ...entries.map((entry) => {
      const lastmod = entry.modified
        ? new Date(entry.modified).toISOString()
        : now;
      return `<url><loc>${baseUrl}${entry.uri}</loc><lastmod>${lastmod}</lastmod></url>`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
