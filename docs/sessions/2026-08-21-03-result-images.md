# Result Images

## User Prompt

Get BAGGU image URLs, add them to `candidates.ts`, and display them in the recommendation result UI.

## Outcome

Each static bag candidate now includes an image URL and descriptive alt text. Recommendation result cards render the product image above the result details on mobile and in a dedicated media column on wider screens.

## Files Changed

- `src/bag-finder/types.ts`
- `src/bag-finder/candidates.ts`
- `src/bag-finder/components/CompletionSummary.tsx`
- `src/bag-finder/bag-finder.css`
- `docs/sessions/2026-08-21-03-result-images.md`

## Decisions Made

- Added `imageUrl` and `imageAlt` directly to the candidate data so the UI stays presentational.
- Used descriptive alt text that includes product and color/pattern where the sourced image variant is known.
- Used BAGGU CDN image URLs exposed from BAGGU product pages.

## Deferred

- These are still static prototype images, not live product-media data.
- Final eligible variants, color preference logic, image ordering, and inventory-aware imagery remain unresolved product-data decisions.

## Notes

- `npm run lint` passed.
- `npm run build` passed.
- `npm test` failed because the project does not define a `test` script.
