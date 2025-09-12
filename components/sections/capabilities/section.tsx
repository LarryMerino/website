/**
 * CapabilitiesSection
 * Wraps the CapabilityGrid with heading / eyebrow / intro copy.
 * Keeps layout semantics (section + accessible heading) separate from raw grid rendering.
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { CAPABILITIES, type CapabilityItem } from "./data";
import CapabilityGrid from "./capability-grid";

/** Public props for CapabilitiesSection */
export interface CapabilitiesSectionProps {
  id?: string;
  title?: string;
  eyebrow?: string;
  intro?: string | React.ReactNode;
  items?: CapabilityItem[];
  className?: string;
  gridClassName?: string;
  cardSize?: "compact" | "default";
  mobileColumns?: 1 | 2 | 3 | 4;
  tabletColumns?: 1 | 2 | 3 | 4;
  desktopColumns?: 2 | 3 | 4 | 5;
  /**
   * Spacing between items. See `CapabilityGridProps.gap` for accepted formats.
   */
  gap?: string;
  cardMinHeight?: number | string;
  alignLastRowCenter?: boolean;
  /** Fixed height (all breakpoints). Precedence: cardHeight > cardMinHeight. */
  cardHeight?: number | string;
  /**
   * Mobile-specific fixed height (base). If provided, it's used on mobile and `cardHeight` on sm+.
   * If `cardHeight` is not provided, sm+ falls back to `cardHeightMobile`.
   * Note: when fixed heights are set, `cardMinHeight` has no effect.
   */
  cardHeightMobile?: number | string;
  glowPattern?: "all" | "alternate" | "none";
}

export default function CapabilitiesSection({
  id = "capabilities",
  title = "Capabilities",
  eyebrow,
  intro,
  items = CAPABILITIES,
  className,
  gridClassName,
  cardSize = "default",
  mobileColumns,
  tabletColumns,
  desktopColumns,
  gap,
  cardMinHeight,
  alignLastRowCenter,
  cardHeight,
  cardHeightMobile,
  glowPattern,
}: CapabilitiesSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-16", className)}
    >
      <div className={cn("mx-auto max-w-screen-xl px-6")}>
        {(eyebrow || title || intro) && (
          <div className="max-w-3xl mb-12">
            {eyebrow && (
              <p className="heading-brand text-sm font-medium tracking-wide uppercase text-sky-400/90 mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={headingId}
                className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance"
              >
                {title}
              </h2>
            )}
            {intro && (
              <div className="mt-5 text-base md:text-[1.05rem] leading-relaxed text-[var(--text-subtle)] space-y-4">
                {typeof intro === "string" ? <p>{intro}</p> : intro}
              </div>
            )}
          </div>
        )}

        <CapabilityGrid
          items={items}
          className={gridClassName}
          cardSize={cardSize}
          mobileColumns={mobileColumns}
          tabletColumns={tabletColumns}
          desktopColumns={desktopColumns}
          gap={gap}
          cardMinHeight={cardMinHeight}
          alignLastRowCenter={alignLastRowCenter}
          cardHeight={cardHeight}
          cardHeightMobile={cardHeightMobile}
          glowPattern={glowPattern}
        />
      </div>
    </section>
  );
}
