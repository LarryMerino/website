# website

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
