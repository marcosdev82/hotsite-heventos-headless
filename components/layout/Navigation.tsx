"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "@/types/wordpress";

type NavigationProps = {
  items: MenuItem[];
};

function NavLink({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const href = item.path || "/";
  const isActive = pathname === href || pathname === `${href}/`;

  return (
    <Link
      href={href}
      target={item.target || undefined}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
        isActive ? "text-primary" : "text-foreground/80"
      }`}
    >
      {item.label}
    </Link>
  );
}

export function Navigation({ items }: NavigationProps) {
  return (
    <nav aria-label="Menu principal" className="hidden items-center gap-1 md:flex">
      {items.map((item) => (
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
  );
}
