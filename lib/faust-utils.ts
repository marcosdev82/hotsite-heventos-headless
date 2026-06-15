/**
 * Faust Utilities
 * Helper functions for working with Faust and WordPress data
 */

import type { ContentNode } from "@/types/wordpress";
import { logger } from "@/lib/logger";

/**
 * Get content by URI
 * Used for dynamic routes [slug].tsx
 */
export async function getContentByUri(
  uri: string
): Promise<ContentNode | null> {
  try {
    // Query implementation would go here
    // This is a placeholder that would use fetchGraphQL
    logger.debug("getContentByUri", { uri });
    return null;
  } catch (error) {
    logger.error(
      `Failed to get content by URI: ${uri}`,
      error instanceof Error ? error : new Error(String(error))
    );
    return null;
  }
}

/**
 * Get all content URIs for static generation
 * Used for generateStaticParams()
 */
export async function getAllContentUris(): Promise<string[]> {
  try {
    // Query implementation would go here
    // This should return all content URIs for static pre-rendering
    logger.debug("getAllContentUris");
    return [];
  } catch (error) {
    logger.error(
      "Failed to get all content URIs",
      error instanceof Error ? error : new Error(String(error))
    );
    return [];
  }
}

/**
 * Parse URI to slug segments
 * Converts /blog/hello-world to ['blog', 'hello-world']
 */
export function parseUriToSegments(uri: string): string[] {
  return uri.split("/").filter((segment) => segment.length > 0);
}

/**
 * Build URI from slug segments
 * Converts ['blog', 'hello-world'] to /blog/hello-world/
 */
export function buildUriFromSegments(segments: string[]): string {
  return "/" + segments.join("/") + "/";
}

/**
 * Determine content type from URI
 */
export function getContentTypeFromUri(
  uri: string
): "post" | "page" | "evento" | "unknown" {
  const segments = parseUriToSegments(uri);

  if (segments.includes("blog") || segments.includes("posts")) {
    return "post";
  }

  if (segments.includes("eventos")) {
    return "evento";
  }

  // Default to page if only 1 segment (e.g., /about/)
  if (segments.length === 1) {
    return "page";
  }

  return "unknown";
}

/**
 * Format date for display
 */
export function formatDate(date: string | null | undefined): string {
  if (!date) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Truncate text to length
 */
export function truncateText(text: string | null | undefined, length = 160): string {
  if (!text) return "";
  if (text.length <= length) return text;

  return text.slice(0, length).trim() + "...";
}

/**
 * Clean HTML tags
 */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Check if content has required fields for rendering
 */
export function isContentValid(content: ContentNode | null): boolean {
  if (!content) return false;

  return (
    content.databaseId > 0 &&
    content.uri.length > 0 &&
    typeof content.__typename === "string"
  );
}

/**
 * Get featured image URL with fallback
 */
export function getFeaturedImageUrl(
  content: ContentNode | null
): string | null {
  return content?.featuredImage?.node?.sourceUrl || null;
}

/**
 * Get featured image alt text with fallback
 */
export function getFeaturedImageAlt(
  content: ContentNode | null
): string {
  return content?.featuredImage?.node?.altText || "Featured image";
}
