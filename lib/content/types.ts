/** Shared content types for the site (Phase 1) */
import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

/** Tech stack logo item as consumed by LogoGrid */
export interface TechStackLogoItem {
  icon: ComponentType<{ className?: string }>;
  label?: string;
  href?: string;
}

/** Capability item as consumed by CapabilityGrid */
export interface CapabilityItem {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  href?: string;
  tone?: "neutral" | "brand";
}

/** Grouped Tech Stack content */
export interface TechStackContent {
  title: string;
  intro?: string;
  groups: Array<{
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

/** Capabilities section content */
export interface CapabilitiesContent {
  title: string;
  eyebrow?: string;
  intro?: string;
  items: CapabilityItem[];
}
