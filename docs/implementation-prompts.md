# Implementation Prompts

These prompts document the staged AI-assisted implementation of the BAGGU Bag Finder.

Use them in order. Each prompt keeps scope narrow, references the relevant project docs and skills, avoids unrelated refactors, and leaves room to record the resulting implementation afterward.

## 1. Architecture

### Prompt

Read:

- `AGENTS.md`
- `docs/bag-finder-spec.md`
- `docs/research.md`
- `.codex/skills/baggu-frontend/SKILL.md`
- the relevant references in `.codex/skills/baggu-frontend/references/`

Do not implement yet.

Propose a small architecture for the Bag Finder.

Include:

- component structure
- data model
- state shape
- recommendation logic
- how existing project components can be reused
- which new components are actually necessary
- accessibility considerations
- responsive behavior
- test cases

Keep the implementation small and appropriate for this project. Do not refactor unrelated code.

### Outcome

Architecture proposed in chat. No code changes.

## 2. Question Flow

### Prompt

Read:

- `AGENTS.md`
- `docs/bag-finder-spec.md`
- `.codex/skills/baggu-frontend/SKILL.md`
- `.codex/skills/baggu-frontend/references/visual-language.md`
- `.codex/skills/baggu-frontend/references/component-patterns.md`
- `.codex/skills/baggu-frontend/references/accessibility.md`

Implement the Bag Finder question flow.

Requirements:

- keep feature code under `src/bag-finder/`
- use accessible native controls where possible
- support keyboard navigation
- preserve selections while moving between questions
- keep state logic separate from presentation
- follow the `baggu-frontend` skill
- do not implement recommendation results yet
- do not refactor unrelated code

After implementation:

- run relevant tests
- explain the files changed
- call out any unresolved decisions

### Outcome

Implemented the question flow under `src/bag-finder/`, including static questions, local reducer state, native radio controls, progress, completion summary, BAGGU-style header, and marquee. Recommendation results are still intentionally omitted. `npm run lint` and `npm run build` pass; `npm test` fails because no `test` script exists.

## 3. Recommendation Logic

### Prompt

Read:

- `AGENTS.md`
- `docs/bag-finder-spec.md`
- `docs/research.md`
- `.codex/skills/baggu-frontend/SKILL.md`

Implement deterministic recommendation logic only.

Requirements:

- keep feature code under `src/bag-finder/`
- keep recommendation logic separate from presentation
- add static candidate bag data with only the fields needed for scoring and future display
- map answers to weighted need dimensions
- return one primary recommendation and two to three alternatives
- include explanation data tied to selected answers
- do not build the results UI beyond temporary development-safe wiring if needed
- do not add dependencies
- do not refactor unrelated code

After implementation:

- run relevant tests
- explain the files changed
- call out any unresolved product decisions

### Outcome

TODO: Record what was implemented and any deviations from the prompt.

## 4. Result UI

### Prompt

Read:

- `AGENTS.md`
- `docs/bag-finder-spec.md`
- `docs/research.md`
- `.codex/skills/baggu-frontend/SKILL.md`
- `.codex/skills/baggu-frontend/references/visual-language.md`
- `.codex/skills/baggu-frontend/references/component-patterns.md`
- `.codex/skills/baggu-frontend/references/accessibility.md`

Implement the recommendation result UI.

Requirements:

- render the primary recommendation after the question flow completes
- show two to three alternatives
- explain why each result matched the shopper's answers
- expose important tradeoffs
- keep visual styling aligned with reusable BAGGU frontend patterns
- preserve keyboard accessibility and semantic structure
- do not implement comparison UI yet
- do not refactor unrelated code

After implementation:

- run relevant tests
- explain the files changed
- call out unresolved content or product-data decisions

### Outcome

TODO: Record what was implemented and any deviations from the prompt.

## 5. Comparison UI

### Prompt

Read:

- `AGENTS.md`
- `docs/bag-finder-spec.md`
- `docs/research.md`
- `.codex/skills/baggu-frontend/SKILL.md`
- `.codex/skills/baggu-frontend/references/component-patterns.md`
- `.codex/skills/baggu-frontend/references/accessibility.md`

Implement the comparison UI for recommended bags.

Requirements:

- compare the primary recommendation with alternatives
- include decision-relevant attributes from the spec
- make differences easier to scan than shared traits
- use semantic table or list structure as appropriate
- keep mobile layout readable and desktop layout scannable
- avoid adding new product decisions beyond existing data
- do not refactor unrelated code

After implementation:

- run relevant tests
- explain the files changed
- call out unresolved data gaps

### Outcome

TODO: Record what was implemented and any deviations from the prompt.

## 6. Review and Polish

### Prompt

Read:

- `AGENTS.md`
- `docs/bag-finder-spec.md`
- `docs/research.md`
- `.codex/skills/baggu-frontend/SKILL.md`
- all references in `.codex/skills/baggu-frontend/references/`

Review and polish the implemented Bag Finder.

Focus on:

- accessibility
- keyboard navigation
- responsive behavior
- visual consistency with reusable BAGGU frontend patterns
- text fit and layout stability
- state preservation and restart behavior
- small cleanup only where it directly improves the implemented feature

Do not add new feature scope. Do not refactor unrelated code.

After review:

- run relevant tests
- list findings and fixes
- call out remaining risks or unresolved product decisions

### Outcome

TODO: Record what was implemented and any deviations from the prompt.
