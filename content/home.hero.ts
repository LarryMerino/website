/** Home Hero (Phase 1 content extraction) */
export interface HomeHeroContent {
  title: string;
  tagline?: string;
  intro?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  terminalLines: Array<
    | { type: "command"; prefix?: string; text: string; delay?: number }
    | {
        type: "status";
        level: "info" | "ok";
        text: string;
        delay: number;
        duration?: number;
      }
    | {
        type: "final";
        icon?: string;
        text: string;
        delay: number;
        duration?: number;
      }
  >;
}

export const HOME_HERO: HomeHeroContent = {
  title: "Embedded Software Engineer for IoT Systems",
  intro:
    "I design the firmware that keeps connected devices efficient, reliable, and ready to grow beyond the prototype stage",
  primaryCta: { label: "Get Started", href: "/contact" },
  secondaryCta: { label: "Watch Demo", href: "#demo" },
  terminalLines: [
    { type: "command", prefix: "$", text: "make iot_product", delay: 0 },
    {
      type: "status",
      level: "info",
      text: "Building IoT system...",
      delay: 1000,
      duration: 55,
    },
    {
      type: "status",
      level: "ok",
      text: "Optimizing for low-power",
      delay: 3400,
      duration: 55,
    },
    {
      type: "status",
      level: "ok",
      text: "Ensuring reliability",
      delay: 5800,
      duration: 55,
    },
    {
      type: "status",
      level: "ok",
      text: "Preparing for production",
      delay: 8200,
      duration: 55,
    },
    {
      type: "final",
      icon: "🚀",
      text: "Deployment ready!",
      delay: 10600,
      duration: 55,
    },
  ],
};
