/** Home page – Tech Stack content (Phase 1)
 * We keep icons as component refs; copy is centralized here.
 */
import type { TechStackContent } from "@/lib/content/types";
import { TECH_STACK_ICONS } from "@/components/sections/tech-stack/icons";

export const HOME_TECH_STACK: TechStackContent = {
  title: "Technologies I Build With",
  intro:
    "I design IoT solutions across the entire stack, from bare-metal firmware to scalable cloud tools.",
  groups: [
    {
      id: "languages",
      title: "Languages",
      items: [
        { icon: TECH_STACK_ICONS.C, label: "C" },
        { icon: TECH_STACK_ICONS.Python, label: "Python" },
        { icon: TECH_STACK_ICONS.Rust, label: "Rust" },
      ],
      columns: { mobile: 2, tablet: 3, desktop: 3 },
    },
    {
      id: "rtos-sdks",
      title: "RTOS & SDKs",
      items: [
        { icon: TECH_STACK_ICONS.FreeRTOS, label: "FreeRTOS" },
        { icon: TECH_STACK_ICONS.Zephyr, label: "Zephyr" },
        { icon: TECH_STACK_ICONS.Nordic, label: "Nordic" },
        { icon: TECH_STACK_ICONS.Espressif, label: "ESPRESSIF" },
      ],
      columns: { mobile: 2, tablet: 4, desktop: 4 },
    },
    {
      id: "tools",
      title: "Tools",
      items: [
        { icon: TECH_STACK_ICONS.Git, label: "git" },
        { icon: TECH_STACK_ICONS.GitHub, label: "GitHub" },
        { icon: TECH_STACK_ICONS.Docker, label: "Docker" },
      ],
      columns: { mobile: 2, tablet: 4, desktop: 3 },
    },
  ],
};
