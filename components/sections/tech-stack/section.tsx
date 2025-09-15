import { LogoGrid } from "./logo-grid";
import { TECH_STACK_ICONS } from "./icons";

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
  const languages = [
    { icon: TECH_STACK_ICONS.C, label: "C" },
    { icon: TECH_STACK_ICONS.Python, label: "Python" },
    { icon: TECH_STACK_ICONS.Rust, label: "Rust" },
  ];

  const rtos = [
    { icon: TECH_STACK_ICONS.FreeRTOS, label: "FreeRTOS" },
    { icon: TECH_STACK_ICONS.Zephyr, label: "Zephyr" },
    { icon: TECH_STACK_ICONS.Nordic, label: "Nordic" },
    { icon: TECH_STACK_ICONS.Espressif, label: "ESPRESSIF" },
  ];

  const tools = [
    { icon: TECH_STACK_ICONS.Git, label: "git" },
    { icon: TECH_STACK_ICONS.GitHub, label: "GitHub" },
    { icon: TECH_STACK_ICONS.Docker, label: "Docker" },
    { icon: TECH_STACK_ICONS.ARM, label: "ARM" },
  ];

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

        <div className="mt-12 md:mt-16">
          <p
            className={
              "heading-brand text-xs md:text-sm font-medium tracking-wide uppercase text-slate-300/80 mb-4 md:mb-6" +
              (align === "center" ? " text-center" : "")
            }
          >
            Languages
          </p>
          <LogoGrid
            items={languages}
            showLabels
            mobileColumns={3}
            tabletColumns={3}
            desktopColumns={3}
            iconSize="md"
            iconSizeMd="lg"
            itemPadding="sm"
            gap="compact"
            justify={justify}
          />
        </div>

        <div className="mt-12 md:mt-16">
          <p
            className={
              "heading-brand text-xs md:text-sm font-medium tracking-wide uppercase text-slate-300/80 mb-4 md:mb-6" +
              (align === "center" ? " text-center" : "")
            }
          >
            RTOS & SDKs
          </p>
          <LogoGrid
            items={rtos}
            showLabels
            mobileColumns={3}
            tabletColumns={4}
            desktopColumns={4}
            iconSize="md"
            iconSizeMd="lg"
            itemPadding="sm"
            gap="compact"
            justify={justify}
          />
        </div>

        <div className="mt-12 md:mt-16">
          <p
            className={
              "heading-brand text-xs md:text-sm font-medium tracking-wide uppercase text-slate-300/80 mb-4 md:mb-6" +
              (align === "center" ? " text-center" : "")
            }
          >
            Tools
          </p>
          <LogoGrid
            items={tools}
            showLabels
            mobileColumns={3}
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
