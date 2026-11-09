<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `npm run build` / `npm run start` — npm only (`package-lock.json`); don't use pnpm/yarn despite README suggestions.
- `npm run lint` — runs bare `eslint` (flat config in `eslint.config.mjs`) over the whole repo.
- No test suite and no typecheck script exist. Typecheck with `npx tsc --noEmit`.
- Verification order: `npm run lint` → `npx tsc --noEmit` → `npm run build`.
- **Lint fails on a clean tree**: 2 pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`, plus an unused-import warning in `src/app/page.tsx`. Don't try to "fix" these as part of unrelated work, and don't assume your change broke lint — compare against the baseline.

## Stack facts that change how you work

- Next.js 16.4.5, App Router, single package (no monorepo). App entry is `src/app/layout.tsx` + `src/app/page.tsx`; path alias `@/*` → `src/*`.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` (React Compiler via `babel-plugin-react-compiler`). Data-fetching/caching rules differ from older Next.js — check the bundled docs above before writing data code.
- Tailwind CSS 4, CSS-first config in `src/app/globals.css` (no `tailwind.config.*`, no PostCSS config). CSS is compiled via the `@tailwindcss/turbopack` loader rule in `next.config.ts` — don't add a PostCSS config file.
- shadcn/ui with style `base-nova` (`components.json`): primitives are **@base-ui/react, NOT Radix**. Add new primitives with `npx shadcn add <component>` rather than hand-writing them; `src/components/ui/*` is generated/registry-managed code.
- `cn` is the standalone npm package: components import `{ cn } from "cn"` directly; `src/lib/utils.ts` just re-exports it for the `@/lib/utils` alias. Don't "normalize" it to clsx/tailwind-merge.
- `layout.tsx` uses Next 16's global `LayoutProps<"/">` helper (no import needed) — this is intentional, not a missing type.
- No CI workflows, no pre-commit hooks, no env files. `.env*` is gitignored.
