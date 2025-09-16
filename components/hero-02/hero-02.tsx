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
import { HOME_HERO } from "@/content/home.hero";

interface Hero02Props {
  title?: string;
  intro?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

const Hero02 = ({
  title = HOME_HERO.title,
  intro = HOME_HERO.intro,
  primaryCtaLabel = HOME_HERO.primaryCta?.label,
  primaryCtaHref = HOME_HERO.primaryCta?.href,
  secondaryCtaLabel = HOME_HERO.secondaryCta?.label,
  secondaryCtaHref = HOME_HERO.secondaryCta?.href,
}: Hero02Props) => {
  return (
    <div className="min-h-[60vh] flex items-start justify-center pt-20 sm:pt-32 lg:pt-40">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-8 sm:py-12">
        <div>
          <h1 className="max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl [font-family:var(--font-poppins)] font-bold !leading-[1.2]">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-[60ch] text-base md:text-[1.05rem] leading-relaxed text-[var(--text-subtle)] font-normal">
              {intro}
            </p>
          )}
          <div className="mt-8 sm:mt-12 flex items-center gap-4">
            {primaryCtaLabel && primaryCtaHref && (
              <Button size="lg" className="rounded-full text-base" asChild>
                <a href={primaryCtaHref}>
                  {primaryCtaLabel} <ArrowUpRight className="!h-5 !w-5" />
                </a>
              </Button>
            )}
            {secondaryCtaLabel && secondaryCtaHref && (
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base shadow-none"
                asChild
              >
                <a href={secondaryCtaHref}>
                  <CirclePlay className="!h-5 !w-5" /> {secondaryCtaLabel}
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="w-full">
          <Terminal className="w-full max-w-none">
            {HOME_HERO.terminalLines.map((line, idx) => {
              if (line.type === "command") {
                return (
                  <AnimatedSpan key={idx} delay={line.delay || 0}>
                    <LeadingChar className="text-green-500">
                      {line.prefix || "$"}
                    </LeadingChar>
                    <AnimatedContent>{line.text}</AnimatedContent>
                  </AnimatedSpan>
                );
              }
              if (line.type === "final") {
                return (
                  <TypingAnimation
                    key={idx}
                    delay={line.delay}
                    duration={line.duration || 55}
                  >
                    <LeadingChar>{line.icon || ""}</LeadingChar>
                    <AnimatedContent>{line.text}</AnimatedContent>
                  </TypingAnimation>
                );
              }
              // status
              const levelClass =
                line.level === "info" ? "text-blue-500" : "text-green-500";
              const levelLabel = line.level === "info" ? "[INFO]" : "[OK]";
              return (
                <TypingAnimation
                  key={idx}
                  delay={line.delay}
                  duration={line.duration || 55}
                >
                  <LeadingChar className={levelClass}>{levelLabel}</LeadingChar>
                  <AnimatedContent>{line.text}</AnimatedContent>
                </TypingAnimation>
              );
            })}
          </Terminal>
        </div>
      </div>
    </div>
  );
};

export default Hero02;
