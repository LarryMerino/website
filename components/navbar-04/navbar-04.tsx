/**
 * Navbar04 — Fixed, rounded navbar with brand, primary navigation, theme toggle, and mobile sheet.
 *
 * Composition:
 * - BrandLink: shows the site brand and handles its own spacing.
 * - NavMenu: desktop navigation sourced from SITE_CONTENT.nav.
 * - ModeToggle: theme switch.
 * - NavigationSheet: mobile navigation in a sheet/drawer.
 */
import { BrandLink } from "@/components/navbar-04/brand-link";
import { NavMenu } from "@/components/navbar-04/nav-menu";
import { NavigationSheet } from "@/components/navbar-04/navigation-sheet";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar04Page = () => {
  return (
    <header>
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <BrandLink href="/" />
          <NavMenu className="hidden md:block" />
          <div className="flex items-center gap-3">
            <ModeToggle />
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar04Page;
