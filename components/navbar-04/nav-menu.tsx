/**
 * NavMenu — Desktop/vertical navigation list built on top of Radix NavigationMenu.
 *
 * Data source: items are read from `SITE_CONTENT.nav` and support internal and external links.
 *
 * Props: accepts and forwards {@link NavigationMenuProps} to the underlying Radix component
 * so callers can control orientation, className, etc.
 */
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { SITE_CONTENT } from "@/content/site";

export const NavMenu = (props: NavigationMenuProps) => {
  const items = SITE_CONTENT.nav;
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {items.map((item) => (
          <NavigationMenuItem key={item.href + item.label}>
            <NavigationMenuLink asChild>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[font-family:var(--font-poppins)] font-medium tracking-tight"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="[font-family:var(--font-poppins)] font-medium tracking-tight"
                >
                  {item.label}
                </Link>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
