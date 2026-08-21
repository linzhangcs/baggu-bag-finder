# Recommendation Logic

## User Prompt

Implement deterministic recommendation logic only for stage 3 of the BAGGU Bag Finder implementation prompts.

## Outcome

Added static candidate bag data and pure recommendation helpers. The logic maps selected quiz answers to weighted need dimensions, scores curated candidate bags, returns one primary recommendation plus alternatives, and includes explanation data tied to selected answers.

No recommendation result UI was implemented.

## Files Changed

- `src/bag-finder/types.ts`
- `src/bag-finder/candidates.ts`
- `src/bag-finder/recommendations.ts`
- `src/bag-finder/index.ts`
- `docs/implementation-prompts.md`
- `docs/sessions/2026-08-21-01-recommendation-logic.md`

## Decisions Made

- Kept recommendation logic separate from presentation.
- Used deterministic scoring with static curated data.
- Used candidate family diversity when selecting alternatives.
- Used flexibility score as a tie-breaker for broadly useful recommendations.
- Exported logic from `src/bag-finder/index.ts` for future result UI stages.

## Deferred

- Result UI.
- Comparison UI.
- Product imagery.
- Final BAGGU product eligibility.
- Live inventory, price, variant, and stock behavior.
- Automated unit test setup.

## Notes

- `npm run lint` passed.
- `npm run build` passed.
- `npm test` failed because `package.json` does not define a `test` script.
