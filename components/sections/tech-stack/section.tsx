import { LogoGrid } from "./logo-grid";
import type { TechStackLogoItem } from "@/lib/content/types";
import { HOME_TECH_STACK } from "@/content/home.tech-stack";

/**
 * High-level Tech Stack section with heading, intro and grouped logo grids.
 *
 * Behavior
 * - Subtitles are semantic <h3> with brand heading styles; mobile gets slightly higher
 *   contrast/weight for legibility.
 * - align="center" horizontally centers headings and the grids. The grid implementation
 *   centers the last wrapped line as well.
 * - Per-group column counts are tuned to the number of items to avoid visual holes.
 * - Inter-group spacing increased (mt-16 md:mt-24) for clearer grouping.
 * - Data arrays (LANGUAGES/RTOS_SDKS/TOOLS) are module-level constants to avoid
 *   recreation on re-renders.
 */
export interface TechStackSectionProps {
  align?: "start" | "center";
  title?: string;
  intro?: string;
  groups?: Array<{
    id: string;
    title: string;
    items: TechStackLogoItem[];
    columns?: {
      mobile?: 2 | 3 | 4;
      tablet?: 2 | 3 | 4 | 5 | 6;
      desktop?: 2 | 3 | 4 | 5 | 6 | 7 | 8;
    };
  }>;
}

export default function TechStackSection({
  align = "center",
  title = HOME_TECH_STACK.title,
  intro = HOME_TECH_STACK.intro,
  groups = HOME_TECH_STACK.groups,
}: TechStackSectionProps) {
  const justify = align === "center" ? "center" : "start";

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-screen-xl px-6">
        <div
          className={
            align === "center" ? "max-w-3xl mx-auto text-center" : "max-w-3xl"
          }
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 text-base md:text-lg text-[var(--text-subtle)]">
              {intro}
            </p>
          )}
        </div>
        {groups.map((group, index) => (
          <div
            key={group.id}
            className={index === 0 ? "mt-12 md:mt-16" : "mt-16 md:mt-24"}
          >
            <h3
              className={
                "heading-brand text-base font-semibold tracking-wide uppercase text-foreground/80 block w-fit mb-4 md:mb-6" +
                (align === "center" ? " text-center mx-auto" : "")
              }
            >
              {group.title}
            </h3>
            <LogoGrid
              items={group.items}
              showLabels
              monochrome={false}
              mobileColumns={group.columns?.mobile ?? 3}
              tabletColumns={group.columns?.tablet}
              desktopColumns={group.columns?.desktop ?? 6}
              iconSize="md"
              iconSizeMd="lg"
              itemPadding="sm"
              gap="compact"
              justify={justify}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
