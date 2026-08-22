# Product Size Data Research

## User Prompt

Research BAGGU product size data from six supplied product pages, create `docs/product-data.md`, and create `src/data/bag-size-data.ts` with confirmed facts only. Do not implement the Bag Size Finder.

## Outcome

Collected source-backed product, dimension, strap, fit, pocket, model-height, image, and related-size data from the supplied BAGGU product pages and their BAGGU comparison sections. Added a normalized comparison table and conservative frontend data module using `unknown` for unconfirmed attributes.

## Files Changed

- `docs/product-data.md`
- `src/data/bag-size-data.ts`
- `docs/sessions/2026-08-21-04-product-size-data.md`

## Decisions Made

- Treated BAGGU comparison-section entries as confirmed related size data.
- Kept product style, product family, size label, and capacity attributes separate.
- Did not add recommendation scores or UI behavior.
- Used `true | "unknown"` for fit attributes so unlisted fits are not treated as false.

## Deferred

- Confirm image URLs for related comparison variants before rendering them.
- Verify ambiguous Recycled Leather Bowler dimensions before using that row in UI.
- Decide whether the future size finder should compare all six supplied product styles together or filter by product family/use case first.

## Notes

- `npm run lint` passed.
- `npm run build` passed.
- `npm test` failed because the project does not define a `test` script.
