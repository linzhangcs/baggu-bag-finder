# BAGGU Component Patterns

Use these patterns for reusable BAGGU-aligned UI components and workflows. Do not include feature-specific Bag Finder logic here.

## Navigation and Page Shell

- Use a sticky header with a centered brand mark and compact navigation controls.
- Treat navigation, info, search, and cart as controls that open surfaces when the interaction calls for it.
- Use a top announcement area for shipping, order, or campaign messages when needed.
- Use buttons for interactive controls rather than generic clickable elements.
- Provide clear labels for controls that use icons or compact text.

## Buttons and Segmented Controls

- Use rounded pill controls for primary actions, view switches, and compact ecommerce controls.
- Use uppercase labels for compact BAGGU-style controls.
- Use border and filled/inverted states to distinguish selected, primary, and inactive states.
- Use accent-color hover states where appropriate.
- Keep controls compact but large enough for touch and keyboard use.

## Product Cards

- Product cards should prioritize image, product name, price, color/variant label, short description, and action link.
- Use product descriptions that explain use, capacity, carry mode, organization, and care when those attributes are known.
- Show variants visually with circular swatches when color or pattern is central to the shopping decision.
- Use descriptive product image alt text in the pattern `{Product name} in {Color}` when color is known.
- Support current price and compare-at price when product data exposes both.

## Product Detail Areas

- Use a media gallery plus product information, price, color selection, primary purchase action, details, materials, shipping/returns, and related products when applicable.
- On wider layouts, product media can become sticky while product information remains alongside it.
- Use accordion sections for secondary product details such as details, materials, shipping, and returns.
- Product detail bullets should stay concrete: measurements, strap length, pockets, key leash, materials, and care.

## Swatches

- Use circular swatches for color or pattern selection.
- Expose the color or pattern name through accessible labels.
- Show a visible selected state, not only hover.
- Use image swatches for pattern variants when a flat color would be misleading.

## Carousels

- Use carousels for announcement messages, product media, social content, or related/recommended products only when horizontal browsing is useful.
- Provide explicit previous/next controls.
- Preserve accessible names and state for carousel controls.

## Responsive Workflows

- Product listings commonly move from 2 columns on smaller screens to 3 columns around `800px`.
- Product detail pages can move from stacked mobile content to two-column desktop content around `800px`.
- Header navigation can change from a compact menu toggle to visible desktop controls around `1024px`.
- Account for coarse-pointer behavior when interaction density changes on touch devices.
