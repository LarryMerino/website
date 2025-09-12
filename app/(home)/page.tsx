import Image from "next/image";
import Hero02 from "@/components/hero-02/hero-02";
import TechStackSection from "@/components/sections/tech-stack/section";
import CapabilitiesSection from "@/components/sections/capabilities/section";

export default function Home() {
  return (
    <div className="font-sans">
      <main>
        <Hero02 />
        <CapabilitiesSection
          eyebrow="What I Do"
          title="I Bring IoT Devices to Life Through Firmware"
          intro="I focus on writing the kind of embedded code that makes connected devices last longer, talk to each other reliably, and evolve from rough prototypes into something people can depend on"
          desktopColumns={2}
          cardHeightMobile={290}
          cardHeight={270}
        />
        <TechStackSection />
      </main>
    </div>
  );
}
