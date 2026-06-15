"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { MenuItem } from "@/types/wordpress";

type NavigationProps = {
  items: MenuItem[];
};

function resolveHref(item: MenuItem): string {
  return item.path || item.url || "/";
}

function NavLink({ item, onClick }: { item: MenuItem; onClick?: () => void }) {
  const pathname = usePathname();
  const href = resolveHref(item);
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const isActive = pathname === href || pathname === `${href}/`;

  return (
    <Link
      href={href}
      target={item.target || (isExternal ? "_blank" : undefined)}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/45 hover:text-foreground ${
        isActive ? "bg-muted/55 text-foreground" : "text-foreground/80"
      }`}
    >
      {item.label}
    </Link>
  );
}

export function Navigation({ items }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const topLevelItems = useMemo(
    () => items.filter((item) => !item.parentId),
    [items],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex items-center rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground md:hidden"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label="Abrir menu"
      >
        Menu
      </button>

      <nav aria-label="Menu principal" className="hidden items-center gap-1 md:flex">
        {topLevelItems.map((item) => (
          <div key={item.id} className="group relative">
            <NavLink item={item} />
            {item.childItems?.nodes?.length ? (
              <div className="invisible absolute left-0 top-full z-50 min-w-48 rounded-lg border border-border bg-background p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                {item.childItems.nodes.map((child) => (
                  <NavLink key={child.id} item={child} />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </nav>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Menu principal mobile"
          className="absolute left-0 right-0 top-16 z-50 border-b border-border bg-background px-4 py-3 shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-1">
            {topLevelItems.map((item) => (
              <div key={`mobile-${item.id}`} className="flex flex-col">
                <NavLink item={item} onClick={() => setIsOpen(false)} />
                {item.childItems?.nodes?.length ? (
                  <div className="ml-3 flex flex-col gap-1 border-l border-border/70 pl-2">
                    {item.childItems.nodes.map((child) => (
                      <NavLink
                        key={`mobile-child-${child.id}`}
                        item={child}
                        onClick={() => setIsOpen(false)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </nav>
      ) : null}
    </>
  );
}
