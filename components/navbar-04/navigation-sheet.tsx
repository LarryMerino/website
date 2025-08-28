import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/navbar-04/logo";
import { NavMenu } from "@/components/navbar-04/nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6 sm:p-8 md:p-12 max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-start gap-6">
          <Logo />
          <NavMenu orientation="vertical" className="space-y-4 text-lg" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
