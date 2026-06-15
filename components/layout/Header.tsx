import { Navigation } from "@/components/layout/Navigation";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { getNavigationMenu } from "@/services/menu.service";
import { getSiteSettings } from "@/services/site-settings.service";
import type { MenuItem } from "@/types/wordpress";
import type { SiteSettings } from "@/types/wordpress";

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: "default-home", label: "Início", path: "/" },
  { id: "default-eventos", label: "Eventos", path: "/eventos" },
  { id: "default-busca", label: "Busca", path: "/busca" },
];

export async function Header() {
  let settings: SiteSettings = {};
  let menuItems: Awaited<ReturnType<typeof getNavigationMenu>> = [];

  settings = await getSiteSettings().catch(() => ({}));
  menuItems = await getNavigationMenu().catch(() => []);

  if (!menuItems.length) {
    console.log("[menu] Header sem itens do WordPress. Usando menu padrão.");
    menuItems = DEFAULT_MENU_ITEMS;
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
