/** Home page – Capabilities content (Phase 1) */
import type { CapabilitiesContent } from "@/lib/content/types";
import type { LucideIcon } from "lucide-react";
import { Bolt, Radio, Factory, MessageSquareText } from "lucide-react";

export const HOME_CAPABILITIES: CapabilitiesContent = {
  title: "Capabilities",
  eyebrow: "What I Do",
  intro:
    "I focus on writing the kind of embedded code that makes connected devices last longer, talk to each other reliably, and evolve from rough prototypes into something people can depend on",
  items: [
    {
      id: "low-power-firmware",
      title: "Making Devices Last",
      description:
        "I design low-power firmware that helps devices run longer on the same battery—practical, efficient, and field-ready.",
      icon: Bolt as LucideIcon,
      href: "#",
      tone: "brand",
    },
    {
      id: "reliable-connectivity",
      title: "Making Devices Speak",
      description:
        "I connect devices through BLE, LTE-M, and MQTT so they don’t just run—they communicate reliably and securely.",
      icon: Radio as LucideIcon,
      href: "#",
      tone: "brand",
    },
    {
      id: "prototype-to-reliable-code",
      title: "Making Prototypes Practical",
      description:
        "I take quick experiments and shape them into structured firmware that’s stable enough to move beyond the lab.",
      icon: Factory as LucideIcon,
      href: "#",
      tone: "brand",
    },
    {
      id: "clarity-in-complexity",
      title: "Making Complexity Clear",
      description:
        "I explain what’s happening inside devices in a way that clients, teams, and hardware engineers can all understand.",
      icon: MessageSquareText as LucideIcon,
      href: "#",
      tone: "brand",
    },
  ],
};
