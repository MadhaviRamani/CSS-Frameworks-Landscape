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

This branch (`variant-tailwind`) uses **Tailwind CSS v4**.

- Use Tailwind CSS v4 only, via `@tailwindcss/vite`. No `tailwind.config.js`; configure with `@theme` in `src/index.css`.
- No inline `style` props, no CSS modules, no other CSS or component libraries (no headless UI kits). Dialogs use the native `<dialog>` element.
- Colors come from the semantic tokens defined in `@theme` (e.g. `bg-surface`, `text-muted`, `bg-status-reading`). Do not use raw palette classes (`bg-blue-500`) or arbitrary values (`p-[13px]`, `text-[#333]`) in components.
- Spacing uses Tailwind's default spacing scale only (`p-4`, `gap-6`), no arbitrary values.
- Shared design tokens live in `src/tokens.css` (identical on every branch, `--rl-*` variables). `@theme` in `src/index.css` maps them onto Tailwind; change a value in `tokens.css`, never in a component.
- Reuse components. Do not repeat long class lists, extract a component (e.g. `Button` with variants).
- Every focusable element shows a visible focus ring via `focus-visible:` utilities.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
