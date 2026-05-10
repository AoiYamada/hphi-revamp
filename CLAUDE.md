# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

HPHI (專業心理治療及催眠應用（香港）有限公司) — a Hong Kong psychotherapy and hypnosis institute website built on the Payload CMS 3 + Next.js 15 "website" template. Forked from `payloadcms/payload/templates/website`; the upstream template's README is still in `README.md` and most of its conventions still apply.

## Stack & runtime

- Node `>=22.12.0` (`.nvmrc` pins `v22.12.0`), pnpm 9 (use `--ignore-workspace` — see scripts).
- Next.js 15 App Router, React 19, TypeScript 5.7 (strict mode **off**, only `strictNullChecks`).
- Payload 3.28 with MongoDB via `@payloadcms/db-mongodb` (mongoose). Local DB runs from `docker-compose.yml` (`mongo:5.0.6` on `:27017`, data persisted in `./volumes/mongo`).
- Email via `@payloadcms/email-nodemailer` (SMTP, hard-coded `secure: true`, port 465 — see `src/payload.config.ts`).
- Production deploys behind PM2 (`ecosystem.config.cjs`, port `4002`), not Vercel/Payload Cloud. The README's deployment instructions are inherited from the template and are **not** how this site is shipped — consult `back.sh` and `ecosystem.config.cjs` instead.

## Commands

```bash
pnpm dev              # Next dev server on :3000 (admin at /admin)
pnpm build            # next build (followed automatically by next-sitemap postbuild)
pnpm start            # production server
pnpm dev:prod         # clean .next, rebuild, then start — for reproducing prod issues
pnpm lint             # next lint
pnpm lint:fix
pnpm gen:types        # regenerate src/payload-types.ts after collection/global edits
pnpm gen:import       # regenerate Payload import map (run after adding admin custom components)
pnpm payload          # raw Payload CLI (e.g. pnpm payload migrate)
pnpm ii               # pnpm install --ignore-workspace (use this, not bare `pnpm install`)
pnpm reinstall        # nuke node_modules + lockfile and reinstall
```

There is no test suite configured — do not invent one or add `pnpm test` instructions.

`NODE_OPTIONS=--no-deprecation` is prepended to every script via `cross-env`; preserve it when adding new scripts.

## Architecture

### Two route groups, one Next app

`src/app/` is split into two route groups served from the same Next process:

- `src/app/(frontend)/` — public-facing site. Top-level routes: `/` (home, from `page.tsx`), `[slug]` (CMS-driven pages), `posts/`, `courses/`, `tutors/`, `search/`, `upload/`, `single-post/`, plus `(sitemaps)` and `next/` (preview/seed/exit-preview helpers).
- `src/app/(payload)/` — admin panel and Payload's HTTP/GraphQL APIs. The catch-all `api/[...slug]/route.ts` is wired to Payload; the admin lives at `/admin`.

Both share `src/payload.config.ts` (resolved via `@payload-config` path alias) as the single source of truth.

### Layout-builder pattern (the key abstraction)

Pages/posts/courses don't have hand-coded templates — content is composed of two pieces:

1. **Hero** (chosen per document from `src/heros/`: `HighImpact`, `MediumImpact`, `LowImpact`, plus `PostHero`). Dispatched by `src/heros/RenderHero.tsx` based on `hero.type`. Hero schema is in `src/heros/config.ts`.
2. **Layout blocks** — an array field (`layout`) of typed Payload blocks under `src/blocks/`. Each block has both a `config.ts` (Payload schema) and a `Component.tsx` (React renderer). `src/blocks/RenderBlocks.tsx` maps `blockType` → component:

   `archive`, `content`, `cta`, `formBlock`, `mediaBlock`, `youtubeBlock`, `collapsibleBlock`, `timeSlotBlock`, `timelineBlock`, `quoteBlock`, `cefCalculatorBlock`, `tabsBlock`.

   `Banner`, `Code`, `RelatedPosts` exist under `src/blocks/` but are wired into rich-text / posts, not the page layout dispatcher.

   **When adding a new block**: create `Block/config.ts` + `Block/Component.tsx`, register in `RenderBlocks.tsx`'s `blockComponents` map, and add it to the relevant collection's `layout.blocks` array (e.g. `Pages/index.ts`). Then run `pnpm gen:types`.

### Collections & globals

Registered in `src/payload.config.ts`:

- Collections: `Pages`, `Courses`, `Tutors`, `Posts`, `Media`, `Categories`, `Users`. (`Upload` exists in `collections/Upload.ts` but is intentionally commented out — don't re-enable without checking why.)
- Globals: `Header`, `Footer` (each has its own `config.ts` + render component).
- Access control lives in `src/access/` — three reusable predicates: `anyone`, `authenticated`, `authenticatedOrPublished`.
- Drafts/versions are enabled on Pages with `autosave.interval: 100ms` for live preview. Don't lower this unless you know what you're doing.

Each content collection (Pages, Posts, Courses, Tutors) has an `afterChange` `revalidate*` hook that calls Next's `revalidatePath`/`revalidateTag` — this is what makes the statically-rendered frontend reflect CMS edits without a redeploy.

### Plugins (`src/plugins/index.ts`)

- `redirectsPlugin` — applies to `pages`, `posts`, `courses`, `tutors`. Editing the `from` field requires a rebuild (per the in-admin description).
- `nestedDocsPlugin` — `categories` only.
- `seoPlugin` — title/URL generators are HPHI-branded (Chinese suffix, `getServerSideURL()`).
- `formBuilderPlugin` — config in `src/plugins/formBuilderPlugin/config.ts`.
- `searchPlugin` — indexes `posts` only; field overrides in `src/search/`.

### Generated types

`src/payload-types.ts` is generated — never hand-edit. Run `pnpm gen:types` after any change to a collection, global, or block schema. Same for `src/app/(payload)/admin/importMap.js` via `pnpm gen:import` after adding/removing admin custom components.

## Conventions specific to this repo

- **Path aliases**: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`. Use these consistently; relative `../../../` paths exist in older files but new code should use aliases.
- **shadcn/ui** is configured (`components.json`, style `new-york`, base color `zinc`, `rsc: true`). UI primitives live in `src/components/ui/`. Do not check in shadcn-generated files outside the configured aliases.
- **Tailwind** uses CSS variables (`hsl(var(--…))`) for theming; dark mode via `[data-theme="dark"]` selector or `class`. Custom tokens: `success`, `error`, `warning`, `chart-1..5`. Some classes (`lg:col-span-{4,6,8,12}`, status borders/bg) are in the `safelist` — keep them there if dynamically constructed.
- **Prettier** (`.prettierrc.json`): `singleQuote`, no semicolons, `printWidth: 100`, `trailingComma: all`. ESLint extends `next` with `parserOptions.project` pointing at `tsconfig.json`.
- **Live preview** breakpoints (Mobile 375×667, Tablet 768×1024, Desktop 1440×900) are configured in `payload.config.ts`. Use `generatePreviewPath` from `src/utilities/` rather than constructing preview URLs by hand.
- **i18n**: a recent commit (`feat: auto translate`) added auto-translation; `GoogleTranslate.tsx` is in `src/components/`. Content is primarily Traditional Chinese — be careful editing copy and meta defaults (the Chinese strings in `payload.config.ts` are the canonical site title/description).

## Environment

Required env (see `.env.example`): `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` (no trailing slash — used for CORS, image `remotePatterns`, and link generation), `CRON_SECRET`, `PREVIEW_SECRET`, `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`. Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_FB_ID`.

`next.config.js` derives the image `remotePatterns` from `NEXT_PUBLIC_SERVER_URL`; if you load images from a new host, add it there.

## Things to know before changing anything

- **Don't touch `payload-types.ts` manually** — it's overwritten by `pnpm gen:types`.
- **Caching**: the upstream README mentions Payload Cloud / Cloudflare proxy caching and disabling Next caching with `force-dynamic` + `no-store`. This repo is self-hosted, so revalidation is driven by the `revalidatePage`/`revalidatePost`/etc. `afterChange` hooks. If you change ISR/SSR behavior, verify the hooks still fire the right `revalidatePath` calls.
- **`back.sh`** contains a production deploy/backup recipe with hard-coded paths (`/home/yamada/...`) and DNS notes — read before editing rather than running.
- **`commit-diff.txt`, `setup.log`, `nextfile.tar.gz`, `hphi-web.pem`** in the repo root are operational artifacts, not source. Don't import from them; treat them as opaque.
