import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getAllContentUris } from "@/services/content.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.siteUrl.replace(/\/$/, "");

  try {
    const entries = await getAllContentUris();

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/eventos`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      ...entries.map((entry) => ({
        url: `${baseUrl}${entry.uri}`,
        lastModified: entry.modified ? new Date(entry.modified) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ];
  }
}
