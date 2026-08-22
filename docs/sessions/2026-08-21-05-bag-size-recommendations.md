# Bag Size Recommendations

## User Prompt

Update the existing finder so it recommends the most appropriate BAGGU bag and size based on confirmed product data in `src/data/bag-size-data.ts`. Keep recommendation logic separate from presentation, use eligibility before ranking, show alternatives and comparison, add tests, and do not invent product facts.

## Outcome

Refactored the Bag Finder into a Bag Size Finder that asks capacity and use-case questions, filters products by confirmed required fit, ranks eligible products by carry level and use case, and renders a recommendation with alternatives plus an eligible-options comparison. Added behavior tests for recommendation outcomes and edge cases.

## Files Changed

- `package.json`
- `src/bag-finder/BagFinder.tsx`
- `src/bag-finder/bag-finder.css`
- `src/bag-finder/components/CompletionSummary.tsx`
- `src/bag-finder/components/FinderProgress.tsx`
- `src/bag-finder/components/QuestionStep.tsx`
- `src/bag-finder/index.ts`
- `src/bag-finder/questions.ts`
- `src/bag-finder/recommendations.ts`
- `src/bag-finder/types.ts`
- `src/bag-finder/candidates.ts`
- `tests/bag-recommendations.test.ts`
- `docs/sessions/2026-08-21-05-bag-size-recommendations.md`

## Decisions Made

- Removed the old broad candidate data in favor of centralized `bagSizeData`.
- Treated required fits as eligibility constraints and treated `unknown` as missing evidence.
- Preferred the smallest appropriate confirmed option unless the shopper asks for more flexibility.
- Used Node's built-in test runner with TypeScript stripping to avoid adding dependencies.
- Kept the existing completion component filename while changing its contents to a size recommendation and comparison view.

## Deferred

- Related size variants without confirmed image URLs render a text placeholder.
- Book fit remains unsupported because BAGGU data does not confirm book fit for the researched set.
- Extra layer fit remains mostly unknown; only Big Baggu has confirmed larger soft-item evidence.
- Some products are still difficult to compare directly because reusable bags, travel bags, and compact everyday bags serve different jobs.

## Notes

- `npm test` passed.
- `npm run build` passed.
- `npm run lint` passed.
