# Rolls & More restaurant concept

A React/Vite restaurant website with scroll-linked burger assembly, responsive navigation, a categorized menu, an accessible menu-photo dialog, and location/contact links.

## Run

- Install: `npm install`
- Start: `npm run dev`
- Build: `npm run build`
- Check: `npm run lint`

Deployment output: `dist`. No database or environment secrets are required.

## Content

Restaurant details and menu were supplied by the project owner. Menu prices need restaurant confirmation before launch. Food cutouts are AI-generated illustrations; the storefront and menu photographs are supplied references. This is a concept website, not an active ordering service.

Motion follows native scrolling and honors reduced-motion preferences.

## Shopping demo

The menu supports a browser-local shopping bag, quantities, combo upgrades and a simulated pickup checkout. Card, wallet and pay-at-pickup options are demonstration choices only. The site collects no payment credentials and sends no orders. Run the pricing/state checks with `node --test src/cart.test.js`.

The entrance-to-interior section uses scroll-driven crossfade and zoom, not video. The supplied interior photograph was edited with AI to remove people. The burger illustration is used only in the ingredient assembly section.
