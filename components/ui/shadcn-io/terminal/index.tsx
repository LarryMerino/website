"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";
import React from "react";

/**
 * Shared typography class applied to all terminal line containers.
 * Keeps visual consistency (size, weight, tracking) across components.
 */
const BASE_TEXT_CLASS = "text-sm font-normal tracking-tight font-mono";

/**
 * Generic component type detection with minimal React.lazy support.
 * Avoids deep internal React inspection beyond what is needed to retain previous behavior.
 * @param element React element to inspect.
 * @param target Direct component reference (e.g. LeadingChar).
 * @param displayName Expected displayName / function name fallback.
 * @returns true if element matches the target component semantics.
 */
const isSpecificComponent = (
  element: React.ReactElement,
  target: React.ComponentType<any>,
  displayName: string
): boolean => {
  const t: any = element.type;
  if (!t) return false;

  // Direct reference or displayName/name match
  if (t === target) return true;
  const tName =
    (typeof t === "function" && (t.displayName || t.name)) || t.displayName;
  if (tName === displayName) return true;

  // Minimal lazy component support (mirrors previous behavior)
  if (t && t.$$typeof === Symbol.for("react.lazy")) {
    const payload = t._payload;
    const value = payload?.value;
    if (typeof value === "function") {
      const vName = value.displayName || value.name;
      if (value === target || vName === displayName) return true;
    }
    // Turbopack/SSR array metadata case
    if (Array.isArray(value) && value.length >= 3 && value[2] === displayName) {
      return true;
    }
  }

  return false;
};
/** Returns true if the element is a <LeadingChar>. */
const isLeadingCharComponent = (element: React.ReactElement): boolean =>
  isSpecificComponent(element, LeadingChar, "LeadingChar");

/** Returns true if the element is an <AnimatedContent>. */
const isAnimatedContentComponent = (element: React.ReactElement): boolean =>
  isSpecificComponent(element, AnimatedContent, "AnimatedContent");

/**
 * Extracts plain text from arbitrary React children (strings, numbers, arrays,
 * React elements). Non-textual / boolean / null nodes are ignored.
 */
const extractPlainText = (node: React.ReactNode): string => {
  switch (true) {
    case node == null:
    case typeof node === "boolean":
      return "";
    case typeof node === "string":
    case typeof node === "number":
      return String(node);
    case Array.isArray(node):
      return (node as React.ReactNode[]).map(extractPlainText).join("");
    default:
      return React.isValidElement(node)
        ? extractPlainText((node as React.ReactElement<any>).props?.children)
        : "";
  }
};

/** Parsed structure produced from children for typing / appearance logic. */
interface ParsedTypingChildren {
  leadingCharComponent: React.ReactElement | null;
  leadingCharText: string;
  animatedContentComponent: React.ReactElement | null;
  contentText: string;
  fullText: string;
}

/**
 * Parses the children of typing-related components.
 * It detects the first <LeadingChar /> and first <AnimatedContent />.
 * Adds a leading space to the content when a leading char exists and
 * content does not already start with one.
 */
const parseTypingChildren = (
  children: React.ReactNode
): ParsedTypingChildren => {
  if (typeof children === "string") {
    return {
      leadingCharComponent: null,
      leadingCharText: "",
      animatedContentComponent: null,
      contentText: children,
      fullText: children,
    };
  }

  const arr = React.Children.toArray(children);
  let leadingCharComponent: React.ReactElement | null = null;
  let animatedContentComponent: React.ReactElement | null = null;
  let leadingCharText = "";
  let contentText = "";

  for (const child of arr) {
    if (!React.isValidElement(child)) continue;
    if (!leadingCharComponent && isLeadingCharComponent(child)) {
      leadingCharComponent = child;
      const c = child as React.ReactElement<any>;
      leadingCharText = extractPlainText(c.props?.children);
      continue;
    }
    if (!animatedContentComponent && isAnimatedContentComponent(child)) {
      animatedContentComponent = child;
      const c = child as React.ReactElement<any>;
      const raw = extractPlainText(c.props?.children);
      contentText = raw && !raw.startsWith(" ") ? " " + raw : raw;
    }
  }

  return {
    leadingCharComponent,
    leadingCharText,
    animatedContentComponent,
    contentText,
    fullText: leadingCharText + contentText,
  };
};

interface LeadingCharProps {
  children: string;
  className?: string;
}

/**
 * Single leading symbol (prompt / bullet) that is revealed first in typing sequences.
 */
export const LeadingChar = ({ children, className }: LeadingCharProps) => (
  <span className={cn("inline", className)}>{children}</span>
);

// Display name helps with runtime identification
LeadingChar.displayName = "LeadingChar";

interface AnimatedContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main textual content that follows a LeadingChar. Space is auto‑inserted when needed.
 */
export const AnimatedContent = ({
  children,
  className,
}: AnimatedContentProps) => (
  <span className={cn("inline", className)}>{children}</span>
);

// Display name helps with runtime identification
AnimatedContent.displayName = "AnimatedContent";

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Fades/slides a line in (no per‑character typing). If given a
 * <LeadingChar/> + <AnimatedContent/> pair, preserves spacing logic.
 */
export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSpanProps) => {
  const parsed = parseTypingChildren(children);
  const multiple = React.Children.count(children) > 1;

  if (parsed.leadingCharComponent && parsed.animatedContentComponent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay / 1000 }}
        className={cn("flex", BASE_TEXT_CLASS, className)}
        {...props}
      >
        {parsed.leadingCharComponent}
        <span>{parsed.contentText}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={cn(multiple ? "flex" : "grid", BASE_TEXT_CLASS, className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface TypingAnimationProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}

/**
 * Per‑character typing animation. Supports either plain string children or a
 * pattern of <LeadingChar/><AnimatedContent/> to stage the reveal.
 *
 * Props:
 * - duration: ms per character (default 60)
 * - delay: initial delay before starting the typing
 * - as: custom element/component (default 'div')
 */
export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "div",
  ...props
}: TypingAnimationProps) => {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedLeadingChar, setDisplayedLeadingChar] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const parsed = parseTypingChildren(children);
  const leadingCharComponent = parsed.leadingCharComponent;
  const animatedContentComponent = parsed.animatedContentComponent;
  const leadingCharText = parsed.leadingCharText;
  const fullTextToAnimate = parsed.fullText;

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started || !fullTextToAnimate) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullTextToAnimate.length) {
        const currentText = fullTextToAnimate.substring(0, i + 1);

        if (leadingCharComponent && i < leadingCharText.length) {
          setDisplayedLeadingChar(currentText);
          setDisplayedText("");
        } else {
          setDisplayedLeadingChar(leadingCharText);
          setDisplayedText(currentText.substring(leadingCharText.length));
        }

        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [fullTextToAnimate, leadingCharText, duration, started]);

  // Nothing to animate
  if (!fullTextToAnimate) {
    return null;
  }

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("flex", BASE_TEXT_CLASS, className)}
      {...props}
    >
      {leadingCharComponent
        ? React.cloneElement(leadingCharComponent as any, {
            children: displayedLeadingChar,
          })
        : null}
      {animatedContentComponent
        ? React.cloneElement(animatedContentComponent as any, {
            children: displayedText,
          })
        : typeof children === "string"
        ? fullTextToAnimate.substring(
            0,
            displayedLeadingChar.length + displayedText.length
          )
        : displayedText}
    </MotionComponent>
  );
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Visual terminal-like container with window traffic-light indicators.
 * Wrap multiple <TypingAnimation/> or <AnimatedSpan/> lines inside.
 */
export const Terminal = ({ children, className }: TerminalProps) => {
  return (
    <div
      className={cn(
        // Contenedor base: la altura real la gobierna el bloque <code> mediante max-h.
        // Evitamos forzar h-full aquí para permitir que el límite de líneas funcione.
        "z-0 max-h-[400px] w-full max-w-lg rounded-xl border border-border bg-background flex flex-col",
        className
      )}
    >
      <div className="flex flex-col gap-y-2 border-b border-border p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre className="p-4">
        {/* Móvil: altura estática 6 líneas (h-[8.75rem]); Desktop: altura auto hasta 400px (scroll interno si excede). */}
        <code className="flex flex-col gap-y-1 overflow-y-auto pr-2 h-[8.75rem] sm:h-[14.75rem]">
          {children}
        </code>
      </pre>
    </div>
  );
};
