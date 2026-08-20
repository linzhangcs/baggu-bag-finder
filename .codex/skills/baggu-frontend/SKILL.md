---
name: baggu-frontend
description: Apply reusable BAGGU frontend patterns when designing, implementing, reviewing, or refining BAGGU-aligned ecommerce UI. Use for BAGGU visual language, layout, product presentation, controls, responsive behavior, and accessibility patterns; do not use it as a Bag Finder feature spec or to invent feature-specific requirements.
---

# BAGGU Frontend

Use this skill when UI work should align with recurring BAGGU frontend patterns.

## Workflow

1. Inspect the current repo code and nearby UI before making changes.
2. Identify whether the task needs visual language, component behavior, accessibility guidance, or all three.
3. Load only the relevant references:
   - `references/visual-language.md` for typography, color, spacing, layout, and responsive rhythm.
   - `references/component-patterns.md` for controls, product cards, product details, swatches, accordions, navigation, and carousels.
   - `references/accessibility.md` for semantics, labels, keyboard behavior, image alt text, and accessibility caveats.
4. Apply confirmed reusable patterns first. Treat tentative observations as prompts to verify, not rules to copy.
5. Keep changes small and understandable. Reuse existing components, assets, CSS variables, and styles before creating new ones.
6. Do not copy Bag Finder questions, recommendation logic, comparison requirements, or other feature-specific behavior from product specs into general UI work.

## Guardrails

- Do not invent BAGGU-specific design rules beyond confirmed reusable patterns.
- Do not add production dependencies without user confirmation.
- Preserve semantic HTML, keyboard usability, visible focus states, and responsive behavior.
- If a BAGGU pattern conflicts with accessibility, prefer the accessible implementation and note the divergence.
