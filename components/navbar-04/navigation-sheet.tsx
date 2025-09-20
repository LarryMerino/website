/**
 * NavigationSheet — Mobile navigation presented in a sheet/drawer.
 *
 * Accessibility:
 * - The open button is an `icon` button with accessible label derived from context; pair with `SheetTitle`/`SheetDescription` (sr-only) for screen readers.
 * - Content renders the brand via {@link BrandLink} and a vertical {@link NavMenu}.
 */
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { BrandLink } from "@/components/navbar-04/brand-link";
import { NavMenu } from "@/components/navbar-04/nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-accent/20 hover:text-foreground hover:border-accent/30 dark:hover:bg-primary/20 dark:hover:text-white dark:hover:border-primary/30"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6 sm:p-8 md:p-12 max-w-xs sm:max-w-sm md:max-w-md shadow-lg rounded-lg">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Access the main navigation links and sections of the website
        </SheetDescription>
        <div className="flex flex-col items-start gap-6">
          <BrandLink className="ml-0" />
          <NavMenu
            orientation="vertical"
            className="space-y-4 text-lg [font-family:var(--font-poppins)]"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
