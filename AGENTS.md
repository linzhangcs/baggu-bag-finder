# AGENTS.md

## Project Purpose

This repository is for the BAGGU Bag Finder frontend. The app is still at the starter-scaffold stage, so do not infer
BAGGU-specific product behavior, content, or design rules until they are defined in the repo or by the user.

## Current Frontend Stack

- React 19 with TypeScript.
- Vite 8 using `@vitejs/plugin-react`.
- Plain CSS files for styling, including CSS custom properties and nested CSS.
- ESLint flat config with recommended JavaScript, TypeScript, React Hooks, and React Refresh rules.
- Prettier is configured with semicolons, single quotes, trailing commas, and a 100-character print width.
- Node is expected to be `>=24 <25`.

## Coding Conventions

- Match the existing TypeScript, React, and CSS style before introducing new patterns.
- Prefer function components and React hooks.
- Keep styles close to the existing CSS approach unless the project intentionally adopts a new styling system.
- Reuse existing assets, variables, styles, and components before creating new ones.
- Ask for confirmation before adding new production dependencies; prefer `pnpm` when installing dependencies.

## Accessibility and Responsive Design

- Use semantic HTML and accessible labels for interactive controls.
- Preserve visible focus states and keyboard usability.
- Treat decorative images and icons as decorative with empty `alt` text or `aria-hidden` where appropriate.
- Design responsive layouts intentionally, with mobile and desktop states checked for readable text, usable controls,
  and no overlapping content.

## Change Discipline

- Inspect relevant code, configuration, and existing patterns before making changes.
- Prefer small, understandable changes over broad refactors.
- Avoid unrelated cleanup while implementing a requested change.
- Do not build BAGGU-specific behavior or visual rules until the requirements are explicit.

## Verification

- Run `npm run lint` before opening a pull request.
- Follow the workspace-level testing instructions when modifying JavaScript or TypeScript. If a required script is
  missing, report that clearly.
- Document public utility behavior changes in `docs/`.

## Session documentation

For substantial implementation or research tasks, create a record in
`docs/sessions/`.

Use:

`YYYY-MM-DD-NN-short-description.md`

Include:

- User Prompt
- Outcome
- Files Changed
- Decisions Made
- Deferred
- Notes

Session records should summarize the work rather than duplicate git history.