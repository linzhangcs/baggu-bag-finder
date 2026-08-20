# BAGGU Visual Language

Use these reusable visual patterns when creating BAGGU-aligned frontend UI. These are not Bag Finder feature requirements.

## Confirmed Patterns

- Use a compact ecommerce visual system: dense information, tight typography, and practical product language.
- Prefer a tan page shell with dark text and a single accent color for hover/active emphasis.
- Use custom-brand typography when available. BAGGU's live frontend uses Studio Pro in multiple weights and italics.
- Headings commonly use uppercase text, heavier weight, tight line height, and tight tracking.
- Small utility text is common for notices, metadata, labels, and controls. Observed sizes include `10px`, `12px`, and `14px`.
- Body and product text should stay direct and benefit-oriented. Emphasize carry mode, capacity, organization, fit, materials, and care.
- Keep line heights compact for headings, product names, controls, and metadata.
- Use a repeated side spacing token. The researched frontend maps its side token to `16px` in inspected contexts.
- Favor regular spacing increments: small gaps for card internals and larger section gaps for page-level separation.
- Product/listing interiors should feel tight; page sections can have more breathing room.
- Use mobile-first layouts with major shifts around `800px` and navigation shifts around `1024px` when matching BAGGU's current responsive rhythm.

## Tentative Patterns

- Italic uppercase emphasis appears in product purchase/detail areas. Verify in the target context before making it a broad style.
- Product imagery often uses `4 / 5` framing on mobile and viewport-height sizing on desktop. Confirm across product families before standardizing.

## Avoid

- Do not create a new decorative visual language without product direction.
- Do not turn these observations into rigid design tokens until the repo has a real design system.
- Do not copy inaccessible viewport restrictions such as disabling user zoom.
