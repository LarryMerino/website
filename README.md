# website

## Content Architecture & Conventions

This project decouples UI copy and structured marketing data from React components using a lightweight, typed content layer. The goals: (1) enable future i18n & CMS integration, (2) keep components purely presentational, (3) allow automated linting to prevent hard‑coded strings creeping back in.

### Directory Layout

```
content/
  site.ts              # Global site metadata (name, description, nav, footer, CTAs)
  home.hero.ts         # Hero section copy & animated terminal lines
  home.tech-stack.ts   # Tech stack section groups
  home.capabilities.ts # Capabilities section cards
lib/content/types.ts   # Shared TypeScript interfaces for content objects
```

Add new section/content files under `content/` with clear, scoped filenames: `<page>.<section>.ts` (e.g. `about.timeline.ts`). Keep cross-page constants (brand slogans, global CTAs) inside `site.ts` unless they are page-specific.

### Typing Strategy

- All content objects must satisfy interfaces defined in `lib/content/types.ts` (extend those interfaces instead of redefining shapes inline).
- Prefer explicit IDs for list items (e.g. capabilities) to support stable keys, analytics mapping, and future localization fallbacks.
- Optional fields (`intro`, `description`, etc.) should be omitted (not empty strings) when unused.

### Access Pattern

Components import the minimal content they need:

```ts
import { HOME_TECH_STACK } from "@/content/home.tech-stack";

export function TechStackSection(props: Partial<TechStackContent>) {
  const { groups = HOME_TECH_STACK.groups } = props;
  // ... render
}
```

Avoid deep passing of large content objects—destructure early and pass only primitive props to leaf components to keep memoization efficient.

### Lint Enforcement: no-ui-literals

A custom ESLint rule (`local/no-ui-literals`) warns when raw UI text literals appear in TS/TSX files outside the `content/` layer. This pushes new copy into centralized modules automatically during development.

Rule scope (current heuristics):

- Flags: JSX text nodes, string attribute values, top-level string assignments.
- Ignores: files under `/content/`, attributes like `className`, `data-*`, `aria-*`, pure utility/tailwind strings.
- False positives: very short labels (e.g. `Logo`)—either centralize or disable inline (`// eslint-disable-next-line local/no-ui-literals`).

You can tune allowed paths or ignored attributes in `eslint.config.mjs`.

### Adding New Content

1. Define or extend types in `lib/content/types.ts` if needed.
2. Create `<page>.<section>.ts` exporting a named constant (UPPER*SNAKE or HOME*\* prefix for page-scoped root objects).
3. Export via a barrel (`content/index.ts`) if you want a grouped import.
4. Import into the component and use as default props (allow overrides for testing / future CMS injection).
5. Run `pnpm lint` – ensure no stray literals remain in components.

### Internationalization (Planned)

Future locale structure (not yet active):

```
content/
  en/
    site.ts
    home.hero.ts
  es/
    site.ts
    home.hero.ts
```

With a resolver: `getContent(locale).home.hero`. The current flat layout was chosen to keep Phase 1 simple; migration path is additive.

### Validation (Upcoming)

We'll introduce Zod schemas (e.g. `lib/content/schema.ts`) to validate content shapes at build time, ensuring CMS or manual edits can't break rendering.

### Rationale & Benefits

- Clear ownership boundary: design/copy vs. component logic.
- Easier testability (components accept injected content overrides).
- Paves the way for static extraction, i18n, or build-time content transforms (markdown/MDX, CMS adapters).
- Prevents regression via lint rule.

### FAQ

Q: Can I keep a tiny label inline (e.g. button text)?  
A: Prefer centralizing; consistent extraction improves future localization. For ephemeral dev placeholders, silence once—but replace before merging.

Q: How do I add computed content (e.g. dynamic year)?  
A: Keep the dynamic expression in the component but store surrounding static text in content (e.g. template parts) or generate the value in a small helper imported by the content file.

Q: What about rich text / markdown?  
A: Introduce MDX or serialized AST later; current layer is intentionally primitive TS objects.

---

## Typography Guide

This project uses brand fonts loaded with `next/font` and exposed as CSS variables:

- Inter (base/UI): applied globally to `body` as `font-sans`.
- Poppins (headings): applied globally to `h1–h3` and available via the `.heading-brand` utility.
- Roboto Mono (code): use with `font-mono`.

See the detailed guide in [STYLEGUIDE.md](./STYLEGUIDE.md).

## Brand Colors

The design system exposes brand colors via CSS variables and Tailwind tokens, with light/dark variants:

- Background/Text: `bg-background`, `text-foreground`
- Primary: `bg-primary`, `text-primary`, `ring-primary` and paired `*-foreground`
- Secondary: `bg-secondary`, `text-secondary` and `*-foreground`
- Accent: `bg-accent`, `text-accent` and `*-foreground`

Always prefer design tokens over raw hex. See details and best practices in the "Brand Colors" section of [STYLEGUIDE.md](./STYLEGUIDE.md).

## License

- **Source code**: Released under the [MIT License](./LICENSE).
- **Assets** (logos, images, icons, and other brand-related files located in `/assets`):  
  All Rights Reserved. These files are not covered by the MIT license and may not be used, copied, or modified without explicit permission.
- **Other content** such as external data is not part of this repository and is not licensed here.
