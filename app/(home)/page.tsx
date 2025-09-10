import Image from "next/image";
import Hero02 from "@/components/hero-02/hero-02";
import TechStackSection from "@/components/sections/tech-stack/section";

export default function Home() {
  return (
    <div className="font-sans">
      <main>
        <Hero02 />
        <TechStackSection />
      </main>
    </div>
  );
}
