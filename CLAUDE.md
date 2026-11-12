# Reading List

A reading list built with React 19, TypeScript and Vite. No backend, the data is kept in `localStorage`. Read `SPEC.md` before you build anything.

## Commands

- `npm run dev`: start the app on http://localhost:3000
- `npm run test:run`: run the tests once
- `npm run check`: check the types
- `npm run build`: build the app

## Rules

- **Do not change** `src/useBooks.ts`, `src/books.ts`, `src/types.ts` or `src/seed.json`. They are tested and shared between all versions of the app. Only build the view layer.
- Use function components and hooks. No class components.
- No `any`. Type props explicitly.
- Keep components small. One component per file in `src/components`.
- Run `npm run check` and `npm run test:run` before you say a task is done.

## Styling

This branch (`variant-bootstrap`) uses **Bootstrap 5.3** with **react-bootstrap**.

- Import `bootstrap/dist/css/bootstrap.min.css` once in `src/index.tsx`. Do not use Bootstrap's own JavaScript; Modal and Toast come from `react-bootstrap`.
- Prefer react-bootstrap components (`Button`, `Form`, `Card`, `Badge`, `Modal`, `Toast`, `ToggleButtonGroup`) over hand-written markup with the same classes.
- Use Bootstrap utility classes for layout, spacing and typography. Spacing uses Bootstrap's 0–5 scale only.
- Colors use Bootstrap's theme colors only (`primary`, `secondary`, `success`, `warning`, `danger`, `body-*`). Custom values go only into `--bs-*` variable overrides in `src/index.css`.
- No inline `style` props, no other CSS or component libraries.
- Dark mode uses Bootstrap's `data-bs-theme` on `<html>` (set by `src/useColorMode.ts` and the inline script in `index.html`). Use theme-aware classes (`bg-body-tertiary`, `text-body-secondary`) instead of fixed `bg-dark`/`text-white`.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
