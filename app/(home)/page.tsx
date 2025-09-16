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
          desktopColumns={2}
          cardHeightMobile={290}
          cardHeight={270}
        />
        <TechStackSection />
      </main>
    </div>
  );
}
