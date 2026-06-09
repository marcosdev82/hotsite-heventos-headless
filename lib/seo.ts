import type { Metadata } from "next";
import { env } from "@/lib/env";
import type { ContentNode, SEOData, SiteSettings } from "@/types/wordpress";

function absoluteUrl(path = "/"): string {
  const base = env.siteUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function buildMetadataFromSeo(
  seo?: SEOData | null,
  fallback?: {
    title?: string | null;
    description?: string | null;
    uri?: string;
    image?: string | null;
  },
): Metadata {
  const title = seo?.opengraphTitle || seo?.title || fallback?.title || "";
  const description =
    seo?.opengraphDescription || seo?.metaDesc || fallback?.description || "";
  const image =
    seo?.opengraphImage?.sourceUrl || fallback?.image || undefined;
  const canonical = seo?.canonical || absoluteUrl(fallback?.uri);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: title,
      type: "website",
      images: image
        ? [
            {
              url: image,
              alt: seo?.opengraphImage?.altText || title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function buildDefaultMetadata(settings: SiteSettings): Metadata {
  const title = settings.generalSettings?.title || "Hotsite de Eventos";
  const description =
    settings.generalSettings?.description ||
    "Eventos, programação e conteúdos dinâmicos.";

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: env.siteUrl,
      siteName: title,
      locale: settings.generalSettings?.language || "pt_BR",
      type: "website",
    },
  };
}

export function buildContentMetadata(node: ContentNode): Metadata {
  return buildMetadataFromSeo(node.seo, {
    title: node.title,
    description: node.excerpt?.replace(/<[^>]*>/g, "") || undefined,
    uri: node.uri,
    image: node.featuredImage?.node?.sourceUrl,
  });
}
