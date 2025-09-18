/**
 * CapabilityCard
 * Visual atomic component for a single capability.
 * Supports optional icon, two sizes, link (internal/external), polymorphic root, ref forwarding.
 */
import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Public props for CapabilityCard */
export interface CapabilityCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  href?: string;
  external?: boolean;
  tone?: "neutral" | "brand";
  size?: "compact" | "default";
  interactive?: boolean;
  iconClassName?: string;
  as?: keyof React.JSX.IntrinsicElements | React.ComponentType<unknown>; // limited escape hatch; if custom component supply required props
  /** Enables subtle radial glow */
  glow?: boolean;
}

/** Base utility classes (kept outside component to avoid reallocation) */
const CARD_BASE = [
  "group relative isolate flex flex-col h-full rounded-2xl border",
  "border-transparent dark:border-[color-mix(in_oklab,var(--foreground)_12%,var(--surface-elevated))]",
  "bg-[var(--surface-elevated)] text-[var(--foreground)]",
  "shadow-[0_2px_4px_rgba(0,0,0,0.06),0_6px_14px_-4px_rgba(0,0,0,0.10),0_18px_32px_-14px_rgba(0,0,0,0.12)] dark:shadow-[0_1px_0_rgba(255,255,255,0.035),0_18px_36px_-20px_rgba(0,0,0,0.58)]",
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] after:opacity-0 after:transition-opacity after:duration-150",
  "group-focus-visible:after:opacity-100 group-focus-visible:after:shadow-[0_0_0_2px_var(--primary)] dark:group-focus-visible:after:shadow-[0_0_0_2px_var(--primary)]",
  "transition-colors",
];

/** Internal forwardRef implementation; exported memoized below */
const CapabilityCardBase = React.forwardRef<
  HTMLDivElement,
  CapabilityCardProps
>(function CapabilityCard(
  {
    title,
    description,
    icon: Icon,
    href,
    external = false,
    tone = "neutral",
    size = "default",
    interactive = true,
    className,
    glow = true,
    iconClassName,
    as = "div",
    ...rest
  },
  ref
) {
  const Component = as as React.ElementType;
  const content = (
    <Component
      ref={ref}
      data-tone={tone}
      className={cn(
        CARD_BASE,
        size === "compact" ? "p-6 gap-3" : "p-8 md:p-10 gap-4",
        glow && "cap-surface-glow",
        interactive && [
          "transition-transform duration-300 will-change-transform",
          "hover:scale-[1.008]",
          "hover:bg-[var(--surface-elevated-hover)]",
          "hover:shadow-[0_3px_6px_rgba(0,0,0,0.07),0_10px_24px_-6px_rgba(0,0,0,0.14),0_28px_48px_-18px_rgba(0,0,0,0.16)] dark:hover:shadow-[0_1px_0_rgba(255,255,255,0.04),0_22px_48px_-22px_rgba(0,0,0,0.62)]",
          "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
        ],
        className
      )}
      {...rest}
    >
      {Icon && (
        <div
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset",
            tone === "brand"
              ? "ring-[color-mix(in_oklab,var(--primary)_26%,transparent)] bg-[color-mix(in_oklab,var(--primary)_6%,transparent)]"
              : "ring-[color-mix(in_oklab,var(--surface-elevated)_55%,transparent)] bg-[color-mix(in_oklab,var(--surface-elevated)_45%,transparent)]"
          )}
          aria-hidden="true"
        >
          <Icon
            className={cn(
              "h-7 w-7 stroke-[2] transition-colors",
              tone === "brand"
                ? "text-[color-mix(in_oklab,var(--primary)_72%,white)] group-hover:text-[var(--primary)]"
                : "text-[var(--text-subtle)] group-hover:text-[color-mix(in_oklab,var(--foreground)_75%,var(--text-subtle))]",
              iconClassName
            )}
          />
        </div>
      )}

      <div className="mt-1">
        <h3
          className={cn(
            "font-semibold tracking-tight leading-tight font-poppins",
            size === "compact" ? "text-xl" : "text-2xl md:text-3xl"
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "mt-3 leading-relaxed text-[var(--text-subtle)]",
              size === "compact" ? "text-sm" : "text-base md:text-[1.05rem]"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </Component>
  );

  const wrapWithLink = (node: React.ReactNode) => {
    if (!href) return node;
    const isExternal = external || href.startsWith("http");
    const wrapperClass = cn(
      "group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    );
    return isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className={wrapperClass}
      >
        {node}
      </a>
    ) : (
      <Link href={href} aria-label={title} className={wrapperClass}>
        {node}
      </Link>
    );
  };

  return wrapWithLink(content);
});

export const CapabilityCard = React.memo(CapabilityCardBase);
export default CapabilityCard;
