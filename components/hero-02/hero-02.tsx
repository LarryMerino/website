import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import {
  Terminal,
  AnimatedSpan,
  LeadingChar,
  AnimatedContent,
  TypingAnimation,
} from "@/components/ui/shadcn-io/terminal";
import React from "react";

const Hero02 = () => {
  return (
    <div className="min-h-[60vh] flex items-start justify-center pt-20 sm:pt-32 lg:pt-40">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-8 sm:py-12">
        <div>
          <h1 className="max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl [font-family:var(--font-poppins)] font-bold !leading-[1.2]">
            Embedded Software Engineer
          </h1>
          <p className="mt-6 max-w-[60ch] text-base md:text-[1.05rem] leading-relaxed text-[var(--text-subtle)] font-normal">
            Creating efficient firmware and scalable IoT solutions — from
            prototype to production with a focus on low-power and reliability.
          </p>
          <div className="mt-8 sm:mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button>
          </div>
        </div>
        <div className="w-full">
          <Terminal className="w-full max-w-none">
            <AnimatedSpan delay={0}>
              <LeadingChar className="text-green-500">$</LeadingChar>
              <AnimatedContent>make iot_product</AnimatedContent>
            </AnimatedSpan>
            <TypingAnimation delay={1000} duration={55}>
              <LeadingChar className="text-blue-500">[INFO]</LeadingChar>
              <AnimatedContent>Building IoT system...</AnimatedContent>
            </TypingAnimation>
            <TypingAnimation delay={3400} duration={55}>
              <LeadingChar className="text-green-500">[OK]</LeadingChar>
              <AnimatedContent>Optimizing for low-power</AnimatedContent>
            </TypingAnimation>
            <TypingAnimation delay={5800} duration={55}>
              <LeadingChar className="text-green-500">[OK]</LeadingChar>
              <AnimatedContent>Ensuring reliability</AnimatedContent>
            </TypingAnimation>
            <TypingAnimation delay={8200} duration={55}>
              <LeadingChar className="text-green-500">[OK]</LeadingChar>
              <AnimatedContent>Preparing for production</AnimatedContent>
            </TypingAnimation>
            <TypingAnimation delay={10600} duration={55}>
              <LeadingChar>🚀</LeadingChar>
              <AnimatedContent>Deployment ready!</AnimatedContent>
            </TypingAnimation>
          </Terminal>
        </div>
      </div>
    </div>
  );
};

export default Hero02;
