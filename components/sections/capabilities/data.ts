/** Data model and static list of capabilities */
import type { LucideIcon } from "lucide-react";
import { Bolt, Radio, Factory, MessageSquareText } from "lucide-react";

/** Shape of a single capability item */
export interface CapabilityItem {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  href?: string;
  tone?: "neutral" | "brand";
}

/** Default capability catalog (can be swapped at runtime) */
export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "low-power-firmware",
    title: "Making Devices Last",
    description:
      "I design low-power firmware that helps devices run longer on the same battery—practical, efficient, and field-ready.",
    icon: Bolt,
    href: "#",
    tone: "brand",
  },
  {
    id: "reliable-connectivity",
    title: "Making Devices Speak",
    description:
      "I connect devices through BLE, LTE-M, and MQTT so they don’t just run—they communicate reliably and securely.",
    icon: Radio,
    href: "#",
    tone: "brand",
  },
  {
    id: "prototype-to-reliable-code",
    title: "Making Prototypes Practical",
    description:
      "I take quick experiments and shape them into structured firmware that’s stable enough to move beyond the lab.",
    icon: Factory,
    href: "#",
    tone: "brand",
  },
  {
    id: "clarity-in-complexity",
    title: "Making Complexity Clear",
    description:
      "I explain what’s happening inside devices in a way that clients, teams, and hardware engineers can all understand.",
    icon: MessageSquareText,
    href: "#",
    tone: "brand",
  },
];
