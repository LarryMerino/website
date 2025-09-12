# Style Guide

## Typography

This guide summarizes how to use the brand fonts in the project.

### Fonts

- Inter (sans): base for UI and body text.
- Poppins (sans display): for headings and section/component titles.
- Roboto Mono (mono): for code snippets, technical values, or status numbers when appropriate.

Fonts are loaded in `app/(home)/layout.tsx` with `next/font` and exposed as CSS variables:

- `--font-inter` → `font-sans`
- `--font-poppins` → `font-poppins`
- `--font-roboto-mono` → `font-mono`

In `app/globals.css`:

- `body` applies `font-sans` (Inter).
- `h1, h2, h3` apply `font-poppins`.
- Utility `.heading-brand` exists to explicitly apply Poppins when needed.

### Recommended classes

- Body text: `text-base md:text-[1.05rem]` + `leading-relaxed`.
- Headings:
  - `h1`: `text-4xl md:text-5xl font-semibold tracking-tight leading-tight`
  - `h2`: `text-3xl md:text-4xl font-semibold tracking-tight leading-tight`
  - `h3`: `text-2xl md:text-3xl font-semibold tracking-tight leading-tight`
- Eyebrow/label: `.heading-brand text-sm font-medium tracking-wide uppercase`
- Code/mono: `font-mono text-sm`

### Utilities

- `.heading-brand`: forces Poppins. Useful when the element is not an h1–h3 but should use the heading typography.

### Examples

```tsx
// Section title
<h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
  Capabilities
</h2>

// Eyebrow
<p className="heading-brand text-sm font-medium tracking-wide uppercase text-sky-400/90">
  Highlights
</p>

// Card title
<h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
  Low-Power Firmware
</h3>

// Descriptive text
<p className="text-base md:text-[1.05rem] leading-relaxed text-[var(--text-subtle)]">
  Extend battery life with energy-efficient IoT coding.
</p>

// Code/mono
<code className="font-mono text-sm">nrfjprog --eraseall</code>
```

### Weights considerations

- Inter: 300 (Light), 400 (Regular) for body.
- Poppins: 500 (Medium), 600 (Semibold), 700 (Bold) for headings.
- Roboto Mono: 400 (Regular) as base.

### Accessibility and performance

- `display: swap` is configured to minimize FOIT.
- Keep heading contrast appropriate to the current theme.
- Avoid loading too many weights; stick to the ones defined above.

---

## Brand Colors

This project defines brand colors as CSS variables in `app/globals.css`, with light and dark themes. Prefer design tokens (Tailwind utilities) over hard-coded hex values.

### Palette (by role)

| Role       | Light (Hex) | Dark (Hex) |
| ---------- | ----------- | ---------- |
| Background | `#F9FAFB`   | `#0F172A`  |
| Text       | `#111827`   | `#F9FAFB`  |
| Primary    | `#2563EB`   | `#3B82F6`  |
| Secondary  | `#6B7280`   | `#9CA3AF`  |
| Accent     | `#22C55E`   | `#4ADE80`  |

Internally, we use OKLCH values that visually match these brand hex colors and improve cross-theme consistency.

### CSS variable mapping

Light theme (`:root`):

- `--background` / `--foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--accent` / `--accent-foreground`
- Additional tokens: `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--border`, `--input`, `--ring`, `--text-subtle`, `--surface-elevated`, `--surface-elevated-hover`

Dark theme (`.dark`): mirrored variables adapted for dark mode.

### Tailwind tokens

Use Tailwind utilities mapped from the variables above:

- Background/Text: `bg-background`, `text-foreground`
- Primary: `bg-primary`, `text-primary`, `ring-primary`, plus `text-primary-foreground` for text on primary surfaces
- Secondary: `bg-secondary`, `text-secondary`, `text-secondary-foreground`
- Accent: `bg-accent`, `text-accent`, `text-accent-foreground`
- Surfaces: `bg-card` / `text-card-foreground`, `bg-popover` / `text-popover-foreground`
- Borders/Inputs: `border`, `ring`, `bg-input`

### Examples

```tsx
// Primary button
<button className="inline-flex items-center rounded-lg bg-primary text-primary-foreground px-4 py-2 ring-1 ring-primary/20 hover:bg-primary/90">
  Get started
</button>

// Accent badge
<span className="inline-flex items-center rounded-md bg-accent/15 text-accent px-2 py-1 text-sm ring-1 ring-accent/20">
  New
</span>

// Card surface using tokens
<div className="rounded-xl bg-card text-card-foreground border p-6">
  ...
</div>
```

### Best practices

- Prefer tokens (`bg-primary`, `text-foreground`) over hard-coded hex values.
- Use `*-foreground` pairs to ensure readable text on colored surfaces.
- Avoid fixed colors that don’t adapt to dark mode; rely on theme-aware tokens.
- For subtle hierarchy, leverage `--surface-elevated`, `--text-subtle`, and consistent border/ring tokens.
