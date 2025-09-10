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
  mobileColumns?: 2 | 3 | 4;
  desktopColumns?: 4 | 5 | 6 | 7 | 8;
  className?: string;
}

// Responsive grid de logos (flex-basis controlado por CSS vars)
export function LogoGrid({
  items,
  showLabels = false,
  monochrome = true,
  iconSize = "md",
  mobileColumns = 3,
  desktopColumns = 6,
  className,
}: LogoGridProps) {
  const iconSizeClasses: Record<
    NonNullable<LogoGridProps["iconSize"]>,
    string
  > = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const boxSizePxByIcon: Record<
    NonNullable<LogoGridProps["iconSize"]>,
    number
  > = {
    sm: 64,
    md: 80,
    lg: 96,
  };
  const boxPx = boxSizePxByIcon[iconSize];

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn("flex flex-wrap justify-center gap-[var(--gap)]")}
        style={
          {
            ["--box" as any]: `${boxPx}px`,
            ["--gap" as any]: "24px",
            ["--cols-mobile" as any]: String(mobileColumns),
            ["--cols-desktop" as any]: String(desktopColumns),
            ["--basis-mobile" as any]:
              "calc((100% - (var(--cols-mobile) - 1) * var(--gap)) / var(--cols-mobile))",
            ["--basis-desktop" as any]:
              "calc((100% - (var(--cols-desktop) - 1) * var(--gap)) / var(--cols-desktop))",
          } as React.CSSProperties
        }
      >
        {items.map((item, idx) => {
          const Icon = item.icon;

          const content = (
            <div
              className={cn(
                "mx-auto w-[var(--box)]",
                "group flex flex-col items-center justify-center rounded-lg p-4",
                "transition-[transform,filter,color] duration-300 ease-out",
                "hover:scale-[1.03] focus-within:scale-[1.03]",
                "filter hover:brightness-125 focus-within:brightness-125",
                "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-within:scale-100"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center transition-colors duration-300 ease-out",
                  iconSizeClasses[iconSize],
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
                    "mt-2 text-xs font-medium text-center text-muted-foreground",
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
                "block flex-grow-0 flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
                "[flex-basis:var(--basis-mobile)] md:[flex-basis:var(--basis-desktop)]"
              )}
            >
              {content}
            </Link>
          ) : (
            <div
              key={idx}
              className={cn(
                "block flex-grow-0 flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
                "[flex-basis:var(--basis-mobile)] md:[flex-basis:var(--basis-desktop)]"
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
