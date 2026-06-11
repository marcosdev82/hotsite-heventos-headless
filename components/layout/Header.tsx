import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { getMainMenu, getMenuByLocation } from "@/services/menu.service";
import { getSiteSettings } from "@/services/site-settings.service";
import type { SiteSettings } from "@/types/wordpress";

export async function Header() {
  let settings: SiteSettings = {};
  let menuItems: Awaited<ReturnType<typeof getMenuByLocation>> = [];

  try {
    [settings, menuItems] = await Promise.all([getSiteSettings(), getMainMenu()]);

    if (!menuItems.length) {
      menuItems = await getMenuByLocation("PRIMARY");
    }
  } catch {
    // WordPress indisponível durante build ou desenvolvimento offline
  }

  const siteTitle = settings.generalSettings?.title || "Hotsite de Eventos";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteTitle}
        </Link>
        <Navigation items={menuItems} />
      </div>
    </header>
  );
}
