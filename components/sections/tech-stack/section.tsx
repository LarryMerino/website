import { LogoGrid } from "./logo-grid";
import { TECH_STACK_ICONS } from "./icons";

export default function TechStackSection() {
  const items = [
    { icon: TECH_STACK_ICONS.C, label: "C" },
    { icon: TECH_STACK_ICONS.Python, label: "Python" },
    { icon: TECH_STACK_ICONS.Rust, label: "Rust" },
    { icon: TECH_STACK_ICONS.Zephyr, label: "Zephyr" },
    { icon: TECH_STACK_ICONS.FreeRTOS, label: "freeRTOS" },
    { icon: TECH_STACK_ICONS.ARM, label: "ARM" },
    { icon: TECH_STACK_ICONS.Nordic, label: "Nordic" },
    { icon: TECH_STACK_ICONS.Espressif, label: "Espressif" },
    { icon: TECH_STACK_ICONS.Git, label: "Git" },
    { icon: TECH_STACK_ICONS.GitHub, label: "GitHub" },
    { icon: TECH_STACK_ICONS.Docker, label: "Docker" },
  ];

  return (
    <section className="py-10">
      <div className="mt-10">
        <LogoGrid
          items={items}
          showLabels
          mobileColumns={3}
          desktopColumns={4}
          iconSize="md"
          className="mx-auto max-w-screen-xl px-6"
        />
      </div>
    </section>
  );
}
