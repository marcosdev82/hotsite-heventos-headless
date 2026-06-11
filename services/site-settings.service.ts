import { fetchGraphQL } from "@/lib/graphql-client";
import { GET_SITE_SETTINGS } from "@/graphql/queries/settings";
import type { SiteSettings } from "@/types/wordpress";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await fetchGraphQL<SiteSettings>(GET_SITE_SETTINGS, {
      revalidate: 3600,
      tags: ["wordpress", "settings"],
    });
  } catch {
    return {};
  }
}
