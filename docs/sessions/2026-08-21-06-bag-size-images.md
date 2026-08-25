# Bag Size Image Data

## User Prompt

Add BAGGU product images from `https://baggu.com/` so recommendations can display an image for each bag.

## Outcome

Added BAGGU-hosted product image URLs and alt text for every current Bag Size Finder candidate that was missing imagery. Updated the product-data note to clarify that some comparison variants use confirmed images from different BAGGU colorway pages than the original product-size source page.

## Files Changed

- `src/data/bag-size-data.ts`
- `docs/product-data.md`
- `docs/sessions/2026-08-21-06-bag-size-images.md`

## Decisions Made

- Kept image data centralized in `src/data/bag-size-data.ts`.
- Used BAGGU product pages and BAGGU CDN image URLs only.
- Did not change recommendation logic or UI layout.

## Deferred

- Decide whether final production content should normalize every image to the same colorway strategy.
- Confirm whether external `checkout.baggu.com` product pages should be mirrored to canonical `baggu.com` image references if BAGGU provides equivalent public pages.
