# Bag Size Product Links

## User Prompt

Add product URLs for the correct product sizes so recommendations can link to the matching BAGGU product.

## Outcome

Added a shopper-facing `productUrl` field to each current Bag Size Finder product record and rendered product links in recommendation and comparison cards.

## Files Changed

- `src/data/bag-size-data.ts`
- `src/bag-finder/components/CompletionSummary.tsx`
- `src/bag-finder/bag-finder.css`
- `docs/product-data.md`
- `docs/sessions/2026-08-21-07-product-links.md`

## Decisions Made

- Kept `sourceUrl` as evidence provenance and added `productUrl` for navigation.
- Used links, not buttons, for product navigation.
- Styled links as compact pill controls to match the existing BAGGU-aligned UI.

## Deferred

- Decide whether final merchandising should normalize all product URLs to the same colorway as the rendered image.
