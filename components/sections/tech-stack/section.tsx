import { LogoGrid } from "./logo-grid";
import type { TechStackLogoItem } from "./logo-grid";
import { TECH_STACK_ICONS } from "./icons";

// Static tech stack groups (module-level to avoid recreation on every render)
const LANGUAGES: TechStackLogoItem[] = [
  { icon: TECH_STACK_ICONS.C, label: "C" },
  { icon: TECH_STACK_ICONS.Python, label: "Python" },
  { icon: TECH_STACK_ICONS.Rust, label: "Rust" },
];

const RTOS_SDKS: TechStackLogoItem[] = [
  { icon: TECH_STACK_ICONS.FreeRTOS, label: "FreeRTOS" },
  { icon: TECH_STACK_ICONS.Zephyr, label: "Zephyr" },
  { icon: TECH_STACK_ICONS.Nordic, label: "Nordic" },
  { icon: TECH_STACK_ICONS.Espressif, label: "ESPRESSIF" },
];

const TOOLS: TechStackLogoItem[] = [
  { icon: TECH_STACK_ICONS.Git, label: "git" },
  { icon: TECH_STACK_ICONS.GitHub, label: "GitHub" },
  { icon: TECH_STACK_ICONS.Docker, label: "Docker" },
  // NOTE: Add more tools here if needed
];

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
}

export default function TechStackSection({
  align = "center",
  title = "Technologies I Build With",
  intro = "I design IoT solutions across the entire stack, from bare-metal firmware to scalable cloud tools.",
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

        {/* Languages */}
        <div className="mt-12 md:mt-16">
          <h3
            className={
              "heading-brand text-base font-semibold tracking-wide uppercase text-foreground/80 block w-fit mb-4 md:mb-6" +
              (align === "center" ? " text-center mx-auto" : "")
            }
          >
            Languages
          </h3>
          <LogoGrid
            items={LANGUAGES}
            showLabels
            monochrome={false}
            mobileColumns={2}
            tabletColumns={3}
            desktopColumns={3}
            iconSize="md"
            iconSizeMd="lg"
            itemPadding="sm"
            gap="compact"
            justify={justify}
          />
        </div>

        {/* RTOS & SDKs */}
        <div className="mt-16 md:mt-24">
          <h3
            className={
              "heading-brand text-base font-semibold tracking-wide uppercase text-foreground/80 block w-fit mb-4 md:mb-6" +
              (align === "center" ? " text-center mx-auto" : "")
            }
          >
            RTOS & SDKs
          </h3>
          <LogoGrid
            items={RTOS_SDKS}
            showLabels
            monochrome={false}
            mobileColumns={2}
            tabletColumns={4}
            desktopColumns={4}
            iconSize="md"
            iconSizeMd="lg"
            itemPadding="sm"
            gap="compact"
            justify={justify}
          />
        </div>

        {/* Tools */}
        <div className="mt-16 md:mt-24">
          <h3
            className={
              "heading-brand text-base font-semibold tracking-wide uppercase text-foreground/80 block w-fit mb-4 md:mb-6" +
              (align === "center" ? " text-center mx-auto" : "")
            }
          >
            Tools
          </h3>
          <LogoGrid
            items={TOOLS}
            showLabels
            monochrome={false}
            mobileColumns={2}
            tabletColumns={4}
            desktopColumns={3}
            iconSize="md"
            iconSizeMd="lg"
            itemPadding="sm"
            gap="compact"
            justify={justify}
          />
        </div>
      </div>
    </section>
  );
}
