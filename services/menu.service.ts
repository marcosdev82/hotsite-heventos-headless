import { fetchGraphQL } from "@/lib/graphql-client";
import { env } from "@/lib/env";
import {
  GET_MAIN_MENU,
  GET_MENU_BY_LOCATION,
  GET_MENU_BY_SLUG,
} from "@/graphql/queries/menus";
import type { Menu, MenuItem } from "@/types/wordpress";

type MenuByLocationResponse = {
  menuItems: { nodes: MenuItem[] };
};

type MenuBySlugResponse = {
  menu: Menu | null;
};

type MainMenuResponse = {
  menu: Menu | null;
};

export async function getMainMenu(): Promise<MenuItem[]> {
  try {
    const data = await fetchGraphQL<MainMenuResponse>(GET_MAIN_MENU, {
      tags: ["wordpress", "menus", "menu-name:Principal"],
    });

    const nodes = data.menu?.menuItems?.nodes ?? [];

    if (!nodes.length) {
      console.log("[menu] Main menu returned empty", {
        endpoint: env.graphqlEndpoint,
        menuName: "Principal",
      });
    }

    return nodes;
  } catch (error) {
    console.log("[menu] Main menu request failed", {
      endpoint: env.graphqlEndpoint,
      menuName: "Principal",
      reason: error instanceof Error ? error.message : "unknown",
    });
    return [];
  }
}

export async function getMenuByLocation(
  location: string,
): Promise<MenuItem[]> {
  try {
    const data = await fetchGraphQL<MenuByLocationResponse>(
      GET_MENU_BY_LOCATION,
      {
        variables: { location },
        tags: ["wordpress", "menus", `menu-location:${location}`],
      },
    );

    const nodes = data.menuItems?.nodes ?? [];

    if (!nodes.length) {
      console.log("[menu] Menu by location returned empty", {
        endpoint: env.graphqlEndpoint,
        location,
      });
    }

    return nodes;
  } catch (error) {
    console.log("[menu] Menu by location request failed", {
      endpoint: env.graphqlEndpoint,
      location,
      reason: error instanceof Error ? error.message : "unknown",
    });
    return [];
  }
}

export async function getMenuBySlug(slug: string): Promise<Menu | null> {
  try {
    const data = await fetchGraphQL<MenuBySlugResponse>(GET_MENU_BY_SLUG, {
      variables: { slug },
      tags: ["wordpress", "menus", `menu-slug:${slug}`],
    });

    return data.menu ?? null;
  } catch (error) {
    console.log("[menu] Menu by slug request failed", {
      endpoint: env.graphqlEndpoint,
      slug,
      reason: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
}
