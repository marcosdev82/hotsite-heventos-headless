/**
 * Helper for generating static params in Next.js 13+ with Faust
 * Used in dynamic routes like app/[...slug]/page.tsx
 */

import { getAllContentUris } from "@/lib/faust-utils";

export interface StaticParams {
  slug: string[];
}

/**
 * Generate static params for catch-all routes
 * This enables static generation (ISR) for all content
 */
export async function generateStaticParamsForContent(): Promise<StaticParams[]> {
  try {
    const uris = await getAllContentUris();

    return uris.map((uri) => ({
      slug: uri
        .split("/")
        .filter((segment) => segment.length > 0),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    // Return empty array on error - this will cause the route to use dynamic rendering
    return [];
  }
}

/**
 * Generate static params for specific post types
 */
export async function generateStaticParamsForPostType(
  postType: "post" | "page" | "evento"
): Promise<StaticParams[]> {
  try {
    const uris = await getAllContentUris();

    const filtered = uris.filter((uri) => {
      if (postType === "post") {
        return uri.includes("/blog/") || uri.includes("/posts/");
      }
      if (postType === "evento") {
        return uri.includes("/eventos/");
      }
      // For pages, exclude special paths
      return !uri.includes("/blog/") && !uri.includes("/eventos/");
    });

    return filtered.map((uri) => ({
      slug: uri
        .split("/")
        .filter((segment) => segment.length > 0),
    }));
  } catch (error) {
    console.error(
      `Failed to generate static params for ${postType}:`,
      error
    );
    return [];
  }
}
