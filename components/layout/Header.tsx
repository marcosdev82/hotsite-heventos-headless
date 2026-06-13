import { Navigation } from "@/components/layout/Navigation";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { getMainMenu, getMenuByLocation } from "@/services/menu.service";
import { getSiteSettings } from "@/services/site-settings.service";
import type { SiteSettings } from "@/types/wordpress";

export async function Header() {
  let settings: SiteSettings = {};
  let menuItems: Awaited<ReturnType<typeof getMenuByLocation>> = [];

  settings = await getSiteSettings().catch(() => ({}));

  // Fallback em cascata para evitar menu vazio em produção quando um endpoint falha.
  menuItems = await getMainMenu().catch(() => []);

  if (!menuItems.length) {
    console.log(
      "[menu] Header fallback: getMainMenu vazio. Tentando location PRINCIPAL.",
    );
    menuItems = await getMenuByLocation("PRINCIPAL").catch(() => []);
  }

  if (!menuItems.length) {
    console.log(
      "[menu] Header sem itens após fallback. Verifique menu 'Principal' e location PRINCIPAL no WordPress.",
    );
  }

  const siteTitle = settings.generalSettings?.title || "Hotsite de Eventos";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <SiteLogo
          title={siteTitle}
          imageClassName="h-9 w-auto"
          titleClassName="hidden text-sm font-semibold tracking-tight text-foreground md:block"
        />
        <Navigation items={menuItems} />
      </div>
    </header>
  );
}
