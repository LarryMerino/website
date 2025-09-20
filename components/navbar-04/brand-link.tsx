import Link, { type LinkProps } from "next/link";
import { SITE_CONTENT } from "@/content/site";
import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

/**
 * Anchor attributes we allow to forward to the underlying <a> element.
 * We explicitly omit `href` and `className` because they are controlled by the component API.
 */
type AnchorAttrs = Omit<
  HTMLAttributes<HTMLAnchorElement>,
  "href" | "className"
>;

/**
 * Props for {@link BrandLink}.
 *
 * - `href` defaults to `/` to link back to the home page.
 * - `label` provides the accessible name (aria-label) and default visible text; if omitted, it falls back to `SITE_CONTENT.name`.
 * - `children` can override the visible content (e.g. render an SVG logo); accessibility will still use `label`.
 * - Accepts additional safe anchor attributes via {@link AnchorAttrs} (e.g. `target`, `rel`).
 */
type BrandLinkProps = Omit<LinkProps, "href"> & {
  href?: LinkProps["href"];
  className?: string;
  /** Brand text used for content and aria-label; defaults to SITE_CONTENT.name */
  label?: string;
  children?: ReactNode;
} & AnchorAttrs;

/**
 * BrandLink — Semantic brand anchor used across navigation headers.
 *
 * Responsibilities:
 * - Typography: applies brand heading styles (Poppins) per the style guide.
 * - Spacing: owns its own left margin so parent containers can keep consistent paddings.
 * - Accessibility: sets an `aria-label` from `label` (or `SITE_CONTENT.name`), so icons or custom children remain announced correctly.
 */
export const BrandLink = ({
  className,
  href = "/",
  label,
  children,
  ...props
}: BrandLinkProps) => {
  const effectiveLabel = label ?? SITE_CONTENT.name;
  return (
    <Link
      href={href}
      aria-label={effectiveLabel}
      className={cn(
        "heading-brand text-lg md:text-xl font-semibold tracking-tight",
        "ml-2 md:ml-4",
        className
      )}
      {...(props as AnchorAttrs)}
    >
      {children ?? effectiveLabel}
    </Link>
  );
};
