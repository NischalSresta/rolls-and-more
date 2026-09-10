# Restaurant Website Master Prompt

Use this prompt with a capable coding agent. Replace every `[PLACEHOLDER]` and attach the restaurant's best photos, logo, menu, social links, and map listing.

---

Build and finish a premium, production-ready website for `[RESTAURANT NAME]`, a `[CUISINE / RESTAURANT TYPE]` located at `[FULL ADDRESS]`.

Brand inputs:

- Website goal: `[ONLINE ORDERS / LEADS / BOOKINGS / PRESENTATION SITE]`
- Brand personality: `[BOLD / WARM / PLAYFUL / ELEGANT / MINIMAL]`
- Main colours: `[COLOUR 1]`, `[COLOUR 2]`, `[NEUTRAL]`
- Menu: `[PASTE MENU OR ATTACH IMAGE/PDF]`
- Phone: `[PHONE]`
- Maps link: `[MAPS URL]`
- Instagram: `[INSTAGRAM URL]`
- Opening hours: `[HOURS OR SAY LINK TO CURRENT MAPS HOURS]`
- Primary call to action: `[ORDER NOW / BOOK A TABLE / CALL / GET DIRECTIONS]`

Design a distinctive restaurant experience rather than a generic template. Use strong editorial typography, generous spacing, clear hierarchy, sharp food photography, subtle texture, and a restrained colour system based on the brand. The interface should feel energetic and polished while keeping the menu and contact actions effortless to use.

Create these sections:

1. A high-impact hero with the restaurant's strongest dish, a short positioning line, and one primary action.
2. A scroll-controlled signature animation. For a burger, sandwich, bowl, pizza, or wrap, show the ingredients assembling in order. Keep every layer in one responsive coordinate system so it remains aligned at all screen sizes. Scale the complete assembly as one object. Use requestAnimationFrame, clamp progress between 0 and 1, and respect reduced-motion settings.
3. A filterable menu with category-specific photographs, clear prices and descriptions, working add-to-cart controls, quantity management, combo upgrades, and a persistent bag count.
4. A location journey that progresses through three stable phases: exterior, doorway, and interior. Use professional, believable restaurant photography, corrected perspective, consistent architecture, and warm lighting. Crossfade with bounded opacity values and avoid expensive mobile blur effects.
5. Social proof, restaurant story, phone, directions, Instagram, and current-hours links.
6. A compact mobile action bar for Menu, Call, and Directions that respects iPhone safe areas.
7. A clear footer with the restaurant identity and essential links.

Technical requirements:

- Build with React and Vite unless the existing project requires another stack.
- Use semantic HTML, keyboard-visible focus states, descriptive alternative text, and accessible dialogs.
- Mobile-first responsive layout from 320px upward. Test at 390px, 430px, 768px, and desktop widths.
- Use inline SVG icons so iOS does not replace arrows or decorative symbols with emoji.
- Account for iOS Safari and social in-app browsers: `100svh`, safe-area insets, stable sticky sections, no width overflow, and no animation calculations that depend on the changing browser toolbar height.
- Use `loading="lazy"` and `decoding="async"` on off-screen images. Keep the hero image prioritized.
- Add reduced-motion fallbacks that show a complete, attractive static state.
- The cart and checkout must clearly state whether they are demonstrations. Do not collect payment details until a real payment provider and backend are configured.
- Preserve supplied brand marks and real business details. Clearly distinguish AI-enhanced imagery from factual business information.

Animation quality rules:

- Never animate five clipped copies of one large image independently with fixed pixel offsets.
- Use one shared SVG `viewBox`, separate transparent layer assets, or responsive percentage-based geometry.
- Ease progress with smoothstep or a similar bounded curve.
- Avoid layout reads and writes on every raw scroll event; schedule updates with requestAnimationFrame.
- Keep transforms on GPU-friendly properties and avoid stacked filters on mobile.
- Verify the animation at its start, midpoint, and end. At the final state, ingredients must touch naturally with no gaps, overlap errors, flattened buns, or changing proportions.

Photography guidance:

- Enhance supplied restaurant photos into believable campaign photography while preserving the real architecture, layout, signage, logo placement, and scale.
- Correct vertical lines and perspective, improve resolution, use natural material detail and balanced exposure, and keep colours consistent across exterior, doorway and interior frames.
- Do not invent menu claims, awards, opening hours, people, logos, facilities, or architectural features.

Finish the work completely:

- Run the production build and lint checks.
- Test menu switching, add-to-cart, combo upgrades, quantity changes, dialogs, mobile navigation, phone and map links.
- Check for horizontal overflow and visual glitches at phone and desktop sizes.
- Package all source code, CSS, public images, configuration files, setup instructions, and this prompt in a ZIP.
- If a Git repository and hosting connection are supplied, commit, push, wait for deployment, and verify the published site.

Deliver the finished live URL, repository URL, ZIP file, validation results, and a short list of any features that still require real credentials or business approval.

