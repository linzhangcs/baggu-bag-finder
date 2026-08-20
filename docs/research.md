# BAGGU Frontend Research

Research date: 2026-08-20

Sources inspected:

- https://baggu.com/
- https://baggu.com/collections/bags
- https://baggu.com/collections/reusable-bags
- https://baggu.com/products/medium-nylon-crescent-bag-wild-plum
- https://baggu.com/accessibility

Confidence labels:

- Confirmed: observed across multiple BAGGU pages or in shared site CSS/HTML.
- Tentative: observed in one context or one page type; do not treat as a general rule yet.

## Typography

- Confirmed: BAGGU uses a custom Studio Pro font family with regular, medium, semibold, bold, ultrabold, and italic font files preloaded in the current frontend.
- Confirmed: Page and product headings commonly use uppercase text, heavy weight, tight line height, and tight tracking.
- Confirmed: Small utility text is common, especially `10px`, `12px`, and `14px` text for notices, labels, product metadata, and controls.
- Confirmed: Product/category text uses compact line heights such as `leading-none`, `leading-tight`, and `leading-[0.9]`.
- Confirmed: Product copy is direct and benefit-oriented, describing carry mode, capacity, organization, laptop fit, materials, and care.
- Tentative: Italic uppercase text appears in product purchase/detail areas, but more product templates should be checked before treating italic emphasis as a global pattern.

## Spacing

- Confirmed: The site uses a repeated side padding token represented in markup as `px-side`, `pr-side`, `p-side`, and `gap-side`; CSS inspection maps the side token to `16px` at inspected breakpoints.
- Confirmed: Layout spacing relies on small, regular increments: `gap-1`, `gap-2`, `gap-4`, `gap-8`, `gap-16`, and larger desktop gaps such as `800:gap-20`.
- Confirmed: Product listing cards use tight gaps between image, title, price, description, and color swatches.
- Confirmed: Collection pages use more vertical breathing room at section level, including `pt-6`, `pb-6`, `800:pt-10`, and `800:pb-10`.
- Confirmed: Product pages increase page-level spacing between major product sections, including `gap-16`, `800:gap-20`, `pb-16`, and `800:pb-[120px]`.

## Layout

- Confirmed: The global page shell uses a tan background, black/burnt text, and an accent color custom property.
- Confirmed: The header is sticky at the top and combines a centered BAGGU logo, navigation controls, search, and cart.
- Confirmed: A black announcement bar sits above the header and cycles through shipping/order messages.
- Confirmed: Collection pages present a category heading followed by view controls and a product grid.
- Confirmed: The collection style view uses a 2-column grid on smaller screens and switches to 3 columns at the `800px` breakpoint.
- Confirmed: Product pages use a mobile-first single-column layout and switch at `800px` to a reversed two-column layout with media on the right and purchase/details content on the left.
- Confirmed: Product media becomes sticky on desktop, offset by the combined notice and header height.
- Tentative: Product image framing often uses a `4 / 5` aspect ratio on mobile and viewport-height-based image sizing on desktop; confirm across more product families before standardizing.

## Interaction

- Confirmed: Header controls open navigation, info, search, and cart surfaces rather than navigating directly.
- Confirmed: Links and controls commonly use hover color changes to the site accent color.
- Confirmed: Button-like controls use rounded pill shapes, uppercase labels, border states, and inverted background/text colors for selected or primary states.
- Confirmed: Color swatches are interactive circular controls with hover opacity changes and a visible selected indicator.
- Confirmed: Product detail sections use accordion-style controls with rotating icons for expanded/collapsed state.
- Confirmed: Product and social/recommendation carousels expose left/right scroll controls.
- Tentative: Collection "All" and "Style" controls behave like segmented view switches; more interaction testing is needed to confirm route/state behavior.

## Form/Control

- Confirmed: Global newsletter signup uses a text input with placeholder "Enter email..." and a `SUBSCRIBE` submit button.
- Confirmed: Product pages use a full-width pill-shaped `Add To Bag` button in the purchase area.
- Confirmed: Collection view controls use pill buttons for "All" and "Style".
- Confirmed: Product variant selectors are circular swatches with accessible labels such as "Select color Wild Plum".
- Confirmed: Navigation, search, cart, carousel, and variant controls are rendered as buttons rather than generic clickable elements in inspected markup.
- Tentative: The product page includes reset/button controls around purchasing and product options; exact form behavior needs browser interaction testing before documenting state rules.

## Product Presentation

- Confirmed: Collection product cards present product name, price, color label, short product description, product imagery, "View Details" links, and color swatches.
- Confirmed: Product-card imagery includes descriptive alt text in the pattern "{Product name} in {Color}".
- Confirmed: Product cards expose multiple variants visually through swatches, including solid colors and image-pattern swatches.
- Confirmed: Product descriptions emphasize practical use cases: essentials, everyday carry, laptop fit, travel, organization, pockets, washability, and capacity.
- Confirmed: Product detail pages include a media gallery, title, price, financing/payment messaging, color selection, add-to-bag action, details, materials, shipping/returns, and related product sections.
- Confirmed: Product detail bullets include measurements, strap length, internal pockets/key leash, materials, and care when available.
- Confirmed: Sale or comparison pricing can appear in product data, so recommendation and comparison specs should allow current price plus compare-at price if product data exposes both.

## Responsive Behavior

- Confirmed: The current frontend uses explicit utility breakpoints including `800`, `900`, `1000`, `1024`, `1200`, `1400`, `1600`, and `1800`.
- Confirmed: The `800px` breakpoint is a major layout shift for product grids, product pages, typography sizing, image behavior, and spacing.
- Confirmed: The `1024px` breakpoint changes header/navigation behavior: mobile shows a compact toggle, while desktop shows Shop, Info, and Search controls.
- Confirmed: Product listings move from 2 columns to 3 columns at `800px`.
- Confirmed: Product pages move from stacked content to a side-by-side layout at `800px`, with sticky desktop media.
- Confirmed: Several touch-specific utilities exist, indicating the frontend distinguishes coarse-pointer behavior in some components.

## Accessibility

- Confirmed: Pages include `lang="en"` and viewport metadata.
- Confirmed: Header navigation landmarks use `role="navigation"`.
- Confirmed: Key controls include accessible labels, including "Toggle Navigation", "Toggle Cart", "Toggle Shop Navigation", "Toggle Info Navigation", "Toggle Search Navigation", "Scroll left", and "Scroll right".
- Confirmed: Search icon SVG uses `role="img"` with a titled label.
- Confirmed: Product images and recommendation/social images generally include alt text.
- Confirmed: Product color swatches expose color names through `aria-label` values.
- Confirmed: Product comparison carousel controls use `aria-pressed` for selected state in inspected markup.
- Confirmed: BAGGU publishes an accessibility statement and says the site uses UserWay's accessibility widget to improve WCAG 2.1 compliance.
- Tentative: Several controls suppress default outlines with `focus:outline-none` and `focus-visible:outline-none`; rendered replacement focus styles need visual/browser testing before judging keyboard focus quality.
- Tentative: The page includes `maximum-scale=1.0, user-scalable=no` in viewport metadata. This should be reviewed before copying because it may negatively affect zoom accessibility.

## Research Notes for Bag Finder

- Match observed BAGGU patterns only after they are useful to the guided flow; do not treat this research as a complete design system.
- Strongest confirmed patterns for a Bag Finder prototype are compact uppercase controls, pill buttons, circular swatches, tan/black/accent color structure, dense product information, and responsive shifts at `800px` and `1024px`.
- Product recommendation explanations should preserve BAGGU's practical product-language focus: what it carries, how it is worn, how organized it is, and whether it fits laptop/travel/errand needs.
- Any quiz-specific interaction pattern remains unresolved because BAGGU's inspected pages are browse, product, navigation, subscription, and carousel experiences rather than guided questionnaires.
