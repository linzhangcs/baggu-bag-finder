# BAGGU Accessibility Patterns

Use these accessibility patterns when creating BAGGU-aligned frontend UI.

## Confirmed Reusable Practices

- Keep page language set with `lang="en"` unless content language changes.
- Use semantic landmarks for navigation.
- Give compact controls accessible names, especially menu, cart, search, carousel, and variant controls.
- Use `button` for actions and links for navigation.
- Label icon-only controls with `aria-label` or an equivalent accessible name.
- For meaningful product images, provide descriptive alt text. Include product and color when known.
- For decorative imagery, use empty alt text or hide it from assistive technology.
- Expose swatch names through labels such as `Select color {Color name}`.
- Use state attributes such as `aria-pressed` where controls behave like toggles.
- Preserve keyboard operation for navigation, accordions, swatches, carousels, and purchase actions.
- Preserve visible focus states. If default outlines are removed, provide an accessible replacement.

## Cautions

- Do not copy viewport settings that disable user zoom.
- Do not rely on hover-only affordances for critical information or actions.
- Do not treat third-party accessibility widgets as a substitute for semantic HTML, keyboard support, labels, contrast, and focus management.
- If a visual pattern conflicts with accessibility, choose the accessible implementation and document the intentional difference.

## Review Checklist

- Can every control be reached and operated by keyboard?
- Does every icon-only or compact control have an accessible name?
- Are selected, expanded, pressed, disabled, and loading states exposed visually and semantically?
- Do product images have useful alt text without repeating adjacent text unnecessarily?
- Does responsive behavior preserve readable text, usable targets, and non-overlapping content?
