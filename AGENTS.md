# AGENTS.md

This file provides guidance to AI coding agents working in this repository. It is the canonical source; tool-specific files (e.g. `CLAUDE.md`) import it.

## What this is

`@jamesgmarks/utilities` — a published npm package of small, strongly-typed, functional-style utility functions (arrays, objects, strings, dates, async, memoization, pipes). It has **zero runtime dependencies** and publishes **only the compiled `dist/`** (see the `files` field). Keep both of those properties intact: do not add a runtime `dependency`, and do not rely on anything outside `dist/` being shipped.

## Commands

```bash
npm run build         # rm -rf dist && tsc  — compile to dist/ (also emits .d.ts)
npm test              # run the full jest suite
npm run test-watch    # jest --watch
npm run coverage      # jest --coverage
npm run build:doc     # build, then regenerate docs/*.md from JSDoc comments
npm run buildAndPublish  # build:doc + npm version patch + git push + npm publish
```

Run a single test file or a single test by name:

```bash
npx jest tests/array.test.ts
npx jest tests/array.test.ts -t "distinct"
```

Lint (there is no `lint` npm script; invoke eslint directly):

```bash
npx eslint 'src/**/*.ts'
```

Before considering a change done, build + test + lint should all be green.

## Core invariant: immutability

Every function must be **pure and non-mutating** — never modify the input it is given; always return a new value. This is the library's central contract and consuming code depends on it. When editing or adding functions, preserve it (clone before changing, etc.).

## Architecture: one function per file + manual barrels

The export graph has three deliberate layers:

1. **Leaf files** — `src/<category-plural>/<fnName>.ts` (e.g. `src/arrays/distinct.ts`, `src/objects/deepMerge.ts`). One concept per file. A single file may export more than one name (e.g. `chunkArray.ts` exports both `chunkArray` and `slicesOf`). Shared category types live under `src/<category-plural>/types/`.
2. **Category barrels** — `src/<category-singular>.ts` (e.g. `src/array.ts`, `src/object.ts`, `src/miscellaneous.ts`). These re-export from the leaf files using **explicit named re-exports**, *not* `export *`.
3. **Root barrel** — `src/index.ts` re-exports every category barrel with `export *`.

**Consequence for adding a function:** creating the leaf file is not enough. You must also add an explicit `export { yourFn } from './<category>/yourFn';` line to the matching category barrel, or it won't be part of the public API. Mirror the existing alphabetical-ish ordering and grouping in the barrel.

Note the plural/singular split is intentional but inconsistent in one place: the "misc" category uses dir `src/misc/`, barrel `src/miscellaneous.ts`, and docs `docs/misc.md`.

## Tests

Tests are organized **per category, not per function**: `tests/<category>.test.ts` (e.g. `tests/array.test.ts`, `tests/object.test.ts`) exercises everything in that category and imports from `../src`. When you add or change a function, update the corresponding category test file rather than creating a new per-function test.

## Generated docs

`docs/*.md` are **generated** from the JSDoc comments on each function by `src/dev/jsdoc.ts` (run via `npm run build:doc`). Don't hand-edit `docs/`; edit the JSDoc on the source function and regenerate. `README.md` links to these category docs.

## Vendored object-hash

`src/object-hash/` is a vendored, trimmed fork (its own MIT `LICENSE`), used **internally only** by `src/memoize.ts` to derive cache keys for object arguments — it is not re-exported from the package. The node `crypto` dependency was deliberately removed; hashing now uses a small dependency-free FNV-family digest (`fnv1a`), so do not reintroduce `crypto` or any dependency here.

## Toolchain pins (don't casually bump)

- **`typescript` is pinned to `~4.7.4`.** TS ≥4.8 surfaces genuine type errors in existing source (e.g. `cloneArray.ts`, `getSharedKeys.ts`, `deepMerge.ts`, `functional.ts`, `pipe.ts`). Moving to TS 5/6 requires real source fixes.
- **`eslint-config-airbnb-base` is pinned to exact `14.0.0`** to avoid a newer `no-multiple-empty-lines` rule firing across existing source.
- ESLint is still v6 with `@typescript-eslint` v5; a move to ESLint ≥8/10 means a flat-config migration and replacing the unmaintained airbnb-base config. Remaining `npm audit` advisories are all dev-only (the package ships no runtime deps) and cluster in the eslint-6 chain and the jest/istanbul `js-yaml` chain (no upstream fix).
