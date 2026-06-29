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

## Linting

ESLint uses **flat config** (`eslint.config.js`, ESLint 9 + `typescript-eslint` 8). airbnb-base (unmaintained, no flat-config support) was dropped in favour of `@eslint/js` + `typescript-eslint` recommended, with `@stylistic/eslint-plugin` for formatting (semi/quotes/comma-dangle/comma-spacing/max-len) and a set of explicitly re-ported airbnb rules: `no-nested-ternary`, `no-param-reassign`, `no-await-in-loop`, `no-loop-func`, `no-continue`, `no-bitwise`.

**`reportUnusedDisableDirectives` is `error`:** every `// eslint-disable` must mark a *real, currently-used* exception — if the rule doesn't actually fire on that line, the dead directive fails lint. Scope disables to the specific line + rule; don't reach for blanket file-level disables. The vendored `src/object-hash/**` has its own narrow override (it legitimately reassigns params, aliases `this`, etc.).

## Toolchain notes

- **`typescript` is `^5.9.x`.** It was previously capped at 4.7.4; the TS ≥4.8 type errors (in `cloneArray.ts`, `deepCloneArray.ts`, `getSharedKeys.ts`, `keyList.ts`, `deepMerge.ts`, `functional.ts`, `pipe.ts`) are fixed with localized `as Hash`/`as T` casts and explicit annotations — preserve those when editing the files.
- **Remaining `npm audit` advisories are all dev-only** (the package ships no runtime deps) and are confined to the **jest/istanbul `js-yaml` chain**, which has no upstream fix (it persists even in jest 30 — `@istanbuljs/load-nyc-config` pins `js-yaml@3` and is abandoned). Clearing it would require replacing the jest test stack (e.g. Vitest + V8 coverage), not bumping jest.
