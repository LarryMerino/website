import type { ComponentType } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface TechStackLogoItem {
  icon: ComponentType<{ className?: string }>;
  label?: string;
  href?: string;
}

export interface LogoGridProps {
  items: TechStackLogoItem[];
  showLabels?: boolean;
  monochrome?: boolean;
  iconSize?: "sm" | "md" | "lg";
  iconSizeMd?: "sm" | "md" | "lg";
  mobileColumns?: 2 | 3 | 4;
  tabletColumns?: 2 | 3 | 4 | 5 | 6;
  desktopColumns?: 2 | 3 | 4 | 5 | 6 | 7 | 8;
  gap?: "compact" | "comfortable" | "spacious";
  itemPadding?: "sm" | "md";
  justify?: "start" | "center";
  className?: string;
}

// Responsive grid de logos (flex-basis controlado por CSS vars)
export function LogoGrid({
  items,
  showLabels = false,
  monochrome = true,
  iconSize = "md",
  iconSizeMd,
  mobileColumns = 3,
  tabletColumns,
  desktopColumns = 6,
  gap = "comfortable",
  itemPadding = "md",
  justify = "center",
  className,
}: LogoGridProps) {
  const iconBase: Record<NonNullable<LogoGridProps["iconSize"]>, string> = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };
  const iconMd: Record<NonNullable<LogoGridProps["iconSize"]>, string> = {
    sm: "md:w-8 md:h-8",
    md: "md:w-10 md:h-10",
    lg: "md:w-12 md:h-12",
  };

  const gapClasses: Record<NonNullable<LogoGridProps["gap"]>, string> = {
    compact: "gap-y-6 md:gap-y-8",
    comfortable: "gap-y-8 md:gap-y-10",
    spacious: "gap-y-10 md:gap-y-12",
  };

  const paddingClasses: Record<
    NonNullable<LogoGridProps["itemPadding"]>,
    string
  > = {
    sm: "px-2 py-3 md:px-3 md:py-4",
    md: "px-3 py-4 md:px-4 md:py-5",
  };

  const BASIS_BASE: Record<number, string> = {
    2: "basis-1/2",
    3: "basis-1/3",
    4: "basis-1/4",
    5: "[flex-basis:20%]",
    6: "basis-1/6",
    7: "[flex-basis:14.2857%]",
    8: "basis-1/8",
  };
  const BASIS_MD: Record<number, string> = {
    2: "md:basis-1/2",
    3: "md:basis-1/3",
    4: "md:basis-1/4",
    5: "md:[flex-basis:20%]",
    6: "md:basis-1/6",
    7: "md:[flex-basis:14.2857%]",
    8: "md:basis-1/8",
  };
  const BASIS_LG: Record<number, string> = {
    2: "lg:basis-1/2",
    3: "lg:basis-1/3",
    4: "lg:basis-1/4",
    5: "lg:[flex-basis:20%]",
    6: "lg:basis-1/6",
    7: "lg:[flex-basis:14.2857%]",
    8: "lg:basis-1/8",
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex flex-wrap w-full",
          gapClasses[gap],
          justify === "center" ? "justify-center" : "justify-start"
        )}
      >
        {items.map((item, idx) => {
          const Icon = item.icon;

          const content = (
            <div
              className={cn(
                "group flex flex-col items-center justify-center rounded-lg",
                paddingClasses[itemPadding],
                "transition-[transform,filter,color] duration-300 ease-out",
                "hover:scale-[1.03] focus-within:scale-[1.03]",
                "filter hover:brightness-125 focus-within:brightness-125",
                "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-within:scale-100"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center transition-colors duration-300 ease-out",
                  iconBase[iconSize],
                  iconSizeMd && iconMd[iconSizeMd],
                  monochrome &&
                    "text-muted-foreground group-hover:text-foreground group-focus-within:text-foreground",
                  "motion-reduce:transition-none"
                )}
              >
                <Icon className="w-full h-full" />
              </div>
              {showLabels && item.label && (
                <span
                  className={cn(
                    "mt-2 text-xs md:text-sm font-medium text-center text-muted-foreground leading-none",
                    "group-hover:text-foreground group-focus-within:text-foreground",
                    "transition-colors duration-300 ease-out",
                    "motion-reduce:transition-none"
                  )}
                >
                  {item.label}
                </span>
              )}
            </div>
          );

          return item.href ? (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
                mobileColumns ? BASIS_BASE[mobileColumns] : "",
                tabletColumns ? BASIS_MD[tabletColumns] : "",
                desktopColumns ? BASIS_LG[desktopColumns] : "",
                "shrink-0 grow-0"
              )}
            >
              {content}
            </Link>
          ) : (
            <div
              key={idx}
              className={cn(
                "block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
                mobileColumns ? BASIS_BASE[mobileColumns] : "",
                tabletColumns ? BASIS_MD[tabletColumns] : "",
                desktopColumns ? BASIS_LG[desktopColumns] : "",
                "shrink-0 grow-0"
              )}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
