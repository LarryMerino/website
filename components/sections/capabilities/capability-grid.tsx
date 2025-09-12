/**
 * Capability Grid
 * Renders cards with responsive columns.
 * Layout modes:
 *  - Flex (default): centers the last row using flex-basis via CSS variables.
 *  - Grid: alternative without centering.
 * Height precedence per breakpoint: fixed height over min-height.
 *  - Supports mobile-specific height via `cardHeightMobile` using CSS vars (--cap-h-mobile, --cap-h-base).
 *  - Height is applied to CapabilityCard; <li> only controls basis.
 * Performance: memo + memoized derived styles/arrays.
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import CapabilityCard from "@/components/ui/capability-card";
import type { CapabilityItem } from "./data";

/** Map Tailwind gap utility → raw pixel value for basis calculations. */
const GAP_VALUE_MAP: Record<string, string> = {
  "gap-2": "8px",
  "gap-3": "12px",
  "gap-4": "16px",
  "gap-5": "20px",
  "gap-6": "24px",
  "gap-8": "32px",
  "gap-10": "40px",
  "gap-12": "48px",
};

/**
 * Resolve a provided gap prop to a CSS length string for use in --gap.
 * Supports:
 *  - Known Tailwind classes (gap-2, gap-3, gap-4, gap-5, gap-6, gap-8, gap-10, gap-12)
 *  - Arbitrary values: gap-[18px], gap-[1.25rem], gap-[var(--space-6)]
 *  - Direct CSS lengths (e.g., "24px", "1rem", "var(--space)")
 * Falls back to 24px (gap-6) if not recognized.
 */
function resolveGapValue(gap?: string): string {
  if (!gap) return GAP_VALUE_MAP["gap-6"]; // default 24px
  // Known Tailwind class
  if (GAP_VALUE_MAP[gap]) return GAP_VALUE_MAP[gap];
  // Arbitrary value syntax: gap-[...]
  const arb = gap.match(/^gap-\[(.+)\]$/);
  if (arb) return arb[1];
  // Direct CSS length or var
  if (/^(\d+(px|rem|em|%)|[\d.]+(rem|em|vh|vw)|var\(.+\))$/.test(gap)) {
    return gap;
  }
  return GAP_VALUE_MAP["gap-6"]; // safe fallback
}

/** Returns a style object for height (fixed/min) or undefined when not required. */
function getHeightStyle(
  cardHeight?: number | string,
  cardMinHeight?: number | string
): React.CSSProperties | undefined {
  if (cardHeight != null) {
    return {
      height: typeof cardHeight === "number" ? `${cardHeight}px` : cardHeight,
    };
  }
  if (cardMinHeight != null) {
    return {
      minHeight:
        typeof cardMinHeight === "number"
          ? `${cardMinHeight}px`
          : cardMinHeight,
    };
  }
  return undefined;
}

export type CapabilityColMobile = 1 | 2 | 3 | 4; // base viewport
export type CapabilityColTablet = 1 | 2 | 3 | 4; // sm breakpoint
export type CapabilityColDesktop = 2 | 3 | 4 | 5; // lg breakpoint

/** Public props for CapabilityGrid */
export interface CapabilityGridProps {
  items: CapabilityItem[];
  mobileColumns?: CapabilityColMobile;
  tabletColumns?: CapabilityColTablet;
  desktopColumns?: CapabilityColDesktop;
  className?: string;
  cardSize?: "compact" | "default";
  /**
   * Spacing between items. Accepts:
   *  - Tailwind gap-* classes: e.g., "gap-6"
   *  - Arbitrary values: "gap-[18px]", "gap-[1.25rem]", "gap-[var(--space-6)]"
   *  - Direct CSS lengths: "24px", "1rem", "var(--space)" (internally used to compute basis)
   * In flex-center, it's resolved to a concrete length; in grid, the literal class is used.
   */
  gap?: string;
  cardMinHeight?: number | string;
  alignLastRowCenter?: boolean;
  /** Fixed height (all breakpoints). Precedence: cardHeight > cardMinHeight. */
  cardHeight?: number | string;
  /** Mobile-specific fixed height (base). If provided, it overrides cardHeight on mobile. */
  cardHeightMobile?: number | string;
  /** Card glow control: all (default), alternate (every other), none */
  glowPattern?: "all" | "alternate" | "none";
}

/** Build literal Tailwind classes (no runtime template strings) for grid columns. */
function buildResponsiveCols({
  mobileColumns,
  tabletColumns,
  desktopColumns,
}: {
  mobileColumns?: number;
  tabletColumns?: number;
  desktopColumns?: number;
}) {
  const mobileMap: Record<1 | 2 | 3 | 4, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };
  const tabletMap: Record<1 | 2 | 3 | 4, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  };
  const desktopMap: Record<2 | 3 | 4 | 5, string> = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
  };
  const classes: string[] = [];
  if (mobileColumns && mobileMap[mobileColumns as 1 | 2 | 3 | 4])
    classes.push(mobileMap[mobileColumns as 1 | 2 | 3 | 4]);
  if (tabletColumns && tabletMap[tabletColumns as 1 | 2 | 3 | 4])
    classes.push(tabletMap[tabletColumns as 1 | 2 | 3 | 4]);
  if (desktopColumns && desktopMap[desktopColumns as 2 | 3 | 4 | 5])
    classes.push(desktopMap[desktopColumns as 2 | 3 | 4 | 5]);
  return classes;
}

/** Internal: shared item renderer to avoid duplication between flex and grid variants */
function CapabilityItemNode({
  item,
  idx,
  liClassName,
  heightStyle,
  cardSize,
  glowPattern,
}: {
  item: CapabilityItem;
  idx: number;
  liClassName?: string;
  heightStyle?: React.CSSProperties;
  cardSize: "compact" | "default";
  glowPattern: "all" | "alternate" | "none";
}) {
  return (
    <li className={cn("h-full", liClassName)}>
      <CapabilityCard
        title={item.title}
        description={item.description}
        icon={item.icon}
        href={item.href}
        tone={item.tone}
        size={cardSize}
        className="h-full"
        style={heightStyle}
        glow={
          glowPattern === "all"
            ? true
            : glowPattern === "none"
            ? false
            : idx % 2 === 0
        }
      />
    </li>
  );
}

/** Memoized CapabilityGrid component */
export const CapabilityGrid = React.memo(function CapabilityGrid({
  items,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  className,
  cardSize = "default",
  gap = "gap-6",
  cardMinHeight,
  alignLastRowCenter = true,
  cardHeight,
  cardHeightMobile,
  glowPattern = "alternate",
}: CapabilityGridProps) {
  const responsiveCols = React.useMemo(
    () => buildResponsiveCols({ mobileColumns, tabletColumns, desktopColumns }),
    [mobileColumns, tabletColumns, desktopColumns]
  );

  const toCssSize = React.useCallback((v?: number | string) => {
    if (v == null) return undefined;
    return typeof v === "number" ? `${v}px` : v;
  }, []);

  const hasResponsiveHeight = cardHeightMobile != null;

  const responsiveHeightClass = hasResponsiveHeight
    ? "[--cap-h:var(--cap-h-mobile)] sm:[--cap-h:var(--cap-h-base,var(--cap-h-mobile))]"
    : undefined;

  const containerHeightVars = React.useMemo<
    React.CSSProperties | undefined
  >(() => {
    if (!hasResponsiveHeight) return undefined;
    const base = toCssSize(cardHeight);
    const mobile = toCssSize(cardHeightMobile);
    const style: React.CSSProperties = {};
    if (mobile) (style as any)["--cap-h-mobile"] = mobile;
    if (base) (style as any)["--cap-h-base"] = base;
    return style;
  }, [hasResponsiveHeight, cardHeight, cardHeightMobile, toCssSize]);

  const heightStyle = React.useMemo(
    () =>
      hasResponsiveHeight
        ? ({ height: "var(--cap-h)" } as React.CSSProperties)
        : getHeightStyle(cardHeight, cardMinHeight),
    [hasResponsiveHeight, cardHeight, cardMinHeight]
  );

  if (alignLastRowCenter) {
    const gapValue = resolveGapValue(gap);
    const colsMobile = mobileColumns || 1;
    const colsTablet = tabletColumns || colsMobile;
    const colsDesktop = desktopColumns || colsTablet;

    const makeBasis = (cols: number) =>
      `calc((100% - ( ${cols} - 1 ) * var(--gap)) / ${cols})`;
    const style: React.CSSProperties = React.useMemo(
      () => ({
        ["--gap" as any]: gapValue,
        ["--basis-mobile" as any]: makeBasis(colsMobile),
        ["--basis-tablet" as any]: makeBasis(colsTablet),
        ["--basis-desktop" as any]: makeBasis(colsDesktop),
        ...(containerHeightVars || {}),
      }),
      [gapValue, colsMobile, colsTablet, colsDesktop, containerHeightVars]
    );

    return (
      <ul
        className={cn(
          "list-none m-0 p-0 flex flex-wrap justify-center gap-[var(--gap)]",
          responsiveHeightClass,
          className
        )}
        style={style}
        data-variant="flex-center"
        data-cols-mobile={colsMobile}
        data-cols-tablet={colsTablet}
        data-cols-desktop={colsDesktop}
      >
        {items.map((item, idx) => (
          <CapabilityItemNode
            key={item.id}
            item={item}
            idx={idx}
            liClassName={cn(
              "flex-grow-0 flex-shrink-0",
              "[flex-basis:var(--basis-mobile)] sm:[flex-basis:var(--basis-tablet)] lg:[flex-basis:var(--basis-desktop)]"
            )}
            heightStyle={heightStyle}
            cardSize={cardSize}
            glowPattern={glowPattern}
          />
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={cn(
        "list-none m-0 p-0 grid",
        gap,
        responsiveCols,
        responsiveHeightClass,
        className
      )}
      style={containerHeightVars}
      data-variant="grid"
      data-cols-mobile={mobileColumns}
      data-cols-tablet={tabletColumns}
      data-cols-desktop={desktopColumns}
    >
      {items.map((item, idx) => (
        <CapabilityItemNode
          key={item.id}
          item={item}
          idx={idx}
          liClassName={""}
          heightStyle={heightStyle}
          cardSize={cardSize}
          glowPattern={glowPattern}
        />
      ))}
    </ul>
  );
});

export default CapabilityGrid;
