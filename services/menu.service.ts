import { fetchGraphQL } from "@/lib/graphql-client";
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
  const data = await fetchGraphQL<MainMenuResponse>(GET_MAIN_MENU, {
    tags: ["wordpress", "menus", "menu-name:Principal"],
  });

  return data.menu?.menuItems?.nodes ?? [];
}

export async function getMenuByLocation(
  location: string,
): Promise<MenuItem[]> {
  const data = await fetchGraphQL<MenuByLocationResponse>(
    GET_MENU_BY_LOCATION,
    {
      variables: { location },
      tags: ["wordpress", "menus", `menu-location:${location}`],
    },
  );

  return data.menuItems?.nodes ?? [];
}

export async function getMenuBySlug(slug: string): Promise<Menu | null> {
  const data = await fetchGraphQL<MenuBySlugResponse>(GET_MENU_BY_SLUG, {
    variables: { slug },
    tags: ["wordpress", "menus", `menu-slug:${slug}`],
  });

  return data.menu ?? null;
}
