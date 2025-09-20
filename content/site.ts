/** Global site metadata & navigation (Phase 1) */
export interface SiteNavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteContent {
  name: string; // brand / company name
  description: string;
  nav: SiteNavItem[];
  footer?: {
    copyright?: string;
    links?: SiteNavItem[];
  };
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export const SITE_CONTENT: SiteContent = {
  name: "Larry Merino",
  description:
    "Firmware + connectivity for low-power, reliable, production-bound IoT devices.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    copyright: `© ${new Date().getFullYear()} Larry Merino. All rights reserved.`,
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  cta: {
    primary: { label: "Get Started", href: "/contact" },
    secondary: { label: "Watch Demo", href: "#demo" },
  },
};
