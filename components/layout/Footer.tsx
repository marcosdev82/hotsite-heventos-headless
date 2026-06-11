import Link from "next/link";
import { getMenuByLocation } from "@/services/menu.service";
import { getSiteSettings } from "@/services/site-settings.service";
import type { SiteSettings } from "@/types/wordpress";

export async function Footer() {
  let settings: SiteSettings = {};
  let footerMenu: Awaited<ReturnType<typeof getMenuByLocation>> = [];

  try {
    [settings, footerMenu] = await Promise.all([
      getSiteSettings(),
      getMenuByLocation("PRINCIPAL"),
    ]);
  } catch {
    // WordPress indisponível durante build ou desenvolvimento offline
  }

  const siteTitle = settings.generalSettings?.title || "Hotsite de Eventos";
  const description = settings.generalSettings?.description;

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-lg font-semibold">{siteTitle}</p>
          {description ? (
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {footerMenu.length ? (
          <nav aria-label="Menu do rodapé" className="flex flex-col gap-2">
            {footerMenu.map((item) => (
              <Link
                key={item.id}
                href={item.path || "/"}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteTitle}
      </div>
    </footer>
  );
}
